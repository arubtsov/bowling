import { Attempts } from '../types';

export function sum(
    array: Attempts
): number {
    return array.reduce<number>(
        (accumulator, current) => {
            if (current)
                accumulator += current;

            return accumulator
        }
    , 0);
}
