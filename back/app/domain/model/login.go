package model

type LoginResponse struct {
	IsRegistered bool   `json:"is_registered"`
	Token        string `json:"token"`
}
