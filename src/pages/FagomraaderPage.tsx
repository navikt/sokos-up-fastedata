import { Alert, Heading } from "@navikt/ds-react";
import { useGetFagomraader } from "../api/apiService";
import BackHomeBox from "../components/backhomebox/BackHomeBox";
import ContentLoader from "../components/content-loader/ContentLoader";
import FagomraadeTable from "../components/tables/FagomraadeTable";
import commonstyles from "../styles/Commonstyles.module.css";

export const FagomraaderPage = () => {
  const { data, error, isLoading } = useGetFagomraader();

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
          Faste data - Fagområder
        </Heading>

        <BackHomeBox />

        {error ? (
          <Alert variant="error">Nettverksfeil</Alert>
        ) : data && data.length > 0 ? (
          <FagomraadeTable data={data} />
        ) : (
          <Alert variant="info">Ingen data tilgjengelig</Alert>
        )}
      </div>
    </div>
  );
};

export default FagomraaderPage;
