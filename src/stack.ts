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

  push(val: Type): void {
    this.items.push(val);
  }

  pop(): Type {
    this.checkEmpty();
    return this.items.pop();
  }

  peek(): Type {
    this.checkEmpty();
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }

  empty(): boolean {
    return this.size() == 0;
  }
}
