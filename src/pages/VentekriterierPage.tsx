import { Alert, Heading } from "@navikt/ds-react";
import { useGetVentekriterier } from "../api/apiService";
import BackHomeBox from "../components/backhomebox/BackHomeBox";
import ContentLoader from "../components/content-loader/ContentLoader";
import VentekriterierTable from "../components/tables/VentekriterierTable";
import commonstyles from "../styles/Commonstyles.module.css";

export const VentekriterierPage = () => {
  const { data, error, isLoading } = useGetVentekriterier();

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
          Faste data - Ventekriterier
        </Heading>

        <BackHomeBox />

        {error ? (
          <Alert variant="error">Nettverksfeil</Alert>
        ) : data && data.length > 0 ? (
          <VentekriterierTable data={data} />
        ) : (
          <Alert variant="info">Ingen data tilgjengelig</Alert>
        )}
      </div>
    </div>
  );
};

export default VentekriterierPage;
