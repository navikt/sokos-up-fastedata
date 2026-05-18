import { Alert } from "@navikt/ds-react";
import { useGetVentekriterier } from "../../api/apiService";
import ContentLoader from "../../common/ContentLoader";
import PageLayout from "../../common/PageLayout";
import VentekriterierTable from "./VentekriterierTable";

export const VentekriterierPage = () => {
	const { data, error, isLoading } = useGetVentekriterier();

	if (isLoading) return <ContentLoader />;

	return (
		<PageLayout title="Faste data - Ventekriterier">
			{error ? (
				<Alert variant="error">Nettverksfeil</Alert>
			) : data && data.length > 0 ? (
				<VentekriterierTable data={data} />
			) : (
				<Alert variant="info">Ingen data tilgjengelig</Alert>
			)}
		</PageLayout>
	);
};

export default VentekriterierPage;
