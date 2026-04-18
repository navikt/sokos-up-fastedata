import { useMemo } from "react";
import { Navigate, useParams } from "react-router";
import { useGetKlassekoder } from "../../api/apiService";
import ContentLoader from "../../common/ContentLoader";
import FagomraaderDetaljer from "../../common/FagomraaderDetaljer";
import { KLASSEKODER, ROOT } from "../../util/paths";
import { parseCommaSeparated } from "../../util/navigationUtil";

const FagomraaderForKlassekoder = () => {
	const { klassekode: klassekodeParam } = useParams<{ klassekode: string }>();
	const { data: klassekoder, isLoading } = useGetKlassekoder();

	const klassekode = useMemo(() => {
		if (!klassekoder || !klassekodeParam) return undefined;
		return klassekoder.find((k) => k.kodeKlasse === klassekodeParam);
	}, [klassekoder, klassekodeParam]);

	const fagomraaderCodes = useMemo(() => {
		return parseCommaSeparated(klassekode?.kodeFagomraade);
	}, [klassekode?.kodeFagomraade]);

	if (isLoading) return <ContentLoader />;
	if (!klassekodeParam || !klassekode)
		return <Navigate to={KLASSEKODER} replace />;

	return (
		<FagomraaderDetaljer
			title="Faste data - Klassekoder"
			breadcrumbs={[
				{ label: "Faste data", to: ROOT },
				{ label: "Klassekoder", to: KLASSEKODER },
				{ label: `Fagområder for ${klassekode.kodeKlasse}` },
			]}
			descriptionLabel="Fagområder som inneholder Klassekoden:"
			descriptionValue={klassekode.kodeKlasse}
			filterPredicate={(fo) => fagomraaderCodes.includes(fo.kodeFagomraade)}
			emptyMessage={`Ingen fagområder registrert for ${klassekodeParam}.`}
		/>
	);
};

export default FagomraaderForKlassekoder;
