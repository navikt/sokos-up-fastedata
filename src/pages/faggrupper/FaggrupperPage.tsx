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

  const displayFilters = useMemo(() => {
    if (!data || filters.length === 0) return [];

    return filters.map((kodeFaggruppe) => {
      const matchingItem = data.find(
        (item) => item.kodeFaggruppe === kodeFaggruppe,
      );

      if (matchingItem) {
        return `${matchingItem.kodeFaggruppe} - ${matchingItem.navnFaggruppe}`;
      }

      return kodeFaggruppe;
    });
  }, [data, filters]);

  const handleFiltersChange = (newFilters: string[]) => {
    const kodeFaggruppe = newFilters.map((filter) => filter.split(" - ")[0]);
    setFilters(kodeFaggruppe);

    if (newFilters.length === 0) {
      const newUrlParams = new URLSearchParams(urlParameters);
      newUrlParams.delete("faggruppe");
      setUrlParameters(newUrlParams, { replace: true });
    }
  };

  const filteredData = useMemo(() => {
    if (!data || filters.length === 0) return data || [];

    return data.filter((item) => {
      return filters.includes(item.kodeFaggruppe);
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
            data={data}
            activeFilters={displayFilters}
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
