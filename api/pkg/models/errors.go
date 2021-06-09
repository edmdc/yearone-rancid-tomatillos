package models

type Error struct {
	Message string `json:"message"`
	Status  int    `json:"status"`
	Name    string `json:"name"`
	Error   error  `json:"-"`
}

func CustomError(name, message string, status int) *Error {
	return &Error{Name: name, Message: message, Status: status}
}
