import { useState } from "react";
import { Link as RouterLink } from "react-router";
import { Link, Pagination, Table } from "@navikt/ds-react";
import commonstyles from "../../styles/commonstyles.module.css";
import { Faggruppe } from "../../types/Faggruppe";
import { formatDate } from "../../util/dateUtil";
import { FAGOMRAADER } from "../../util/paths";
import { SortState } from "../../util/sortUtil";
import {
  createSortChangeHandler,
  useTablePagination,
} from "../../util/tableUtil";
import FaggrupperExpandableSection from "./FaggrupperExpandableSection";

interface Props {
  data?: Faggruppe[];
}

export const FaggruppeTable = ({ data = [] }: Props) => {
  const [sort, setSort] = useState<SortState<Faggruppe> | undefined>();

  const { safePage, totalPages, paginatedData, handlePageChange } =
    useTablePagination({
      data,
      sortState: sort,
      initialRowsPerPage: 10,
    });

  const handleSortChange = createSortChangeHandler(setSort);

  return (
    <>
      <Table
        zebraStripes
        size="small"
        sort={sort}
        onSortChange={handleSortChange}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Detaljer</Table.HeaderCell>
            <Table.ColumnHeader sortKey="kodeFaggruppe" sortable>
              Kode
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="navnFaggruppe" sortable>
              Navn
            </Table.ColumnHeader>
            <Table.ColumnHeader>Ventedager</Table.ColumnHeader>
            <Table.ColumnHeader>Kjøreplan</Table.ColumnHeader>
            <Table.ColumnHeader>Fagområde</Table.ColumnHeader>
            <Table.ColumnHeader>Redusert skatt</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedData.map((row) => (
            <FaggrupperExpandableSection key={row.kodeFaggruppe} row={row}>
              <Table.DataCell>{row.kodeFaggruppe}</Table.DataCell>
              <Table.DataCell>{row.navnFaggruppe}</Table.DataCell>
              <Table.DataCell>{row.ventedager}</Table.DataCell>
              <Table.DataCell>
                {row.antallKjoreplaner > 0 && (
                  <Link as={RouterLink} to={`${row.kodeFaggruppe}/kjoreplaner`}>
                    {row.nesteKjoreplan
                      ? formatDate(row.nesteKjoreplan)
                      : "Ingen planlagt kjøring"}
                  </Link>
                )}
              </Table.DataCell>
              <Table.DataCell>
                <Link
                  as={RouterLink}
                  to={`${FAGOMRAADER}?faggruppe=${encodeURIComponent(row.kodeFaggruppe)}`}
                >
                  Fagområder
                </Link>
              </Table.DataCell>
              <Table.DataCell>placeholder</Table.DataCell>
            </FaggrupperExpandableSection>
          ))}
        </Table.Body>
      </Table>
      <div className={commonstyles["table-pagination-container"]}>
        <Pagination
          page={safePage}
          onPageChange={handlePageChange}
          count={totalPages}
          size="small"
        />
      </div>
    </>
  );
};

export default FaggruppeTable;
