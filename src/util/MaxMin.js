export class MaxMin {
  MAX = Number.MIN_SAFE_INTEGER
  MIN = Number.MAX_SAFE_INTEGER

  max(v) {
    if (v > this.MAX) this.MAX = v
  }

  min(v) {
    if (v < this.MIN) this.MIN = v
  }

  all(v) {
    this.max(v)
    this.min(v)
  }

  mm() {
    return {
      max: this.MAX,
      min: this.MIN
    }
  }
}
