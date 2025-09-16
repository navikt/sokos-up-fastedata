import { useEffect, useState } from "react";
import { Pagination, Table } from "@navikt/ds-react";
import commonstyles from "../../styles/commonstyles2.module.css";
import { Ventekriterier } from "../../types/Ventekriterier";
import { formatNumber } from "../../util/tallUtil";
import RowsPerPageSelector from "../rowsperpageselector/RowsPerPageSelector";

type Props = {
  data?: Ventekriterier[];
};

export const VentekriterierTable = ({ data = [] }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    setCurrentPage(1);
  }, [data, rowsPerPage]);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const updateRowsPerPage = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  return (
    <>
      <div className={commonstyles["table-controls-end-aligned"]}>
        <RowsPerPageSelector
          rowsPerPage={rowsPerPage}
          updateRowsPerPage={updateRowsPerPage}
        />
      </div>

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
          {paginatedData.map((row) => (
            <Table.Row key={row.kodeFaggruppe}>
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

export default VentekriterierTable;
