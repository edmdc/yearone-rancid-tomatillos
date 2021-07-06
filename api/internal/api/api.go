package api

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/edmdc/yearone-rancid-tomatillos/api/pkg/config"
	"github.com/edmdc/yearone-rancid-tomatillos/api/pkg/data"
	"github.com/edmdc/yearone-rancid-tomatillos/api/pkg/services"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"go.mongodb.org/mongo-driver/mongo"
)

type App struct {
	router        *chi.Mux
	ratingService services.IRatingService
}

func New(config *config.Settings, client *mongo.Client) *App {
	webUrl := os.Getenv("WEB_URL")
	r := chi.NewRouter()

	// A good base middleware stack
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{webUrl},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	ratingProvider := data.NewRatingsProvider(config, client)

	ratingService := services.NewRatingService(ratingProvider)

	return &App{
		router:        r,
		ratingService: ratingService,
	}
}

func (a App) ConfigureRoutes() {
	a.router.Route("/v1", func(r chi.Router) {
		r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("Howdy! Server is healthy and running."))
		})

		r.Route("/ratings", func(r chi.Router) {
			r.Route("/{tmdbId}", func(r chi.Router) {
				r.Use(RatingsCtx)
				r.Get("/", a.GetMovieRating)
				r.Post("/upvote", a.UpvoteMovie)
				r.Post("/downvote", a.DownvoteMovie)
			})
		})
	})
}

func (a App) Start() {
	a.ConfigureRoutes()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	fmt.Println("Starting server at http://localhost:8081")
	log.Fatalln(http.ListenAndServe(":"+port, a.router))
}
