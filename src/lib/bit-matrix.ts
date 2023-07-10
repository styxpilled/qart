interface Cell {
  reserved: boolean,
  value: boolean
}

export class BitMatrix {
  matrix: Cell[];
  size: number;

  constructor(size: number) {
    this.size = size;

    this.matrix = Array.from({ length: size * size });
    for (let i = 0; i < size * size; i++) {
      this.matrix[i] = {
        reserved: false,
        value: false
      }
    }
  }

  public set(row: number, col: number, value: boolean, reserved: boolean) {
    const index = row * this.size + col
    this.matrix[index].value = value
    if (reserved) this.matrix[index].reserved = true
  }

  public get(row: number, col: number) {
    return this.matrix[row * this.size + col]
  }

  public xor(row: number, col: number, value: boolean) {
    this.matrix[row * this.size + col].value = this.matrix[row * this.size + col].value !== value
  }

  public isReserved(row: number, col: number) {
    return this.matrix[row * this.size + col].reserved;
  }
}