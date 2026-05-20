import { Alert, Table } from "@navikt/ds-react";
import { useGetKorrigeringsaarsaker } from "../../api/apiService";
import LazyFetchModal from "../../common/LazyFetchModal";

interface Props {
	kodeFagomraade: string;
	buttonText: string;
	disabled: boolean;
}

const KorrigeringsarsakModalContent = ({
	kodeFagomraade,
}: {
	kodeFagomraade: string;
}) => {
	const { data, error } = useGetKorrigeringsaarsaker(kodeFagomraade);

	if (error)
		return (
			<Alert variant="error">Feil ved lasting av korrigeringsårsaker</Alert>
		);

	return (
		<Table>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell scope="col">Kode</Table.HeaderCell>
					<Table.HeaderCell scope="col">Navn</Table.HeaderCell>
					<Table.HeaderCell scope="col">Medfører korrigering</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{data?.map((item) => (
					<Table.Row key={item.kodeAarsakKorr}>
						<Table.DataCell>{item.kodeAarsakKorr}</Table.DataCell>
						<Table.DataCell>{item.beskrivelse}</Table.DataCell>
						<Table.DataCell>{item.medforerKorr ? "Ja" : "Nei"}</Table.DataCell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
};

const KorrigeringsarsakModal = ({
	kodeFagomraade,
	buttonText,
	disabled,
}: Props) => (
	<LazyFetchModal
		buttonText={buttonText}
		disabled={disabled}
		heading={`Faste data - Fagområde ${kodeFagomraade} - Korrigeringsårsak`}
		bodyStyle={{ height: "600px", overflow: "auto" }}
		renderContent={(shouldFetch) =>
			shouldFetch ? (
				<KorrigeringsarsakModalContent kodeFagomraade={kodeFagomraade} />
			) : null
		}
	/>
);

export default KorrigeringsarsakModal;
