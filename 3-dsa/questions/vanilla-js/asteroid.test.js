import {asteroidCollision} from "./asteroid";
import {describe, expect, test} from "vitest";


describe('asteroidCollision', () => {
    test('asteroids moving in same direction never collide', () => {
        expect(asteroidCollision([1, 2, 3])).toEqual([1, 2, 3]);
        expect(asteroidCollision([-1, -2, -3])).toEqual([-1, -2, -3]);
    });

    test('larger asteroid destroys smaller one', () => {
        expect(asteroidCollision([5, 10, -5])).toEqual([5, 10]);
        expect(asteroidCollision([10, 2, -5])).toEqual([10]);
    });

    test('equal sized asteroids both get destroyed', () => {
        expect(asteroidCollision([8, -8])).toEqual([]);
        expect(asteroidCollision([5, 5, -5, -5])).toEqual([]);
    });

    test('complex scenarios', () => {
        expect(asteroidCollision([-2, -1, 1, 2])).toEqual([-2, -1, 1, 2]);
        expect(asteroidCollision([-2, -2, 1, -2])).toEqual([-2, -2, -2]);
        expect(asteroidCollision([1, -2, -2, -2])).toEqual([-2, -2, -2]);
    });

    test('edge cases', () => {
        expect(asteroidCollision([])).toEqual([]);
        expect(asteroidCollision([1])).toEqual([1]);
        expect(asteroidCollision([-1])).toEqual([-1]);
    });
});
