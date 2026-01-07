import { Alert, Button, Modal, Table } from "@navikt/ds-react";
import { useRef, useState } from "react";
import { useGetKorrigeringsaarsaker } from "../../api/apiService";

interface Props {
	kodeFagomraade: string;
	buttonText: string;
	disabled: boolean;
}

const KorrigeringsarsakModal = ({
	kodeFagomraade,
	buttonText,
	disabled,
}: Props) => {
	const ref = useRef<HTMLDialogElement>(null);
	const [shouldFetch, setShouldFetch] = useState(false);

	const { data, error } = useGetKorrigeringsaarsaker(
		shouldFetch ? kodeFagomraade : "",
	);

	const handleClick = () => {
		setShouldFetch(true);
		ref.current?.showModal();
	};

	const handleClose = () => {
		ref.current?.close();
	};

	return (
		<div>
			<Button
				variant="secondary"
				size="xsmall"
				disabled={disabled}
				onClick={handleClick}
			>
				{buttonText}
			</Button>

			<Modal
				ref={ref}
				header={{
					heading: `Faste data - Fagområde ${kodeFagomraade} - Korrigeringsårsak`,
				}}
				width={900}
				onClose={handleClose}
			>
				<Modal.Body style={{ height: "600px", overflow: "auto" }}>
					{error ? (
						<Alert variant="error">
							Feil ved lasting av korrigeringsårsaker
						</Alert>
					) : (
						<Table>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell scope="col">Kode</Table.HeaderCell>
									<Table.HeaderCell scope="col">Navn</Table.HeaderCell>
									<Table.HeaderCell scope="col">
										Medfører korrigering
									</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{data?.map((item) => (
									<Table.Row key={item.kodeAarsakKorr}>
										<Table.DataCell>{item.kodeAarsakKorr}</Table.DataCell>
										<Table.DataCell>{item.beskrivelse}</Table.DataCell>
										<Table.DataCell>
											{item.medforerKorr ? "Ja" : "Nei"}
										</Table.DataCell>
									</Table.Row>
								))}
							</Table.Body>
						</Table>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button type="button" onClick={handleClose}>
						Lukk
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default KorrigeringsarsakModal;
