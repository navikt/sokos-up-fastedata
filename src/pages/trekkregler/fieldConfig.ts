export const trekkregelFields = [
	{ key: "trekktype", label: "Trekktype", name: "trekktype" },
	{ key: "fagomraade", label: "Fagområde", name: "fagomraade" },
] as const;

export type TrekkregelFilterKey = (typeof trekkregelFields)[number]["key"];
