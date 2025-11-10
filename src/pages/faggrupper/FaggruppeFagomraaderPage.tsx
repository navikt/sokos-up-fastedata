import { useParams } from "react-router";
import FagomraaderDetaljer from "../../common/FagomraaderDetailPage";
import { Faggruppe } from "../../types/Faggruppe";
import { useRequiredLocationState } from "../../util/navigationUtil";
import { FAGGRUPPER, ROOT } from "../../util/paths";

type LocationState = {
  faggruppe?: Faggruppe;
};

const FaggruppeFagomraaderPage = () => {
  const { faggruppe: faggruppeParam } = useParams<{ faggruppe: string }>();
  const { faggruppe } =
    useRequiredLocationState<LocationState>(FAGGRUPPER) || {};

  if (!faggruppe) {
    return null;
  }

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
      stateValue={{ fromFaggruppe: faggruppe.kodeFaggruppe }}
      emptyMessage={`Ingen fagområder registrert for ${faggruppeParam ?? "denne faggruppen"}.`}
    />
  );
};

export default FaggruppeFagomraaderPage;
