import { Alert, Tabs } from "@navikt/ds-react";
import { useParams } from "react-router";
import { useGetKjoreplaner } from "../../../api/apiService";
import ContentLoader from "../../../common/ContentLoader";
import PageLayout from "../../../common/PageLayout";
import type { Faggruppe } from "../../../types/Faggruppe";
import { useRequiredLocationState } from "../../../util/navigationUtil";
import { FAGGRUPPER, ROOT } from "../../../util/paths";
import KjoreplanTable from "./KjoreplanTable";

type LocationState = {
	faggruppe?: Faggruppe;
};

const KjoreplanPage = () => {
	const { faggruppe: faggruppeParam } = useParams();
	const { faggruppe } =
		useRequiredLocationState<LocationState>(FAGGRUPPER) || {};

	const { data, error, isLoading } = useGetKjoreplaner({
		faggruppe: faggruppeParam || "",
	});

	if (!faggruppe) {
		return null;
	}

	if (isLoading) return <ContentLoader />;

	return (
		<PageLayout
			title="Faste data - Faggrupper"
			breadcrumbs={[
				{ label: "Faste data", to: ROOT },
				{ label: "Faggrupper", to: FAGGRUPPER },
				{ label: `Kjøreplaner for ${faggruppe.kodeFaggruppe}` },
			]}
		>
			{error ? (
				<Alert variant="error">Nettverksfeil</Alert>
			) : data && data.length > 0 ? (
				<Tabs defaultValue="PLAN" style={{ marginBottom: "1.5rem" }}>
					<Tabs.List>
						<Tabs.Tab value="PLAN" label="Planlagt" />
						<Tabs.Tab value="AVSL" label="Avsluttet" />
					</Tabs.List>
					<Tabs.Panel value="PLAN">
						<KjoreplanTable
							data={data.filter((kjoreplan) => kjoreplan.status === "PLAN")}
						/>
					</Tabs.Panel>
					<Tabs.Panel value="AVSL">
						<KjoreplanTable
							past
							data={data
								.filter((kjoreplan) => kjoreplan.status === "AVSL")
								.reverse()}
						/>
					</Tabs.Panel>
				</Tabs>
			) : (
				<Alert variant="info">Ingen data tilgjengelig</Alert>
			)}
		</PageLayout>
	);
};

export default KjoreplanPage;
