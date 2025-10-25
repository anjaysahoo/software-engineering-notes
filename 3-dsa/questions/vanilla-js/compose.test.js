import { describe, expect, test } from "vitest";
import { compose, mul, div, sub, sum } from './compose';

describe('compose', () => {
  test('basic composition of four functions', () => {
    const result = compose(sum, sub, div, mul)(4, 3);
    expect(result).toBe(8);
  });

  test('dry run steps', () => {
    // Test each step individually
    expect(mul(4, 3)).toBe(12);
    expect(div(12)).toBe(6);
    expect(sub(6)).toBe(3);
    expect(sum(3)).toBe(8);
  });

  test('single function composition', () => {
    const result = compose(sum)(5);
    expect(result).toBe(10);
  });

  test('two function composition', () => {
    const result = compose(sum, sub)(10);
    expect(result).toBe(12); // (10 - 3) + 5
  });

  test('composition with different argument counts', () => {
    const add = (a, b) => a + b;
    const double = x => x * 2;
    const result = compose(double, add)(3, 4);
    expect(result).toBe(14); // (3 + 4) * 2
  });

  test('empty composition', () => {
    const result = compose()('anything');
    expect(result).toBe('anything');
  });
}); 