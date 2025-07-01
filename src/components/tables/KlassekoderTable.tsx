import React from "react";
import { Table } from "@navikt/ds-react";

const KlassekoderTable = () => {
  return (
    <Table zebraStripes size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Kode</Table.HeaderCell>
          <Table.HeaderCell>Beskrivelse</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body></Table.Body>
    </Table>
  );
};

export default KlassekoderTable;
