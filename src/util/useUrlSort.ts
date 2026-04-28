import { useCallback } from "react";
import { useSearchParams } from "react-router";
import type { SortDirection, SortState } from "./sortUtil";

/**
 * Hook for managing table sort state via URL parameters.
 * Reads `sort` (column key) and `dir` (asc/desc) from the URL.
 */
export function useUrlSort<T>(): [
	SortState<T> | undefined,
	(sortKey: string) => void,
] {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortKey = searchParams.get("sort");
	const dirParam = searchParams.get("dir");

	const sortState: SortState<T> | undefined = sortKey
		? {
				orderBy: sortKey as keyof T,
				direction: (dirParam === "descending"
					? "descending"
					: "ascending") as SortDirection,
			}
		: undefined;

	const handleSortChange = useCallback(
		(key: string) => {
			setSearchParams(
				(prev) => {
					const next = new URLSearchParams(prev);
					const currentKey = next.get("sort");
					const currentDir = next.get("dir");

					if (currentKey === key && currentDir !== "descending") {
						next.set("sort", key);
						next.set("dir", "descending");
					} else if (currentKey === key && currentDir === "descending") {
						next.delete("sort");
						next.delete("dir");
					} else {
						next.set("sort", key);
						next.delete("dir");
					}
					// Reset page when sort changes
					next.delete("side");
					return next;
				},
				{ replace: true },
			);
		},
		[setSearchParams],
	);

	return [sortState, handleSortChange];
}
