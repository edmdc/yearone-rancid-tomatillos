package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Settings struct {
  DbUser string
  DbPassword string
  DbCluster string
  DbName string
}

func LoadEnv() *Settings {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Could not find .env file in project directory")
	}

	mongoUsername := os.Getenv("MONGODB_USERNAME")
  if mongoUsername == "" {
		log.Fatal("Could not find MONGODB_USERNAME in env file. Please start a free Atlas cluster at https://www.mongodb.com/")
	}

	mongoPassword := os.Getenv("MONGODB_PASSWORD")
  if mongoPassword == "" {
		log.Fatal("Could not find MONGODB_PASSWORD in env file. Please start a free Atlas cluster at https://www.mongodb.com/")
	}

	mongoCluster := os.Getenv("MONGODB_CLUSTER")
  if mongoCluster == "" {
		log.Fatal("Could not find MONGODB_CLUSTER in env file. Please start a free Atlas cluster at https://www.mongodb.com/")
	}

	mongoDbName := os.Getenv("MONGODB_DBNAME")
  if mongoDbName == "" {
		log.Fatal("Could not find MONGODB_DB in env file. Please start a free Atlas cluster at https://www.mongodb.com/")
	}

  return &Settings{
    DbUser: mongoUsername,
    DbPassword: mongoPassword,
    DbCluster: mongoCluster,
    DbName: mongoDbName,
  }
}
