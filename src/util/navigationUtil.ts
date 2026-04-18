/**
 * Parses a comma-separated string into an array of trimmed non-empty strings
 *
 * @param value - Comma-separated string
 * @returns Array of trimmed strings
 */
export function parseCommaSeparated(value?: string): string[] {
	if (!value) return [];

	return value
		.split(",")
		.map((entry) => entry.trim())
		.filter((entry) => entry.length > 0);
}
