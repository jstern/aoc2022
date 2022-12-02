import { chars } from './util.js';

const N = '^';
const S = 'v';
const E = '>';
const W = '<';

type NSEW = typeof N | typeof S | typeof E | typeof W;

type Position = { x: number; y: number };

function label(p: Position): string {
  return `(${p.x},${p.y})`;
}

function next(p: Position, i: NSEW): Position {
  switch (i) {
    case N:
      return { x: p.x, y: p.y + 1 };
    case S:
      return { x: p.x, y: p.y - 1 };
    case E:
      return { x: p.x + 1, y: p.y };
    case W:
      return { x: p.x - 1, y: p.y };
  }
}

export function part1(input: string): string {
  let pos: Position = { x: 0, y: 0 };
  const visited: Set<string> = new Set<string>([label(pos)]);
  chars(input).forEach((c) => {
    pos = next(pos, c as NSEW);
    visited.add(label(pos));
  });
  return visited.size.toString();
}

export function part2(input: string): string {
  const instructions: Array<string> = chars(input);
  let spos: Position = { x: 0, y: 0 }; // santa
  let rpos: Position = { x: 0, y: 0 }; // robosanta
  const visited: Set<string> = new Set<string>([label(spos), label(rpos)]);
  for (let i = 0; i < instructions.length; i += 2) {
    spos = next(spos, instructions[i] as NSEW);
    rpos = next(rpos, instructions[i + 1] as NSEW);
    visited.add(label(spos));
    visited.add(label(rpos));
  }
  return visited.size.toString();
}
