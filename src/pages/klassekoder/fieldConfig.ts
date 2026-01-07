export const klassekoderFields = [
	{ key: "klassekoder", label: "Klassekode", name: "klassekode" },
	{ key: "hovedkontoNr", label: "Hovedkontonr", name: "hovedkonto" },
	{ key: "underkontoNr", label: "Underkontonr", name: "underkonto" },
	{ key: "artID", label: "Art-ID", name: "artid" },
	{ key: "fagomraade", label: "Fagområde", name: "fagomraade" },
] as const;

export type FilterKey = (typeof klassekoderFields)[number]["key"];
