export function asteroidCollision(asteroids) {
    const stack = [];

    for (const asteroid of asteroids) {
        let shouldAdd = true;

        while (
            stack.length > 0 &&
            asteroid < 0 &&
            stack[stack.length - 1] > 0
            ) {
            const top = stack[stack.length - 1];

            // If current asteroid is larger, pop the top one
            if (Math.abs(asteroid) > Math.abs(top)) {
                stack.pop();
                continue;
            }
            // If same size, both explode
            else if (Math.abs(asteroid) === Math.abs(top)) {
                stack.pop();
                shouldAdd = false;
            }
            // If current asteroid is smaller, it explodes
            else {
                shouldAdd = false;
            }
            break;
        }

        if (shouldAdd) {
            stack.push(asteroid);
        }
    }

    return stack;
}
