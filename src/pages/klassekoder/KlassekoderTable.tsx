import { useMemo, useState } from "react";
import { Link as RouterLink, generatePath } from "react-router";
import { Link, Pagination, Table } from "@navikt/ds-react";
import RowsPerPageSelector from "../../common/RowsPerPageSelector";
import commonstyles from "../../styles/commonstyles.module.css";
import { Klassekoder } from "../../types/Klassekoder";
import { KLASSEKODER_FAGOMRAADER } from "../../util/paths";
import { SortState } from "../../util/sortUtil";
import {
  createSortChangeHandler,
  useTablePagination,
} from "../../util/tableUtil";
import HistoricalDataToggle from "./HistoricalDataToggle";
import HoverInfoCell from "./HoverInfoCell";

interface Props {
  data?: Klassekoder[];
}

export const KlassekoderTable = ({ data = [] }: Props) => {
  const [sort, setSort] = useState<SortState<Klassekoder> | undefined>();
  const [showHistorical, setShowHistorical] = useState(false);

  const filteredData = useMemo(() => {
    if (showHistorical) return data;
    return data.filter((item) => {
      const year = item.datoTom?.match(/\d{4}/)?.[0];
      return !year || parseInt(year, 10) > 2017;
    });
  }, [data, showHistorical]);

  const {
    currentPage,
    safePage,
    totalPages,
    paginatedData,
    tableKey,
    updateRowsPerPage,
    handlePageChange,
    rowsPerPage,
  } = useTablePagination({
    data: filteredData,
    sortState: sort,
    additionalKeyFactors: [showHistorical],
  });

  const handleSortChange = createSortChangeHandler(setSort);

  return (
    <>
      <div className={commonstyles["table-controls"]}>
        <div className={commonstyles["controls-row"]}>
          <div className={commonstyles["left-controls"]}>
            <HistoricalDataToggle
              checked={showHistorical}
              onChange={setShowHistorical}
            />
            <p className={commonstyles["treff-info"]}>
              {`${filteredData.length} treff`}
              {rowsPerPage &&
                filteredData.length > rowsPerPage &&
                totalPages > 1 &&
                `, ${currentPage} av ${totalPages} sider`}
            </p>
          </div>
          <RowsPerPageSelector
            rowsPerPage={rowsPerPage}
            updateRowsPerPage={updateRowsPerPage}
          />
        </div>
      </div>

      <Table
        key={tableKey}
        zebraStripes
        size="small"
        sort={sort}
        onSortChange={handleSortChange}
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader sortKey="kodeKlasse" sortable>
              Klassekoder
            </Table.ColumnHeader>
            <Table.ColumnHeader sortKey="artID" sortable>
              Art ID
            </Table.ColumnHeader>
            <Table.HeaderCell>Dato fom</Table.HeaderCell>
            <Table.HeaderCell>Dato tom</Table.HeaderCell>
            <Table.HeaderCell>Hovedkontonr</Table.HeaderCell>
            <Table.HeaderCell>Underkontonr</Table.HeaderCell>
            <Table.HeaderCell>Fagområde</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedData.map((row) => (
            <Table.Row key={row.kodeKlasse}>
              <HoverInfoCell value={row.kodeKlasse} tooltip={row.beskrKlasse} />
              <HoverInfoCell value={row.artID} tooltip={row.beskrArt} />
              <Table.DataCell>{row.datoFom}</Table.DataCell>
              <Table.DataCell>{row.datoTom}</Table.DataCell>
              <HoverInfoCell
                value={row.hovedkontoNr}
                tooltip={row.hovedkontoNavn}
              />
              <HoverInfoCell
                value={row.underkontoNr}
                tooltip={row.underkontoNavn}
              />
              <Table.DataCell>
                {row.kodeFagomraade ? (
                  <Link
                    as={RouterLink}
                    to={generatePath(KLASSEKODER_FAGOMRAADER, {
                      klassekode: row.kodeKlasse,
                    })}
                    state={{ klassekode: row }}
                  >
                    Fagområder
                  </Link>
                ) : (
                  "Ingen"
                )}
              </Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {totalPages > 1 && (
        <div className={commonstyles["table-pagination-container"]}>
          <Pagination
            page={safePage}
            onPageChange={handlePageChange}
            count={totalPages}
            size="small"
          />
        </div>
      )}
    </>
  );
};

export default KlassekoderTable;
