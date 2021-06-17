package domain

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Rating struct {
  Id        primitive.ObjectID `bson:"_id" json:"id"`
  TmdbId    int                `bson:"tmdbid,required" json:"tmdbId,required"`
  UpVotes   uint               `bson:"upVotes" json:"upVotes"`
  DownVotes uint               `bson:"downVotes" json:"downVotes"`
}
