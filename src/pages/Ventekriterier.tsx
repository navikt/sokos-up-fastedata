import React, { useEffect, useState } from "react";
import { Page, Table, Heading } from "@navikt/ds-react";
import "./ventekriterier.css";

interface Ventekriterie {
  kodeFaggruppe: string;
  bilagstype: number;
  datoFoM: string;
  belopBrutto: string;
  belopNetto: string;
  antallDagerEldreEnn: string;
  tidligereAar: string;
}

export const Ventekriterier = () => {
  const [data, setData] = useState<Ventekriterie[]>([]);

  useEffect(() => {
    fetch("/fastedata-api/api/v1/ventekriterier")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <Page className="ventekriterier-page-wrapper">
      <Page.Block width="lg" gutters>
      <Heading spacing size="medium" level="1" className="ventekriterier-heading">
        Faste data -Ventekriterier
      </Heading>

      <Table zebraStripes size="small" className="ventekriterier-table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Kode Faggruppe</Table.HeaderCell>
            <Table.HeaderCell>Bilagstype</Table.HeaderCell>
            <Table.HeaderCell>Dato f.o.m</Table.HeaderCell>
            <Table.HeaderCell>Beløp brutto</Table.HeaderCell>
            <Table.HeaderCell>Beløp netto</Table.HeaderCell>
            <Table.HeaderCell>Antall dager eldre enn</Table.HeaderCell>
            <Table.HeaderCell>Tidligere år</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row, idx) => (
            <Table.Row key={idx}>
              <Table.DataCell>{row.kodeFaggruppe}</Table.DataCell>
              <Table.DataCell>{row.bilagstype}</Table.DataCell>
              <Table.DataCell>{row.datoFoM}</Table.DataCell>
              <Table.DataCell>{row.belopBrutto}</Table.DataCell>
              <Table.DataCell>{row.belopNetto}</Table.DataCell>
              <Table.DataCell>{row.antallDagerEldreEnn}</Table.DataCell>
              <Table.DataCell>{row.tidligereAar}</Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
        </Page.Block>
    </Page>
  );
};

export default Ventekriterier;
