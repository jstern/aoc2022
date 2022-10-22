export function lines(input: string): Array<string> {
  return input.trim().split('\n');
}

export function chars(input: string): Array<string> {
  return input.trim().split('');
}
