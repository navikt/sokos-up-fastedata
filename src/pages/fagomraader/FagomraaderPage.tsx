import { Alert, Heading } from "@navikt/ds-react";
import { useGetFagomraader } from "../../api/apiService";
import BackHomeBox from "../../common/BackHomeBox";
import ContentLoader from "../../common/ContentLoader";
import commonstyles from "../../styles/commonstyles.module.css";
import { useSimpleFilter } from "../../util/useSimpleFilter";
import FagomraaderFilter from "./FagomraaderFilter";
import FagomraaderTable from "./FagomraaderTable";

export const FagomraaderPage = () => {
  const { data, error, isLoading } = useGetFagomraader();

  const { filters, filteredData, handleFiltersChange } = useSimpleFilter(
    data,
    "fagomraade",
    (item) => `${item.kodeFagomraade} ${item.navnFagomraade}`,
  );

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
