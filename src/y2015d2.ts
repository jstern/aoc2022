import { lines } from './util.js';

type Present = {
  l: number;
  w: number;
  h: number;
  sa: number;
  sp: number;
  cv: number;
};

function measurePresent(spec: string): Present {
  const lwh = spec.split('x').map((x) => parseInt(x));
  const sorted = [...lwh];
  sorted.sort((a: number, b: number) => {
    return a < b ? -1 : a == b ? 0 : 1;
  });

  return {
    l: lwh[0],
    w: lwh[1],
    h: lwh[2],
    sa: sorted[0] * sorted[1],
    sp: 2 * sorted[0] + 2 * sorted[1],
    cv: lwh[0] * lwh[1] * lwh[2],
  };
}

function paperNeeded(pres: Present): number {
  return (
    2 * pres.l * pres.w + 2 * pres.w * pres.h + 2 * pres.h * pres.l + pres.sa
  );
}

export function part1(input: string): string {
  let sqft = 0;
  lines(input)
    .map(measurePresent)
    .forEach((p) => {
      sqft += paperNeeded(p);
    });
  return sqft.toString();
}

function ribbonNeeded(pres: Present): number {
  return pres.sp + pres.cv;
}

export function part2(input: string): string {
  let lenRibbon = 0;
  lines(input)
    .map(measurePresent)
    .forEach((p) => {
      lenRibbon += ribbonNeeded(p);
    });
  return lenRibbon.toString();
}
