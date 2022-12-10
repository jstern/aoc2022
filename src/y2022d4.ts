import { lines } from './util.js';

type range = [number, number];

function parseRange(desc: string): range {
  return desc.split('-').map((v) => parseInt(v)) as range;
}

function testContains(desc: string): boolean {
  const [r1, r2] = desc.split(',').map((v) => parseRange(v));
  return (
    (r1[0] <= r2[0] && r1[1] >= r2[1]) || (r2[0] <= r1[0] && r2[1] >= r1[1])
  );
}

export function part1(input: string): number {
  return lines(input)
    .map((l) => testContains(l))
    .filter((v) => v).length;
}

function testOverlaps(desc: string): boolean {
  const [r1, r2] = desc.split(',').map((v) => parseRange(v));
  return (
    (r1[1] >= r2[0] && r1[0] >= r2[0] && r1[0] <= r2[1]) ||
    (r2[1] >= r1[0] && r2[0] >= r1[0] && r2[0] <= r1[1])
  );
}

export function part2(input: string): number {
  return lines(input)
    .map((l) => testOverlaps(l))
    .filter((v) => v).length;
}
