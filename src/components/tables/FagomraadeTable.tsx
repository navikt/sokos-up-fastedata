import React, { useEffect, useState } from "react";
import { Button, Pagination, Table } from "@navikt/ds-react";
import { Fagomraader } from "../../types/Fagomraader";
import { SortState, sortData } from "../../util/sortUtil";
import FagomraaderExpandableSection from "../expandablesections/FagomraaderExpandableSection";
import BilagstypeModal from "../modals/BilagstypeModal";
import KorrigeringsarsakModal from "../modals/KorrigeringsarsakModal";

interface Props {
  data?: Fagomraader[];
}

export const FagomraadeTable = ({ data = [] }: Props) => {
  const [sort, setSort] = useState<SortState<Fagomraader> | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const sortedData = sortData(data, sort);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // Reset currentPage to 1 only when the data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <>
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
          {paginatedData.map((row, idx) => (
            <FagomraaderExpandableSection key={idx} row={row}>
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
                <Button
                  variant="tertiary"
                  size="xsmall"
                  disabled={!row.klassekodeFinnes}
                >
                  Klassekode
                </Button>
              </Table.DataCell>
            </FagomraaderExpandableSection>
          ))}
        </Table.Body>
      </Table>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
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

export default FagomraadeTable;
