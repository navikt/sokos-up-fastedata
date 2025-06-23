import React, { useState } from "react";
import { Button, Pagination, Table } from "@navikt/ds-react";
import { Fagomraader } from "../../types/Fagomraader";
import { SortState, sortData } from "../../util/sortUtil";
import FagomraaderExpandableSection from "../expandablesections/FagomraaderExpandableSection";
import FagomraaderFilter from "../fagomraaderfilter/FagomraaderFilter";
import BilagstypeModal from "../modals/BilagstypeModal";
import KorrigeringsarsakModal from "../modals/KorrigeringsarsakModal";

interface Props {
  data?: Fagomraader[];
}

export const FagomraadeTable = ({ data = [] }: Props) => {
  const [sort, setSort] = useState<SortState<Fagomraader> | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [filteredData, setFilteredData] = useState<Fagomraader[]>(data);

  const sortedData = sortData(filteredData, sort);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <>
      <FagomraaderFilter
        data={data}
        onFilter={setFilteredData}
        resetPage={() => setCurrentPage(1)} // Reset page to 1 when filters are applied
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
