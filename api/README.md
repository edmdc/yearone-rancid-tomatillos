# Rancid Tomatillos API

## Health Check

### `GET /v1/health`

#### Success

**- Status**: 200

**- Content**: 'Howdy! Server is healthy and running'

#### Error

**- Status**: 500

**- Content:** none

### `GET /v1/ratings/:tmdbId`

**Url Params:**

- `tmdbId` _required_
  - Id for a movie title from The Movie Database

#### Success

**- Status:** 200

**- Content:**

```JSON
{
  id: ObjectID,
  tmdbId: number,
  upVotes: number,
  downVotes: number
}
```

#### Error

**- Status:** 404 NOT FOUND

**- Content:**

```JSON
{
  message: "No rating exists for this movie title",
  status: 404,
  name: "NOT_FOUND"
}
```

### `POST /v1/ratings/:tmdbId/upvote`

**Url Params:**

- `tmdbId` _required_

**Request Body:**

none

#### Success

A new rating will be created if none exists. If one does, the updated
rating will be returned.

**- Status:** 200

**- Content:**

```JSON
{
  id: ObjectID,
  tmdbId: number,
  upVotes: number,
  downVotes: number
}
```

#### Error

**- Status:** 503 SERVICE UNAVAILABLE

**- Content:**

```JSON
{
  message: string,
  status: number,
  name: string,
}
```

### `POST /v1/ratings/:tmdbId/downvote`

**Url Params:**

- `tmdbId` _required_

**Request Body:**

none

#### Success

A new rating will be created if none exists. If one does, the updated
rating will be returned.

**- Status:** 200

**- Content:**

```JSON
{
  id: ObjectID,
  tmdbId: number,
  upVotes: number,
  downVotes: number
}
```

#### Error

**- Status:** 503 SERVICE UNAVAILABLE

**- Content:**

```JSON
{
  message: string,
  status: number,
  name: string
}
```
