import { Alert, Heading, Tabs } from "@navikt/ds-react";
import { useParams } from "react-router";
import { useGetKjoreplanTrekk } from "../../../api/apiService";
import BackHomeBox from "../../../common/BackHomeBox";
import ContentLoader from "../../../common/ContentLoader";
import commonstyles from "../../../styles/commonstyles.module.css";
import type { Trekkregel } from "../../../types/Trekkregel";
import { useRequiredLocationState } from "../../../util/navigationUtil";
import { ROOT, TREKKREGLER } from "../../../util/paths";
import KjoreplanTrekkTable from "./KjoreplanTrekkTable";

type LocationState = {
	trekkregel?: Trekkregel;
};

const KjoreplanTrekkPage = () => {
	const { oppgjorstype: oppgjorstypeParam } = useParams();
	const { trekkregel } =
		useRequiredLocationState<LocationState>(TREKKREGLER) || {};

	const { data, error, isLoading } = useGetKjoreplanTrekk({
		kodeTrekktype: oppgjorstypeParam || "",
	});

	if (!trekkregel) {
		return null;
	}

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
					Faste data - Trekkregler
				</Heading>

				<BackHomeBox
					breadcrumbs={[
						{ label: "Faste data", to: ROOT },
						{ label: "Trekkregler", to: TREKKREGLER },
						{
							label: `Kjøreplaner for ${trekkregel.kodeTrekktype} (${trekkregel.kodeOppgjorstype})`,
						},
					]}
				/>

				{error ? (
					<Alert variant="error">Nettverksfeil</Alert>
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
			</div>
		</div>
	);
};

export default KjoreplanTrekkPage;
