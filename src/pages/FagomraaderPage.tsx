import { useMemo, useState } from "react";
import { Alert, Heading } from "@navikt/ds-react";
import { useGetFagomraader } from "../api/apiService";
import BackHomeBox from "../components/backhomebox/BackHomeBox";
import ContentLoader from "../components/content-loader/ContentLoader";
import FagomraaderFilter from "../components/fagomraaderfilter/FagomraaderFilter";
import FagomraaderTable from "../components/tables/FagomraaderTable";
import commonstyles from "../styles/Commonstyles.module.css";

export const FagomraaderPage = () => {
  const { data, error, isLoading } = useGetFagomraader();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    if (!data || activeFilters.length === 0) return data || [];

    return data.filter((item) => {
      const combined = `${item.kodeFagomraade} - ${item.navnFagomraade}`;
      return activeFilters.some((filter) =>
        combined.toLowerCase().includes(filter.toLowerCase()),
      );
    });
  }, [data, activeFilters]);

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
            activeFilters={activeFilters}
            onFiltersChange={setActiveFilters}
          />
        )}

        {error ? (
          <Alert variant="error">Nettverksfeil</Alert>
        ) : filteredData.length > 0 ? (
          <FagomraaderTable key={activeFilters.join(",")} data={filteredData} />
        ) : (
          <Alert variant="info">Ingen data tilgjengelig</Alert>
        )}
      </div>
    </div>
  );
};

export default FagomraaderPage;
