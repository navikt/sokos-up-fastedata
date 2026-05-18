import { Alert } from "@navikt/ds-react";
import { useGetFaggrupper } from "../../api/apiService";
import ContentLoader from "../../common/ContentLoader";
import PageLayout from "../../common/PageLayout";
import SimpleFilter from "../../common/SimpleFilter";
import { useSimpleFilter } from "../../util/useSimpleFilter";
import FaggruppeTable from "./FaggruppeTable";

export const FaggrupperPage = () => {
	const { data, error, isLoading } = useGetFaggrupper();

	const { filters, filteredData, handleFiltersChange } = useSimpleFilter(
		data,
		"faggruppe",
		(item) => `${item.kodeFaggruppe} ${item.navnFaggruppe}`,
	);

	if (isLoading) return <ContentLoader />;

	return (
		<PageLayout title="Faste data - Faggrupper">
			{data && (
				<SimpleFilter
					data={filteredData}
					activeFilters={filters}
					onFiltersChange={handleFiltersChange}
					label="Filtrer på faggruppekode og navn"
					getOptionText={(item) =>
						`${item.kodeFaggruppe} - ${item.navnFaggruppe}`
					}
				/>
			)}

			{error ? (
				<Alert variant="error">Nettverksfeil</Alert>
			) : filteredData.length > 0 ? (
				<FaggruppeTable key={filters.join(",")} data={filteredData} />
			) : (
				<Alert variant="info">Ingen data tilgjengelig</Alert>
			)}
		</PageLayout>
	);
};

export default FaggrupperPage;
