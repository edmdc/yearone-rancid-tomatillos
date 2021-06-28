.PHONY: dev_build
dev_build:
	docker compose -f docker-compose.dev.yml build

.PHONY: dev_start
dev_start:
	docker compose -f docker-compose.dev.yml up

.PHONY: build
build:
	docker compose build

.PHONY: start
start:
	docker compose up -d

.PHONY: end
end:
	docker compose down

.PHONY: clean
clean:
	docker builder prune
