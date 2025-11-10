import { useState } from "react";
import { Pagination, Table } from "@navikt/ds-react";
import RowsPerPageSelector from "../../../common/RowsPerPageSelector";
import commonstyles from "../../../styles/commonstyles.module.css";
import { Kjoreplan } from "../../../types/Kjoreplan";
import { formatDate } from "../../../util/dateUtil";
import { SortState } from "../../../util/sortUtil";
import {
  createSortChangeHandler,
  useTablePagination,
} from "../../../util/tableUtil";

interface Props {
  past?: boolean; // Om dette er kjøreplaner som er kjørt (true) eller planlagt (false)
  data?: Kjoreplan[];
}

export const KjoreplanTable = ({ past, data = [] }: Props) => {
  const [sort, setSort] = useState<SortState<Kjoreplan> | undefined>();

  const {
    currentPage,
    safePage,
    totalPages,
    paginatedData,
    tableKey,
    updateRowsPerPage,
    handlePageChange,
    rowsPerPage,
  } = useTablePagination({
    data,
    sortState: sort,
  });

  const handleSortChange = createSortChangeHandler(setSort);

  return (
    <>
      <div className={commonstyles["table-controls"]}>
        <div className={commonstyles["controls-row"]}>
          <div className={commonstyles["left-controls"]}>
            <p className={commonstyles["treff-info"]}>
              {`${data.length} treff`}
              {rowsPerPage &&
                data.length > rowsPerPage &&
                totalPages > 1 &&
                `, ${currentPage} av ${totalPages} sider`}
            </p>
          </div>
          <RowsPerPageSelector
            rowsPerPage={rowsPerPage}
            updateRowsPerPage={updateRowsPerPage}
          />
        </div>
      </div>

      <Table
        key={tableKey}
        zebraStripes
        size="small"
        sort={sort}
        onSortChange={handleSortChange}
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader sortKey="kodeFaggruppe" sortable>
              Faggruppe
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="datoKjores" sortable>
              {past ? "Dato kjørt" : "Dato kjøres"}
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="status" sortable>
              Status
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="datoOverfores" sortable>
              Dato overføres
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="datoForfall" sortable>
              Dato forfall
            </Table.ColumnHeader>
            <Table.HeaderCell>Beregningsperiode</Table.HeaderCell>
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
      {totalPages > 1 && (
        <div className={commonstyles["table-pagination-container"]}>
          <Pagination
            page={safePage}
            onPageChange={handlePageChange}
            count={totalPages}
            size="small"
          />
        </div>
      )}
    </>
  );
};

export default KjoreplanTable;
