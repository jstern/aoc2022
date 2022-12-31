import { lines } from './util.js';

export type dir = 'U' | 'D' | 'L' | 'R';

type pos = [number, number];

const moves = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
};

export type rope = { H: pos; T: pos };

function tracker(visited: Map<number, Map<number, boolean>>): (p: pos) => void {
  return function (p: pos): void {
    if (visited.has(p[0])) {
      visited.get(p[0]).set(p[1], true);
    } else {
      const y = new Map<number, boolean>();
      y.set(p[1], true);
      visited.set(p[0], y);
    }
  };
}

function dist(p1: pos, p2: pos): number {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

export function follow(t: pos, h: pos): pos {
  const d = dist(h, t);
  if (d <= Math.SQRT2) {
    return t;
  }

  const above = h[1] > t[1];
  const below = h[1] < t[1];
  const left = h[0] < t[0];
  const right = h[0] > t[0];

  let [tx, ty] = t;
  if (above) {
    ty += 1;
  }
  if (below) {
    ty -= 1;
  }
  if (left) {
    tx -= 1;
  }
  if (right) {
    tx += 1;
  }

  return [tx, ty];
}

export function move(
  rope: rope,
  dir: dir,
  n: number,
  track: (p: pos) => void,
): rope {
  let [hpos, tpos] = [rope.H, rope.T];
  track(tpos);
  const [dx, dy] = moves[dir];
  for (let i = n; i > 0; i--) {
    // console.log(hpos);
    hpos = [hpos[0] + dx, hpos[1] + dy];
    // console.log(' ->', hpos);
    // console.log('  ', tpos);
    tpos = follow(tpos, hpos);
    // console.log('  ->', tpos);
    track(tpos);
  }
  // console.log(hpos, tpos);
  return { H: hpos, T: tpos };
}

// const sample = `R 4
// U 4
// L 3
// D 1
// R 4
// D 1
// L 5
// R 2`;

export function part1(input: string): number {
  //console.log(input.substring(0,1));
  const visited = new Map<number, Map<number, boolean>>();
  const track = tracker(visited);
  let rope = { H: [0, 0], T: [0, 0] } as rope;
  lines(input).forEach((l) => {
    // console.log(l);
    rope = move(rope, l.charAt(0) as dir, parseInt(l.substring(2)), track);
  });
  // console.log(visited);
  let ct = 0;
  visited.forEach((v) => {
    ct += v.size;
  });
  return ct;
}

type rope2 = Array<pos>;

export function part2(input: string): number {
  let rope: rope2 = new Array<pos>(10).fill([0, 0] as pos) as rope2;
  const visited = new Map<number, Map<number, boolean>>();
  const track = tracker(visited);
  lines(input).forEach((l) => {
    const dir = l.charAt(0) as dir;
    const num = parseInt(l.substring(2));
    for (let i = 0; i < num; i++) {
      const nr = new Array<pos>();
      let h = rope[0];
      const [dx, dy] = moves[dir];
      nr.push([h[0] + dx, h[1] + dy]);
      for (let p = 1; p < 10; p++) {
        const t = rope[p];
        const nt = follow(t, h);
        nr.push(nt);
        h = nt;
      }
      rope = nr;
      track(rope[9]);
    }
    track(rope[9]);
  });
  console.log(visited);
  let ct = 0;
  visited.forEach((v) => {
    ct += v.size;
  });
  return ct;
}
