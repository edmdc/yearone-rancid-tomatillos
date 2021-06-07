package domain

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Rating struct {
	Id        primitive.ObjectID `bson:"_id"`
	TmdbId    int                `json:"tmdbid,required"`
	UpVotes   uint               `json:"upVotes"`
	DownVotes uint               `json:"downVotes"`
}
