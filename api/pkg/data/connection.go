package data

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/edmdc/yearone-rancid-tomatillos/api/pkg/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type Connection struct {
	Client *mongo.Client
	ctx    context.Context
}

func ConnectDb(config *config.Settings) Connection {
  var prefix string

  if strings.Contains(config.DbCluster, "27017") {
    prefix = "mongodb"
  } else {
    prefix = "mongodb+srv"
  }

	uri := fmt.Sprintf("%s://%s:%s@%s/?w=majority", prefix, config.DbUser, config.DbPassword, config.DbCluster)
	opts := options.Client().ApplyURI(uri)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, opts)

	if err != nil {
		panic(err.Error())
	}
	// Ping the primary
	if err = client.Ping(ctx, readpref.Primary()); err != nil {
		panic(err.Error())
	}

	fmt.Println("Successfully connected and pinged.")

	return Connection{
		Client: client,
		ctx:    ctx,
	}
}

func (c Connection) Disconnect() {
	c.Client.Disconnect(c.ctx)
}
