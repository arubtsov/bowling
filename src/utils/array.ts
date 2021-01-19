import { Rolls } from '../types';

export function sum(
    array: Rolls
): number {
    return array.reduce<number>(
        (accumulator, current) => {
            if (current)
                accumulator += current;

            return accumulator
        }
    , 0);
}
