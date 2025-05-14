import { Heading, Loader } from "@navikt/ds-react";
import { useGetVentestatuskoder } from "../api/apiService";
import VentestatuskoderTable from "../components/VentestatuskoderTable";
import BackHomeBox from "../components/backhomebox/BackHomeBox";
import styles from "../styles/Ventestatuskoder.module.css";

export const VentestatuskoderPage = () => {
  const { data, isLoading } = useGetVentestatuskoder();

  return (
    <div className={styles["container"]}>
      <div className={styles["content-wrapper"]}>
        <Heading
          spacing
          size="medium"
          level="1"
          className={styles["ventestatuskoder-heading"]}
        >
          Faste data - Ventestatuskoder
        </Heading>
        <BackHomeBox />
        {isLoading && <Loader size="large" />}
        <VentestatuskoderTable data={data} />
      </div>
    </div>
  );
};

export default VentestatuskoderPage;
