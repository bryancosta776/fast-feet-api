import { randomUUID } from "node:crypto";

export class UniqueEntityID {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  equals(id: UniqueEntityID): unknown {
    throw new Error("Method not implemented.");
  }

  isEqualTo(other: UniqueEntityID | string): boolean {
    if (typeof other === 'string') {
      return this.value === other;
    }
    if (other instanceof UniqueEntityID) {
      return this.value === other.value;
    }
    return false;
  }

  private value: string;

  toString() {
    return this.value;
  }

  toValue() {
    return this.value;
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }
}
