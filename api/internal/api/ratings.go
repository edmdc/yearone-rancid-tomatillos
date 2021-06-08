package api

import (
	"encoding/json"
	"net/http"

	"github.com/edmdc/yearone-rancid-tomatillos/api/pkg/models"
)

func RatingsCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx, err := models.CreateRequestContext(r)
		if err != nil {
			res, _ := json.Marshal(err)
			w.Write(res)
			return
		}
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (a App) GetMovieRating(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	tmdbId := ctx.Value("tmdbid").(int)
	rating, err := a.ratingService.FindMovieRating(tmdbId)

	if err != nil {
		errRes, _ := json.Marshal(err)
		w.WriteHeader(err.Status)
		w.Write(errRes)
	}

	res, _ := json.Marshal(rating)

	w.Write(res)
}

func (a App) UpvoteMovie(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	tmdbId := ctx.Value("tmdbid").(int)
	rating, err := a.ratingService.VoteOnMovie(tmdbId, "up")

	if err != nil {
		errRes, _ := json.Marshal(err)
		w.WriteHeader(err.Status)
		w.Write(errRes)
	}

	res, _ := json.Marshal(rating)

	w.Write(res)
}

func (a App) DownvoteMovie(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	tmdbId := ctx.Value("tmdbid").(int)
	rating, err := a.ratingService.VoteOnMovie(tmdbId, "down")

	if err != nil {
		errRes, _ := json.Marshal(err)
		w.WriteHeader(err.Status)
		w.Write(errRes)
	}

	res, _ := json.Marshal(rating)

	w.Write(res)
}
