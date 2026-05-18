import { Alert, Table } from "@navikt/ds-react";
import { useGetRedusertSkatt } from "../../api/apiService";
import LazyFetchModal from "../../common/LazyFetchModal";
import { formatDate } from "../../util/dateUtil";

interface Props {
	kodeFaggruppe: string;
	buttonText: string;
	disabled: boolean;
}

const RedusertSkattModalContent = ({
	kodeFaggruppe,
}: {
	kodeFaggruppe: string;
}) => {
	const { data, error } = useGetRedusertSkatt({ faggruppe: kodeFaggruppe });

	if (error)
		return <Alert variant="error">Feil ved lasting av redusert skatt</Alert>;

	return (
		<Table>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell scope="col">Faggruppe</Table.HeaderCell>
					<Table.HeaderCell scope="col">Periode</Table.HeaderCell>
					<Table.HeaderCell scope="col">Prosent</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{data?.map((item) => (
					<Table.Row
						key={`${item.kodeFaggruppe}-${item.datoFom}-${item.datoTom}`}
					>
						<Table.DataCell>{item.kodeFaggruppe}</Table.DataCell>
						<Table.DataCell>{`${formatDate(item.datoFom.toString())} - ${formatDate(item.datoTom.toString())}`}</Table.DataCell>
						<Table.DataCell>{item.prosent}</Table.DataCell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
};

const RedusertSkattModal = ({ kodeFaggruppe, buttonText, disabled }: Props) => (
	<LazyFetchModal
		buttonText={buttonText}
		disabled={disabled}
		heading={`Faste data - Faggruppe ${kodeFaggruppe} - Redusert Skatt`}
		bodyStyle={{ height: "600px", overflow: "auto" }}
		renderContent={(shouldFetch) =>
			shouldFetch ? (
				<RedusertSkattModalContent kodeFaggruppe={kodeFaggruppe} />
			) : null
		}
	/>
);

export default RedusertSkattModal;
