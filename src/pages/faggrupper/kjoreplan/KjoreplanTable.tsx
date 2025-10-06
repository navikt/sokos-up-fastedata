import dayjs from "dayjs";
import { useState } from "react";
import { Pagination, Table } from "@navikt/ds-react";
import commonstyles from "../../../styles/commonstyles.module.css";
import { Kjoreplan } from "../../../types/Kjoreplan";

interface Props {
  data?: Kjoreplan[];
}

function formatDate(value?: string) {
  return dayjs(value).format("DD.MM.YYYY");
}

export const KjoreplanTable = ({ data = [] }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <>
      <Table zebraStripes size="small">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Faggruppe</Table.ColumnHeader>
            <Table.ColumnHeader>Dato kjøres</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Dato overføres</Table.ColumnHeader>
            <Table.ColumnHeader>Dato forfall</Table.ColumnHeader>
            <Table.ColumnHeader>Beregningsperiode</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedData.map((row, index) => (
            <Table.Row key={`row${index}`}>
              <Table.DataCell>{row.kodeFaggruppe}</Table.DataCell>
              <Table.DataCell>{formatDate(row.datoKjores)}</Table.DataCell>
              <Table.DataCell>{row.status}</Table.DataCell>
              <Table.DataCell>
                {row.datoOverfores ? formatDate(row.datoOverfores) : "-"}
              </Table.DataCell>
              <Table.DataCell>{formatDate(row.datoForfall)}</Table.DataCell>
              <Table.DataCell>
                {formatDate(row.datoBeregnFom)} -{" "}
                {formatDate(row.datoBeregnTom)}
              </Table.DataCell>
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

export default KjoreplanTable;
