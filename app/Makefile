
tmp := $(shell mktemp -d -t x)

all: yard_server
	@echo folder is $(tmp)
	
yard_server: server.go
	go build -o yard_server server.go

test: yard_server
	cp test.bats $(tmp) && cp yard_server $(tmp) && cd $(tmp) && bats test.bats