module github.com/edmdc/yearone-rancid-tomatillos/api

go 1.16

replace github.com/edmdc/yearone-rancid-tomatillos/api/utils => ./utils

require (
	github.com/go-chi/chi v1.5.4
	github.com/go-chi/cors v1.2.0
	github.com/joho/godotenv v1.3.0
	go.mongodb.org/mongo-driver v1.5.3
)
