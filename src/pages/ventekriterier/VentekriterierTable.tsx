import { Pagination, Table } from "@navikt/ds-react";
import TableControls from "../../common/TableControls";
import commonstyles from "../../styles/commonstyles.module.css";
import type { Ventekriterier } from "../../types/Ventekriterier";
import { useTablePagination } from "../../util/tableUtil";
import { formatNumber } from "./tallUtil";

type Props = {
	data?: Ventekriterier[];
};

export const VentekriterierTable = ({ data = [] }: Props) => {
	const {
		currentPage,
		safePage,
		totalPages,
		paginatedData,
		updateRowsPerPage,
		handlePageChange,
		rowsPerPage,
	} = useTablePagination({
		data,
	});

	return (
		<>
			<TableControls
				totalCount={data.length}
				currentPage={currentPage}
				totalPages={totalPages}
				rowsPerPage={rowsPerPage}
				updateRowsPerPage={updateRowsPerPage}
			/>

			<Table zebraStripes size="small">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Kode Faggruppe</Table.HeaderCell>
						<Table.HeaderCell>Bilagstype</Table.HeaderCell>
						<Table.HeaderCell>Dato f.o.m</Table.HeaderCell>
						<Table.HeaderCell>Beløp brutto</Table.HeaderCell>
						<Table.HeaderCell>Beløp netto</Table.HeaderCell>
						<Table.HeaderCell>Antall dager eldre enn</Table.HeaderCell>
						<Table.HeaderCell>Tidligere år</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{paginatedData.map((row) => (
						<Table.Row key={row.kodeFaggruppe}>
							<Table.DataCell>{row.kodeFaggruppe}</Table.DataCell>
							<Table.DataCell>{row.typeBilag}</Table.DataCell>
							<Table.DataCell>{row.datoFom}</Table.DataCell>
							<Table.DataCell>{formatNumber(row.belopBrutto)}</Table.DataCell>
							<Table.DataCell>{formatNumber(row.belopNetto)}</Table.DataCell>
							<Table.DataCell>{row.antDagerEldreenn ?? "—"}</Table.DataCell>
							<Table.DataCell>{row.tidligereAar ? "Ja" : "Nei"}</Table.DataCell>
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

export default VentekriterierTable;
