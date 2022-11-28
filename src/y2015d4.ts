import { Md5 } from "ts-md5";

export function part1(input: string): string {
  input = input.trim();
  for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++ ) {
    //console.log(`${input}${i}`, Md5.hashAsciiStr(`${input}${i}`));
    if (Md5.hashStr(`${input}${i}`).startsWith('00000')) {
      console.log(`${input}${i}`);
      return i.toString();
    }
  }
  return "Not found you brute!";
  // 3255144 too high
  // you didn't trim your input!
}

export function part2(input: string): string {
  input = input.trim();
  for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++ ) {
    //console.log(`${input}${i}`, Md5.hashAsciiStr(`${input}${i}`));
    if (Md5.hashStr(`${input}${i}`).startsWith('000000')) {
      console.log(`${input}${i}`);
      return i.toString();
    }
  }
  return "Not found you brute!";
}
