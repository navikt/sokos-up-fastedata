import { Alert, Heading } from "@navikt/ds-react";
import { useGetFaggrupper } from "../../api/apiService";
import BackHomeBox from "../../common/BackHomeBox";
import ContentLoader from "../../common/ContentLoader";
import commonstyles from "../../styles/commonstyles.module.css";
import { useSimpleFilter } from "../../util/useSimpleFilter";
import FaggruppeFilter from "./FaggruppeFilter";
import FaggruppeTable from "./FaggruppeTable";

export const FaggrupperPage = () => {
  const { data, error, isLoading } = useGetFaggrupper();

  const { filters, filteredData, handleFiltersChange } = useSimpleFilter(
    data,
    "faggruppe",
    (item) => `${item.kodeFaggruppe} ${item.navnFaggruppe}`,
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
