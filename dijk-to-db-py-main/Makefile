# Default .env file
ENV_FILE := .env

# Check for MODE and set the appropriate .env file
ifeq ($(ENV),development)
	ENV_FILE := .env.development
endif

# Include the chosen .env file
ifneq (,$(wildcard $(ENV_FILE)))
	include $(ENV_FILE)
	export
else
	$(error Environment file $(ENV_FILE) not found)
endif

up:
	docker compose up -d

down:
	docker compose down -v

postgres:
	docker run --name $(PG_CONTAINER_NAME) -p $(PG_PORT_MAPPING) -e POSTGRES_PASSWORD=$(PGPASSWORD) -e POSTGRES_USER=$(PGUSER) -d $(IMAGE)

createdb:
	docker exec -it $(PG_CONTAINER_NAME) createdb --username=$(PGUSER) --owner=$(PGUSER) $(PGDATABASE)

dropdb:
	docker exec -it $(PG_CONTAINER_NAME) dropdb $(PGDATABASE) -f --username=$(PGUSER)

run:
	@echo "Running in development mode..."
	@ENV=development  python3 main.py 

run-prod:
	@echo "Running in production mode..."
	@ENV=production python3 main.py 

start-prod:
	$(MAKE) migrate_down
	$(MAKE) migrate_up
	$(MAKE) run-prod

start-dev:
	$(MAKE) migrate_down
	$(MAKE) migrate_up
	$(MAKE) run


migrate_up:
	migrate -path ./database/migrations -database "$(DATABASE_URL)" -verbose up
	@echo "$(ENV_FILE)"

migrate_down:
	migrate -path ./database/migrations -database "$(DATABASE_URL)" -verbose down

restart_db:
	$(MAKE) migrate_down
	$(MAKE) migrate_up

shuv:
	git add .
	git commit -a
	git push

.PHONY: down, up, run, createdb, dropdb, migrate_up, migrate_down, restart_db, run-prod, start
