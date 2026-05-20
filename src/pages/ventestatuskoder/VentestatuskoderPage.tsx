import { Alert } from "@navikt/ds-react";
import { useGetVentestatuskoder } from "../../api/apiService";
import ContentLoader from "../../common/ContentLoader";
import PageLayout from "../../common/PageLayout";
import VentestatuskoderTable from "./VentestatuskoderTable";

export const VentestatuskoderPage = () => {
	const { data, error, isLoading } = useGetVentestatuskoder();

	if (isLoading) return <ContentLoader />;

	return (
		<PageLayout title="Faste data - Ventestatuskoder">
			{error ? (
				<Alert variant="error">Nettverksfeil</Alert>
			) : data && data.length > 0 ? (
				<VentestatuskoderTable data={data} />
			) : (
				<Alert variant="info">Ingen data tilgjengelig</Alert>
			)}
		</PageLayout>
	);
};

export default VentestatuskoderPage;
