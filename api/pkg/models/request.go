package models

import (
	"context"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"
)

func CreateRequestContext(r *http.Request) (context.Context, *Error) {
	tmdbId, err := strconv.Atoi(chi.URLParam(r, "tmdbId"))

	if err != nil {
		res := CustomError("INVALID_URL_PARAM", "Malformed url: Could not convert tmdbId URL param to integer type", http.StatusBadRequest)
		return nil, res
	}

	ctx := context.WithValue(r.Context(), "tmdbid", tmdbId)
	return ctx, nil
}
