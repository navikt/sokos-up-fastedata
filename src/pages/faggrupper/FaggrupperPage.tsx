import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Alert, Heading } from "@navikt/ds-react";
import { useGetFaggrupper } from "../../api/apiService";
import BackHomeBox from "../../common/BackHomeBox";
import ContentLoader from "../../common/ContentLoader";
import commonstyles from "../../styles/commonstyles.module.css";
import FaggruppeFilter from "./FaggruppeFilter";
import FaggruppeTable from "./FaggruppeTable";

export const FaggrupperPage = () => {
  const { data, error, isLoading } = useGetFaggrupper();
  const [urlParameters, setUrlParameters] = useSearchParams();

  const [filters, setFilters] = useState(() => {
    const faggruppeUrlParam = urlParameters.get("faggruppe");
    if (!faggruppeUrlParam) return [];
    return [faggruppeUrlParam];
  });

  const handleFiltersChange = (newFilters: string[]) => {
    setFilters(newFilters);
    if (newFilters.length === 0) {
      const newUrlParams = new URLSearchParams(urlParameters);
      newUrlParams.delete("faggruppe");
      setUrlParameters(newUrlParams, { replace: true });
    }
  };

  const normalize = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9\u00C0-\u024F]+/g, "");

  const filteredData = useMemo(() => {
    if (!data || filters.length === 0) return data || [];
    const terms = filters.map((f) => normalize(f));
    return data.filter((item) => {
      const hay = normalize(`${item.kodeFaggruppe} ${item.navnFaggruppe}`);
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
          Faste data - Faggrupper
        </Heading>

        <BackHomeBox />

        {data && (
          <FaggruppeFilter
            data={filteredData}
            activeFilters={filters}
            onFiltersChange={handleFiltersChange}
          />
        )}

        {error ? (
          <Alert variant="error">Nettverksfeil</Alert>
        ) : filteredData.length > 0 ? (
          <FaggruppeTable key={filters.join(",")} data={filteredData} />
        ) : (
          <Alert variant="info">Ingen data tilgjengelig</Alert>
        )}
      </div>
    </div>
  );
};

export default FaggrupperPage;
