export const trekkregelFields = [
	{ key: "trekktype", label: "Trekktype" },
	{ key: "fagomraade", label: "Fagområde" },
] as const;

export type TrekkregelFilterKey = (typeof trekkregelFields)[number]["key"];
