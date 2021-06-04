package main

import (
	"context"
	"encoding/json"
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
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type MovieRating struct {
  TmdbId int `json:"tmdbId,required"`
  UpVotes uint `json:"upVotes"`
  DownVotes uint `json:"downVotes"`
}

var RatingsCollection *mongo.Collection

func main() {
	utils.LoadEnv()
	r := rootRouter()

  ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
  defer cancel()

  client := connectDb(ctx)
  defer func() {
    fmt.Println("Aha, just disconnected client")
    if err := client.Disconnect(ctx); err != nil {
      panic(err)
    }
  }()

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Howdy!"))
	})

  r.Route("/ratings", func(r chi.Router) {
    r.Route("/{tmdbId}", func(r chi.Router) {
      r.Use(RatingsCtx)
      r.Get("/", getMovieRating)
      r.Get("/up-vote", upVoteMovie)
    })
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

func connectDb(ctx context.Context) *mongo.Client {
		uri := os.Getenv("MONGODB_URI")
		client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
		if err != nil {
			panic(err)
		}
		// Ping the primary
		if err := client.Ping(ctx, readpref.Primary()); err != nil {
			panic(err)
		}
		fmt.Println("Successfully connected and pinged.")

    RatingsCollection = client.Database("yearone-rancid-tomatillos").Collection("Ratings")

    return client
}

func RatingsCtx(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    tmdbId := chi.URLParam(r, "tmdbId")
    var movieRating bson.M
    err := RatingsCollection.FindOne(r.Context(), bson.D{{"tmdbId", tmdbId}}).Decode(&movieRating)
    if err != nil {
      utils.ErrorHandler(w, err.Error(), http.StatusNotFound)
      return
    }
    ctx := context.WithValue(r.Context(), "movie", movieRating)
    next.ServeHTTP(w, r.WithContext(ctx))
  })
}

func getMovieRating(w http.ResponseWriter, r *http.Request) {
  ctx := r.Context()
  movieRating, ok := ctx.Value("movie").(*MovieRating)
  if !ok {
    utils.ErrorHandler(w, "Could not process entity", http.StatusUnprocessableEntity)
    return
  }
  res, err := json.Marshal(movieRating)
  if err != nil {
    utils.ErrorHandler(w, "Server Error", http.StatusInternalServerError)
    return
  }

  w.Write(res)
}

