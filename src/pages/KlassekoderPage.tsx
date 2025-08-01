import { Alert, Heading } from "@navikt/ds-react";
import { useGetKlassekoder } from "../api/apiService";
import BackHomeBox from "../components/backhomebox/BackHomeBox";
import ContentLoader from "../components/content-loader/ContentLoader";
import KlassekoderFilter from "../components/filters/klassekoderfilter/KlassekoderFilter";
import KlassekoderTable from "../components/tables/KlassekoderTable";
import commonstyles from "../styles/Commonstyles.module.css";

export const KlassekoderPage = () => {
  const { data, error, isLoading } = useGetKlassekoder();

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
          Faste data - Klassekoder
        </Heading>

        <BackHomeBox />

        <KlassekoderFilter />

        {error ? (
          <Alert variant="error">Nettverksfeil</Alert>
        ) : data && data.length > 0 ? (
          <KlassekoderTable data={data} />
        ) : (
          <Alert variant="info">Ingen data tilgjengelig</Alert>
        )}
      </div>
    </div>
  );
};

export default KlassekoderPage;
