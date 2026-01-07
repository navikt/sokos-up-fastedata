import { Table, Tooltip } from "@navikt/ds-react";

interface Props {
	value?: string | number | null;
	tooltip?: string | null;
}

const HoverInfoCell = ({ value, tooltip }: Props) => {
	if (!value) return <Table.DataCell />;

	return (
		<Table.DataCell>
			{tooltip ? (
				<Tooltip content={tooltip}>
					<span>{value}</span>
				</Tooltip>
			) : (
				value
			)}
		</Table.DataCell>
	);
};

export default HoverInfoCell;
