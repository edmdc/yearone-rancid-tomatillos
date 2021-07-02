# Rancid Tomatillos - YearOne Challenge

[Production Site](https://rancid-tomatillos-web-v7ekia46ga-uc.a.run.app)

An full-stack project to search and rate movies using data from The Movie Database.

This project was created as a take home challenge for [YearOne](https://www.joinyearone.io/),
a community I joined as recent Front-End graduate of [Turing School of Software and Design](https://turing.edu/).
As a developer who's fairly confident I viewed this challenge as an opportunity to solidify my working knowledge of the Golang language and back-end development.

## Requirements

- [Docker desktop](https://www.docker.com/products/docker-desktop) minimum version 3.4.0
- [GNU make](https://www.gnu.org/software/make/) - _optional_

## Setup

In a new terminal window navigate to the parent directory you wish to clone code to and run the following commands

- Clone code to local machine

```zsh
# Downloads code to a new directory named yearone-rancid-tomatillos

git clone git@github.com:edmdc/yearone-rancid-tomatillos.git
```

- Navigate to directory and create a directory for Mongodb container volume

```zsh
cd yearone-rancid-tomatillos
mkdir mongo

# The mongo directory will be used by Docker to persist database container data

```

## Commands

- **Build and start development containers as background process**

```zsh
# Web container with HMR will start on http://localhost:8080
# Api container with Live Reloading will start on http://localhost:8081

make dev

# Docker command equivalent

docker compose up --build -d

# Use the command above without -d flag to output logs to current terminal window
```

- **End background processes**

```zsh
make end

# Docker command equivalent
docker compose down
```

- Clear Docker build cache

```zsh
make clean

# Docker command equivalent
docker builder prune
```

## Project Gifs

#### Homepage View

![homepage](https://user-images.githubusercontent.com/60306770/124323573-241d6800-db47-11eb-9b01-dcc298ad2a16.gif)

#### Search Results w/ Pagination

![search-results](https://user-images.githubusercontent.com/60306770/124324599-dd307200-db48-11eb-8b75-d96b9ea606e8.gif)

#### Single Movie View + Voting Mechanism

![movie-votes](https://user-images.githubusercontent.com/60306770/124325153-cfc7b780-db49-11eb-9d7d-1951575b1bc2.gif)

#### Data persistance

![data-persist](https://user-images.githubusercontent.com/60306770/124326062-6f397a00-db4b-11eb-9759-faa85abbd401.gif)

## Technology Stack

### Front-end

- [NextJs](https://nextjs.org/)
- [Emotion CSS-in-JS](https://emotion.sh/docs/introduction)

### Back-end

- [Golang](https://golang.org/)
- [Chi router](https://golang.org/)
- [Mongodb](https://www.mongodb.com/)
