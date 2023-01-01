import { lines } from "./util.js";

export class Monkey {
  items: number[];
  itemOp: (item: number) => number;
  itemTest: number;
  trueTarget: number;
  falseTarget: number;
  inspected: number;

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
  }

  takeTurn(monkeys: Monkey[]): void {
    for (let i = 0; i < this.items.length; i++) {
      let v = this.items[i];
      console.log("Monkey inspects an item with worry level", v);
      v = this.itemOp(v);
      console.log("Worry level rises to", v);
      v = Math.floor(v / 3);
      console.log("Worry level fades to", v);
      let t: number;
      if (v % this.itemTest == 0) {
        t = this.trueTarget;
        console.log("Divisible by", this.itemTest, "throwing to", t);
      } else {
        t = this.falseTarget;
        console.log("Not divisible by", this.itemTest, "throwing to", t);
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

export function part1(input: string): number {
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
  for (let i = 0; i < 20; i++) {
    console.log("=========", i);
    monkeys.forEach((m, i) => {
      console.log('-------', i);
      m.takeTurn(monkeys);
    });
  }
  console.log(monkeys);
  const counts = new Array<number>();
  monkeys.forEach(m => counts.push(m.inspected));
  counts.sort((a, b) => b - a);
  return counts.at(0) * counts.at(1); // 686 too low
}

export function part2(input: string): string {
  return input;
}
