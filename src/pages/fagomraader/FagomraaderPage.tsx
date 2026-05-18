import { Alert } from "@navikt/ds-react";
import { useGetFagomraader } from "../../api/apiService";
import ContentLoader from "../../common/ContentLoader";
import PageLayout from "../../common/PageLayout";
import SimpleFilter from "../../common/SimpleFilter";
import { useSimpleFilter } from "../../util/useSimpleFilter";
import FagomraaderTable from "./FagomraaderTable";

export const FagomraaderPage = () => {
	const { data, error, isLoading } = useGetFagomraader();

	const { filters, filteredData, handleFiltersChange } = useSimpleFilter(
		data,
		"fagomraade",
		(item) => `${item.kodeFagomraade} ${item.navnFagomraade}`,
	);

	if (isLoading) return <ContentLoader />;

	return (
		<PageLayout title="Faste data - Fagområde">
			{data && (
				<SimpleFilter
					data={filteredData}
					activeFilters={filters}
					onFiltersChange={handleFiltersChange}
					label="Filtrer på fagområdekode og navn"
					getOptionText={(item) =>
						`${item.kodeFagomraade} - ${item.navnFagomraade}`
					}
				/>
			)}

			{error ? (
				<Alert variant="error">Nettverksfeil</Alert>
			) : filteredData.length > 0 ? (
				<FagomraaderTable key={filters.join(",")} data={filteredData} />
			) : (
				<Alert variant="info">Ingen data tilgjengelig</Alert>
			)}
		</PageLayout>
	);
};

export default FagomraaderPage;
