import { lines } from "./util.js";

function process(instr: string, v: number): number[] {
  const [i, dv] = instr.split(" ");
  return i == "noop" ? [v] : [v, v + parseInt(dv)];
}

function processAll(input: string): number[] {
  let results = [1];
  lines(input).forEach(l => {
    results = results.concat(process(l, results.at(-1)));
  });
  return results;
}

export function part1(input: string): number {
  const results = processAll(input);
  let sum = 0;
  [20, 60, 100, 140, 180, 220].forEach(c => {
    sum += c * results[c - 1];
  });
  return sum;
}

export function part2(input: string): string {
  const results = processAll(input);
  let output = "\n";
  let px = 0;
  results.forEach((v, i) => {
    if ([px - 1, px, px + 1].includes(v)) { 
      output += "#";
    } else {
      output += ".";
    }

    if ((i + 1) % 40 == 0) {
      output += "\n"; 
      px = 0;
    } else {
      px = px + 1;
    }
  });
  return output;  // REHPRLUB
}
