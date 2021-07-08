# Rancid Tomatillos - YearOne Challenge

This application is deployed to the Google Cloud Platform - [Explore it here.](https://rancid-tomatillos-web-v7ekia46ga-uc.a.run.app)

A full-stack project to search and rate movies using data from [The Movie Database](https://www.themoviedb.org/)
created as a take-home challenge for [YearOne](https://www.joinyearone.io/), a community I joined
as a recent Front-End graduate of [Turing School of Software and Design](https://turing.edu/).

After solidifying my knowledge of front-end development over the last year, I viewed this challenge
as an opportunity to solidify my full-stack skills, explore a new language, DevOps concepts and tools.

## Requirements

- [Docker desktop](https://www.docker.com/products/docker-desktop) minimum version 3.4.0
- [GNU make](https://www.gnu.org/software/make/) - _optional_

## Setup

In a new terminal window navigate to the parent directory you wish to clone the code into
and run the following commands

- Clone code to local machine

```zsh
# Downloads code to a new directory named yearone-rancid-tomatillos

git clone git@github.com:edmdc/yearone-rancid-tomatillos.git
```

- Navigate into project directory and create a new directory
  for the Mongodb container volume

```zsh
cd yearone-rancid-tomatillos
mkdir mongo

# The mongo directory will be used by Docker to persist database container data
```

## Commands

- Make sure that Docker desktop is running in the
  background before running any of the following commands.

- **Build and start development containers as background process**

```zsh
# Web container with hot module reloading can be accessed on http://localhost:8080
# Api container with live reloading can be accessed on http://localhost:8081

make dev

# Docker command equivalent
docker compose up --build -d

# Use the docker command above without -d flag to output logs to current terminal window
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

#### Lighthouse Score

![Lighthouse Score](<https://user-images.githubusercontent.com/60306770/124847667-f9754a00-df60-11eb-9fe2-a39ae584b2e1.png)

## Technology Stack

### [Docker](https://www.docker.com/)

Docker, written in Go, is omnipresent when developing for the cloud. Its role cannot be understated,
so learning the basics was a no-brainer choice and my main goal with this project.

In previous projects, I used a prebuilt Serverless Component to deploy a NextJS front-end to
AWS. The simple configuration of this component is ideal for a simple, solo project. However,
it presents some limitations as a project grows. It does not address the need for a consistent
development environment across team members and into production. The added abstraction also
complicates the creation of a build pipeline for automated deployments. I faced these issues
building out a codebase during a fellowship at a young start-up where I was one of two front-end
developers. While there, I took the responsibility of managing front-end deployments and quickly
realized I lacked the knowledge to make it a frictionless process. Intent on filling this knowledge
gap, I began to explore Docker.

Docker is an open-source project that simplifies development by packaging software
into containers. Containers are a standardized unit of software based on the Linux kernel. They
package application source code with operating system libraries and dependencies that allow the
application to run the same in any environment. Docker did not invent containers, but they did help
simplify their use, making it the industry standard for application containerization. Their comprehensive
platform allows developers to speed up development, easily share code, and run applications securely.

### [Google Cloud Platform (GCP)](https://cloud.google.com/why-google-cloud)

Exploring Docker allowed me the flexibility to choose a cloud provider of my own. AWS provided a solid introduction
to cloud technologies; however, I wanted to expand my knowledge by exploring a new provider. Both Google and Microsoft
have done plenty to progress internet technologies and have made plenty of contributions to the open-source community.
Given that their services are more or less equal, it became a question of company values. I chose GCP because its upfront
about its sustainability goals and considers this commitment a feature worth mentioning.

### Front-end

#### [NextJs](https://nextjs.org/)

NextJS is my preferred React implementation because it's production-ready out the box. Some
of my favorite features include, but are not limited to, Typescript support, image optimization,
hybrid Static Site Generation / Server Side Rendering, and File-system Routing.

#### [Emotion CSS-in-JS](https://emotion.sh/docs/introduction)

I opted to use Emotion CSS-in-JS for its built-in theming API that allows for the straightforward
implementation of a style system. The encapsulation of styles to individual components makes them
easy to maintain. I've used TailwindCSS in the past, and though I like the concept of utility classnames,
I have found that the long classname strings make code challenging to format, read, and maintain.

### Back-end

#### [Golang](https://golang.org/)

I chose to learn Go because great minds in computer science, like Ken Thompson, Rob Pike,
and Robert Griesemer, designed it for modern, networked machines. Go is easy to learn and maintain
because it has simple, idiomatic solutions to common problems creating consistent use cases.
It's statically typed and has built-in features that simplify development over Node.js. For example,
the compiler doubles as a code linter and `go fmt` formats project code, eliminating the need to
choose and configure packages like ESlint and prettier.

#### [Mongodb](https://www.mongodb.com/)

MongoDB is a document database that uses JSON to describe data rather than tables (NoSQL). JSON is
an intuitive way to store and retrieve complex data that allows for a flexible schema. The
flexibility and simplicity of storing data in MongoDB make it my go-to database choice for personal
projects.

### Honorary Mentions

#### [GraphQL](https://www.apollographql.com/)

##### _Not used in this project_

I'm a big fan of GraphQL as the new paradigm of API development. I've used the Apollo GraphQL
platform in multiple projects and consider it one of my more advanced skills. I like that the
client-side implementation has built-in state management that's intuitive to use. It's also helpful
to have a single endpoint for back-end services as a project grows. However, this project has
a limited amount of endpoints and is straightforward enough to accomplish without it. Choosing to
omit GraphQL also allowed me to focus on learning the basics of Go without the added complexity on
the server.
