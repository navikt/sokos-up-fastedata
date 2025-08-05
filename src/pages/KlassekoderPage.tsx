import { useMemo, useState } from "react";
import { Alert, Heading } from "@navikt/ds-react";
import { useGetKlassekoder } from "../api/apiService";
import BackHomeBox from "../components/backhomebox/BackHomeBox";
import ContentLoader from "../components/content-loader/ContentLoader";
import KlassekoderFilter from "../components/filters/klassekoderfilter/KlassekoderFilter";
import KlassekoderTable from "../components/tables/KlassekoderTable";
import commonstyles from "../styles/Commonstyles.module.css";

export const KlassekoderPage = () => {
  const { data, error, isLoading } = useGetKlassekoder();

  const [filters, setFilters] = useState({
    klassekoder: [] as string[],
    hovedkontoNr: [] as string[],
    underkontoNr: [] as string[],
    artID: [] as string[],
  });

  const handleFilterChange = (
    field: keyof typeof filters,
    values: string[],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((item) => {
      const matches = {
        klassekoder:
          filters.klassekoder.length === 0 ||
          filters.klassekoder.some((f) =>
            item.kodeKlasse.toLowerCase().includes(f.toLowerCase()),
          ),
        hovedkontoNr:
          filters.hovedkontoNr.length === 0 ||
          filters.hovedkontoNr.some((f) =>
            item.hovedkontoNr?.toLowerCase().includes(f.toLowerCase()),
          ),
        underkontoNr:
          filters.underkontoNr.length === 0 ||
          filters.underkontoNr.some((f) =>
            item.underkontoNr?.toLowerCase().includes(f.toLowerCase()),
          ),
        artID:
          filters.artID.length === 0 ||
          filters.artID.some((f) => {
            const filterNumber = parseInt(f, 10);
            return !isNaN(filterNumber) && item.artID === filterNumber;
          }),
      };

      return (
        matches.klassekoder &&
        matches.hovedkontoNr &&
        matches.underkontoNr &&
        matches.artID
      );
    });
  }, [data, filters]);

  const availableOptions = useMemo(() => {
    return {
      klassekoder: [...new Set(filteredData.map((item) => item.kodeKlasse))],
      hovedkontoNr: [...new Set(filteredData.map((item) => item.hovedkontoNr))],
      underkontoNr: [...new Set(filteredData.map((item) => item.underkontoNr))],
      artID: [...new Set(filteredData.map((item) => item.artID.toString()))], // convert to string for input
    };
  }, [filteredData]);

  if (isLoading) return <ContentLoader />;

  return (
    <div className={commonstyles["container"]}>
      <div className={commonstyles["content-wrapper"]}>
        <Heading
          spacing
          size="medium"
          level="1"
          className={commonstyles["page-heading"]}
        >
          Faste data - Klassekoder
        </Heading>

        <BackHomeBox />

        {data && (
          <KlassekoderFilter
            options={availableOptions}
            activeFilters={filters}
            onFiltersChange={handleFilterChange}
          />
        )}

        {error ? (
          <Alert variant="error">Nettverksfeil</Alert>
        ) : filteredData.length > 0 ? (
          <KlassekoderTable data={filteredData} />
        ) : (
          <Alert variant="info">Ingen data tilgjengelig</Alert>
        )}
      </div>
    </div>
  );
};

export default KlassekoderPage;
