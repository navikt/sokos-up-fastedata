import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Alert, Heading } from "@navikt/ds-react";
import { useGetFagomraader } from "../../api/apiService";
import BackHomeBox from "../../common/BackHomeBox";
import ContentLoader from "../../common/ContentLoader";
import commonstyles from "../../styles/commonstyles.module.css";
import { Fagomraader } from "../../types/Fagomraader";
import { filterByNormalizedTerms } from "../../util/filterUtil";
import FagomraaderFilter from "./FagomraaderFilter";
import FagomraaderTable from "./FagomraaderTable";

export const FagomraaderPage = () => {
  const { data, error, isLoading } = useGetFagomraader();
  const [urlParameters, setUrlParameters] = useSearchParams();

  const [filters, setFilters] = useState(() => {
    const fagomraadeUrlParam = urlParameters.get("fagomraade");
    if (!fagomraadeUrlParam) return [];
    return [fagomraadeUrlParam];
  });

  const handleFiltersChange = (newFilters: string[]) => {
    setFilters(newFilters);
    if (newFilters.length === 0) {
      const newUrlParams = new URLSearchParams(urlParameters);
      newUrlParams.delete("fagomraade");
      setUrlParameters(newUrlParams, { replace: true });
    }
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    return filterByNormalizedTerms<Fagomraader>(
      data,
      filters,
      (item) => `${item.kodeFagomraade} ${item.navnFagomraade}`,
    );
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
          Faste data - Fagområde
        </Heading>

        <BackHomeBox />

        {data && (
          <FagomraaderFilter
            data={filteredData}
            activeFilters={filters}
            onFiltersChange={handleFiltersChange}
          />
        )}

        {error ? (
          <Alert variant="error">Nettverksfeil</Alert>
        ) : filteredData.length > 0 ? (
          <FagomraaderTable key={filters.join(",")} data={filteredData} />
        ) : (
          <Alert variant="info">Ingen data tilgjengelig</Alert>
        )}
      </div>
    </div>
  );
};

export default FagomraaderPage;
