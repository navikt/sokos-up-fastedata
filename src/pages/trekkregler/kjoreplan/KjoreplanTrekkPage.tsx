import { Alert, LocalAlert, Tabs } from "@navikt/ds-react";
import { useParams } from "react-router";
import { useGetKjoreplanTrekk } from "../../../api/apiService";
import ContentLoader from "../../../components/ContentLoader";
import PageLayout from "../../../components/PageLayout";
import type { Trekkregel } from "../../../types/Trekkregel";
import { useRequiredLocationState } from "../../../util/navigationUtil";
import { ROOT, TREKKREGLER } from "../../../util/paths";
import KjoreplanTrekkTable from "./KjoreplanTrekkTable";

type LocationState = {
	trekkregel?: Trekkregel;
};

const KjoreplanTrekkPage = () => {
	const { kodeTrekktype: kodeTrekktypeParam } = useParams();
	const { trekkregel } =
		useRequiredLocationState<LocationState>(TREKKREGLER) || {};

	const { data, error, isLoading } = useGetKjoreplanTrekk({
		kodeTrekktype: kodeTrekktypeParam ?? "",
	});

	if (!trekkregel || !kodeTrekktypeParam) {
		return null;
	}

	const kjoreplanLabel = trekkregel.kodeOppgjorstype
		? `Kjøreplaner for ${trekkregel.kodeTrekktype} (${trekkregel.kodeOppgjorstype})`
		: `Kjøreplaner for ${trekkregel.kodeTrekktype}`;

	if (isLoading) return <ContentLoader />;

	return (
		<PageLayout
			title="Faste data - Trekkregler"
			breadcrumbs={[
				{ label: "Faste data", to: ROOT },
				{ label: "Trekkregler", to: TREKKREGLER },
				{ label: kjoreplanLabel },
			]}
		>
			{error ? (
				<LocalAlert status="error">
					<LocalAlert.Header>
						<LocalAlert.Title>Nettverksfeil</LocalAlert.Title>
					</LocalAlert.Header>
				</LocalAlert>
			) : data && data.length > 0 ? (
				<Tabs defaultValue="PLAN" style={{ marginBottom: "1.5rem" }}>
					<Tabs.List>
						<Tabs.Tab value="PLAN" label="Planlagt" />
						<Tabs.Tab value="AVSL" label="Avsluttet" />
					</Tabs.List>
					<Tabs.Panel value="PLAN">
						<KjoreplanTrekkTable
							data={data.filter((kjoreplan) => kjoreplan.status === "PLAN")}
						/>
					</Tabs.Panel>
					<Tabs.Panel value="AVSL">
						<KjoreplanTrekkTable
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

export default KjoreplanTrekkPage;
