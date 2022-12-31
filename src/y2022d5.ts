import { Stack } from './stack.js';

const moveRE = new RegExp(`move ([0-9]+) from ([0-9]+) to ([0-9]+)`);

export function layer(instr: string): Map<string, string> {
  const result = new Map<string, string>();
  let n = 1;
  for (let i = 1; ; i += 4) {
    const c = instr.charAt(i);
    if (c == '') {
      break;
    }
    if (!'[ ]'.includes(c)) {
      result.set(n + '', c);
    }
    n++;
  }
  return result;
}

export function stackEmUp(
  layers: Stack<Map<string, string>>,
  stacks: Map<string, Stack<string>>,
): void {
  while (!layers.empty()) {
    const layer = layers.pop();
    layer.forEach(function addToStack(v, k) {
      if (!stacks.has(k)) {
        stacks.set(k, new Stack<string>());
      }
      stacks.get(k).push(v);
    });
  }
}

type MoveFn = (stacks: Map<string, Stack<string>>, instr: string) => void;

export function moveEmAround9000(
  stacks: Map<string, Stack<string>>,
  instr: string,
): void {
  const [_, cnt, src, dst] = instr.match(moveRE);
  const count = parseInt(cnt);
  const source = stacks.get(src);
  const dest = stacks.get(dst);
  for (let i = 0; i < count; i++) {
    if (source.empty()) {
      break;
    }
    dest.push(source.pop());
  }
}

export function run(input: string, moveFn: MoveFn): string {
  const layers = new Stack<Map<string, string>>();
  const stacks = new Map<string, Stack<string>>();

  input.split('\n').forEach((l) => {
    if (l.startsWith('move ')) {
      moveFn(stacks, l);
    } else if (l.startsWith(' 1 ')) {
      stackEmUp(layers, stacks);
    } else if (l.trim().length > 0) {
      layers.push(layer(l));
    }
  });

  const top = new Array<string>();
  stacks.forEach((s) => {
    top.push(s.peek());
  });
  return top.join('');
}

export function part1(input: string): string {
  return run(input, moveEmAround9000);
}

export function moveEmAround9001(
  stacks: Map<string, Stack<string>>,
  instr: string,
): void {
  const [_, cnt, src, dst] = instr.match(moveRE);
  const count = parseInt(cnt);
  const source = stacks.get(src);
  const dest = stacks.get(dst);
  dest.push(source.popN(count));
}

export function part2(input: string): string {
  return run(input, moveEmAround9001);
}
