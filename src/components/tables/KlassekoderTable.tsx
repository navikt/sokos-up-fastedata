import React, { useEffect, useState } from "react";
import { Pagination, Table } from "@navikt/ds-react";
import commonstyles from "../../styles/Commonstyles.module.css";
import { Klassekoder } from "../../types/Klassekoder";
import { SortState, sortData } from "../../util/sortUtil";
import RowsPerPageSelector from "../rowsperpageselector/RowsPerPageSelector";

interface Props {
  data?: Klassekoder[];
}

export const KlassekoderTable = ({ data = [] }: Props) => {
  const [sort, setSort] = useState<SortState<Klassekoder> | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const sortedData = sortData(data, sort);
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const tableKey = `${sort?.orderBy}-${sort?.direction}-${currentPage}-${rowsPerPage}-${data.length}`;

  const updateRowsPerPage = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  return (
    <>
      <RowsPerPageSelector
        rowsPerPage={rowsPerPage}
        updateRowsPerPage={updateRowsPerPage}
        totalCount={data.length}
        currentPage={currentPage}
        pageCount={totalPages}
      />

      <Table
        key={tableKey}
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
              Klassekoder
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="artID" sortable>
              Art ID
            </Table.ColumnHeader>
            <Table.HeaderCell>Dato fom</Table.HeaderCell>
            <Table.HeaderCell>Dato tom</Table.HeaderCell>
            <Table.HeaderCell>Hovedkontonr</Table.HeaderCell>
            <Table.HeaderCell>Underkontonr</Table.HeaderCell>
            <Table.HeaderCell>Fagområde</Table.HeaderCell>
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

      {totalPages > 1 && (
        <div className={commonstyles["table-pagination-container"]}>
          <Pagination
            page={currentPage}
            onPageChange={setCurrentPage}
            count={totalPages}
            size="small"
          />
        </div>
      )}
    </>
  );
};

export default KlassekoderTable;
