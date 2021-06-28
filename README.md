# Rancid Tomatillos - YearOne Challenge

An application to search and rate movies using

## Requirements

- [Docker desktop](https://www.docker.com/products/docker-desktop) minimum version 3.4.0
- [GNU make](https://www.gnu.org/software/make/) - _optional_

## Commands

- **Build development containers**

```zsh
make dev_build

# Docker command equivalent

docker compose -f docker-compose.dev.yml build
```

- **Start development containers and output logs to current terminal window**

```zsh
# Start development processes -
# Hot Module Reloading in web container
# Live Reloading in api container

make dev_start

# Docker command equivalent
docker compose -f docker-compose.dev.yml up

# Use CTRL-C on terminal window to end running process
```

- **Build production containers**

```zsh
make build

# Docker command equivalent
docker compose build
```

- **Start production containers as daemon processes**

```zsh
make start

# Docker command equivalent
docker compose up -d
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
