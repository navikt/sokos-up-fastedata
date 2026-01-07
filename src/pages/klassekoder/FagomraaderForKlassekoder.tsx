import { useMemo } from "react";
import { useParams } from "react-router";
import FagomraaderDetaljer from "../../common/FagomraaderDetaljer";
import type { Klassekoder } from "../../types/Klassekoder";
import {
	parseCommaSeparated,
	useRequiredLocationState,
} from "../../util/navigationUtil";
import { KLASSEKODER, ROOT } from "../../util/paths";

type LocationState = {
	klassekode?: Klassekoder;
};

const FagomraaderForKlassekoder = () => {
	const { klassekode: klassekodeParam } = useParams<{ klassekode: string }>();
	const { klassekode } =
		useRequiredLocationState<LocationState>(KLASSEKODER) || {};

	const fagomraaderCodes = useMemo(() => {
		return parseCommaSeparated(klassekode?.kodeFagomraade);
	}, [klassekode?.kodeFagomraade]);

	if (!klassekode) {
		return null;
	}

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
			stateValue={{ fromKlassekode: klassekode.kodeKlasse }}
			emptyMessage={`Ingen fagområder registrert for ${klassekodeParam ?? "denne klassekoden"}.`}
		/>
	);
};

export default FagomraaderForKlassekoder;
