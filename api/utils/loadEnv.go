package utils

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Could not find .env file in project directory")
	}

	if token := os.Getenv("TMDB_TOKEN"); token == "" {
		log.Fatal("Could not find TMDB_TOKEN in env file. Please request a token from https://www.themoviedb.org/")
	}

	if mongoUsername := os.Getenv("MONGODB_USERNAME"); mongoUsername == "" {
		log.Fatal("Could not find MONGODB_USERNAME in env file. Please start a free Atlas cluster at https://www.mongodb.com/")
	}

	if mongoPassword := os.Getenv("MONGODB_PASSWORD"); mongoPassword == "" {
    log.Fatal("Could not find MONGODB_PASSWORD in env file. Please start a free Atlas cluster at https://www.mongodb.com/")
	}
	
	if mongoCluster := os.Getenv("MONGODB_CLUSTER"); mongoCluster == "" {
    log.Fatal("Could not find MONGODB_CLUSTER in env file. Please start a free Atlas cluster at https://www.mongodb.com/")
	}
	
	if mongoDb := os.Getenv("MONGODB_DBNAME"); mongoDb == "" {
    log.Fatal("Could not find MONGODB_DB in env file. Please start a free Atlas cluster at https://www.mongodb.com/")
	}
}
