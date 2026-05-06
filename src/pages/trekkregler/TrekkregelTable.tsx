import { Link, Pagination, Table } from "@navikt/ds-react";
import { useState } from "react";
import { generatePath, Link as RouterLink } from "react-router";
import TableControls from "../../common/TableControls";
import commonstyles from "../../styles/commonstyles.module.css";
import type { Trekkregel } from "../../types/Trekkregel";
import { TREKKREGLER_KJOREPLANER } from "../../util/paths";
import type { SortState } from "../../util/sortUtil";
import {
	createSortChangeHandler,
	useTablePagination,
} from "../../util/tableUtil";

type Props = {
	data?: Trekkregel[];
};

const TrekkregelTable = ({ data = [] }: Props) => {
	const [sortState, setSortState] = useState<
		SortState<Trekkregel> | undefined
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
		initialRowsPerPage: 25,
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
						<Table.HeaderCell>Detaljer</Table.HeaderCell>
						<Table.ColumnHeader sortable sortKey="kodeTrekktype">
							Trekktype
						</Table.ColumnHeader>
						<Table.ColumnHeader sortable sortKey="beskrivelse">
							Beskrivelse
						</Table.ColumnHeader>
						<Table.ColumnHeader sortable sortKey="prioritet">
							Prioritet
						</Table.ColumnHeader>
						<Table.ColumnHeader sortable sortKey="reduserSkattegr">
							Reduser skattegrl.
						</Table.ColumnHeader>
						<Table.ColumnHeader sortable sortKey="kodeKlasseTrekk">
							Klassekode
						</Table.ColumnHeader>
						<Table.ColumnHeader sortable sortKey="typeTrekkberegning">
							Type trekkberegning
						</Table.ColumnHeader>
						<Table.HeaderCell>Kjøreplan</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{paginatedData.map((row) => (
						<Table.ExpandableRow
							key={`${row.kodeTrekktype}-${row.kodeFagomraade}`}
							content={
								<div className={commonstyles["expandable-section-content"]}>
									<div>
										<b>Behandlingskode:</b> {row.kodeBehandling}
									</div>
									<div>
										<b>Oppgjørstype:</b> {row.kodeOppgjorstype}
									</div>
									<div>
										<b>Oppgjørstype neg.:</b> {row.kodeOppgjorstypeNeg}
									</div>
									<div>
										<b>Fagområde:</b> {row.kodeFagomraade}
									</div>
									<div>
										<b>Bruker-ID:</b> {row.brukerId}
									</div>
									<div>
										<b>Beløpsgrense:</b> {row.belopsgrense}
									</div>
									<div>
										<b>Oppfølging:</b> {row.oppfolging}
									</div>
									<div>
										<b>Ant. dager oppf.:</b> {row.antDagerOppf ?? "-"}
									</div>
									<div>
										<b>Ant. dager oppf. utf.:</b> {row.antDagerOppfUtf ?? "-"}
									</div>
								</div>
							}
						>
							<Table.DataCell>{row.kodeTrekktype}</Table.DataCell>
							<Table.DataCell>{row.beskrivelse}</Table.DataCell>
							<Table.DataCell>{row.prioritet}</Table.DataCell>
							<Table.DataCell>{row.reduserSkattegr}</Table.DataCell>
							<Table.DataCell>{row.kodeKlasseTrekk}</Table.DataCell>
							<Table.DataCell>{row.typeTrekkberegning ?? "-"}</Table.DataCell>
							<Table.DataCell>
								<Link
									as={RouterLink}
									to={generatePath(TREKKREGLER_KJOREPLANER, {
										oppgjorstype: row.kodeOppgjorstype,
									})}
									state={{ trekkregel: row }}
								>
									Kjøreplan
								</Link>
							</Table.DataCell>
						</Table.ExpandableRow>
					))}
				</Table.Body>
			</Table>

			{data.length > rowsPerPage && (
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

export default TrekkregelTable;
