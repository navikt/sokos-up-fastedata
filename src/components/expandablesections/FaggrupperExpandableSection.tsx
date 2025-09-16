import React from "react";
import { Table } from "@navikt/ds-react";
import commonstyles from "../../styles/commonstyles.module.css";
import { Faggruppe } from "../../types/Faggruppe";

interface Props {
  row: Faggruppe;
  children: React.ReactNode;
}

const FaggrupperExpandableSection = ({ row, children }: Props) => (
  <Table.ExpandableRow
    content={
      <div className={commonstyles["expandable-section-content"]}>
        <div>
          <b>Kode:</b> {row.kodeFaggruppe}
        </div>
        <div>
          <b>Ventedager:</b> {row.ventedager}
        </div>
        <div>
          <b>Destinasjon:</b> {row.destinasjon}
        </div>
        <div>
          <b>Klassekode motp. feil:</b> {row.klassekodeMotpFeil}
        </div>
        <div>
          <b>Prioritet:</b> {row.prioritet}
        </div>
        <div>
          <b>Øreavrunding:</b> {row.oereavrunding ? "Ja" : "Nei"}
        </div>
        <div>
          <b>Navn:</b> {row.kodeFaggruppe}
        </div>
        <div>
          <b>Klassekode feil:</b> {row.klassekodeFeil}
        </div>
        <div>
          <b>Online beregning:</b> {row.onlineBeregning ? "Ja" : "Nei"}
        </div>
        <div>
          <b>Samordnet beregning:</b> {row.samordnetBeregning}
        </div>
        <div>
          <b>Skatteprosent:</b> {row.skatteprosent}
        </div>
        <div>
          <b>Klassekode justering:</b> {row.klassekodeJustering}
        </div>
        <div>
          <b>Reskontro oppdrag:</b> {row.reskontroOppdrag}
        </div>
        <div>
          <b>Klassekode motp. innkr.:</b> {row.klassekodeMotpInnkr}
        </div>
        <div>
          <b>Pensjon:</b> {row.pensjon}
        </div>
      </div>
    }
  >
    {children}
  </Table.ExpandableRow>
);

export default FaggrupperExpandableSection;
