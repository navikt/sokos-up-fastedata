import { useState } from "react";
import { Pagination, Table } from "@navikt/ds-react";
import commonstyles from "../../../styles/commonstyles.module.css";
import { Kjoreplan } from "../../../types/Kjoreplan";
import { formatDate } from "../../../util/dateUtil";

interface Props {
  past?: boolean; // Om dette er kjøreplaner som er kjørt (true) eller planlagt (false)
  data?: Kjoreplan[];
}

export const KjoreplanTable = ({ past, data = [] }: Props) => {
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
            <Table.ColumnHeader>
              {past ? "Dato kjørt" : "Dato kjøres"}
            </Table.ColumnHeader>
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
      {data.length > pageSize && (
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

export default KjoreplanTable;
