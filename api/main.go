package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"os"
	// "strings"
	"time"

	"github.com/edmdc/yearone-rancid-tomatillos/api/utils"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type MovieRating struct {
	TmdbId    int                `json:"tmdbid,required"`
	UpVotes   uint               `json:"upVotes"`
	DownVotes uint               `json:"downVotes"`
	Id        primitive.ObjectID `json:"_id,omitempty"`
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
			r.Get("/", GetMovieRating)
			// r.Post("/create", CreateMovieRating)
			r.Get("/upvote", UpVoteMovie)
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
	fmt.Println(uri)
	uri = "mongodb://127.0.0.1:27017"
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		panic(err.Error())
	}
	// Ping the primary
	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		panic(err.Error())
	}
	fmt.Println("Successfully connected and pinged.")

	RatingsCollection = client.Database("yearone-rancid-tomatillos").Collection("Ratings")

	return client
}

func RatingsCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tmdbId, err := strconv.Atoi(chi.URLParam(r, "tmdbId"))
		if err != nil {
			utils.ErrorHandler(w, "Invalid URL parameter: tmdbId should be a number string", http.StatusBadRequest)
			return
		}
		var movieRating MovieRating
		err = RatingsCollection.FindOne(r.Context(), bson.D{{"tmdbid", tmdbId}}).Decode(&movieRating)
		if err != nil {
			ctx := context.WithValue(r.Context(), "tmdbid", tmdbId)
			next.ServeHTTP(w, r.WithContext(ctx))
			return
		}
		ctx := context.WithValue(r.Context(), "movie", movieRating)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func GetMovieRating(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	movieRating := ctx.Value("movie")
	if movieRating == nil {
		utils.ErrorHandler(w, "No rating found for this movie", http.StatusNotFound)
		return
	}

	res, err := json.Marshal(movieRating)
	if err != nil {
		utils.ErrorHandler(w, "Server Error", http.StatusInternalServerError)
		return
	}

	w.Write(res)
}

func UpVoteMovie(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	movieRating := ctx.Value("movie")
	if movieRating == nil {
	  CreateMovieRating(w, r, "up")
	  return
	}
}

func CreateMovieRating(w http.ResponseWriter, r *http.Request, vote string) {
	ctx := r.Context()
	tmdbId := ctx.Value("tmdbid").(int)
	var rating MovieRating

	if vote == "up" {
		rating = MovieRating{TmdbId: tmdbId, UpVotes: 1, DownVotes: 0}
	}

	if vote == "down" {
		rating = MovieRating{TmdbId: tmdbId, UpVotes: 0, DownVotes: 1}
	}

	dbResult, err := RatingsCollection.InsertOne(r.Context(), rating)

	if err != nil {
		utils.ErrorHandler(w, err.Error(), http.StatusNotImplemented)
		return
	}

	RatingsCollection.FindOne(r.Context(), bson.D{{"_id", dbResult.InsertedID}}).Decode(&rating)

	if err != nil {
		utils.ErrorHandler(w, err.Error(), http.StatusInternalServerError)
		return
	}

  newRating, err := json.Marshal(rating)

	w.WriteHeader(http.StatusCreated)
	w.Write(newRating)
}
