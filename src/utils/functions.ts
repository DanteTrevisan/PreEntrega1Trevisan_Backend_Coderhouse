/**
 * @param {number[]} ids
 * @returns {number}
 */

export function generateId(ids: number[]): number{
    let maxId = 0;
    if (ids.length !== 0) maxId = Math.max(...ids)
    return maxId;
}