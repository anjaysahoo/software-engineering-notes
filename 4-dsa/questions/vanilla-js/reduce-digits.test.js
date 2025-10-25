import { describe, expect, test } from "vitest";
import { reduceDigits } from './reduce-digits';

describe('reduceDigits', () => {
  test('basic case with multiple repeating digits', () => {
    expect(reduceDigits("7122224555431")).toBe("7131");
  });

  test('single digit', () => {
    expect(reduceDigits("1")).toBe("1");
  });

  test('no repeating digits', () => {
    expect(reduceDigits("123456")).toBe("123456");
  });

  test('all same digits', () => {
    expect(reduceDigits("999999")).toBe("69");
  });

  test('empty string', () => {
    expect(reduceDigits("")).toBe("");
  });

  test('pairs of digits', () => {
    expect(reduceDigits("112233")).toBe("213");
  });

  test('mixed repeating lengths', () => {
    expect(reduceDigits("111222333")).toBe("313233");
  });

  test('single repeating digit', () => {
    expect(reduceDigits("1111")).toBe("41");
  });
}); 