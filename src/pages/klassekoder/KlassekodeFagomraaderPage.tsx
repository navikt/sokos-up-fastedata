import { useEffect, useMemo } from "react";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import { Alert, BodyShort, Heading, Link, List } from "@navikt/ds-react";
import BackHomeBox from "../../common/BackHomeBox";
import commonstyles from "../../styles/commonstyles.module.css";
import { Klassekoder } from "../../types/Klassekoder";
import { FAGOMRAADER, KLASSEKODER, ROOT } from "../../util/paths";
import styles from "./KlassekodeFagomraaderPage.module.css";

type LocationState = {
  klassekode?: Klassekoder;
};

const parseFagomraader = (value?: string) => {
  if (!value) return [] as string[];

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
};

const KlassekodeFagomraaderPage = () => {
  const navigate = useNavigate();
  const { klassekode: klassekodeParam } = useParams<{ klassekode: string }>();
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const klassekode = state?.klassekode;

  useEffect(() => {
    if (!klassekode) {
      navigate(KLASSEKODER, { replace: true });
    }
  }, [klassekode, navigate]);

  const fagomraader = useMemo(() => {
    return parseFagomraader(klassekode?.kodeFagomraade);
  }, [klassekode?.kodeFagomraade]);

  if (!klassekode) {
    return null;
  }

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

        <BackHomeBox
          breadcrumbs={[
            { label: "Faste data", to: ROOT },
            { label: "Klassekoder", to: KLASSEKODER },
            { label: `Fagområder for ${klassekode.kodeKlasse}` },
          ]}
        />

        <div className={styles.row}>
          <BodyShort weight="semibold">Klassekode: </BodyShort>
          <BodyShort>{klassekode.kodeKlasse}</BodyShort>
        </div>
        {klassekode.beskrKlasse && (
          <div className={styles.row}>
            <BodyShort weight="semibold">Beskrivelse: </BodyShort>
            <BodyShort spacing>{klassekode.beskrKlasse}</BodyShort>
          </div>
        )}

        {fagomraader.length > 0 ? (
          <>
            <Heading spacing level="3" size="xsmall">
              Fagområder:
            </Heading>

            <List>
              {fagomraader.map((fagomraade) => (
                <List.Item key={fagomraade}>
                  <div className={styles["list-row"]}>
                    <Link
                      as={RouterLink}
                      to={`${FAGOMRAADER}?fagomraade=${encodeURIComponent(fagomraade)}`}
                      state={{ fromKlassekode: klassekode.kodeKlasse }}
                    >
                      {fagomraade}
                    </Link>
                    <Link
                      as={RouterLink}
                      to={`${KLASSEKODER}?fagomraade=${encodeURIComponent(fagomraade)}`}
                      className={styles.secondaryLink}
                    >
                      Klassekoder i {fagomraade}
                    </Link>
                  </div>
                </List.Item>
              ))}
            </List>
          </>
        ) : (
          <Alert variant="info" role="status">
            Ingen fagområder registrert for{" "}
            {klassekodeParam ?? "denne klassekoden"}.
          </Alert>
        )}
      </div>
    </div>
  );
};

export default KlassekodeFagomraaderPage;
