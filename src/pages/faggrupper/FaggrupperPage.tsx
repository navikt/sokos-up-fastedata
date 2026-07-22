import { Alert, LocalAlert } from "@navikt/ds-react";
import { useGetFaggrupper } from "../../api/apiService";
import ContentLoader from "../../components/ContentLoader";
import PageLayout from "../../components/PageLayout";
import SimpleFilter from "../../components/SimpleFilter";
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
				<LocalAlert status="error">
					<LocalAlert.Header>
						<LocalAlert.Title>Nettverksfeil</LocalAlert.Title>
					</LocalAlert.Header>
				</LocalAlert>
			) : filteredData.length > 0 ? (
				<FaggruppeTable key={filters.join(",")} data={filteredData} />
			) : (
				<Alert variant="info">Ingen data tilgjengelig</Alert>
			)}
		</PageLayout>
	);
};

export default FaggrupperPage;
