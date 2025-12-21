/**
 * Random utility functions for data generation
 * Provides seedable random number generation for reproducible results
 */

/**
 * Simple seedable pseudo-random number generator (Mulberry32)
 * Provides consistent results when seeded
 */
export class SeededRandom {
  private seed: number

  constructor(seed?: number) {
    this.seed = seed ?? Date.now()
  }

  /**
   * Generate a random number between 0 and 1
   */
  next(): number {
    let t = (this.seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  /**
   * Generate a random integer between min and max (inclusive)
   */
  int(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min
  }

  /**
   * Pick a random element from an array
   */
  pick<T>(array: T[]): T {
    if (array.length === 0) {
      throw new Error('Cannot pick from empty array')
    }
    return array[this.int(0, array.length - 1)]
  }

  /**
   * Pick multiple unique random elements from an array
   */
  pickMultiple<T>(array: T[], count: number): T[] {
    if (count > array.length) {
      throw new Error('Cannot pick more elements than array length')
    }
    const shuffled = [...array].sort(() => this.next() - 0.5)
    return shuffled.slice(0, count)
  }

  /**
   * Generate a random digit (0-9)
   */
  digit(): number {
    return this.int(0, 9)
  }

  /**
   * Generate a random letter (a-z)
   */
  letter(uppercase = false): string {
    const letter = String.fromCharCode(this.int(97, 122))
    return uppercase ? letter.toUpperCase() : letter
  }

  /**
   * Shuffle an array
   */
  shuffle<T>(array: T[]): T[] {
    const result = [...array]
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.int(0, i)
      ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
  }
}

/**
 * Default random instance (non-seeded, uses current time)
 */
export const random = new SeededRandom()

/**
 * Create a new seeded random instance
 */
export function createRandom(seed?: number): SeededRandom {
  return new SeededRandom(seed)
}

/**
 * Pick a random element from an array
 */
export function pickRandom<T>(array: T[]): T {
  return random.pick(array)
}

/**
 * Generate a random integer between min and max (inclusive)
 */
export function randomInt(min: number, max: number): number {
  return random.int(min, max)
}

/**
 * Generate a random digit (0-9)
 */
export function randomDigit(): number {
  return random.digit()
}
