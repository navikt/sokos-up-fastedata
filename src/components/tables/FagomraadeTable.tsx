import React, { useState } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { Button, Table } from "@navikt/ds-react";
import styles from "../../styles/Commonstyles.module.css";
import { Fagomraader } from "../../types/Fagomraader";
import { SortState, sortData } from "../../util/sortUtil";
import FagomraaderExpandableSection from "../expandablesections/FagomraaderExpandableSection";
import BilagstypeModal from "../modals/BilagstypeModal";
import KorrigeringsarsakModal from "../modals/KorrigeringsarsakModal";

interface Props {
  data?: Fagomraader[];
}

const ModalButton = ({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
}) => (
  <Button
    variant="secondary"
    size="xsmall"
    disabled={disabled}
    onClick={onClick}
  >
    {label}
  </Button>
);

export const FagomraadeTable = ({ data = [] }: Props) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [sort, setSort] = useState<SortState<Fagomraader> | undefined>();
  const [korrModalRefs] = useState(
    () => new Map<number, React.RefObject<HTMLDialogElement>>(),
  );
  const [bilagModalRefs] = useState(
    () => new Map<number, React.RefObject<HTMLDialogElement>>(),
  );

  const sortedData = sortData(data, sort);

  const toggleExpand = (idx: number) =>
    setExpandedRow(expandedRow === idx ? null : idx);

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
        {sortedData.map((row, idx) => {
          if (!korrModalRefs.has(idx))
            korrModalRefs.set(idx, React.createRef());
          if (!bilagModalRefs.has(idx))
            bilagModalRefs.set(idx, React.createRef());

          const korrRef = korrModalRefs.get(idx)!;
          const bilagRef = bilagModalRefs.get(idx)!;

          return (
            <React.Fragment key={idx}>
              <Table.Row>
                <Table.DataCell>
                  <Button
                    variant={expandedRow === idx ? "primary" : "tertiary"}
                    size="xsmall"
                    onClick={() => toggleExpand(idx)}
                    aria-expanded={expandedRow === idx}
                    icon={
                      <ChevronDownIcon
                        className={
                          expandedRow === idx
                            ? styles["expand-toggle-icon-rotated"]
                            : styles["expand-toggle-icon"]
                        }
                        aria-hidden
                      />
                    }
                    iconPosition="right"
                  >
                    Detaljer
                  </Button>
                </Table.DataCell>
                <Table.DataCell>{row.kodeFagomraade}</Table.DataCell>
                <Table.DataCell>{row.navnFagomraade}</Table.DataCell>
                <Table.DataCell>{row.kodeMotregningsgruppe}</Table.DataCell>
                <Table.DataCell>
                  <ModalButton
                    label="Korrigeringsårsak"
                    disabled={!row.korraarsakFinnes}
                    onClick={() => korrRef.current?.showModal()}
                  />
                  <KorrigeringsarsakModal
                    refEl={korrRef}
                    kodeFagomraade={row.kodeFagomraade}
                  />
                </Table.DataCell>
                <Table.DataCell>
                  <ModalButton
                    label="Bilagstype"
                    disabled={!row.bilagstypeFinnes}
                    onClick={() => bilagRef.current?.showModal()}
                  />
                  <BilagstypeModal
                    refEl={bilagRef}
                    kodeFagomraade={row.kodeFagomraade}
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
              </Table.Row>
              {expandedRow === idx && (
                <Table.Row>
                  <Table.DataCell colSpan={7}>
                    <FagomraaderExpandableSection row={row} />
                  </Table.DataCell>
                </Table.Row>
              )}
            </React.Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default FagomraadeTable;
