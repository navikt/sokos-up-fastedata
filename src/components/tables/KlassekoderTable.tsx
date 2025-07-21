import React, { useState } from "react";
import { Pagination, Table } from "@navikt/ds-react";
import commonstyles from "../../styles/Commonstyles.module.css";
import { Klassekoder } from "../../types/Klassekoder";
import { SortState, sortData } from "../../util/sortUtil";

interface Props {
  data?: Klassekoder[];
}

export const KlassekoderTable = ({ data = [] }: Props) => {
  const [sort, setSort] = useState<SortState<Klassekoder> | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const sortedData = sortData(data, sort);

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
        sort={sort}
        onSortChange={(key) => {
          setSort((prev) => {
            const orderBy = key as keyof Klassekoder;
            const direction =
              prev?.orderBy === orderBy && prev?.direction === "ascending"
                ? "descending"
                : "ascending";
            return { orderBy, direction };
          });
        }}
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader sortKey="kodeKlasse" sortable>
              Klasskoder
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="artID" sortable>
              Art ID
            </Table.ColumnHeader>
            <Table.ColumnHeader>Dato fom</Table.ColumnHeader>
            <Table.ColumnHeader>Dato tom</Table.ColumnHeader>
            <Table.ColumnHeader>Hovedkontonr</Table.ColumnHeader>
            <Table.ColumnHeader>Underkontonr</Table.ColumnHeader>
            <Table.ColumnHeader>Fagområde</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedData.map((row) => (
            <Table.Row key={row.kodeKlasse}>
              <Table.DataCell>{row.kodeKlasse}</Table.DataCell>
              <Table.DataCell>{row.artID}</Table.DataCell>
              <Table.DataCell>{row.datoFom}</Table.DataCell>
              <Table.DataCell>{row.datoTom}</Table.DataCell>
              <Table.DataCell>{row.hovedkontoNr}</Table.DataCell>
              <Table.DataCell>{row.underkontoNr}</Table.DataCell>
              <Table.DataCell>{row.kodeFagomraade || "Ingen"}</Table.DataCell>
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

export default KlassekoderTable;
