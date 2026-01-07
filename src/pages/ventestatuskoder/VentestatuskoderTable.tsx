import { Pagination, Table } from "@navikt/ds-react";
import { useState } from "react";
import TableControls from "../../common/TableControls";
import commonstyles from "../../styles/commonstyles.module.css";
import type { Ventestatuskoder } from "../../types/Ventestatuskoder";
import type { SortState } from "../../util/sortUtil";
import {
	createSortChangeHandler,
	useTablePagination,
} from "../../util/tableUtil";

type Props = {
	data?: Ventestatuskoder[];
};

const VentestatuskoderTable = ({ data = [] }: Props) => {
	const [sortState, setSortState] = useState<
		SortState<Ventestatuskoder> | undefined
	>();

	const {
		currentPage,
		safePage,
		totalPages,
		paginatedData,
		tableKey,
		updateRowsPerPage,
		handlePageChange,
		rowsPerPage,
	} = useTablePagination({
		data,
		sortState,
	});

	const handleSortChange = createSortChangeHandler(setSortState);

	return (
		<>
			<TableControls
				totalCount={data.length}
				currentPage={currentPage}
				totalPages={totalPages}
				rowsPerPage={rowsPerPage}
				updateRowsPerPage={updateRowsPerPage}
			/>

			<Table
				key={tableKey}
				zebraStripes
				size="small"
				sort={sortState}
				onSortChange={handleSortChange}
				className="ventestatuskoder-table"
			>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeader sortable sortKey="kodeVentestatus">
							Ventestatuskode
						</Table.ColumnHeader>
						<Table.ColumnHeader sortable sortKey="beskrivelse">
							Beskrivelse
						</Table.ColumnHeader>
						<Table.ColumnHeader>Prioritet</Table.ColumnHeader>
						<Table.ColumnHeader>Settes manuelt</Table.ColumnHeader>
						<Table.ColumnHeader>Kode arves til</Table.ColumnHeader>
						<Table.ColumnHeader>Kan manuelt endres til</Table.ColumnHeader>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{paginatedData.map((row) => (
						<Table.Row key={row.kodeVentestatus}>
							<Table.DataCell>{row.kodeVentestatus}</Table.DataCell>
							<Table.DataCell>{row.beskrivelse}</Table.DataCell>
							<Table.DataCell>{row.prioritet}</Table.DataCell>
							<Table.DataCell>
								{row.settesManuelt === "J" ? "Ja" : "Nei"}
							</Table.DataCell>
							<Table.DataCell>{row.kodeArvesTil}</Table.DataCell>
							<Table.DataCell>{row.kanManueltEndresTil}</Table.DataCell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>

			<div className={commonstyles["table-pagination-container"]}>
				<Pagination
					page={safePage}
					onPageChange={handlePageChange}
					count={totalPages}
					size="small"
				/>
			</div>
		</>
	);
};

export default VentestatuskoderTable;
