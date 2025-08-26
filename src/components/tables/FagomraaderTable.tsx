import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router";
import { Link, Pagination, Table } from "@navikt/ds-react";
import commonstyles from "../../styles/Commonstyles.module.css";
import { Fagomraader } from "../../types/Fagomraader";
import { KLASSEKODER } from "../../util/constant";
import { SortState, sortData } from "../../util/sortUtil";
import FagomraaderExpandableSection from "../expandablesections/FagomraaderExpandableSection";
import BilagstypeModal from "../modals/BilagstypeModal";
import KorrigeringsarsakModal from "../modals/KorrigeringsarsakModal";
import RowsPerPageSelector from "../rowsperpageselector/RowsPerPageSelector";

interface Props {
  data?: Fagomraader[];
}

export const FagomraaderTable = ({ data = [] }: Props) => {
  const [sort, setSort] = useState<SortState<Fagomraader> | undefined>();
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

  const updateRowsPerPage = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  return (
    <>
      <RowsPerPageSelector
        rowsPerPage={rowsPerPage}
        updateRowsPerPage={updateRowsPerPage}
      />

      <Table
        zebraStripes
        size="small"
        sort={sort}
        onSortChange={(key) => {
          setSort((prev) => {
            const orderBy = key as keyof Fagomraader;
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
            <Table.ColumnHeader sortKey="kodeFagomraade" sortable>
              Kode
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="navnFagomraade" sortable>
              Navn
            </Table.ColumnHeader>
            <Table.HeaderCell>Motregningsgruppe</Table.HeaderCell>
            <Table.HeaderCell>Korrigeringsårsak</Table.HeaderCell>
            <Table.HeaderCell>Bilagstype</Table.HeaderCell>
            <Table.HeaderCell>Klassekode</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedData.map((row) => (
            <FagomraaderExpandableSection key={row.kodeFagomraade} row={row}>
              <Table.DataCell>{row.kodeFagomraade}</Table.DataCell>
              <Table.DataCell>{row.navnFagomraade}</Table.DataCell>
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
            </FagomraaderExpandableSection>
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

export default FagomraaderTable;
