import { useMemo } from "react";
import { Navigate, useParams } from "react-router";
import { useGetFaggrupper } from "../../api/apiService";
import ContentLoader from "../../common/ContentLoader";
import FagomraaderDetaljer from "../../common/FagomraaderDetaljer";
import { FAGGRUPPER, ROOT } from "../../util/paths";

const FagomraaderForFaggrupper = () => {
	const { faggruppe: faggruppeParam } = useParams<{ faggruppe: string }>();
	const { data: faggrupper, isLoading } = useGetFaggrupper();

	const faggruppe = useMemo(() => {
		if (!faggrupper || !faggruppeParam) return undefined;
		return faggrupper.find((f) => f.kodeFaggruppe === faggruppeParam);
	}, [faggrupper, faggruppeParam]);

	if (isLoading) return <ContentLoader />;
	if (!faggruppeParam || !faggruppe)
		return <Navigate to={FAGGRUPPER} replace />;

	return (
		<FagomraaderDetaljer
			title="Faste data - Faggrupper"
			breadcrumbs={[
				{ label: "Faste data", to: ROOT },
				{ label: "Faggrupper", to: FAGGRUPPER },
				{ label: `Fagområder for ${faggruppe.kodeFaggruppe}` },
			]}
			descriptionLabel="Fagområder som tilhører Faggruppen:"
			descriptionValue={`${faggruppe.kodeFaggruppe} - ${faggruppe.navnFaggruppe}`}
			filterPredicate={(fo) => fo.kodeFaggruppe === faggruppe.kodeFaggruppe}
			emptyMessage={`Ingen fagområder registrert for ${faggruppeParam}.`}
		/>
	);
};

export default FagomraaderForFaggrupper;
