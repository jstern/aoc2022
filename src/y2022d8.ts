import { chars, lines } from "./util.js";

// [height, visibleDirections]
type tree = [number, number];
type forest = Array<Array<tree>>;

function visible(tree: tree): boolean {
  return tree[1] > 0;
}

/**
 * Checks height of tree against supplied height. 
 * 
 * @returns height to use for next check in same direction
 */
function surveyOne(tree: tree, height: number): number {
  if (tree[0] <= height) { 
    tree[1] -= 1;
    return height;
  }
  return tree[0];
}

function mapHeights(input: string): forest {
  const res = new Array<Array<tree>>();
  lines(input).forEach(l => {
    const row = new Array<tree>();
    res.push(row);
    chars(l).forEach(c => {
      row.push([parseInt(c), 4])
    });
  });
  return res;
}

function survey(forest: forest): void {
  const southEdge = forest.length;
  const eastEdge = forest[0].length;
  const maxHNorth = new Array<number>(eastEdge).fill(-1);
  const maxHSouth = new Array<number>(eastEdge).fill(-1);

  // scan north to south, west to east:
  for (let s = 0; s < southEdge; s++ ) {
    //console.log(s);
    let maxHWest = -1;
    for (let e = 0; e < eastEdge; e++) {
      const tree = forest[s][e];
      // compare north:
      //console.log(" before", e, tree, "N", maxHNorth[e], "W", maxHWest);
      maxHNorth[e] = surveyOne(tree, maxHNorth[e]);
      maxHWest = surveyOne(tree, maxHWest);
      //console.log(" after ", e, tree, "N", maxHNorth[e], "W", maxHWest);
    }
  }

  // scan south to north, east to west:
  for (let s = southEdge - 1; s >= 0; s--) {
    let maxHEast = -1;
    for (let e = eastEdge -1; e >= 0; e--) {
      const tree = forest[s][e];
      //console.log(" before", e, tree, "S", maxHSouth[e], "E", maxHEast);
      maxHSouth[e] = surveyOne(tree, maxHSouth[e]);
      maxHEast = surveyOne(tree, maxHEast);
      //console.log(" after ", e, tree, "S", maxHSouth[e], "E", maxHEast);
    }
  }
}

export function part1(input: string): number {
  const forest = mapHeights(input);
  survey(forest);
  let total = 0;
  forest.forEach(row => { total += row.map(visible).filter(v => v).length; });
  return total;
}

function survey2(forest: forest): number {
  let maxScore = 0;
  for (let s = 0; s < forest.length; s++) {
    for (let e = 0; e < forest[s].length; e++) {
      let score = 1;
      directions.forEach(d => {
        const v = view(forest, s, e, d as direction);
        //console.log(d, forest[s][e][0], v);
        score = score * v.length;
      });
      //console.log('---', s, e, score);
      maxScore = Math.max(score, maxScore);
    }
  }
  return maxScore;
}

type direction = 'N' | 'S' | 'E' | 'W';

const directions = ['N', 'S', 'E', 'W'];

function view(forest: forest, s: number, e: number, dir: direction): number[] {
  // stop if you reach an edge or at the first tree that is the same height or taller than the tree under consideration
  const res = new Array<number>();
  const chg = (dir == 'N' || dir == 'W') ? -1 : 1;
  const h = forest[s][e][0];

  if (dir == 'N' || dir == 'S') {
    for (let ps = s + chg; ps >= 0 && ps < forest.length; ps += chg) {
      const th = forest[ps][e][0];
      res.push(th);
      if (th >= h) { return res; }
    }
  } else {
    for (let pe = e + chg; pe >= 0 && pe < forest[0].length; pe += chg) {
      const th = forest[s][pe][0];
      res.push(th);
      if (th >= h) { return res; }
    }
  }
  return res;
}

export function part2(input: string): number {
  const forest = mapHeights(input);
  return survey2(forest);
}
