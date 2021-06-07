package models

import "net/http"

type Error struct {
  Message string `json:"message"`
  Status  int     `json:"status"`
  Name    string `json:"name"`
  Error   error  `json:"-"`
}

func BindError() *Error {
  return &Error{Status: http.StatusBadRequest, Message: "Error processing request. Could not bind value.", Name:"BIND_ERROR"}
}

func CustomError(name, message string, status int) *Error {
  return &Error{Name: name, Message: message, Status: status}
}
