import { Link as RouterLink } from "react-router";
import { ArrowLeftIcon } from "@navikt/aksel-icons";
import { ROOT } from "../util/paths";
import styles from "./BackHomeBox.module.css";

type Props = {
  to?: string;
  label?: string;
};

const BackHomeBox = ({ to = ROOT, label = "Tilbake til oversikt" }: Props) => {
  return (
    <div className={styles.container}>
      <RouterLink to={to} className={styles.link}>
        <ArrowLeftIcon aria-hidden className={styles.ikon} />
        {label}
      </RouterLink>
    </div>
  );
};

export default BackHomeBox;
