import { useMemo } from "react";
import { filterByNormalizedTerms } from "./filterUtil";
import { useUrlArrayParam } from "./useUrlState";

/**
 * Custom hook for simple list filtering with URL parameter as source of truth.
 *
 * @param data - The data array to filter
 * @param urlParamName - The URL parameter name to sync with
 * @param searchableTextFn - Function to extract searchable text from each item (should be memoized)
 * @returns Object containing filters, filteredData, and handleFiltersChange
 *
 * @example
 * const { filters, filteredData, handleFiltersChange } = useSimpleFilter(
 *   data,
 *   "faggruppe",
 *   (item) => `${item.kodeFaggruppe} ${item.navnFaggruppe}`
 * );
 */
export function useSimpleFilter<T>(
	data: T[] | undefined,
	urlParamName: string,
	searchableTextFn: (item: T) => string,
) {
	const [filters, setFilters] = useUrlArrayParam(urlParamName);

	const filteredData = useMemo(() => {
		if (!data) return [];
		return filterByNormalizedTerms<T>(data, filters, searchableTextFn);
	}, [data, filters, searchableTextFn]);

	return { filters, filteredData, handleFiltersChange: setFilters };
}
