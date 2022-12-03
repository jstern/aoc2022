import { lines, chars } from './util.js';

/*
>>> import string
>>> vals = " | ".join([f"'{l}'" for l in string.ascii_letters])
>>> f"type Item = {vals};"
*/
type Item = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | 
            'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

function priority(c: Item): number {
    const code = c.charCodeAt(0);
    return c > 'Z' ? code - 96 : code - 38;
}

function sides(rucksack: string): Array<Array<Item>> {
    const items = chars(rucksack) as Item[];
    const leftEnd = items.length / 2;
    return [
        items.slice(0, leftEnd),
        items.slice(leftEnd),
    ];
}

function findCommon(left: Array<Item>, right: Array<Item>): Item {
    return left.find(item => { return right.includes(item); });
}

export function part1(input: string): string {
    let total = 0;
    lines(input).forEach(rucksack => {
        const [left, right] = sides(rucksack);
        const common = findCommon(left, right);
        total += priority(common);
    });
    return total.toString();
}

function allCommon(left: Array<Item>, right: Array<Item>): Array<Item> {
    return left.filter(item => { return right.includes(item); });
}

export function part2(input: string): string {
    let total = 0;
    const rucksacks = lines(input);
    for (let i = 0; i < rucksacks.length; i += 3) {
        // get a load of this cast of characters
        const common = findCommon(
            allCommon(chars(rucksacks[i]) as Item[], chars(rucksacks[i+1]) as Item[]), 
            chars(rucksacks[i+2]) as Item[]
        );
        total += priority(common);
    }
    return total.toString();
}
