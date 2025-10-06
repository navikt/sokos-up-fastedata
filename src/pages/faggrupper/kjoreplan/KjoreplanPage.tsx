import { useParams } from "react-router";
import { Alert, Heading } from "@navikt/ds-react";
import { useGetKjoreplaner } from "../../../api/apiService";
import BackHomeBox from "../../../common/BackHomeBox";
import ContentLoader from "../../../common/ContentLoader";
import commonstyles from "../../../styles/commonstyles.module.css";
import KjoreplanTable from "./KjoreplanTable";

const KjoreplanPage = () => {
  const { faggruppe } = useParams();
  const { data, error, isLoading } = useGetKjoreplaner(faggruppe);

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

        <BackHomeBox />

        {error ? (
          <Alert variant="error">Nettverksfeil</Alert>
        ) : data && data.length > 0 ? (
          <KjoreplanTable data={data} />
        ) : (
          <Alert variant="info">Ingen data tilgjengelig</Alert>
        )}
      </div>
    </div>
  );
};

export default KjoreplanPage;
