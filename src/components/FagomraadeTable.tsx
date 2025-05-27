import React from "react";
import { Button, Table } from "@navikt/ds-react";
import { Fagomraader } from "../types/Fagomraader";

interface Props {
  data?: Fagomraader[];
}

export const FagomraadeTable = ({ data }: Props) => {
  return (
    <Table zebraStripes size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Detaljer</Table.HeaderCell>
          <Table.HeaderCell>Kode</Table.HeaderCell>
          <Table.HeaderCell>Navn</Table.HeaderCell>
          <Table.HeaderCell>Motregningsgruppe</Table.HeaderCell>
          <Table.HeaderCell>Korrigeringsårsak</Table.HeaderCell>
          <Table.HeaderCell>Bilagstype</Table.HeaderCell>
          <Table.HeaderCell>Klassekode</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data?.map((row, idx) => (
          <Table.Row key={idx}>
            <Table.DataCell>Detaljer</Table.DataCell>
            <Table.DataCell>{row.kodeFagomraade}</Table.DataCell>
            <Table.DataCell>{row.navnFagomraade}</Table.DataCell>
            <Table.DataCell>{row.kodeMotregningsgruppe}</Table.DataCell>
            <Table.DataCell>
              {row.korraarsakFinnes ? (
                <Button variant="secondary" size="xsmall">
                  Korrigeringsårsak
                </Button>
              ) : (
                <Button variant="secondary" size="xsmall" disabled>
                  Korrigeringsårsak
                </Button>
              )}
            </Table.DataCell>
            <Table.DataCell>
              {row.bilagstypeFinnes ? (
                <Button variant="secondary" size="xsmall">
                  Bilagstype
                </Button>
              ) : (
                <Button variant="secondary" size="xsmall" disabled>
                  Bilagstype
                </Button>
              )}
            </Table.DataCell>
            <Table.DataCell>
              {row.klassekodeFinnes ? (
                <Button variant="tertiary" size="xsmall">
                  Klassekode
                </Button>
              ) : (
                <Button variant="tertiary" size="xsmall" disabled>
                  Klassekode
                </Button>
              )}
            </Table.DataCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default FagomraadeTable;
