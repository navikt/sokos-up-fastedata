import { useEffect, useState } from "react";
import { Alert, Heading } from "@navikt/ds-react";
import { useGetFagomraader } from "../../api/apiService";
import BackHomeBox from "../../common/BackHomeBox";
import ContentLoader from "../../common/ContentLoader";
import commonstyles from "../../styles/commonstyles.module.css";
import { Fagomraader } from "../../types/Fagomraader";
import FagomraaderFilter from "./FagomraaderFilter";
import FagomraaderTable from "./FagomraaderTable";

export const FagomraaderPage = () => {
  const { data, error, isLoading } = useGetFagomraader();
  const [filteredData, setFilteredData] = useState<Fagomraader[]>([]);

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
          Faste data - Fagområde
        </Heading>

        <BackHomeBox />

        {data && (
          <FagomraaderFilter data={data} onDataChange={setFilteredData} />
        )}

        {error ? (
          <Alert variant="error">Nettverksfeil</Alert>
        ) : filteredData.length > 0 ? (
          <FagomraaderTable data={filteredData} />
        ) : (
          <Alert variant="info">Ingen data tilgjengelig</Alert>
        )}
      </div>
    </div>
  );
};

export default FagomraaderPage;
