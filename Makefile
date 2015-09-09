TESTS = test/*.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha $(TESTS) -R nyan

.PHONY: test
