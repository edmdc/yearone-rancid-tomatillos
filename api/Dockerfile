############################
# STEP 1 build executable binary
############################

FROM golang:alpine AS builder
# Install git - required for fetching the dependencies.
RUN apk update && apk add --no-cache git ca-certificates && update-ca-certificates

WORKDIR /go/src/app
COPY . .
# Fetch dependencies
RUN go mod download
RUN go mod verify
# Build the binary.
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o main .

############################
# STEP 2 build a small image
############################
FROM alpine:latest

RUN addgroup -g 1001 -S golang
RUN adduser -S restapi -u 1001

WORKDIR /app
# Import the user and group files from the builder.
COPY --from=builder --chown=restapi:golang /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Copy our static executable.
COPY --from=builder --chown=restapi:golang /go/src/app/main .
# Use an unprivileged user.
USER restapi
EXPOSE 8081
ENTRYPOINT ["./main"]
