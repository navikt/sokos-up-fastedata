import React, { useState } from "react";
import { Table } from "@navikt/ds-react";
import { Ventestatuskoder } from "../types/Ventestatuskoder";

type Props = {
  data?: Ventestatuskoder[];
};

const VentestatuskoderTable = ({ data = [] }: Props) => {
  const [sortState, setSortState] = useState({
    orderBy: "kodeVentestatus",
    direction: "ascending" as "ascending" | "descending",
  });

  const handleSortChange = (sortKey: string) => {
    setSortState((prev) => {
      if (prev.orderBy === sortKey) {
        return {
          ...prev,
          direction:
            prev.direction === "ascending" ? "descending" : "ascending",
        };
      }
      return { orderBy: sortKey, direction: "ascending" };
    });
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortState.orderBy as keyof Ventestatuskoder];
    const bVal = b[sortState.orderBy as keyof Ventestatuskoder];

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortState.direction === "ascending"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortState.direction === "ascending" ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  return (
    <Table
      zebraStripes
      size="small"
      sort={sortState}
      onSortChange={handleSortChange}
      className="ventestatuskoder-table"
    >
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader sortable sortKey="kodeVentestatus">
            Ventestatuskode
          </Table.ColumnHeader>
          <Table.ColumnHeader sortable sortKey="beskrivelse">
            Beskrivelse
          </Table.ColumnHeader>
          <Table.ColumnHeader>Prioritet</Table.ColumnHeader>
          <Table.ColumnHeader>Settes manuelt</Table.ColumnHeader>
          <Table.ColumnHeader>Kode arves til</Table.ColumnHeader>
          <Table.ColumnHeader>Kan manuelt endres til</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedData.map((row, idx) => (
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
