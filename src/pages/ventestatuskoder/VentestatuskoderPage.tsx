import { Alert, LocalAlert } from "@navikt/ds-react";
import { useGetVentestatuskoder } from "../../api/apiService";
import ContentLoader from "../../components/ContentLoader";
import PageLayout from "../../components/PageLayout";
import VentestatuskoderTable from "./VentestatuskoderTable";

export const VentestatuskoderPage = () => {
	const { data, error, isLoading } = useGetVentestatuskoder();

	if (isLoading) return <ContentLoader />;

	return (
		<PageLayout title="Faste data - Ventestatuskoder">
			{error ? (
				<LocalAlert status="error">
					<LocalAlert.Header>
						<LocalAlert.Title>Nettverksfeil</LocalAlert.Title>
					</LocalAlert.Header>
				</LocalAlert>
			) : data && data.length > 0 ? (
				<VentestatuskoderTable data={data} />
			) : (
				<Alert variant="info">Ingen data tilgjengelig</Alert>
			)}
		</PageLayout>
	);
};

export default VentestatuskoderPage;
