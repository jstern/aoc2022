import { lines } from './util.js';

export function part1(input: string): string {
  let cur = 0;
  let max = 0;
  lines(input).forEach((l) => {
    if (l.length == 0) {
      if (max < cur) {
        max = cur;
      }
      cur = 0;
    } else {
      cur += parseInt(l, 10);
    }
  });
  return max.toString();
}

export function part2(input: string): string {
  const top3: Array<number> = [];
  let cur = 0;
  lines(input).forEach((l) => {
    if (l.length == 0) {
      // Time to keep the top 3 totals
      // Add our current total to the list.
      top3.push(cur);
      if (top3.length > 3) {
        // If we have more than 3, sort highest to lowest...
        top3.sort((a, b) => {
          return a > b ? -1 : a == b ? 0 : 1;
        });
        // and then drop the last (lowest) value.
        top3.pop();
      }
      cur = 0;
    } else {
      cur += parseInt(l, 10);
    }
  });
  return (top3[0] + top3[1] + top3[2]).toString();
}
