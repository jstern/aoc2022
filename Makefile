test: lint
	npm run test

lint: format
	npm run lint

format:
	npm run prettier

run:
	npm run start -- $(year) $(day) $(part)

.PHONY: build
build:
	npm run build
