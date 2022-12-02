import { Md5 } from 'ts-md5';

function firstPrefix(input: string, prefix: string): string {
  for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
    if (Md5.hashStr(`${input}${i}`).startsWith(prefix)) {
      return i.toString();
    }
  }
  return 'Not found you brute!';
}

export function part1(input: string): string {
  return firstPrefix(input.trim(), '00000');
}

export function part2(input: string): string {
  return firstPrefix(input.trim(), '000000');
}
