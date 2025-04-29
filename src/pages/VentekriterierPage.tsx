import React from "react";
import { Heading, Page } from "@navikt/ds-react";
import { useGetVentekriterier } from "../api/apiService";
import VentekriterierTable from "../components/VentekriterierTable";
import styles from "../styles/Ventekriterier.module.css";

export const VentekriterierPage = () => {
  const { data } = useGetVentekriterier();

  return (
    <Page>
      <Page.Block width="lg" gutters>
        <Heading
          spacing
          size="medium"
          level="1"
          className={styles.ventekriterierheading}
        >
          Faste data -Ventekriterier
        </Heading>
        <VentekriterierTable data={data} />
      </Page.Block>
    </Page>
  );
};

export default VentekriterierPage;
