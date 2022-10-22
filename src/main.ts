import axios from 'axios';
import fs from 'fs';

const [, , year, day, part] = process.argv;

const modname = `./y${year}d${day}.js`;
const funcname = `part${part}`;

import(modname).then((mod) => {
  fetchInput(year, day).then((res) => {
    console.log('Retrieved input.');
    console.time('Execution Time');
    console.log('Answer: ', mod[funcname](res));
    console.timeEnd('Execution Time');
  });
});

async function fetchInput(year: string, day: string): Promise<string> {
  try {
    const { data } = await axios.get(
      `https://adventofcode.com/${year}/day/${day}/input`,
      {
        headers: {
          Cookie: `session=${sessionCookie()}`,
        },
      },
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

function sessionCookie(): string {
  return fs.readFileSync('./.aoc-session').toString().trim();
}
