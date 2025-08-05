import { useMemo, useState } from "react";
import { Alert, Heading } from "@navikt/ds-react";
import { useGetKlassekoder } from "../api/apiService";
import BackHomeBox from "../components/backhomebox/BackHomeBox";
import ContentLoader from "../components/content-loader/ContentLoader";
import KlassekoderFilter from "../components/filters/klassekoderfilter/KlassekoderFilter";
import KlassekoderTable from "../components/tables/KlassekoderTable";
import commonstyles from "../styles/Commonstyles.module.css";
import {
  filterKlassekoder,
  getAvailableOptions,
} from "../util/filterKlassekoder";

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
    return filterKlassekoder(data, filters);
  }, [data, filters]);

  const availableOptions = useMemo(() => {
    return getAvailableOptions(filteredData);
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
