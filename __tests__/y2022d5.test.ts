import {
  layer,
  stackEmUp,
  moveEmAround9000,
  moveEmAround9001,
  run,
} from '../src/y2022d5.js';
import { Stack } from '../src/stack.js';

describe('moveEmAround', () => {
  it('moves em around', () => {
    const stacks = new Map<string, Stack<string>>();
    stacks.set('1', new Stack<string>());
    stacks.set('2', new Stack<string>());
    stacks.get('1').push('X');
    stacks.get('2').push('Y');

    moveEmAround9000(stacks, 'move 1 from 1 to 2');
    expect(stacks.get('1').empty()).toBe(true);
    expect(stacks.get('2').peek()).toEqual('X');

    moveEmAround9000(stacks, 'move 3 from 2 to 1');
    expect(stacks.get('2').empty()).toBe(true);
    expect(stacks.get('1').pop()).toEqual('Y');
    expect(stacks.get('1').peek()).toEqual('X');
  });
});

describe('layer', () => {
  it('reads a layer', () => {
    const instr = '[X]     [Z]';
    const expected = new Map<string, string>();
    expected.set('1', 'X');
    expected.set('3', 'Z');
    expect(layer(instr)).toEqual(expected);
  });
});

describe('stackEmUp', () => {
  it('stacks em up', () => {
    const expected = new Map<string, Stack<string>>();
    expected.set('1', new Stack<string>());
    expected.set('2', new Stack<string>());
    expected.set('3', new Stack<string>());
    expected.get('1').push('A');
    expected.get('1').push('X');
    expected.get('2').push('B');
    expected.get('3').push('C');
    expected.get('3').push('Z');

    const layers = new Stack<Map<string, string>>();
    const stacks = new Map<string, Stack<string>>();
    layers.push(layer('[X]     [Z]'));
    layers.push(layer('[A] [B] [C]'));
    stackEmUp(layers, stacks);
    expect(stacks).toEqual(expected);
  });
});

const p1Input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

describe('part1', () => {
  it('works like the example', () => {
    const result = run(p1Input, moveEmAround9000);
    expect(result).toEqual('CMZ');
  });
});

describe('part2', () => {
  it('works like the example', () => {
    const result = run(p1Input, moveEmAround9001);
    expect(result).toEqual('MCD');
  });
});
