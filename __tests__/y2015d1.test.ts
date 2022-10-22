import { part1 } from '../src/y2015d1.js';

describe('2015 day 1', () => {
  beforeAll(async () => {
    // Don't do anything
  });

  // Teardown (cleanup) after assertions
  afterAll(() => {
    // Don't do anything now either
  });

  it('returns the ending floor', () => {
    const input = '(()';
    expect(part1(input)).toEqual('1');
  });
});
