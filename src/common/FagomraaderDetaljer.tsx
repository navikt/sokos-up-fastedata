import { Alert, BodyShort, Heading, Link, Table } from "@navikt/ds-react";
import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router";
import { useGetFagomraader } from "../api/apiService";
import commonstyles from "../styles/commonstyles.module.css";
import type { Fagomraader } from "../types/Fagomraader";
import { FAGOMRAADER, KLASSEKODER } from "../util/paths";
import { type SortState, sortData } from "../util/sortUtil";
import BackHomeBox from "./BackHomeBox";
import filterstyles from "./CommonFilterStyles.module.css";
import ContentLoader from "./ContentLoader";
import styles from "./FagomraaderDetaljer.module.css";

type Breadcrumb = {
	label: string;
	to?: string;
};

interface FagomraaderDetaljerProps {
	title: string;
	breadcrumbs: Breadcrumb[];
	descriptionLabel: string;
	descriptionValue: string;
	filterPredicate: (fagomraade: Fagomraader) => boolean;
	stateValue?: Record<string, unknown>;
	emptyMessage: string;
}

const FagomraaderDetaljer = ({
	title,
	breadcrumbs,
	descriptionLabel,
	descriptionValue,
	filterPredicate,
	stateValue,
	emptyMessage,
}: FagomraaderDetaljerProps) => {
	const { data: allFagomraader, error, isLoading } = useGetFagomraader();
	const [sort, setSort] = useState<SortState<Fagomraader> | undefined>({
		orderBy: "kodeFagomraade",
		direction: "ascending",
	});

	const filteredFagomraader = useMemo(() => {
		if (!allFagomraader) return [];
		return allFagomraader.filter(filterPredicate);
	}, [allFagomraader, filterPredicate]);

	const fagomraaderData = useMemo(() => {
		return sortData(filteredFagomraader, sort);
	}, [filteredFagomraader, sort]);

	const handleSortChange = (key: string | undefined) => {
		setSort((prev) => {
			const orderBy = key as keyof Fagomraader;
			const direction =
				prev?.orderBy === orderBy && prev?.direction === "ascending"
					? "descending"
					: "ascending";
			return { orderBy, direction };
		});
	};

	return (
		<div className={commonstyles.container}>
			<div className={commonstyles["content-wrapper"]}>
				<Heading
					spacing
					size="medium"
					level="1"
					className={commonstyles["page-heading"]}
				>
					{title}
				</Heading>

				<BackHomeBox breadcrumbs={breadcrumbs} />

				<div className={filterstyles["filter-container"]}>
					<div className={styles.row}>
						<BodyShort weight="semibold">{descriptionLabel}</BodyShort>{" "}
						{descriptionValue}
					</div>
				</div>

				{isLoading ? (
					<ContentLoader />
				) : error ? (
					<Alert variant="error">Feil ved lasting av fagområder</Alert>
				) : fagomraaderData.length > 0 ? (
					<Table
						zebraStripes
						size="small"
						sort={sort}
						onSortChange={handleSortChange}
					>
						<Table.Header>
							<Table.Row>
								<Table.ColumnHeader sortKey="kodeFagomraade" sortable>
									Kode
								</Table.ColumnHeader>
								<Table.ColumnHeader sortKey="navnFagomraade" sortable>
									Navn
								</Table.ColumnHeader>
								<Table.HeaderCell scope="col">Klassekoder</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{fagomraaderData.map((fagomraade) => (
								<Table.Row key={fagomraade.kodeFagomraade}>
									<Table.DataCell>
										<Link
											as={RouterLink}
											to={`${FAGOMRAADER}?fagomraade=${encodeURIComponent(fagomraade.kodeFagomraade)}`}
											state={stateValue}
										>
											{fagomraade.kodeFagomraade}
										</Link>
									</Table.DataCell>
									<Table.DataCell>{fagomraade.navnFagomraade}</Table.DataCell>
									<Table.DataCell>
										<Link
											as={RouterLink}
											to={`${KLASSEKODER}?fagomraade=${encodeURIComponent(fagomraade.kodeFagomraade)}`}
										>
											Klassekoder
										</Link>
									</Table.DataCell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				) : (
					<Alert variant="info" role="status">
						{emptyMessage}
					</Alert>
				)}
			</div>
		</div>
	);
};

export default FagomraaderDetaljer;
