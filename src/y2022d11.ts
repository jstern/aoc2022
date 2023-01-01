import { lines } from "./util.js";

export class Monkey {
  items: number[];
  itemOp: (item: number) => number;
  itemTest: number;
  trueTarget: number;
  falseTarget: number;
  inspected: number;
  postInspect: (v: number) => number;

  constructor(lst: string, opspec: string, testspec: string, ontrue: string, onfalse: string) {
    this.inspected = 0;
    this.items = lst.split("Starting items: ").at(-1).split(", ").map(x => parseInt(x));
    this.trueTarget = parseInt(ontrue.split("If true: throw to monkey ").at(-1));
    this.falseTarget = parseInt(onfalse.split("If false: throw to monkey ").at(-1));
    
    // only dealing with patterns seen in input: old + N, old * N, old * old
    const [op, arg2] = opspec.split("Operation: new = old ").at(-1).split(" ");
    if (op == "*" && arg2 == "old") { 
      this.itemOp = (v) => { return v * v; }
    } else if (op == "*") { 
      this.itemOp = (v) => { return v * parseInt(arg2); }
    } else if (op == "+") {
      this.itemOp = (v) => { return v + parseInt(arg2); }
    }

    this.itemTest = parseInt(testspec.split("Test: divisible by ").at(-1));

    this.postInspect = (v) => { return Math.floor(v / 3); };
  }

  takeTurn(monkeys: Monkey[]): void {
    for (let i = 0; i < this.items.length; i++) {
      let v = this.items[i];
      //console.log("Monkey inspects an item with worry level", v);
      v = this.itemOp(v);
      //console.log("Worry level rises to", v);
      v = this.postInspect(v);
      //console.log("Worry level fades to", v);
      let t: number;
      if (v % this.itemTest == 0) {
        t = this.trueTarget;
        //console.log("Divisible by", this.itemTest, "throwing to", t);
      } else {
        t = this.falseTarget;
        //console.log("Not divisible by", this.itemTest, "throwing to", t);
      }
      monkeys.at(t).catch(v);
      this.inspected++;
    }
    this.items = new Array<number>();
  }

  catch(item: number): void {
    this.items.push(item);
  }
}

function parseMonkeys(input: string): Array<Monkey> {
  const monkeys = new Array<Monkey>();
  let is = new Array<string>();
  lines(input).forEach(l => {
    const line = l.trim();
    if (line.length == 0) {
      monkeys.push(new Monkey(is[0], is[1], is[2], is[3], is[4]));
      is = new Array<string>();
    } else if (!line.startsWith("Monkey")) {
      is.push(line);
    }
  });
  monkeys.push(new Monkey(is[0], is[1], is[2], is[3], is[4]));
  return monkeys;
}

function run(rounds: number, monkeys: Array<Monkey>): void {
  for (let i = 0; i < rounds; i++) {
    //console.log("=========", i);
    monkeys.forEach((m /*, i*/) => {
      //console.log('-------', i);
      m.takeTurn(monkeys);
    });
  }
}

function answer(monkeys: Array<Monkey>): number {
  const counts = new Array<number>();
  monkeys.forEach(m => counts.push(m.inspected));
  counts.sort((a, b) => b - a);
  return counts.at(0) * counts.at(1);
}

export function part1(input: string): number {
  const monkeys = parseMonkeys(input);
  run(20, monkeys);
  //console.log(monkeys);
  return answer(monkeys);
}

function gcd(a: number, b: number): number {
  if (b == 0) { return a; }
  return gcd(b, a % b);
}

function lcm(monkeys: Array<Monkey>): number {
  const mods = monkeys.map(m => m.itemTest);
  let result = mods[0];
  for (let i = 1; i < mods.length; i++) {
    (result = ((mods[i] * result)) / gcd(mods[i], result));
  }
  return result;
}

export function part2(input: string): number {
  // based entirely on the insight of smarter people than me
  const monkeys = parseMonkeys(input);
  const mod = lcm(monkeys); // apparently just any common multiple is fine
  monkeys.forEach(m => {
    // change the divide by 3 step to leave worry level untouched
    m.postInspect = (v => v); // sure, could be in constructor :)

    // change the item operation to be mod the common multiple
    // (this doesn't need to be changed, could have made part 1 work this way as well)
    const op = m.itemOp;
    m.itemOp = function(v: number): number {
      return op(v) % mod;
    }
  }); 

  run(10_000, monkeys);
  return answer(monkeys);
}
