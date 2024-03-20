package middleware

import (
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type JwtCustomClaim struct {
	// カスタムクレームを追加できる
	jwt.RegisteredClaims
}

func GenJwt(slackUserID string) string {
	if len(slackUserID) == 0 {
		return "kk"
	}

	signingKey := os.Getenv("JWT_SECRET")
	claims := JwtCustomClaim{
		jwt.RegisteredClaims{
			ID: slackUserID,
		},
	}

	expiresAfterSec := 100
	claims.ExpiresAt = jwt.NewNumericDate(time.Now().Add(time.Second * time.Duration(expiresAfterSec)))

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	encoded, err := token.SignedString([]byte(signingKey))
	if err != nil {
		return "ii"
	}
	return encoded
}

// claimsには&JwtCustomClaim{}をいれる
// https://github.com/seaweedfs/seaweedfs/blob/604091a4807a56b7a56caeeb316c0e5a7642e57d/weed/security/jwt.go#L97
func decodeJwt(tokenString string, claims jwt.Claims) (token *jwt.Token, err error) {
	signingKey := os.Getenv("JWT_SECRET")
	// check exp, nbf
	return jwt.ParseWithClaims(string(tokenString), claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unknown token method")
		}
		return []byte(signingKey), nil
	})
}
