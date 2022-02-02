build-docker:
	docker build -t antoinejaussoin/fivlet:local .

run: build-docker
	docker run -p 3000:80 antoinejaussoin/fivlet:local
