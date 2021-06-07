package data

import (
	"os"
	"fmt"
	"time"
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type Connection struct {
  Client *mongo.Client
  ctx context.Context
}

func ConnectDb() Connection {
	username := os.Getenv("MONGODB_USERNAME")
	password := os.Getenv("MONGODB_PASSWORD")
  cluster := os.Getenv("MONGODB_CLUSTER")
  dbName := os.Getenv("MONGODB_DBNAME")

  uri := fmt.Sprintf("mongodb+srv://%s:%s@%s/%s?w=majority", username, password, cluster, dbName)

  opts := options.Client().ApplyURI(uri)

	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, opts)

	if err != nil {
		panic(err.Error())
	}
	// Ping the primary
	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		panic(err.Error())
	}
	fmt.Println("Successfully connected and pinged.")

	return Connection{
    Client: client,
    ctx: ctx,
  }
}

func (c Connection) Disconnect() {
  c.Client.Disconnect(c.ctx)
}
