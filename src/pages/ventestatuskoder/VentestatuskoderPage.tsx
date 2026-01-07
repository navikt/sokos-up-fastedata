import { Alert, Heading } from "@navikt/ds-react";
import { useGetVentestatuskoder } from "../../api/apiService";
import BackHomeBox from "../../common/BackHomeBox";
import ContentLoader from "../../common/ContentLoader";
import commonstyles from "../../styles/commonstyles.module.css";
import VentestatuskoderTable from "./VentestatuskoderTable";

export const VentestatuskoderPage = () => {
	const { data, error, isLoading } = useGetVentestatuskoder();

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
					Faste data - Ventestatuskoder
				</Heading>

				<BackHomeBox />

				{error ? (
					<Alert variant="error">
						En feil har oppstått. Prøv igjen senere.
					</Alert>
				) : data && data.length > 0 ? (
					<VentestatuskoderTable data={data} />
				) : (
					<Alert variant="info">Ingen data tilgjengelig</Alert>
				)}
			</div>
		</div>
	);
};

export default VentestatuskoderPage;
