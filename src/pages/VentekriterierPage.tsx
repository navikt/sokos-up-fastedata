import React, { useEffect, useState } from "react";
import { Heading, Page, Table } from "@navikt/ds-react";
import { Ventekriterier } from "../types/Ventekriterier";
import "./Ventekriterier.module.css";

export const VentekriterierTable = () => {
  const [data, setData] = useState<Ventekriterier[]>([]);

  useEffect(() => {
    fetch("/fastedata-api/api/v1/ventekriterier")
      .then((res) => res.json())
      .then((data) =>
        setData(
          data.map((item: Ventekriterier) => ({
            kodeFaggruppe: item.kodeFaggruppe,
            typeBilag: item.typeBilag,
            datoFom: item.datoFom,
            belopBrutto: item.belopBrutto,
            belopNetto: item.belopNetto,
            antDagerEldreenn: item.antDagerEldreenn,
            tidligereAar: item.tidligereAar,
          })),
        ),
      );
  }, []);

  const formatNumber = (value: number | null | undefined) =>
    value != null ? new Intl.NumberFormat("no-NO").format(value) : "—";

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
                <Table.DataCell>{row.typeBilag}</Table.DataCell>
                <Table.DataCell>{row.datoFom}</Table.DataCell>
                <Table.DataCell>{formatNumber(row.belopBrutto)}</Table.DataCell>
                <Table.DataCell>{formatNumber(row.belopNetto)}</Table.DataCell>
                <Table.DataCell>{row.antDagerEldreenn ?? "—"}</Table.DataCell>
                <Table.DataCell>
                  {row.tidligereAar ? "Ja" : "Nei"}
                </Table.DataCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Page.Block>
    </Page>
  );
};

export default VentekriterierTable;
