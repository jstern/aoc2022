import { chars } from './util.js';

const Up = '(';
const Dn = ')';
type Move = typeof Up | typeof Dn;

type State = {
  pos: number;
  flr: number;
};

function next(cur: State, mov: Move): State {
  if (mov == Up) {
    return { pos: cur.pos + 1, flr: cur.flr + 1 };
  }
  return { pos: cur.pos + 1, flr: cur.flr - 1 };
}

type ContinueCheck = (s: State) => boolean;

function NoStop(_: State): boolean {
  return true;
}

function process(input: string, check: ContinueCheck = NoStop): State {
  let state = { pos: 0, flr: 0 };
  chars(input).every((c) => {
    state = next(state, c as Move);
    return check(state);
  });
  return state;
}

export function part1(input: string): string {
  return process(input).flr.toString();
}

function NotInBasement(s: State): boolean {
  return s.flr >= 0;
}

export function part2(input: string): string {
  return process(input, NotInBasement).pos.toString();
}
