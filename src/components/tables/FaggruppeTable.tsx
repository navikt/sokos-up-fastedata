import { useState } from "react";
import { Link as RouterLink } from "react-router";
import { Link, Pagination, Table } from "@navikt/ds-react";
import commonstyles from "../../styles/commonstyles2.module.css";
import { Faggruppe } from "../../types/Faggruppe";
import { FAGOMRAADER } from "../../util/constant";
import { SortState, sortData } from "../../util/sortUtil";
import FaggrupperExpandableSection from "../expandablesections/FaggrupperExpandableSection";

interface Props {
  data?: Faggruppe[];
}

export const FaggruppeTable = ({ data = [] }: Props) => {
  const [sort, setSort] = useState<SortState<Faggruppe> | undefined>();
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
            const orderBy = key as keyof Faggruppe;
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
              <Table.DataCell>placeholder</Table.DataCell>
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
          page={currentPage}
          onPageChange={setCurrentPage}
          count={totalPages}
          size="small"
        />
      </div>
    </>
  );
};

export default FaggruppeTable;
