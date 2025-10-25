import {describe, expect, test, beforeEach} from "vitest";
import { simulateBallCollisions } from './ball-collision'


describe('Ball Collision Simulation', () => {
  test('basic collision with different speeds', () => {
    expect(simulateBallCollisions([5, 10, -5])).toEqual([5, 10]);
  });

  test('same speed collision', () => {
    expect(simulateBallCollisions([5, -5])).toEqual([]);
  });

  test('no collisions', () => {
    expect(simulateBallCollisions([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test('multiple collisions', () => {
    expect(simulateBallCollisions([10, -5, 5, -5])).toEqual([10]);
  });

  test('empty array', () => {
    expect(simulateBallCollisions([])).toEqual([]);
  });

  test('single ball', () => {
    expect(simulateBallCollisions([5])).toEqual([5]);
  });

  test('complex scenario', () => {
    expect(simulateBallCollisions([5, -5, 5, -5, 5, -5])).toEqual([]);
  });

  test('all moving right', () => {
    expect(simulateBallCollisions([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  test('all moving left', () => {
    expect(simulateBallCollisions([-4, -3, -2, -1])).toEqual([-4, -3, -2, -1]);
  });

  test('1', () => {
    expect(simulateBallCollisions([10, 2, -5])).toEqual([10]);
  });
}); 
