import { Alert, Table } from "@navikt/ds-react";
import { useGetBilagstyper } from "../../api/apiService";
import LazyFetchModal from "../../common/LazyFetchModal";

interface Props {
	kodeFagomraade: string;
	buttonText: string;
	disabled: boolean;
}

const BilagstypeModalContent = ({
	kodeFagomraade,
}: {
	kodeFagomraade: string;
}) => {
	const { data, error } = useGetBilagstyper(kodeFagomraade);

	if (error)
		return <Alert variant="error">Feil ved lasting av bilagstyper</Alert>;

	return (
		<Table>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell scope="col">Type bilag</Table.HeaderCell>
					<Table.HeaderCell scope="col">Dato fra</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{data?.map((item) => (
					<Table.Row key={`${item.typeBilag}-${item.datoFom}`}>
						<Table.DataCell>{item.typeBilag}</Table.DataCell>
						<Table.DataCell>{item.datoFom}</Table.DataCell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
};

const BilagstypeModal = ({ kodeFagomraade, buttonText, disabled }: Props) => (
	<LazyFetchModal
		buttonText={buttonText}
		disabled={disabled}
		heading={`Faste data - Fagområde ${kodeFagomraade} - Bilagstype`}
		renderContent={(shouldFetch) =>
			shouldFetch ? (
				<BilagstypeModalContent kodeFagomraade={kodeFagomraade} />
			) : null
		}
	/>
);

export default BilagstypeModal;
