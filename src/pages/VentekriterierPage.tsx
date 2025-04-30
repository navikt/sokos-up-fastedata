import React from "react";
import { Heading } from "@navikt/ds-react";
import { useGetVentekriterier } from "../api/apiService";
import VentekriterierTable from "../components/VentekriterierTable";
import styles from "../styles/ventekriterier.module.css";

export const VentekriterierPage = () => {
  const { data } = useGetVentekriterier();

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
        <VentekriterierTable data={data} />
      </div>
    </div>
  );
};

export default VentekriterierPage;
