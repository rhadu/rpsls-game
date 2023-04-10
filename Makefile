#!/usr/bin/make -f

build:
	@echo "Spin up RPSLS containers"
	docker-compose up -d --build --remove-orphans

clean:
	@echo "Cleaning RPSLS project"
	docker-compose down
	docker rmi rpsls-game-server rpsls-game-client	

start:
	@echo "Start RPSLS"
	docker-compose up -d

stop:
	@echo "Stop RPSLS"
	docker-compose stop
