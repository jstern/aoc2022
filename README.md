# aoc2022

[![Build Status - GitHub Actions][gha-badge]][gha-ci]

Solution attempts for https://adventofcode.com/2022 using TypeScript because I don't know TypeScript so good.

Built using https://github.com/jsynowiec/node-typescript-boilerplate as a template (see [original](./original/README.md)).

* `make test` runs the tests and stuff
* `make [build] run year=<year> day=<day> part=<part>` (builds and) fetches input and runs the code for that year/day/part.
  * You'll need the value of a valid adventofcode.com `session` cookie in a file called `.aoc-session` in the root directory of this project.
