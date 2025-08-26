import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Alert, Heading } from "@navikt/ds-react";
import { useGetFagomraader } from "../api/apiService";
import BackHomeBox from "../components/backhomebox/BackHomeBox";
import ContentLoader from "../components/content-loader/ContentLoader";
import FagomraaderFilter from "../components/filters/fagomraaderfilter/FagomraaderFilter";
import FagomraaderTable from "../components/tables/FagomraaderTable";
import commonstyles from "../styles/Commonstyles.module.css";

export const FagomraaderPage = () => {
  const { data, error, isLoading } = useGetFagomraader();
  const [urlParameters, setUrlParameters] = useSearchParams();

  const [filters, setFilters] = useState(() => {
    const fagomraadeUrlParam = urlParameters.get("fagomraade");
    if (!fagomraadeUrlParam) return [];

    return [fagomraadeUrlParam];
  });

  const displayFilters = useMemo(() => {
    if (!data || filters.length === 0) return [];

    return filters.map((kodeFagomraade) => {
      const matchingItem = data.find(
        (item) => item.kodeFagomraade === kodeFagomraade,
      );

      if (matchingItem) {
        return `${matchingItem.kodeFagomraade} - ${matchingItem.navnFagomraade}`;
      }

      return kodeFagomraade;
    });
  }, [data, filters]);

  const handleFiltersChange = (newFilters: string[]) => {
    const kodeFagomraade = newFilters.map((filter) => filter.split(" - ")[0]);
    setFilters(kodeFagomraade);

    if (newFilters.length === 0) {
      const newUrlParams = new URLSearchParams(urlParameters);
      newUrlParams.delete("fagomraade");
      setUrlParameters(newUrlParams, { replace: true });
    }
  };

  const filteredData = useMemo(() => {
    if (!data || filters.length === 0) return data || [];

    return data.filter((item) => {
      return filters.includes(item.kodeFagomraade);
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
            data={data}
            activeFilters={displayFilters}
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
