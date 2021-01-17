export function sum(
    array: number[]
): number {
    return array.reduce((accumulator, current) => accumulator + current, 0);
}
