import { Button, Modal, Table } from "@navikt/ds-react";
import { useRef } from "react";

interface Props {
	kodeTrekktype: string;
	fagomraader: string[];
}

const FagomraadeListeModal = ({ kodeTrekktype, fagomraader }: Props) => {
	const ref = useRef<HTMLDialogElement>(null);

	return (
		<div>
			<Button
				variant="secondary"
				size="xsmall"
				onClick={() => ref.current?.showModal()}
			>
				{fagomraader.length} fagområder
			</Button>

			<Modal
				ref={ref}
				header={{
					heading: `Trekktype ${kodeTrekktype} - Fagområder`,
				}}
				width={400}
				onClose={() => ref.current?.close()}
			>
				<Modal.Body>
					<Table size="small">
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell scope="col">Fagområde</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{fagomraader.map((fagomraade) => (
								<Table.Row key={fagomraade}>
									<Table.DataCell>{fagomraade}</Table.DataCell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				</Modal.Body>
				<Modal.Footer>
					<Button type="button" onClick={() => ref.current?.close()}>
						Lukk
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default FagomraadeListeModal;
