import { Heading } from "@navikt/ds-react";
import AppCard from "../components/appcard/AppCard";
import styles from "../styles/Fastedata.module.css";

const appList = [
  {
    title: "Faggrupper",
    description: "Oppslag og forklaring på faggrupper.",
    route: "",
  },
  {
    title: "Fagområder",
    description: "Fagområder og motregningsgrupper",
    route: "",
  },
  {
    title: "Klassekoder",
    description: "Klassekoder med tilhørende kontonummer",
    route: "",
  },
  {
    title: "Ventestatuskoder",
    description: "Forklaring og oppslag",
    route: "",
  },
  {
    title: "Ventekriterier",
    description: "Forklaring og oppslag",
    route: "ventekriterier",
  },
];

export default function FastedataPage() {
  return (
    <div className={styles["container"]}>
      <div className={styles["content-wrapper"]}>
        <Heading
          level="1"
          size="large"
          spacing
          className={styles["fastedata-heading"]}
        >
          Faste data
        </Heading>

        <Heading level="2" size="medium" spacing>
          Oppdrag
        </Heading>

        <div className={styles["card-grid"]}>
          {appList.map((app) => (
            <AppCard
              key={app.title}
              title={app.title}
              description={app.description}
              route={app.route}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
