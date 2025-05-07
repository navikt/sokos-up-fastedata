import React from "react";
import { Table } from "@navikt/ds-react";
import { Ventestatuskoder } from "../types/Ventestatuskoder";

// Ensure this type exists

type Props = {
  data?: Ventestatuskoder[];
};

export const VentestatuskoderTable = (props: Props) => {
  return (
    <Table zebraStripes size="small" className="ventestatuskoder-table">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Kode Ventestatus</Table.HeaderCell>
          <Table.HeaderCell>Beskrivelse</Table.HeaderCell>
          <Table.HeaderCell>Prioritet</Table.HeaderCell>
          <Table.HeaderCell>Settes Manuelt</Table.HeaderCell>
          <Table.HeaderCell>Kode Arves Til</Table.HeaderCell>
          <Table.HeaderCell>Kan Manuelt Endres Til</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.data?.map((row, idx) => (
          <Table.Row key={idx}>
            <Table.DataCell>{row.kodeVentestatus}</Table.DataCell>
            <Table.DataCell>{row.beskrivelse}</Table.DataCell>
            <Table.DataCell>{row.prioritet}</Table.DataCell>
            <Table.DataCell>{row.settesManuelt}</Table.DataCell>
            <Table.DataCell>{row.kodeArvesTil}</Table.DataCell>
            <Table.DataCell>{row.kanManueltEndresTil}</Table.DataCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default VentestatuskoderTable;
