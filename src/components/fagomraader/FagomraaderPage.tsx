import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Alert, Heading } from "@navikt/ds-react";
import { useGetFagomraader } from "../../api/apiService";
import commonstyles from "../../styles/commonstyles.module.css";
import BackHomeBox from "../BackHomeBox";
import ContentLoader from "../ContentLoader";
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

  const normalize = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9\u00C0-\u024F]+/g, "");

  const filteredData = useMemo(() => {
    if (!data || filters.length === 0) return data || [];
    const terms = filters.map((f) => normalize(f));
    return data.filter((item) => {
      const hay = normalize(`${item.kodeFagomraade} ${item.navnFagomraade}`);
      return terms.every((t) => hay.includes(t));
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
