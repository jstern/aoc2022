test: lint
	npm run test

lint: format
	npm run lint

format:
	npm run prettier

run:
	npm run start -- $(year) $(day) $(part)

new:
	[ ! -f src/y$(year)d$(day).ts ] && cp src/yNdN.ts src/y$(year)d$(day).ts

.PHONY: build
build:
	npm run build
