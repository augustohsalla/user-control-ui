.PHONY: build app api clean stop 
		
build:	
	@docker-compose build
	@yarn install

api: build
	@docker-compose up -d user-web-api

app: api 
	@yarn start

clean:
	@docker-compose down

stop:
	@docker-compose stop