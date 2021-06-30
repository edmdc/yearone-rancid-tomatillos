package config

import (
	"log"
	"os"
)

type Settings struct {
	DbUser     string
	DbPassword string
	DbCluster  string
	DbName     string
}

func LoadEnv() *Settings {
	mongoUsername := os.Getenv("MONGO_USERNAME")
	if mongoUsername == "" {
		log.Fatal("Could not find MONGO_USERNAME in environment")
	}

	mongoPassword := os.Getenv("MONGO_PASSWORD")
	if mongoPassword == "" {
		log.Fatal("Could not find MONGO_PASSWORD in environment")
	}

	mongoCluster := os.Getenv("MONGO_CLUSTER")
	if mongoCluster == "" {
		log.Fatal("Could not find MONGO_CLUSTER in environment")
	}

	mongoDbName := os.Getenv("MONGO_DATABASE")
	if mongoDbName == "" {
		log.Fatal("Could not find MONGO_DATABASE in environment")
	}

	return &Settings{
		DbUser:     mongoUsername,
		DbPassword: mongoPassword,
		DbCluster:  mongoCluster,
		DbName:     mongoDbName,
	}
}
