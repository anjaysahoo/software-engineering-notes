import { describe, expect, test } from "vitest";
import { unflattenObject } from './unflatten-object';

describe('unflattenObject', () => {
  test('basic nested object with arrays', () => {
    const input = {
      "a": [21321],
      "b.c": "adssdads",
      "b.def": ["dasdas"],
      "x.fff": 213123,
      "x.dddd": ["dsadasdsa", "adsasdas"],
      "x.fdds.sss": "das"
    };
    
    const expected = {
      a: [21321],
      b: {
        c: 'adssdads',
        def: ['dasdas']
      },
      x: {
        fff: 213123,
        dddd: ['dsadasdsa', 'adsasdas'],
        fdds: {
          sss: 'das'
        }
      }
    };
    
    expect(unflattenObject(input)).toEqual(expected);
  });

  test('empty object', () => {
    expect(unflattenObject({})).toEqual({});
  });

  test('single level object', () => {
    const input = { "a": 1, "b": 2 };
    expect(unflattenObject(input)).toEqual({ a: 1, b: 2 });
  });

  test('deeply nested object', () => {
    const input = {
      "a.b.c.d": 1,
      "a.b.c.e": 2
    };
    const expected = {
      a: {
        b: {
          c: {
            d: 1,
            e: 2
          }
        }
      }
    };
    expect(unflattenObject(input)).toEqual(expected);
  });

  test('mixed nesting levels', () => {
    const input = {
      "a": 1,
      "b.c": 2,
      "b.d.e": 3
    };
    const expected = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3
        }
      }
    };
    expect(unflattenObject(input)).toEqual(expected);
  });
}); 