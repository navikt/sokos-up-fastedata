export const klassekoderFields = [
  { key: "klassekoder", label: "Klassekode" },
  { key: "hovedkontoNr", label: "Hovedkontonr" },
  { key: "underkontoNr", label: "Underkontonr" },
  { key: "artID", label: "Art-ID" },
  { key: "fagomraade", label: "Fagområde" },
] as const;

export type FilterKey = (typeof klassekoderFields)[number]["key"];
