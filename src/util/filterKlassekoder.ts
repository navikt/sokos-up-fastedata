import { Klassekoder } from "../types/Klassekoder";

// correct file name

export interface Filters {
  klassekoder: string[];
  hovedkontoNr: string[];
  underkontoNr: string[];
  artID: string[];
}

export const filterKlassekoder = (
  data: Klassekoder[], // <-- use the correct type here
  filters: Filters,
): Klassekoder[] => {
  return data.filter((item) => {
    const matchesKlassekoder =
      filters.klassekoder.length === 0 ||
      filters.klassekoder.some((f) =>
        item.kodeKlasse.toLowerCase().includes(f.toLowerCase()),
      );

    const matchesHovedkontoNr =
      filters.hovedkontoNr.length === 0 ||
      filters.hovedkontoNr.some((f) =>
        item.hovedkontoNr?.toLowerCase().includes(f.toLowerCase()),
      );

    const matchesUnderkontoNr =
      filters.underkontoNr.length === 0 ||
      filters.underkontoNr.some((f) =>
        item.underkontoNr?.toLowerCase().includes(f.toLowerCase()),
      );

    const matchesArtID =
      filters.artID.length === 0 ||
      filters.artID.some((f) => {
        const filterNumber = parseInt(f, 10);
        return !isNaN(filterNumber) && item.artID === filterNumber;
      });

    return (
      matchesKlassekoder &&
      matchesHovedkontoNr &&
      matchesUnderkontoNr &&
      matchesArtID
    );
  });
};

export const getAvailableOptions = (data: Klassekoder[]) => {
  return {
    klassekoder: [...new Set(data.map((item) => item.kodeKlasse))],
    hovedkontoNr: [...new Set(data.map((item) => item.hovedkontoNr))],
    underkontoNr: [...new Set(data.map((item) => item.underkontoNr))],
    artID: [...new Set(data.map((item) => item.artID.toString()))],
  };
};
