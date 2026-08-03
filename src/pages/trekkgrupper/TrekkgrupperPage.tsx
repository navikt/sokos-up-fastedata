import { Alert, LocalAlert } from "@navikt/ds-react";
import { useGetTrekkgrupper } from "../../api/apiService";
import ContentLoader from "../../components/ContentLoader";
import PageLayout from "../../components/PageLayout";
import { useSimpleFilter } from "../../util/useSimpleFilter";
import TrekkgrupperFilter from "./TrekkgrupperFilter";
import styles from "./TrekkgrupperPage.module.css";
import TrekkgrupperTable from "./TrekkgrupperTable";

export const TrekkgrupperPage = () => {
	const { data, error, isLoading } = useGetTrekkgrupper();

	const { filters, filteredData, handleFiltersChange } = useSimpleFilter(
		data,
		"trekkgruppe",
		(item) =>
			`Trekkgruppe: ${item.kodeTrekkgruppe} Fagområde: ${item.kodeFagomraade}`,
	);

	if (isLoading) return <ContentLoader />;

	return (
		<PageLayout
			title="Faste data - Trekkgrupper"
			contentWrapperClassName={styles["content-wrapper"]}
		>
			{data && (
				<TrekkgrupperFilter
					data={data}
					activeFilters={filters}
					onFiltersChange={handleFiltersChange}
				/>
			)}

			{error ? (
				<LocalAlert status="error">
					<LocalAlert.Header>
						<LocalAlert.Title>Nettverksfeil</LocalAlert.Title>
					</LocalAlert.Header>
				</LocalAlert>
			) : filteredData.length > 0 ? (
				<TrekkgrupperTable key={filters.join(",")} data={filteredData} />
			) : (
				<Alert variant="info">Ingen data tilgjengelig</Alert>
			)}
		</PageLayout>
	);
};

export default TrekkgrupperPage;
