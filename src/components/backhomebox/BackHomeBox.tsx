import React from "react";
import { Link as RouterLink } from "react-router";
import { ArrowLeftIcon } from "@navikt/aksel-icons";
import styles from "./BackHomeBox.module.css";

type Props = {
  to?: string;
  label?: string;
};

const BackHomeBox = ({
  to = "/fastedata",
  label = "Tilbake til oversikt",
}: Props) => {
  return (
    <div className={styles.container}>
      <RouterLink to={to} className={styles.link}>
        <ArrowLeftIcon aria-hidden style={{ marginRight: "0.5rem" }} />
        {label}
      </RouterLink>
    </div>
  );
};

export default BackHomeBox;
