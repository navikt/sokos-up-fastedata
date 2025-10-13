import { useCallback, useMemo, useState } from "react";
import { SortState, sortData } from "./sortUtil";

// Test verified commit

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
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const sortedData = useMemo(() => {
    return sortState ? sortData(data, sortState) : data;
  }, [data, sortState]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const safePage = currentPage > totalPages ? 1 : currentPage;

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
