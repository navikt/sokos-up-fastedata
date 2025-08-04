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
  const [filters, setFilters] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    if (!data) return [];

    if (filters.length === 0) return data;

    return data.filter((item) => {
      const value = item.kodeKlasse.toLowerCase();
      return filters.some((filter) => value.includes(filter.toLowerCase()));
    });
  }, [data, filters]);

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
            options={data.map((item) => item.kodeKlasse)}
            activeFilters={filters}
            onFiltersChange={setFilters}
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
