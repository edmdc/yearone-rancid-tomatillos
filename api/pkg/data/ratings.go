package data

import (
	"context"

	"github.com/edmdc/yearone-rancid-tomatillos/api/pkg/config"
	"github.com/edmdc/yearone-rancid-tomatillos/api/pkg/domain"
	"github.com/pkg/errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type IRatingProvider interface {
	CreateRating(movieRating *domain.Rating) error
	RatingExists(tmdbId int) (bool, error)
	FindRatingByTmdbId(tmdbId int) (*domain.Rating, error)
	UpvoteMovie(tmdbId int) (*domain.Rating, error)
	DownvoteMovie(tmdbId int) (*domain.Rating, error)
}

type RatingProvider struct {
	ratingCollection *mongo.Collection
	ctx              context.Context
}

func NewRatingsProvider(config *config.Settings, mongo *mongo.Client) IRatingProvider {
	ratingCollection := mongo.Database(config.DbName).Collection("ratings")
	return &RatingProvider{
		ratingCollection: ratingCollection,
		ctx:              context.TODO(),
	}
}

func (p RatingProvider) CreateRating(movieRating *domain.Rating) error {
	_, err := p.ratingCollection.InsertOne(p.ctx, movieRating)
	if err != nil {
		return errors.Wrap(err, "Failed to insert new movie rating.")
	}
	return nil
}

func (p RatingProvider) RatingExists(tmdbId int) (bool, error) {
	var foundRating *domain.Rating
	filter := bson.D{primitive.E{Key: "tmdbid", Value: tmdbId}}

	if err := p.ratingCollection.FindOne(p.ctx, filter).Decode(&foundRating); err != nil {
		if err == mongo.ErrNoDocuments {
			return false, nil
		}
		return false, errors.Wrap(err, "Error finding movie rating")
	}

	return true, nil
}

func (p RatingProvider) FindRatingByTmdbId(tmdbId int) (*domain.Rating, error) {
	var foundRating domain.Rating
	filter := bson.D{primitive.E{Key: "tmdbid", Value: tmdbId}}

	if err := p.ratingCollection.FindOne(p.ctx, filter).Decode(&foundRating); err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, errors.Wrap(err, "Error finding movie rating")
	}

	return &foundRating, nil
}

func (p RatingProvider) UpvoteMovie(tmdbId int) (*domain.Rating, error) {
	var updatedRating domain.Rating
	filter := bson.D{primitive.E{Key: "tmdbid", Value: tmdbId}}
	update := bson.D{{"$inc", bson.D{{"upVotes", 1}}}}
	opts := options.FindOneAndUpdate().SetReturnDocument(1)

	if err := p.ratingCollection.FindOneAndUpdate(p.ctx, filter, update, opts).Decode(&updatedRating); err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, errors.Wrap(err, "Error updating movie rating")
	}

	return &updatedRating, nil
}

func (p RatingProvider) DownvoteMovie(tmdbId int) (*domain.Rating, error) {
	var updatedRating domain.Rating
	filter := bson.D{primitive.E{Key: "tmdbid", Value: tmdbId}}
	update := bson.D{{"$inc", bson.D{{"downVotes", 1}}}}
	opts := options.FindOneAndUpdate().SetReturnDocument(1)

	if err := p.ratingCollection.FindOneAndUpdate(p.ctx, filter, update, opts).Decode(&updatedRating); err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, errors.Wrap(err, "Error updating movie rating")
	}

	return &updatedRating, nil
}
