import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { filterByNormalizedTerms } from "./filterUtil";

/**
 * Custom hook for simple list filtering with URL parameter synchronization.
 *
 * @param data - The data array to filter
 * @param urlParamName - The URL parameter name to sync with
 * @param searchableTextFn - Function to extract searchable text from each item (should be memoized)
 * @returns Object containing filters, filteredData, and handleFiltersChange
 *
 * @example
 * const searchableTextFn = useCallback(
 *   (item) => `${item.kodeFaggruppe} ${item.navnFaggruppe}`,
 *   []
 * );
 * const { filters, filteredData, handleFiltersChange } = useSimpleFilter(
 *   data,
 *   "faggruppe",
 *   searchableTextFn
 * );
 */
export function useSimpleFilter<T>(
	data: T[] | undefined,
	urlParamName: string,
	searchableTextFn: (item: T) => string,
) {
	const [urlParameters, setUrlParameters] = useSearchParams();

	const [filters, setFilters] = useState(() => {
		const urlParam = urlParameters.get(urlParamName);
		if (!urlParam) return [];
		return [urlParam];
	});

	const handleFiltersChange = (newFilters: string[]) => {
		setFilters(newFilters);
		if (newFilters.length === 0) {
			const newUrlParams = new URLSearchParams(urlParameters);
			newUrlParams.delete(urlParamName);
			setUrlParameters(newUrlParams, { replace: true });
		}
	};

	const filteredData = useMemo(() => {
		if (!data) return [];
		return filterByNormalizedTerms<T>(data, filters, searchableTextFn);
	}, [data, filters, searchableTextFn]);

	return { filters, filteredData, handleFiltersChange };
}
