import { useParams } from "react-router";
import { Alert, Heading, Tabs } from "@navikt/ds-react";
import { useGetKjoreplaner } from "../../../api/apiService";
import BackHomeBox2 from "../../../common/BackHomeBox2";
import ContentLoader from "../../../common/ContentLoader";
import commonstyles from "../../../styles/commonstyles.module.css";
import { FAGGRUPPER, ROOT } from "../../../util/paths";
import KjoreplanTable from "./KjoreplanTable";

const KjoreplanPage = () => {
  const { faggruppe } = useParams();
  const { data, error, isLoading } = useGetKjoreplaner({
    faggruppe: faggruppe || "",
  });

  if (isLoading) return <ContentLoader />;

  return (
    <div className={commonstyles["container"]}>
      <div className={commonstyles["content-wrapper"]}>
        <Heading
          spacing
          size="medium"
          level="1"
          className={commonstyles["page-heading"]}
        >
          Faste data - Faggrupper - Kjøreplan
        </Heading>

        <BackHomeBox2
          to={[ROOT, FAGGRUPPER]}
          labels={["Tilbake til oversikt", "Tilbake til Faggruppesiden"]}
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
      </div>
    </div>
  );
};

export default KjoreplanPage;
