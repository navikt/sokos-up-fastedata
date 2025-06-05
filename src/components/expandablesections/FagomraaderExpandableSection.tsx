import React from "react";
import styles from "../../styles/Commonstyles.module.css";
import { Fagomraader } from "../../types/Fagomraader";

interface Props {
  row: Fagomraader;
}

const FagomraaderExpandableSection = ({ row }: Props) => (
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
          <b>TPS distribusjon:</b> {row.tpsDistribusjon ? "Ja" : "Nei"}
        </div>
        <div>
          <b>Sjekk mot TPS:</b> {row.sjekkMotTps ? "Ja" : "Nei"}
        </div>
      </div>
    </div>
  </div>
);

export default FagomraaderExpandableSection;
