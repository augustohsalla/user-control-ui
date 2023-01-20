.PHONY: build app clean stop 
		
build:	
	@docker-compose build

app: build 
	@docker-compose up -d user-web-ui

api: app
	@docker-compose up -d user-web-api

clean:
	@docker-compose down

stop:
	@docker-compose stop