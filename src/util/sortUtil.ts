export type SortDirection = "ascending" | "descending";

export interface SortState<T> {
  orderBy: keyof T;
  direction: SortDirection;
}

export function sortData<T>(data: T[], sort: SortState<T> | undefined): T[] {
  if (!sort) return data;

  return [...data].sort((a, b) => {
    const aVal = a[sort.orderBy];
    const bVal = b[sort.orderBy];

    if (aVal == null) return 1;
    if (bVal == null) return -1;

    if (aVal < bVal) return sort.direction === "ascending" ? -1 : 1;
    if (aVal > bVal) return sort.direction === "ascending" ? 1 : -1;

    return 0;
  });
}

export function toggleSort<T>(
  current: SortState<T> | undefined,
  key: keyof T,
): SortState<T> {
  if (current?.orderBy === key) {
    return {
      orderBy: key,
      direction: current.direction === "ascending" ? "descending" : "ascending",
    };
  }
  return { orderBy: key, direction: "ascending" };
}
