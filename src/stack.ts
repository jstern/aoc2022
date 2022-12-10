export class EmptyStackError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export class Stack<Type> {
  private items: Array<Type>;

  constructor() {
    this.items = new Array<Type>();
  }

  private checkEmpty(): void {
    if (this.empty()) {
      throw new EmptyStackError('Stack is empty.');
    }
  }

  push(val: Type | Type[]): void {
    if (val instanceof Array<Type>) {
      this.items = this.items.concat(val);
    } else {
      this.items.push(val);
    }
  }

  pop(): Type {
    this.checkEmpty();
    return this.items.pop();
  }

  peek(): Type | null {
    if (this.empty()) return null;
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }

  empty(): boolean {
    return this.size() == 0;
  }

  popN(n: number): Type[] {
    const pivot = this.items.length - n;
    const result = this.items.slice(pivot);
    this.items = this.items.slice(0, pivot);
    return result;
  }
}
