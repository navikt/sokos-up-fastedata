import { Table } from "@navikt/ds-react";
import type React from "react";
import commonstyles from "../../styles/commonstyles.module.css";
import type { Fagomraader } from "../../types/Fagomraader";

interface Props {
	row: Fagomraader;
	children: React.ReactNode;
}

const FagomraaderExpandableSection = ({ row, children }: Props) => (
	<Table.ExpandableRow
		content={
			<div className={commonstyles["expandable-section-content"]}>
				<div>
					<b>Kode:</b> {row.kodeFagomraade}
				</div>
				<div>
					<b>Antall attestanter:</b> {row.antAttestanter}
				</div>
				<div>
					<b>Sjekk offnr ID:</b> {row.sjekkOffId ? "Ja" : "Nei"}
				</div>
				<div>
					<b>Navn:</b> {row.navnFagomraade}
				</div>
				<div>
					<b>Maks aktive oppdrag:</b> {row.maksAktOppdrag}
				</div>
				<div>
					<b>Anviser:</b> {row.anviser ? "Ja" : "Nei"}
				</div>
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
		}
	>
		{children}
	</Table.ExpandableRow>
);

export default FagomraaderExpandableSection;
