package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"os"
	// "strings"
	"time"

	"github.com/edmdc/yearone-rancid-tomatillos/api/utils"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var RatingsCollection *mongo.Collection

func main() {
	utils.LoadEnv()
	r := rootRouter()
  connectDb()
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Howdy!"))
	})


	fmt.Println("Starting server at http://localhost:8081")
	log.Fatalln(http.ListenAndServe("localhost:8081", r))
}

func rootRouter() *chi.Mux {
	r := chi.NewRouter()

	// A good base middleware stack
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	return r
}

func connectDb() {
		uri := os.Getenv("MONGODB_URI")
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
		if err != nil {
			panic(err)
		}
		defer func() {
			if err = client.Disconnect(ctx); err != nil {
				panic(err)
			}
		}()
		// Ping the primary
		if err := client.Ping(ctx, readpref.Primary()); err != nil {
			panic(err)
		}
		fmt.Println("Successfully connected and pinged.")

    RatingsCollection = client.Database("yearone-rancid-tomatillos").Collection("Ratings")
}
