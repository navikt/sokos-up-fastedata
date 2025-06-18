import React, { useState } from "react";
import { Alert, Heading } from "@navikt/ds-react";
import { useGetFagomraader } from "../api/apiService";
import BackHomeBox from "../components/backhomebox/BackHomeBox";
import ContentLoader from "../components/content-loader/ContentLoader";
import FagomraaderFilter from "../components/fagomraaderfilter/FagomraaderFilter";
import FagomraadeTable from "../components/tables/FagomraadeTable";
import commonstyles from "../styles/Commonstyles.module.css";
import { Fagomraader } from "../types/Fagomraader";

export const FagomraaderPage = () => {
  const { data, error, isLoading } = useGetFagomraader();
  const [filteredData, setFilteredData] = useState<Fagomraader[]>([]);

  const handleFilter = (filtered: Fagomraader[]) => {
    setFilteredData(filtered || []);
  };

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

        {data && <FagomraaderFilter data={data} onFilter={handleFilter} />}

        {error ? (
          <Alert variant="error">Nettverksfeil</Alert>
        ) : filteredData.length > 0 ? (
          <FagomraadeTable data={filteredData} />
        ) : (
          <Alert variant="info">Ingen data tilgjengelig</Alert>
        )}
      </div>
    </div>
  );
};

export default FagomraaderPage;
