import { lines } from './util.js';

type file = { name: string; size: number };
type dir = { name: string; contents: Map<string, node>; size: number | null };
type node = file | dir;

type session = { path: string; nodes: Map<string, node> };

function pathAt(path: string, name: string): string {
  const pre = path == '/' ? '' : '/';
  return `${path}${pre}${name}`;
}

function cd(session: session, dest: string) {
  if (dest == '..') {
    if (session.path != '/') {
      session.path = session.path.slice(0, session.path.lastIndexOf('/'));
      if (session.path == '') {
        session.path = '/';
      }
    }
  } else if (dest.startsWith('/')) {
    session.path = dest;
  } else {
    session.path = pathAt(session.path, dest);
  }
}

function cwd(session: session): dir {
  return session.nodes.get(session.path) as dir;
}

function size(node: file | dir): number {
  if ('contents' in node) {
    if (node.size === null) {
      let s = 0;
      node.contents.forEach((v) => {
        s += size(v);
      });
      node.size = s;
    }
  }
  return node.size;
}

function processScript(session: session, input: string): void {
  lines(input).forEach((l) => {
    const parsed = l.split(' ');
    if (parsed[0] == '$') {
      //console.log(`[${session.path}] ${l}`);
      const cmd = parsed[1];
      if (cmd == 'cd') {
        cd(session, parsed[2]);
      }
    } else if (parsed[0] == 'dir') {
      //console.log(l);
      const name = parsed[1];
      const cur = { name: name, contents: new Map<string, node>(), size: null };
      session.nodes.set(pathAt(session.path, name), cur);
      cwd(session).contents.set(name, cur);
    } else {
      //console.log(l);
      const name = parsed[1];
      const size = parseInt(parsed[0]);
      const cur = { name, size };
      session.nodes.set(pathAt(session.path, name), cur);
      cwd(session).contents.set(name, cur);
    }
  });
}

export function part1(input: string): number {
  const root = { name: '/', contents: new Map<string, node>(), size: null };
  const session = { path: '/', nodes: new Map<string, node>() };
  session.nodes.set(session.path, root);
  processScript(session, input);

  let total = 0;
  session.nodes.forEach((n) => {
    if ('contents' in n && size(n) <= 100000) {
      total += size(n);
    }
  });
  return total;
}

export function part2(input: string): number {
  const root = { name: '/', contents: new Map<string, node>(), size: null };
  const session = { path: '/', nodes: new Map<string, node>() };
  session.nodes.set(session.path, root);
  processScript(session, input);

  const total = 70000000;
  const needed = 30000000;
  const unused = total - size(root);
  let candidate = total;
  session.nodes.forEach((n) => {
    const s = size(n);
    if (candidate > s && unused + s >= needed) {
      candidate = s;
    }
  });
  return candidate;
}
