/**
 * Recursively finds all paths to a specified target ID within a nested object.
 *
 * @param obj - The nested object to search within.
 * @param targetId - The ID to search for.
 * @param currentPath - (Optional) The current path within the object (used internally for recursion).
 * @returns An array of arrays containing the paths to the target ID.
 */
export function findIdPathsForObject(obj: any, targetId: any, currentPath: string[] = []): string[][] {
  const paths: string[][] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newPath = currentPath.concat(obj.id?.toString() || []);

      if (obj[key] === targetId) {
        paths.push(newPath);
      } else if (typeof obj[key] === 'object') {
        paths.push(...findIdPathsForObject(obj[key], targetId, newPath));
      }
    }
  }

  return paths;
}
