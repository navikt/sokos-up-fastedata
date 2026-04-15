import { Alert, Heading } from "@navikt/ds-react";
import { useGetTrekkgrupper } from "../../api/apiService";
import BackHomeBox from "../../common/BackHomeBox";
import ContentLoader from "../../common/ContentLoader";
import commonstyles from "../../styles/commonstyles.module.css";
import { useSimpleFilter } from "../../util/useSimpleFilter";
import TrekkgrupperFilter from "./TrekkgrupperFilter";
import TrekkgrupperTable from "./TrekkgrupperTable";

export const TrekkgrupperPage = () => {
	const { data, error, isLoading } = useGetTrekkgrupper();

	const { filters, filteredData, handleFiltersChange } = useSimpleFilter(
		data,
		"trekkgruppe",
		(item) => `${item.kodeTrekkgruppe} ${item.kodeFagomraade}`,
	);

	if (isLoading) return <ContentLoader />;

	return (
		<div className={commonstyles.container}>
			<div className={commonstyles["content-wrapper"]}>
				<Heading
					spacing
					size="medium"
					level="1"
					className={commonstyles["page-heading"]}
				>
					Faste data - Trekkgrupper
				</Heading>

				<BackHomeBox />

				{data && (
					<TrekkgrupperFilter
						data={filteredData}
						activeFilters={filters}
						onFiltersChange={handleFiltersChange}
					/>
				)}

				{error ? (
					<Alert variant="error">Nettverksfeil</Alert>
				) : filteredData.length > 0 ? (
					<TrekkgrupperTable key={filters.join(",")} data={filteredData} />
				) : (
					<Alert variant="info">Ingen data tilgjengelig</Alert>
				)}
			</div>
		</div>
	);
};

export default TrekkgrupperPage;
