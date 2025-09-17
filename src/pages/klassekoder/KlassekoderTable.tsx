import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router";
import { Link, Pagination, Table } from "@navikt/ds-react";
import RowsPerPageSelector from "../../common/RowsPerPageSelector";
import commonstyles from "../../styles/commonstyles.module.css";
import { Klassekoder } from "../../types/Klassekoder";
import { FAGOMRAADER } from "../../util/paths";
import { SortState, sortData } from "../../util/sortUtil";
import HistoricalDataToggle from "./HistoricalDataToggle";

interface Props {
  data?: Klassekoder[];
}

export const KlassekoderTable = ({ data = [] }: Props) => {
  const [sort, setSort] = useState<SortState<Klassekoder> | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [showHistorical, setShowHistorical] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [data, showHistorical, rowsPerPage]);

  const filteredData = useMemo(() => {
    if (showHistorical) return data;
    const getYear = (s?: string | null) => {
      if (!s) return undefined;
      const m = String(s).match(/\d{4}/);
      return m ? parseInt(m[0], 10) : undefined;
    };
    return data.filter((item) => {
      const year = getYear(item.datoTom);
      if (year && year <= 2017) return false;
      return true;
    });
  }, [data, showHistorical]);

  const sortedData = sortData(filteredData, sort);
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const tableKey = `${sort?.orderBy}-${sort?.direction}-${currentPage}-${rowsPerPage}-${filteredData.length}-${showHistorical}`;

  const updateRowsPerPage = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

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
        onSortChange={(key) => {
          setSort((prev) => {
            const orderBy = key as keyof Klassekoder;
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
              <Table.DataCell>{row.kodeKlasse}</Table.DataCell>
              <Table.DataCell>{row.artID}</Table.DataCell>
              <Table.DataCell>{row.datoFom}</Table.DataCell>
              <Table.DataCell>{row.datoTom}</Table.DataCell>
              <Table.DataCell>{row.hovedkontoNr}</Table.DataCell>
              <Table.DataCell>{row.underkontoNr}</Table.DataCell>
              <Table.DataCell>
                {row.kodeFagomraade ? (
                  <Link
                    as={RouterLink}
                    to={`${FAGOMRAADER}?fagomraade=${encodeURIComponent(row.kodeFagomraade)}`}
                  >
                    {row.kodeFagomraade}
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
            page={currentPage}
            onPageChange={setCurrentPage}
            count={totalPages}
            size="small"
          />
        </div>
      )}
    </>
  );
};

export default KlassekoderTable;
