/**
 * String normalization utilities for consistent text comparison
 * Used for master item matching and duplicate detection
 */

/**
 * Normalize string for comparison:
 * - Trim leading/trailing whitespace
 * - Collapse multiple whitespace to single space
 * - Convert to lowercase
 * 
 * @param value - String to normalize
 * @returns Normalized string
 * 
 * @example
 * normalizeString('  CBC  ') // 'cbc'
 * normalizeString('Complete  Blood   Count') // 'complete blood count'
 */
export function normalizeString(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

/**
 * Check if two strings match after normalization
 * 
 * @param a - First string
 * @param b - Second string
 * @returns True if strings match after normalization
 * 
 * @example
 * isNormalizedMatch('CBC', 'cbc') // true
 * isNormalizedMatch('  CBC  ', 'cbc') // true
 * isNormalizedMatch('CBC', 'XYZ') // false
 */
export function isNormalizedMatch(a: string, b: string): boolean {
  return normalizeString(a) === normalizeString(b);
}
