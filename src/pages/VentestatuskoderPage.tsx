import React, { useState } from "react";
import { Alert, Heading } from "@navikt/ds-react";
import { useGetVentestatuskoder } from "../api/apiService";
import BackHomeBox from "../components/backhomebox/BackHomeBox";
import ContentLoader from "../components/content-loader/ContentLoader";
import VentestatuskoderTable from "../components/tables/VentestatuskoderTable";
import commonstyles from "../styles/Commonstyles.module.css";

export const VentestatuskoderPage = () => {
  const { data, error, isLoading } = useGetVentestatuskoder();
  const [currentPage, setCurrentPage] = useState(1);

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
          Faste data - Ventestatuskoder
        </Heading>

        <BackHomeBox />

        {error ? (
          <Alert variant="error">
            En feil har oppstått. Prøv igjen senere.
          </Alert>
        ) : data && data.length > 0 ? (
          <VentestatuskoderTable
            data={data}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        ) : (
          <Alert variant="info">Ingen data tilgjengelig</Alert>
        )}
      </div>
    </div>
  );
};

export default VentestatuskoderPage;
