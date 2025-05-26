import { Heading } from "@navikt/ds-react";
import AppCard from "../components/appcard/AppCard";
import commonstyles from "../styles/Commonstyles.module.css";
import styles from "../styles/Fastedata.module.css";
import { appList } from "../util/constant";

export default function FastedataPage() {
  return (
    <div className={commonstyles["container"]}>
      <div className={styles["content-wrapper"]}>
        <Heading
          level="1"
          size="medium"
          spacing
          className={commonstyles["page-heading"]}
        >
          Faste data
        </Heading>
        <Heading level="2" size="small" spacing>
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
