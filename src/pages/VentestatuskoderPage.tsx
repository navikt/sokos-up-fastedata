import React from "react";
import { Alert, Heading } from "@navikt/ds-react";
import { useGetVentestatuskoder } from "../api/apiService";
import VentestatuskoderTable from "../components/VentestatuskoderTable";
import BackHomeBox from "../components/backhomebox/BackHomeBox";
import styles from "../styles/Ventestatuskoder.module.css";

export const VentestatuskoderPage = () => {
  const { data, error } = useGetVentestatuskoder();

  return (
    <div className={styles["container"]}>
      <div className={styles["content-wrapper"]}>
        <Heading
          spacing
          size="medium"
          level="1"
          className={styles["ventestatuskoder-heading"]}
        >
          Faste data – Ventestatuskoder
        </Heading>

        <BackHomeBox />

        {error ? (
          <Alert variant="error">
            En feil har oppstått. Prøv igjen senere.
          </Alert>
        ) : data && data.length > 0 ? (
          <VentestatuskoderTable data={data} />
        ) : (
          <Alert variant="info">Ingen data tilgjengelig</Alert>
        )}
      </div>
    </div>
  );
};

export default VentestatuskoderPage;
