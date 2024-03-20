package middleware

import (
	"context"
	"fmt"

	"strings"

	"net/http"
)

// Middleware decodes the share session cookie and packs the session into context
func Middleware() func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			auth := r.Header.Get("Authorization")
			if !isBearerToken(auth) {
				next.ServeHTTP(w, r)
				return
			}

			bearerToken := strings.Split(auth, " ")[1]

			claims := &JwtCustomClaim{}
			token, err := decodeJwt(bearerToken, claims)
			if !token.Valid && err != nil {
				next.ServeHTTP(w, r)
				return
			}

			ctx := addIDToContext(r.Context(), claims.ID)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func addIDToContext(ctx context.Context, id string) context.Context {
	ctx = context.WithValue(ctx, "id", id)
	return ctx
}

func GetUserIDFromContext(ctx context.Context) (string, error) {
	id := ctx.Value("id")
	if id == nil {
		return "", fmt.Errorf("id is nil")
	}
	return id.(string), nil
}

func isBearerToken(token string) bool {
	// 文字列が "Bearer " で始まるかどうかを確認します
	return strings.HasPrefix(token, "Bearer ")
}
