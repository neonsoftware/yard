
tmp := $(shell mktemp -d -t x)

all: yard_server

app: yard_server
	@echo folder is $(tmp)
	mkdir -p $(tmp)/static
	cp yard_server index.html package.json main.js $(tmp)
	cp -r ../front-end $(tmp)/static/yard
	cd $(tmp) && npm install
	electron-packager $(tmp) yard --overwrite --icon=icon.icns
	
yard_server: server.go
	go build -o yard_server server.go

test: yard_server
	cp test.bats yard_server $(tmp)
	cd $(tmp) && bats test.bats