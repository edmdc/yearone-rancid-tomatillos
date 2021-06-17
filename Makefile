dev_build:
	docker compose -f docker-compose.dev.yml build
dev_start:
	docker compose -f docker-compose.dev.yml up -d
build:
	docker compose build
start:
	docker compose up -d
end:
	docker compose down
