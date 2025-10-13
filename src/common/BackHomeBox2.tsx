import { Link as RouterLink } from "react-router";
import { ArrowLeftIcon } from "@navikt/aksel-icons";
import { ROOT } from "../util/paths";
import styles from "./BackHomeBox.module.css";

type Props = {
  to?: string[];
  labels?: string[];
};

const BackHomeBox2 = ({
  to = [ROOT],
  labels = ["Tilbake til oversikt"],
}: Props) => {
  return (
    <div className={styles.container}>
      {labels.map((label, index) => (
        <RouterLink key={label} to={to[index]} className={styles.link}>
          <ArrowLeftIcon aria-hidden className={styles.ikon} />
          {label}
        </RouterLink>
      ))}
    </div>
  );
};

export default BackHomeBox2;
