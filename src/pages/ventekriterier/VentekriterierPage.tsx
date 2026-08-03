import { Alert, LocalAlert } from "@navikt/ds-react";
import { useGetVentekriterier } from "../../api/apiService";
import ContentLoader from "../../components/ContentLoader";
import PageLayout from "../../components/PageLayout";
import VentekriterierTable from "./VentekriterierTable";

export const VentekriterierPage = () => {
	const { data, error, isLoading } = useGetVentekriterier();

	if (isLoading) return <ContentLoader />;

	return (
		<PageLayout title="Faste data - Ventekriterier">
			{error ? (
				<LocalAlert status="error">
					<LocalAlert.Header>
						<LocalAlert.Title>Nettverksfeil</LocalAlert.Title>
					</LocalAlert.Header>
				</LocalAlert>
			) : data && data.length > 0 ? (
				<VentekriterierTable data={data} />
			) : (
				<Alert variant="info">Ingen data tilgjengelig</Alert>
			)}
		</PageLayout>
	);
};

export default VentekriterierPage;
