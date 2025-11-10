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

/**
 * Custom hook for managing URL parameter-based filters
 *
 * @param urlParameters - URLSearchParams object from react-router
 * @param setUrlParameters - Function to update URL parameters
 * @param paramName - Name of the URL parameter to manage
 * @returns [filters, handleFiltersChange] tuple
 */
export function useUrlParameterFilters(
  urlParameters: URLSearchParams,
  setUrlParameters: (
    params: URLSearchParams,
    options?: { replace?: boolean },
  ) => void,
  paramName: string,
): [string[], (newFilters: string[]) => void] {
  const getInitialFilters = (): string[] => {
    const urlParam = urlParameters.get(paramName);
    if (!urlParam) return [];
    return [urlParam];
  };

  const handleFiltersChange = (newFilters: string[]): void => {
    if (newFilters.length === 0) {
      const newUrlParams = new URLSearchParams(urlParameters);
      newUrlParams.delete(paramName);
      setUrlParameters(newUrlParams, { replace: true });
    }
  };

  return [getInitialFilters(), handleFiltersChange];
}
