export const formatNumber = (value: number | null | undefined) =>
	value != null ? new Intl.NumberFormat("no-NO").format(value) : "—";
