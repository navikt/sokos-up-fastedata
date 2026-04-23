import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import type { SortState } from "./sortUtil";
import { sortData } from "./sortUtil";

const VALID_PAGE_SIZES = [5, 10, 25, 50, 100];

function parsePositiveInt(
	params: URLSearchParams,
	key: string,
	defaultValue: number,
): number {
	const raw = params.get(key);
	if (!raw) return defaultValue;
	const parsed = Number.parseInt(raw, 10);
	return Number.isNaN(parsed) || parsed < 1 ? defaultValue : parsed;
}

interface UseTablePaginationParams<T> {
	data: T[];
	initialRowsPerPage?: number;
	sortState?: SortState<T>;
	additionalKeyFactors?: (string | number | boolean)[];
}

interface UseTablePaginationReturn<T> {
	currentPage: number;
	rowsPerPage: number;
	totalPages: number;
	safePage: number;
	paginatedData: T[];
	tableKey: string;
	setCurrentPage: (page: number) => void;
	setRowsPerPage: (rows: number) => void;
	updateRowsPerPage: (rows: number) => void;
	handlePageChange: (page: number) => void;
}

export function useTablePagination<T>({
	data,
	initialRowsPerPage = 25,
	sortState,
	additionalKeyFactors = [],
}: UseTablePaginationParams<T>): UseTablePaginationReturn<T> {
	const [searchParams, setSearchParams] = useSearchParams();

	const rawPage = parsePositiveInt(searchParams, "side", 1);
	const rawRows = parsePositiveInt(searchParams, "rader", initialRowsPerPage);
	const rowsPerPage = VALID_PAGE_SIZES.includes(rawRows)
		? rawRows
		: initialRowsPerPage;

	const sortedData = useMemo(() => {
		return sortState ? sortData(data, sortState) : data;
	}, [data, sortState]);

	const totalPages = Math.max(1, Math.ceil(sortedData.length / rowsPerPage));
	const safePage = rawPage > totalPages ? 1 : rawPage;
	const currentPage = safePage;

	const paginatedData = useMemo(() => {
		return sortedData.slice(
			(safePage - 1) * rowsPerPage,
			safePage * rowsPerPage,
		);
	}, [sortedData, safePage, rowsPerPage]);

	const tableKey = useMemo(() => {
		const baseFactors = [data.length, rowsPerPage];
		const allFactors = [...baseFactors, ...additionalKeyFactors];
		return `table-${allFactors.join("-")}`;
	}, [data.length, rowsPerPage, additionalKeyFactors]);

	const setCurrentPage = useCallback(
		(page: number) => {
			setSearchParams(
				(prev) => {
					const next = new URLSearchParams(prev);
					if (page <= 1) {
						next.delete("side");
					} else {
						next.set("side", String(page));
					}
					return next;
				},
				{ replace: true },
			);
		},
		[setSearchParams],
	);

	const setRowsPerPage = useCallback(
		(rows: number) => {
			setSearchParams(
				(prev) => {
					const next = new URLSearchParams(prev);
					if (rows === initialRowsPerPage) {
						next.delete("rader");
					} else {
						next.set("rader", String(rows));
					}
					return next;
				},
				{ replace: true },
			);
		},
		[setSearchParams, initialRowsPerPage],
	);

	const updateRowsPerPage = useCallback(
		(rows: number) => {
			setSearchParams(
				(prev) => {
					const next = new URLSearchParams(prev);
					if (rows === initialRowsPerPage) {
						next.delete("rader");
					} else {
						next.set("rader", String(rows));
					}
					next.delete("side");
					return next;
				},
				{ replace: true },
			);
		},
		[setSearchParams, initialRowsPerPage],
	);

	const handlePageChange = useCallback(
		(page: number) => {
			if (page <= totalPages && page >= 1) {
				setCurrentPage(page);
			}
		},
		[totalPages, setCurrentPage],
	);

	return {
		currentPage,
		rowsPerPage,
		totalPages,
		safePage,
		paginatedData,
		tableKey,
		setCurrentPage,
		setRowsPerPage,
		updateRowsPerPage,
		handlePageChange,
	};
}

/**
 * Local (non-URL) table pagination for detail pages where multiple tables
 * share the same page (e.g. KjoreplanPage with PLAN/AVSL tabs).
 */
export function useLocalTablePagination<T>({
	data,
	initialRowsPerPage = 25,
	sortState,
	additionalKeyFactors = [],
}: UseTablePaginationParams<T>): UseTablePaginationReturn<T> {
	const [rawPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

	const sortedData = useMemo(() => {
		return sortState ? sortData(data, sortState) : data;
	}, [data, sortState]);

	const totalPages = Math.ceil(sortedData.length / rowsPerPage);
	const safePage = rawPage > totalPages ? 1 : rawPage;
	const currentPage = safePage;

	const paginatedData = useMemo(() => {
		return sortedData.slice(
			(safePage - 1) * rowsPerPage,
			safePage * rowsPerPage,
		);
	}, [sortedData, safePage, rowsPerPage]);

	const tableKey = useMemo(() => {
		const baseFactors = [data.length, rowsPerPage];
		const allFactors = [...baseFactors, ...additionalKeyFactors];
		return `table-${allFactors.join("-")}`;
	}, [data.length, rowsPerPage, additionalKeyFactors]);

	const updateRowsPerPage = useCallback((rows: number) => {
		setRowsPerPage(rows);
		setCurrentPage(1);
	}, []);

	const handlePageChange = useCallback(
		(page: number) => {
			if (page <= totalPages && page >= 1) {
				setCurrentPage(page);
			}
		},
		[totalPages],
	);

	return {
		currentPage,
		rowsPerPage,
		totalPages,
		safePage,
		paginatedData,
		tableKey,
		setCurrentPage,
		setRowsPerPage,
		updateRowsPerPage,
		handlePageChange,
	};
}

export function createSortChangeHandler<T>(
	setSortState: React.Dispatch<React.SetStateAction<SortState<T> | undefined>>,
) {
	return (key: string) => {
		setSortState((prev) => {
			const orderBy = key as keyof T;
			const direction =
				prev?.orderBy === orderBy && prev?.direction === "ascending"
					? "descending"
					: "ascending";
			return { orderBy, direction };
		});
	};
}
