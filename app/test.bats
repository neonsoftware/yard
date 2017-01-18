BLOCK='{"id":"","tags":"aa","legend":"bb","language":"cc","content":"dd"}'
BLOCK_NEW='{"id":"","tags":"zz","legend":"bb","language":"cc","content":"dd"}'
CATEGORY='{"id":"","tags":"aa","legend":"bb","language":"cc","pieces":"dd","description":"dd"}'
CATEGORY_NEW='{"id":"","tags":"aa","legend":"bb","language":"cc","pieces":"dd","description":"zz"}'
COVER='{"id":"","name":"aa","content":"bb"}'
COVER_NEW='{"id":"","name":"aa","content":"bb"}'
APPLICATION='{"id":"","portal":"aa","portal_link":"","company":"","company_link":"","position":"","position_link":"","salary":"","contract":"","latitude":"","longitude":"","skills":"","written":false,"called":false,"interviewed":false,"followup":false,"notes":"","next":"","content":"","address1":"","address2":"","c1name":"","c1mail":"","c1phone":"","c2name":"","c2mail":"","c2phone":"","c3name":"","c3mail":"","c3phone":"","c4name":"","c4mail":"","c4phone":""}'
APPLICATION_NEW='{"id":"","portal":"zz","portal_link":"","company":"","company_link":"","position":"","position_link":"","salary":"","contract":"","latitude":"","longitude":"","skills":"","written":false,"called":false,"interviewed":false,"followup":false,"notes":"","next":"","content":"","address1":"","address2":"","c1name":"","c1mail":"","c1phone":"","c2name":"","c2mail":"","c2phone":"","c3name":"","c3mail":"","c3phone":"","c4name":"","c4mail":"","c4phone":""}'

@test "starting server in background" {
	./yard_server &
}

@test "checking server is started" {
	sleep 2
	pgrep -x yard_server
}

# blocks

@test "block GET - empty" {
	curl -X GET :8082/pieces | python -c 'import sys, json; assert( len(json.load(sys.stdin)) == 0 )'
}

@test "block POST" {
	curl -X POST -vv --data-ascii $BLOCK :8082/pieces | python -c 'import sys, json; assert( json.load(sys.stdin)["id"] != "" )'
}

@test "block GET - increased" {
	curl -X GET :8082/pieces | python -c 'import sys, json; assert( len(json.load(sys.stdin)) == 1 )'
}

@test "block detail - GET and PUT " {
	curl -X GET :8082/pieces/$(curl -X GET :8082/pieces | python -c 'import sys, json; print(json.load(sys.stdin)[0]["id"])') | python -c 'import sys, json; json.load(sys.stdin)["tags"] == "aa"'
	curl -X PUT :8082/pieces/$(curl -X GET :8082/pieces | python -c 'import sys, json; print(json.load(sys.stdin)[0]["id"])') --data-ascii $BLOCK_NEW
	curl -X GET :8082/pieces/$(curl -X GET :8082/pieces | python -c 'import sys, json; print(json.load(sys.stdin)[0]["id"])') | python -c 'import sys, json; json.load(sys.stdin)["tags"] == "zz"'
}

# Category

@test "categories GET - empty" {
	curl -X GET :8082/categories | python -c 'import sys, json; assert( len(json.load(sys.stdin)) == 0 )'
}

@test "categories POST" {
	curl -X POST -vv --data-ascii $CATEGORY :8082/categories | python -c 'import sys, json; assert( json.load(sys.stdin)["id"] != "" )'
}

@test "categories GET - increased" {
	curl -X GET :8082/categories | python -c 'import sys, json; assert( len(json.load(sys.stdin)) == 1 )'
}

@test "categories detail - GET and PUT " {
	curl -X GET :8082/categories/$(curl -X GET :8082/categories | python -c 'import sys, json; print(json.load(sys.stdin)[0]["id"])') | python -c 'import sys, json; json.load(sys.stdin)["description"] == "dd"'
	curl -X PUT :8082/categories/$(curl -X GET :8082/categories | python -c 'import sys, json; print(json.load(sys.stdin)[0]["id"])') --data-ascii $CATEGORY_NEW
	curl -X GET :8082/categories/$(curl -X GET :8082/categories | python -c 'import sys, json; print(json.load(sys.stdin)[0]["id"])') | python -c 'import sys, json; json.load(sys.stdin)["description"] == "zz"'
}


# Covers

@test "covers GET - empty" {
	curl -X GET :8082/covers | python -c 'import sys, json; assert( len(json.load(sys.stdin)) == 0 )'
}

@test "covers POST" {
	curl -X POST -vv --data-ascii $COVER :8082/covers | python -c 'import sys, json; assert( json.load(sys.stdin)["id"] != "" )'
}

@test "covers GET - increased" {
	curl -X GET :8082/covers | python -c 'import sys, json; assert( len(json.load(sys.stdin)) == 1 )'
}

@test "covers detail - GET and PUT " {
	curl -X GET :8082/covers/$(curl -X GET :8082/covers | python -c 'import sys, json; print(json.load(sys.stdin)[0]["id"])') | python -c 'import sys, json; json.load(sys.stdin)["content"] == "bb"'
	curl -X PUT :8082/covers/$(curl -X GET :8082/covers | python -c 'import sys, json; print(json.load(sys.stdin)[0]["id"])') --data-ascii $COVER_NEW
	curl -X GET :8082/covers/$(curl -X GET :8082/covers | python -c 'import sys, json; print(json.load(sys.stdin)[0]["id"])') | python -c 'import sys, json; json.load(sys.stdin)["content"] == "zz"'
}

# Applications

@test "applications GET - empty" {
	curl -X GET :8082/applications | python -c 'import sys, json; assert( len(json.load(sys.stdin)) == 0 )'
}

@test "applications POST" {
	curl -X POST -vv --data-ascii $APPLICATION :8082/applications | python -c 'import sys, json; assert( json.load(sys.stdin)["id"] != "" )'
}

@test "applications GET - increased" {
	curl -X GET :8082/applications | python -c 'import sys, json; assert( len(json.load(sys.stdin)) == 1 )'
}

@test "applications detail - GET and PUT " {
	curl -X GET :8082/applications/$(curl -X GET :8082/applications | python -c 'import sys, json; print(json.load(sys.stdin)[0]["id"])') | python -c 'import sys, json; json.load(sys.stdin)["portal"] == "aa"'
	curl -X PUT :8082/applications/$(curl -X GET :8082/applications | python -c 'import sys, json; print(json.load(sys.stdin)[0]["id"])') --data-ascii $APPLICATION_NEW
	curl -X GET :8082/applications/$(curl -X GET :8082/applications | python -c 'import sys, json; print(json.load(sys.stdin)[0]["id"])') | python -c 'import sys, json; json.load(sys.stdin)["portal"] == "zz"'
}


@test "shutting down server" {
	killall yard_server
}

@test "checking server is down" {
	sleep 2
	! pgrep -x yard_server
}