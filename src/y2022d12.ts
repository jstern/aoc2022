import { chars, lines } from "./util.js";

type heightMap = Map<string,number>;
type graph = Map<string,Set<string>>;
type problem = { start: string, end: string, map: heightMap, graph: graph };

function load(input: string): problem {
  let start: string, end: string;
  const map = new Map<string,number>();
  lines(input).forEach((l, y) => {
    chars(l).forEach((c, x) => {
      let h = c.toLowerCase().charCodeAt(0);
      const k = key(x, y);
      if (c == 'S') { start = k; h = 'a'.charCodeAt(0); }
      if (c == 'E') { end = k; h = 'z'.charCodeAt(0); }
      map.set(k, h);
    });
  });
  const graph = buildGraph(map);
  return { start, end, graph, map };
}

function key(x: number, y: number): string {
  return `${x},${y}`;
}

function buildGraph(map: heightMap): graph {
  const graph = new Map<string,Set<string>>();
  map.forEach((h, k) => {
    const neighbors = new Set<string>();
    const [x, y] = k.split(",").map(v => parseInt(v));
    [key(x, y+1), key(x, y-1), key(x+1, y), key(x-1, y)].forEach(nk => {
      const nh = map.get(nk);
      // if nk is in our height map and its height is no more than k's height + 1
      if (nh !== undefined && (nh - h <= 1)) {
        neighbors.add(nk);
      }
    });
    graph.set(k, neighbors);
  });
  return graph;
}

type path = { k: string, p: path | null };

function pathlen(v: path): number {
  if (v.p === null) { return 0; }
  return 1 + pathlen(v.p);
}

function shortestPath(g: graph, root: path, goal: string): path {
  const Q = new Array<path>();
  const E = new Set<string>();
  E.add(root.k);
  Q.push(root);
  while (!(Q.length == 0)) {
    const v = Q.shift();
    if (v.k === goal) {
      return v;
    }
    g.get(v.k).forEach(w => {
      if (!E.has(w)) {
        E.add(w);
        Q.push({k: w, p: v});
      }
    });
  }
  return null;
}

export function part1(input: string): number {
  const problem = load(input);
  const path = shortestPath(problem.graph, {k: problem.start, p: null}, problem.end);
  return pathlen(path);
}

export function part2(input: string): number {
  const problem = load(input);
  const minHeight = 'a'.charCodeAt(0);
  let shortest = Infinity;
  problem.map.forEach((height, k) => {
    if (height == minHeight) {
      const path = shortestPath(problem.graph, {k: k, p: null}, problem.end);
      if (path !== null) {
        shortest = Math.min(shortest, pathlen(path));
      }
    }
  });
  return shortest;
}
