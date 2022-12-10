import { chars } from './util.js';

function updateWindow(size: number, window: string[], c: string): void {
  window.push(c);
  if (window.length > size) {
    window.shift();
  }
}

function startsSignal(size: number, window: string[]): boolean {
  return window.length == size && new Set(window).size == size;
}

function findStartOfSignal(size: number, msg: string): number {
  const window = new Array<string>();
  let i = 0;
  chars(msg).some((c) => {
    i += 1;
    updateWindow(size, window, c);
    return startsSignal(size, window);
  });
  return i;
}

export function part1(input: string): number {
  return findStartOfSignal(4, input);
}

export function part2(input: string): number {
  return findStartOfSignal(14, input);
}
