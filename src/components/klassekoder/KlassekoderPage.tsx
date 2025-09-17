import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Alert, Heading } from "@navikt/ds-react";
import { useGetKlassekoder } from "../../api/apiService";
import commonstyles from "../../styles/commonstyles.module.css";
import BackHomeBox from "../BackHomeBox";
import ContentLoader from "../ContentLoader";
import KlassekoderFilter from "./KlassekoderFilter";
import KlassekoderTable from "./KlassekoderTable";
import { filterKlassekoder, getAvailableOptions } from "./filterKlassekoder";

export const KlassekoderPage = () => {
  const { data, error, isLoading } = useGetKlassekoder();
  const [urlParameters, setUrlParameters] = useSearchParams();

  const [filters, setFilters] = useState(() => {
    const fagomraadeUrlParam = urlParameters.get("fagomraade");
    return {
      klassekoder: [] as string[],
      hovedkontoNr: [] as string[],
      underkontoNr: [] as string[],
      artID: [] as string[],
      fagomraade: fagomraadeUrlParam ? [fagomraadeUrlParam] : ([] as string[]),
    };
  });

  const handleFilterChange = (
    field: keyof typeof filters,
    values: string[],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: values,
    }));

    if (field === "fagomraade" && values.length === 0) {
      const newUrlParameter = new URLSearchParams(urlParameters);
      newUrlParameter.delete("fagomraade");
      setUrlParameters(newUrlParameter, { replace: true });
    }
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
