FROM golang:alpine

RUN apk update && apk add --no-cache git 

RUN mkdir -p /usr/local/go/src/app
WORKDIR /usr/local/go/src/app 
COPY . .

RUN go mod download

RUN go get -u github.com/cosmtrek/air

ENTRYPOINT air
