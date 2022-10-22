import { chars } from './util.js';

export function part1(input: string): string {
  let floor = 0;
  chars(input).forEach((c) => {
    if (c == '(') floor++;
    if (c == ')') floor--;
  });
  return floor.toString();
}
