.PHONY: dev
dev:
	docker compose up --build -d

.PHONY: end
end:
	docker compose down

.PHONY: clean
clean:
	docker builder prune
