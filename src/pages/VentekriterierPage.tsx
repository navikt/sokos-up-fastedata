import React from "react";
import { Alert, Heading } from "@navikt/ds-react";
import { useGetVentekriterier } from "../api/apiService";
import VentekriterierTable from "../components/VentekriterierTable";
import BackHomeBox from "../components/backhomebox/BackHomeBox";
import styles from "../styles/Ventekriterier.module.css";

export const VentekriterierPage = () => {
  const { data, error } = useGetVentekriterier();

  return (
    <div className={styles["container"]}>
      <div className={styles["content-wrapper"]}>
        <Heading
          spacing
          size="medium"
          level="1"
          className={styles["ventekriterier-heading"]}
        >
          Faste data – Ventekriterier
        </Heading>

        <BackHomeBox />

        {error ? (
          <Alert variant="error">Nettverksfeil</Alert>
        ) : data && data.length > 0 ? (
          <VentekriterierTable data={data} />
        ) : (
          <Alert variant="info">Ingen data tilgjengelig</Alert>
        )}
      </div>
    </div>
  );
};

export default VentekriterierPage;
