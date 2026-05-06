import { Pagination, Table } from "@navikt/ds-react";
import { useState } from "react";
import TableControls from "../../../common/TableControls";
import commonstyles from "../../../styles/commonstyles.module.css";
import type { KjoreplanTrekk } from "../../../types/KjoreplanTrekk";
import { formatDate } from "../../../util/dateUtil";
import type { SortState } from "../../../util/sortUtil";
import {
	createSortChangeHandler,
	useTablePagination,
} from "../../../util/tableUtil";

interface Props {
	past?: boolean;
	data?: KjoreplanTrekk[];
}

export const KjoreplanTrekkTable = ({ past, data = [] }: Props) => {
	const [sort, setSort] = useState<SortState<KjoreplanTrekk> | undefined>();

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
		sortState: sort,
	});

	const handleSortChange = createSortChangeHandler(setSort);

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
				sort={sort}
				onSortChange={handleSortChange}
			>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeader sortKey="kodeOppgjorstype" sortable>
							Oppgjørstype
						</Table.ColumnHeader>
						<Table.ColumnHeader sortKey="datoKjores" sortable>
							{past ? "Dato kjørt" : "Dato kjøres"}
						</Table.ColumnHeader>
						<Table.ColumnHeader sortKey="status" sortable>
							Status
						</Table.ColumnHeader>
						<Table.HeaderCell>Periode</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{paginatedData.map((row) => (
						<Table.Row
							key={`${row.kodeOppgjorstype}-${row.datoKjores}-${row.datoPeriodeFom}-${row.datoPeriodeTom}`}
						>
							<Table.DataCell>{row.kodeOppgjorstype}</Table.DataCell>
							<Table.DataCell>{formatDate(row.datoKjores)}</Table.DataCell>
							<Table.DataCell>{row.status}</Table.DataCell>
							<Table.DataCell>
								{formatDate(row.datoPeriodeFom)} -{" "}
								{formatDate(row.datoPeriodeTom)}
							</Table.DataCell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
			{totalPages > 1 && (
				<div className={commonstyles["table-pagination-container"]}>
					<Pagination
						page={safePage}
						onPageChange={handlePageChange}
						count={totalPages}
						size="small"
					/>
				</div>
			)}
		</>
	);
};

export default KjoreplanTrekkTable;
