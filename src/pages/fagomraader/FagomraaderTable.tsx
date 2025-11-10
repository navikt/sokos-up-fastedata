import { useState } from "react";
import { Link as RouterLink } from "react-router";
import { Link, Pagination, Table } from "@navikt/ds-react";
import TableControls from "../../common/TableControls";
import commonstyles from "../../styles/commonstyles.module.css";
import { Fagomraader } from "../../types/Fagomraader";
import { KLASSEKODER } from "../../util/paths";
import { SortState } from "../../util/sortUtil";
import {
  createSortChangeHandler,
  useTablePagination,
} from "../../util/tableUtil";
import BilagstypeModal from "./BilagstypeModal";
import FagomraaderExpandableSection from "./FagomraaderExpandableSection";
import KorrigeringsarsakModal from "./KorrigeringsarsakModal";

interface Props {
  data?: Fagomraader[];
}

export const FagomraaderTable = ({ data = [] }: Props) => {
  const [sort, setSort] = useState<SortState<Fagomraader> | undefined>();

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
      <TableControls
        totalCount={data.length}
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        updateRowsPerPage={updateRowsPerPage}
      />

      <Table
        key={tableKey}
        zebraStripes
        size="small"
        sort={sort}
        onSortChange={handleSortChange}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Detaljer</Table.HeaderCell>
            <Table.ColumnHeader sortKey="kodeFagomraade" sortable>
              Kode
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="navnFagomraade" sortable>
              Navn
            </Table.ColumnHeader>
            <Table.HeaderCell>Klassekode</Table.HeaderCell>
            <Table.HeaderCell>Motregningsgruppe</Table.HeaderCell>
            <Table.HeaderCell>Korrigeringsårsak</Table.HeaderCell>
            <Table.HeaderCell>Bilagstype</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedData.map((row) => (
            <FagomraaderExpandableSection key={row.kodeFagomraade} row={row}>
              <Table.DataCell>{row.kodeFagomraade}</Table.DataCell>
              <Table.DataCell>{row.navnFagomraade}</Table.DataCell>
              <Table.DataCell>
                {row.klassekodeFinnes ? (
                  <Link
                    as={RouterLink}
                    to={`${KLASSEKODER}?fagomraade=${encodeURIComponent(row.kodeFagomraade)}`}
                  >
                    Klassekode
                  </Link>
                ) : (
                  "Ingen"
                )}
              </Table.DataCell>
              <Table.DataCell>{row.kodeMotregningsgruppe}</Table.DataCell>
              <Table.DataCell>
                <KorrigeringsarsakModal
                  kodeFagomraade={row.kodeFagomraade}
                  buttonText="Korrigeringsårsak"
                  disabled={!row.korraarsakFinnes}
                />
              </Table.DataCell>
              <Table.DataCell>
                <BilagstypeModal
                  kodeFagomraade={row.kodeFagomraade}
                  buttonText="Bilagstype"
                  disabled={!row.bilagstypeFinnes}
                />
              </Table.DataCell>
            </FagomraaderExpandableSection>
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

export default FagomraaderTable;
