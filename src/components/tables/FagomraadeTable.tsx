import React, { useState } from "react";
import { Button, Table } from "@navikt/ds-react";
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

  const sortedData = sortData(data, sort);

  return (
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
        {sortedData.map((row, idx) => (
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
  );
};

export default FagomraadeTable;
