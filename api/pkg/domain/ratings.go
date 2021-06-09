package domain

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Rating struct {
	Id        primitive.ObjectID `bson:"_id"`
	TmdbId    int                `bson:"tmdbid,required"`
	UpVotes   uint               `bson:"upVotes"`
	DownVotes uint               `bson:"downVotes"`
}
