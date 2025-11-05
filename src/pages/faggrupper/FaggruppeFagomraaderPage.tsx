import { useEffect, useMemo, useState } from "react";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import { Alert, BodyShort, Heading, Link, Table } from "@navikt/ds-react";
import { useGetFagomraader } from "../../api/apiService";
import BackHomeBox from "../../common/BackHomeBox";
import filterstyles from "../../common/CommonFilterStyles.module.css";
import ContentLoader from "../../common/ContentLoader";
import commonstyles from "../../styles/commonstyles.module.css";
import { Faggruppe } from "../../types/Faggruppe";
import { Fagomraader } from "../../types/Fagomraader";
import { FAGGRUPPER, FAGOMRAADER, KLASSEKODER, ROOT } from "../../util/paths";
import { SortState, sortData } from "../../util/sortUtil";
import styles from "../klassekoder/KlassekodeFagomraaderPage.module.css";

type LocationState = {
  faggruppe?: Faggruppe;
};

const FaggruppeFagomraaderPage = () => {
  const navigate = useNavigate();
  const { faggruppe: faggruppeParam } = useParams<{ faggruppe: string }>();
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const faggruppe = state?.faggruppe;

  const { data: allFagomraader, error, isLoading } = useGetFagomraader();
  const [sort, setSort] = useState<SortState<Fagomraader> | undefined>({
    orderBy: "kodeFagomraade",
    direction: "ascending",
  });

  useEffect(() => {
    if (!faggruppe) {
      navigate(FAGGRUPPER, { replace: true });
    }
  }, [faggruppe, navigate]);

  const filteredFagomraader = useMemo(() => {
    if (!allFagomraader || !faggruppe) return [];
    return allFagomraader.filter(
      (fo) => fo.kodeFaggruppe === faggruppe.kodeFaggruppe,
    );
  }, [allFagomraader, faggruppe]);

  const fagomraaderData = useMemo(() => {
    return sortData(filteredFagomraader, sort);
  }, [filteredFagomraader, sort]);

  if (!faggruppe) {
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
          Faste data - Faggrupper
        </Heading>

        <BackHomeBox
          breadcrumbs={[
            { label: "Faste data", to: ROOT },
            { label: "Faggrupper", to: FAGGRUPPER },
            { label: `Fagområder for ${faggruppe.kodeFaggruppe}` },
          ]}
        />

        <div className={filterstyles["filter-container"]}>
          <div className={styles.row}>
            <BodyShort weight="semibold">
              Fagområder som tilhører Faggruppen:
            </BodyShort>{" "}
            {faggruppe.kodeFaggruppe} - {faggruppe.navnFaggruppe}
          </div>
        </div>

        {isLoading ? (
          <ContentLoader />
        ) : error ? (
          <Alert variant="error">Feil ved lasting av fagområder</Alert>
        ) : fagomraaderData.length > 0 ? (
          <Table
            zebraStripes
            size="small"
            sort={sort}
            onSortChange={(key) => {
              setSort((prev) => {
                const orderBy = key as keyof Fagomraader;
                const direction =
                  prev?.orderBy === orderBy && prev?.direction === "ascending"
                    ? "descending"
                    : "ascending";
                return { orderBy, direction };
              });
            }}
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader sortKey="kodeFagomraade" sortable>
                  Kode
                </Table.ColumnHeader>
                <Table.ColumnHeader sortKey="navnFagomraade" sortable>
                  Navn
                </Table.ColumnHeader>
                <Table.HeaderCell scope="col">Klassekoder</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {fagomraaderData.map((fagomraade) => (
                <Table.Row key={fagomraade.kodeFagomraade}>
                  <Table.DataCell>
                    <Link
                      as={RouterLink}
                      to={`${FAGOMRAADER}?fagomraade=${encodeURIComponent(fagomraade.kodeFagomraade)}`}
                      state={{ fromFaggruppe: faggruppe.kodeFaggruppe }}
                    >
                      {fagomraade.kodeFagomraade}
                    </Link>
                  </Table.DataCell>
                  <Table.DataCell>{fagomraade.navnFagomraade}</Table.DataCell>
                  <Table.DataCell>
                    <Link
                      as={RouterLink}
                      to={`${KLASSEKODER}?fagomraade=${encodeURIComponent(fagomraade.kodeFagomraade)}`}
                    >
                      Klassekoder
                    </Link>
                  </Table.DataCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <Alert variant="info" role="status">
            Ingen fagområder registrert for{" "}
            {faggruppeParam ?? "denne faggruppen"}.
          </Alert>
        )}
      </div>
    </div>
  );
};

export default FaggruppeFagomraaderPage;
