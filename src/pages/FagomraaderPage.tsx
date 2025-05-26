import React from "react";
import { Heading } from "@navikt/ds-react";
import BackHomeBox from "../components/backhomebox/BackHomeBox";
import commonstyles from "../styles/Commonstyles.module.css";

export const FagomraaderPage = () => {
  return (
    <div className={commonstyles["container"]}>
      <div className={commonstyles["content-wrapper"]}>
        <Heading
          spacing
          size="medium"
          level="1"
          className={commonstyles["page-heading"]}
        >
          Faste data – Fagområder
        </Heading>

        <BackHomeBox />
      </div>
    </div>
  );
};

export default FagomraaderPage;
