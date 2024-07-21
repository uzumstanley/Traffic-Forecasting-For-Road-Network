# Default .env file
ENV_FILE := config.env

# Check for MODE and set the appropriate .env file
ifeq ($(ENV),development)
	ENV_FILE := devconfig.env
endif

# Include the chosen .env file
ifneq (,$(wildcard $(ENV_FILE)))
	include $(ENV_FILE)
	export
else
	$(error Environment file $(ENV_FILE) not found)
endif

up:
	docker compose up

down:
	docker compose down -v

server:
	@echo "Starting server in development mode..."
	@echo $(ENV_FILE)
	ENV=development  go run main.go

server-prod:
	@echo "Starting server in production mode..."
	@echo $(ENV_FILE)
	ENV=production go run main.go

postgres:
	 docker run --name $(PG_CONTAINER_NAME) -p $(PG_PORT_MAPPING) -e POSTGRES_PASSWORD=$(PGPASSWORD) -e POSTGRES_USER=$(PGUSER) -d $(IMAGE)

createdb:
	 docker exec -it $(PG_CONTAINER_NAME) createdb --username=$(PGUSER) --owner=$(PGUSER) $(PGDATABASE)

dropdb:
	 docker exec -it $(PG_CONTAINER_NAME) dropdb $(PGDATABASE) -f --username=$(PGUSER)

migrate:
	cd ./geojson-graph/ && python3 main.py && cd ..

migrate_up:
	migrate -path ./db/migrations -database "$(DATABASE_URL)" -verbose up

migrate_down:
	migrate -path ./db/migrations -database "$(DATABASE_URL)" -verbose down

restart_db:
	$(MAKE) migrate_down
	$(MAKE) migrate_up

docker_build:
	docker build -t routing-app:latest .


shuv:
	git add .
	git commit -a
	git push

generate:
	sqlc generate


.PHONY: down, up, up-prod, server, createdb, dropdb, migrate_up, migrate_down, restart_db, server-container, server-prod
