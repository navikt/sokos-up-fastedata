import React from "react";
import { Table } from "@navikt/ds-react";
import { Ventekriterier } from "../../types/Ventekriterier";
import { formatNumber } from "../../util/tallUtil";

type Props = {
  data?: Ventekriterier[];
};

export const VentekriterierTable = (props: Props) => {
  return (
    <Table zebraStripes size="small">
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
        {props.data?.map((row, idx) => (
          <Table.Row key={idx}>
            <Table.DataCell>{row.kodeFaggruppe}</Table.DataCell>
            <Table.DataCell>{row.typeBilag}</Table.DataCell>
            <Table.DataCell>{row.datoFom}</Table.DataCell>
            <Table.DataCell>{formatNumber(row.belopBrutto)}</Table.DataCell>
            <Table.DataCell>{formatNumber(row.belopNetto)}</Table.DataCell>
            <Table.DataCell>{row.antDagerEldreenn ?? "—"}</Table.DataCell>
            <Table.DataCell>{row.tidligereAar ? "Ja" : "Nei"}</Table.DataCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default VentekriterierTable;
