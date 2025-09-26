import { Klassekoder } from "../../types/Klassekoder";
import { normalize } from "../../util/filterCommon";

export const klassekoderFields = [
  { key: "klassekoder", label: "Klassekode", name: "klassekode" },
  { key: "hovedkontoNr", label: "Hovedkontonr", name: "hovedkonto" },
  { key: "underkontoNr", label: "Underkontonr", name: "underkonto" },
  { key: "artID", label: "Art-ID", name: "artid" },
  { key: "fagomraade", label: "Fagområde", name: "fagomraade" },
] as const;

export type FilterKey = (typeof klassekoderFields)[number]["key"];

export interface Filters {
  klassekoder: string[];
  hovedkontoNr: string[];
  underkontoNr: string[];
  artID: string[];
  fagomraade: string[];
}

export const filterKlassekoder = (
  data: Klassekoder[],
  filters: Filters,
): Klassekoder[] => {
  const kTerms = filters.klassekoder.map(normalize);
  const hTerms = filters.hovedkontoNr.map(normalize);
  const uTerms = filters.underkontoNr.map(normalize);
  const fTerms = filters.fagomraade.map(normalize);

  return data.filter((item) => {
    const hayKlasse = normalize(item.kodeKlasse || "");
    const hayHoved = normalize(item.hovedkontoNr || "");
    const hayUnder = normalize(item.underkontoNr || "");
    const hayFag = normalize(item.kodeFagomraade || "Ingen");

    const matchesKlassekoder =
      kTerms.length === 0 || kTerms.some((t) => hayKlasse.includes(t));

    const matchesHovedkontoNr =
      hTerms.length === 0 || hTerms.some((t) => hayHoved.includes(t));

    const matchesUnderkontoNr =
      uTerms.length === 0 || uTerms.some((t) => hayUnder.includes(t));

    const matchesArtID =
      filters.artID.length === 0 ||
      filters.artID.some((f) => {
        const filterNumber = parseInt(f, 10);
        return !isNaN(filterNumber) && item.artID === filterNumber;
      });

    const matchesFagomraade =
      fTerms.length === 0 || fTerms.some((t) => hayFag.includes(t));

    return (
      matchesKlassekoder &&
      matchesHovedkontoNr &&
      matchesUnderkontoNr &&
      matchesArtID &&
      matchesFagomraade
    );
  });
};

export const getAvailableOptions = (data: Klassekoder[]) => {
  return {
    klassekoder: [...new Set(data.map((item) => item.kodeKlasse))],
    hovedkontoNr: [...new Set(data.map((item) => item.hovedkontoNr))],
    underkontoNr: [...new Set(data.map((item) => item.underkontoNr))],
    artID: [...new Set(data.map((item) => item.artID.toString()))],
    fagomraade: [
      ...new Set(data.map((item) => item.kodeFagomraade || "Ingen")),
    ],
  };
};
