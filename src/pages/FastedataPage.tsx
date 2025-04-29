import { Heading, Page } from "@navikt/ds-react";
import styles from "../App.module.css";
import AppCard from "../components/appcard/AppCard";

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
    <Page>
      <Page.Block width="md">
        <Heading
          level="1"
          size="large"
          spacing
          className={styles.fastedataheading}
        >
          Faste data
        </Heading>

        <Heading level="2" size="medium" spacing>
          Oppdrag
        </Heading>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
          }}
        >
          {appList.map((app) => (
            <AppCard
              key={app.title}
              title={app.title}
              description={app.description}
              route={app.route}
              hasAccess={!!app.route}
            />
          ))}
        </div>
      </Page.Block>
    </Page>
  );
}
