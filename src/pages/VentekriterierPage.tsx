import React from "react";
import { Heading, Page } from "@navikt/ds-react";
import { useGetVentekriterier } from "../api/apiService";
import VentekriterierTable from "../components/VentekriterierTable";
import "./styling/Ventekriterier.module.css";

export const VentekriterierPage = () => {
  const { data } = useGetVentekriterier();

  return (
    <Page className="ventekriterier-page-wrapper">
      <Page.Block width="lg" gutters>
        <Heading
          spacing
          size="medium"
          level="1"
          className="ventekriterier-heading"
        >
          Faste data -Ventekriterier
        </Heading>
        <VentekriterierTable data={data} />
      </Page.Block>
    </Page>
  );
};

export default VentekriterierPage;
