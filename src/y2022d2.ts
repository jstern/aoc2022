import { lines } from './util.js';

const delimiter = ' ';

const [againstRock, againstPaper, againstScissor] = ['A', 'B', 'C'];
const [playRock, playPaper, playScissor] = ['X', 'Y', 'Z'];
const [win, lose, draw] = ['Z', 'X', 'Y'];

const reactions = {
  [win]: {
    [againstRock]: playPaper,
    [againstPaper]: playScissor,
    [againstScissor]: playRock,
  },
  [lose]: {
    [againstRock]: playScissor,
    [againstPaper]: playRock,
    [againstScissor]: playPaper,
  },
  [draw]: {
    [againstRock]: playRock,
    [againstPaper]: playPaper,
    [againstScissor]: playScissor,
  },
};

const shapeScores = { [playRock]: 1, [playPaper]: 2, [playScissor]: 3 };

const outcomeScores = {
  [againstRock]: {
    [playRock]: 3,
    [playPaper]: 6,
    [playScissor]: 0,
  },
  [againstPaper]: {
    [playRock]: 0,
    [playPaper]: 3,
    [playScissor]: 6,
  },
  [againstScissor]: {
    [playRock]: 6,
    [playPaper]: 0,
    [playScissor]: 3,
  },
};

function score(round: string[]): number {
  return shapeScores[round[1]] + outcomeScores[round[0]][round[1]];
}

export function part1(input: string): string {
  let total = 0;
  lines(input).forEach((line) => {
    total += score(line.split(delimiter));
  });
  return total.toString();
}

function reaction(round: string[]): string[] {
  return [round[0], reactions[round[1]][round[0]]];
}

export function part2(input: string): string {
  let total = 0;
  lines(input).forEach((line) => {
    total += score(reaction(line.split(delimiter)));
  });
  return total.toString();
}
