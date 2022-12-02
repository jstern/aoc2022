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
      top3.push(cur);
      top3.sort();
      if (top3.length > 3) {
        top3.shift();
      }
      cur = 0;
    } else {
      cur += parseInt(l, 10);
    }
  });
  return (top3[0] + top3[1] + top3[2]).toString();
}
