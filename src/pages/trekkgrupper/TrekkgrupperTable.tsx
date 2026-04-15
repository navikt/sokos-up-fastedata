import { Pagination, Table } from "@navikt/ds-react";
import { useState } from "react";
import TableControls from "../../common/TableControls";
import commonstyles from "../../styles/commonstyles.module.css";
import type { Trekkgruppe } from "../../types/Trekkgruppe";
import type { SortState } from "../../util/sortUtil";
import {
	createSortChangeHandler,
	useTablePagination,
} from "../../util/tableUtil";

type Props = {
	data?: Trekkgruppe[];
};

const TrekkgrupperTable = ({ data = [] }: Props) => {
	const [sortState, setSortState] = useState<
		SortState<Trekkgruppe> | undefined
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
			>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeader sortable sortKey="kodeTrekkgruppe">
							Trekkgrupper
						</Table.ColumnHeader>
						<Table.ColumnHeader sortable sortKey="kodeFagomraade">
							Fagområde
						</Table.ColumnHeader>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{paginatedData.map((row) => (
						<Table.Row key={`${row.kodeTrekkgruppe}-${row.kodeFagomraade}`}>
							<Table.DataCell>{row.kodeTrekkgruppe}</Table.DataCell>
							<Table.DataCell>{row.kodeFagomraade}</Table.DataCell>
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

export default TrekkgrupperTable;
