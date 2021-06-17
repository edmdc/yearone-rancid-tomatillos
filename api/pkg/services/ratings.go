package services

import (
	"net/http"

	"github.com/edmdc/yearone-rancid-tomatillos/api/pkg/data"
	"github.com/edmdc/yearone-rancid-tomatillos/api/pkg/domain"
	"github.com/edmdc/yearone-rancid-tomatillos/api/pkg/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type IRatingService interface {
	FindMovieRating(tmdbId int) (*domain.Rating, *models.Error)
	VoteOnMovie(tmdbId int, vote string) (*domain.Rating, *models.Error)
}

type RatingService struct {
	ratingProvider data.IRatingProvider
}

func NewRatingService(ratingProvider data.IRatingProvider) IRatingService {
	return &RatingService{
		ratingProvider: ratingProvider,
	}
}

func (s RatingService) FindMovieRating(tmdbId int) (*domain.Rating, *models.Error) {
	rating, err := s.ratingProvider.FindRatingByTmdbId(tmdbId)

	if err != nil {
		return nil, &models.Error{
			Status:  http.StatusInternalServerError,
			Name:    "SERVER_ERROR",
			Message: "Something went wrong.",
			Error:   err,
		}
	}

	if rating == nil {
		return nil, &models.Error{
			Status:  http.StatusNotFound,
			Name:    "NOT_FOUND",
			Message: "No rating exists for this movie",
		}
	}

	return rating, nil
}

func (s RatingService) VoteOnMovie(tmdbId int, vote string) (*domain.Rating, *models.Error) {
	ratingExist, err := s.ratingProvider.RatingExists(tmdbId)

	if err != nil {
		return nil, &models.Error{
			Status:  http.StatusInternalServerError,
			Name:    "SERVER_ERROR",
			Message: "Something went wrong.",
			Error:   err,
		}
	}

	if !ratingExist {
		newRating := &domain.Rating{
			Id:        primitive.NewObjectID(),
			TmdbId:    tmdbId,
			UpVotes:   0,
			DownVotes: 0,
		}

		err = s.ratingProvider.CreateRating(newRating)

		if err != nil {
			return nil, &models.Error{
				Status:  http.StatusInternalServerError,
				Name:    "SERVER_ERROR",
				Message: "Failed to insert new movie rating",
				Error:   err,
			}
		}
	}

	switch vote {
	case "up":
		rating, err := s.ratingProvider.UpvoteMovie(tmdbId)

		if err != nil {
			return nil, &models.Error{
				Status:  http.StatusInternalServerError,
				Name:    "SERVER_ERROR",
				Message: "Failed to update movie rating",
				Error:   err,
			}
		}

		return rating, nil
	case "down":
		rating, err := s.ratingProvider.DownvoteMovie(tmdbId)

		if err != nil {
			return nil, &models.Error{
				Status:  http.StatusInternalServerError,
				Name:    "SERVER_ERROR",
				Message: "Failed to update movie rating",
				Error:   err,
			}
		}

		return rating, nil
	default:
		return nil, &models.Error{
			Status:  http.StatusBadRequest,
			Name:    "BAD_REQUEST",
			Message: "Incorrect vote parameter",
		}
	}
}
