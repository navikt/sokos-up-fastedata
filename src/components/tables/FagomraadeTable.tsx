import React, { useRef, useState } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { BodyLong, Button, Modal, Table } from "@navikt/ds-react";
import styles from "../../styles/Commonstyles.module.css";
import { Fagomraader } from "../../types/Fagomraader";
import { SortState, sortData } from "../../util/sortUtil";

interface Props {
  data?: Fagomraader[];
}

export const FagomraadeTable = ({ data = [] }: Props) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [sort, setSort] = useState<SortState<Fagomraader> | undefined>();
  const korrModalRefs = useRef<(HTMLDialogElement | null)[]>([]);
  const bilagModalRefs = useRef<(HTMLDialogElement | null)[]>([]);

  const sortedData = sortData(data, sort);

  const handleExpand = (idx: number) => {
    setExpandedRow(expandedRow === idx ? null : idx);
  };

  return (
    <Table
      zebraStripes
      size="small"
      sort={sort}
      onSortChange={(key) => {
        setSort((prev) => {
          const orderBy = key as keyof Fagomraader;
          const isSame = prev?.orderBy === orderBy;
          const direction =
            isSame && prev?.direction === "ascending"
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
          <React.Fragment key={idx}>
            <Table.Row>
              <Table.DataCell>
                <Button
                  variant="tertiary"
                  size="xsmall"
                  onClick={() => handleExpand(idx)}
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
                <Button
                  variant="secondary"
                  size="xsmall"
                  disabled={!row.korraarsakFinnes}
                  onClick={() => korrModalRefs.current[idx]?.showModal()}
                >
                  Korrigeringsårsak
                </Button>
                <Modal
                  ref={(el) => (korrModalRefs.current[idx] = el)}
                  header={{ heading: "Korrigeringsårsak" }}
                >
                  <Modal.Body>
                    <BodyLong>
                      Lorum ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed
                      <b>{row.kodeFagomraade}</b>.
                    </BodyLong>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={() => korrModalRefs.current[idx]?.close()}>
                      Lukk
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Table.DataCell>
              <Table.DataCell>
                <Button
                  variant="secondary"
                  size="xsmall"
                  disabled={!row.bilagstypeFinnes}
                  onClick={() => bilagModalRefs.current[idx]?.showModal()}
                >
                  Bilagstype
                </Button>
                <Modal
                  ref={(el) => (bilagModalRefs.current[idx] = el)}
                  header={{ heading: "Bilagstype" }}
                >
                  <Modal.Body>
                    <BodyLong>
                      Lorum ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed
                      <b>{row.kodeFagomraade}</b>.
                    </BodyLong>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => bilagModalRefs.current[idx]?.close()}
                    >
                      Lukk
                    </Button>
                  </Modal.Footer>
                </Modal>
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
                  <div className={styles["expandable-section"]}>
                    <div className={styles["expandable-section-columns"]}>
                      <div className={styles["expandable-section-column"]}>
                        <div>
                          <b>Kode:</b> {row.kodeFagomraade}
                        </div>
                        <div>
                          <b>Antall attestanter:</b> {row.antAttestanter}
                        </div>
                        <div>
                          <b>Sjekk offnr ID:</b> {row.sjekkOffId ? "Ja" : "Nei"}
                        </div>
                      </div>
                      <div className={styles["expandable-section-column"]}>
                        <div>
                          <b>Navn:</b> {row.navnFagomraade}
                        </div>
                        <div>
                          <b>Maks aktive oppdrag:</b> {row.maksAktOppdrag}
                        </div>
                        <div>
                          <b>Anviser:</b> {row.anviser ? "Ja" : "Nei"}
                        </div>
                      </div>
                      <div className={styles["expandable-section-column"]}>
                        <div>
                          <b>Faggruppe:</b> {row.kodeFaggruppe}
                        </div>
                        <div>
                          <b>TPS distribusjon:</b>{" "}
                          {row.tpsDistribusjon ? "Ja" : "Nei"}
                        </div>
                        <div>
                          <b>Sjekk mot TPS:</b> {row.sjekkMotTps ? "Ja" : "Nei"}
                        </div>
                      </div>
                    </div>
                  </div>
                </Table.DataCell>
              </Table.Row>
            )}
          </React.Fragment>
        ))}
      </Table.Body>
    </Table>
  );
};

export default FagomraadeTable;
