import { useEffect, useState } from "react";
import { Alert, Heading } from "@navikt/ds-react";
import { useGetFaggrupper } from "../../api/apiService";
import BackHomeBox from "../../common/BackHomeBox";
import ContentLoader from "../../common/ContentLoader";
import commonstyles from "../../styles/commonstyles.module.css";
import { Faggruppe } from "../../types/Faggruppe";
import FaggruppeFilter from "./FaggruppeFilter";
import FaggruppeTable from "./FaggruppeTable";

export const FaggrupperPage = () => {
  const { data, error, isLoading } = useGetFaggrupper();
  const [filteredData, setFilteredData] = useState<Faggruppe[]>([]);

  useEffect(() => {
    if (data) setFilteredData(data);
  }, [data]);

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

        {data && <FaggruppeFilter data={data} onDataChange={setFilteredData} />}

        {error ? (
          <Alert variant="error">Nettverksfeil</Alert>
        ) : filteredData.length > 0 ? (
          <FaggruppeTable data={filteredData} />
        ) : (
          <Alert variant="info">Ingen data tilgjengelig</Alert>
        )}
      </div>
    </div>
  );
};

export default FaggrupperPage;
