import { follow } from '../src/y2022d9.js';

describe('follow', () => {
  it('stays put if covered', () => {
    expect(follow([3, 4], [3, 4])).toEqual([3, 4]);
  });

  it('stays put if adjacent vertically', () => {
    expect(follow([3, 4], [3, 3])).toEqual([3, 4]);
    expect(follow([3, 4], [3, 5])).toEqual([3, 4]);
  });

  it('follows vertically', () => {
    expect(follow([3, 4], [3, 6])).toEqual([3, 5]);
    expect(follow([3, 4], [3, 2])).toEqual([3, 3]);
  });

  it('follows horizontally', () => {
    expect(follow([3, 4], [5, 4])).toEqual([4, 4]);
    expect(follow([3, 4], [1, 4])).toEqual([2, 4]);
  });

  it('follows diagonally', () => {
    expect(follow([0, 0], [1, 2])).toEqual([1, 1]);
    expect(follow([0, 0], [1, -2])).toEqual([1, -1]);
    expect(follow([3, 0], [4, 1])).toEqual([3, 0]);
    expect(follow([3, 0], [4, 2])).toEqual([4, 1]);
    expect(follow([4, 3], [5, 2])).toEqual([4, 3]);
  });
});
