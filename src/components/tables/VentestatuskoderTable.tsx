import { useState } from "react";
import { Pagination, Table } from "@navikt/ds-react";
import commonstyles from "../../styles/Commonstyles.module.css";
import { Ventestatuskoder } from "../../types/Ventestatuskoder";
import { SortState, sortData } from "../../util/sortUtil";

type Props = {
  data?: Ventestatuskoder[];
};

const VentestatuskoderTable = ({ data = [] }: Props) => {
  const [sortState, setSortState] = useState<
    SortState<Ventestatuskoder> | undefined
  >();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const handleSortChange = (sortKey: string) => {
    const key = sortKey as keyof Ventestatuskoder;

    setSortState((prev) => {
      const isSame = prev?.orderBy === key;
      const newDirection =
        isSame && prev.direction === "ascending" ? "descending" : "ascending";
      return { orderBy: key, direction: newDirection };
    });
  };

  const sortedData = sortData(data, sortState);
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <>
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
          {paginatedData.map((row) => (
            <Table.Row key={row.kodeVentestatus}>
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
      <div className={commonstyles["table-pagination-container"]}>
        <Pagination
          page={currentPage}
          onPageChange={setCurrentPage}
          count={totalPages}
          size="small"
        />
      </div>
    </>
  );
};

export default VentestatuskoderTable;
