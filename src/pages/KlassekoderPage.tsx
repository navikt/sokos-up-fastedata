import { Heading } from "@navikt/ds-react";
import BackHomeBox from "../components/backhomebox/BackHomeBox";
import KlassekoderTable from "../components/tables/KlassekoderTable";
import commonstyles from "../styles/Commonstyles.module.css";

const KlassekoderPage = () => {
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

        <KlassekoderTable />
      </div>
    </div>
  );
};

export default KlassekoderPage;
