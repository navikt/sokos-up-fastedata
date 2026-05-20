/**
 * Normalizes a string for case-insensitive comparison by:
 * - Converting to lowercase
 * - Removing all non-alphanumeric characters (except Unicode letters)
 */
export function normalizeString(str: string): string {
	return str.toLowerCase().replace(/[^a-z0-9\u00C0-\u024F]+/g, "");
}

/**
 * Filters data array based on multiple search terms.
 * Each term must match somewhere in the combined searchable fields (AND logic).
 *
 * @param data - Array of items to filter
 * @param filters - Array of search terms
 * @param getSearchableText - Function that extracts searchable text from an item
 * @returns Filtered array
 */
export function filterByNormalizedTerms<T>(
	data: T[],
	filters: string[],
	getSearchableText: (item: T) => string,
): T[] {
	if (filters.length === 0) return data;

	const normalizedTerms = filters.map((f) => normalizeString(f));

	return data.filter((item) => {
		const searchableText = normalizeString(getSearchableText(item));
		return normalizedTerms.every((term) => searchableText.includes(term));
	});
}
