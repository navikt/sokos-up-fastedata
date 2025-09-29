import { Klassekoder } from "../../types/Klassekoder";

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

    const fagomraader = (item.kodeFagomraade || "Ingen")
      .split(",")
      .map((f) => f.trim().toLowerCase());

    const matchesFagomraade =
      filters.fagomraade.length === 0 ||
      filters.fagomraade.some((f) => fagomraader.includes(f.toLowerCase()));

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
    underkontoNr: [
      ...new Set(data.map((item) => item.underkontoNr).filter(Boolean)),
    ] as string[],
    artID: [...new Set(data.map((item) => item.artID.toString()))],
    fagomraade: [
      ...new Set(
        data.flatMap((item) =>
          (item.kodeFagomraade || "Ingen").split(",").map((f) => f.trim()),
        ),
      ),
    ],
  };
};
