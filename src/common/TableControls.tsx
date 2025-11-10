import commonstyles from "../styles/commonstyles.module.css";
import RowsPerPageSelector from "./RowsPerPageSelector";

interface TableControlsProps {
  totalCount: number;
  currentPage?: number;
  totalPages?: number;
  rowsPerPage: number;
  updateRowsPerPage: (value: number) => void;
  showInfo?: boolean;
}

const TableControls = ({
  totalCount,
  currentPage,
  totalPages,
  rowsPerPage,
  updateRowsPerPage,
  showInfo = true,
}: TableControlsProps) => {
  return (
    <div className={commonstyles["table-controls"]}>
      <div className={commonstyles["controls-row"]}>
        {showInfo && (
          <div className={commonstyles["left-controls"]}>
            <p className={commonstyles["treff-info"]}>
              {`${totalCount} treff`}
              {rowsPerPage &&
                totalCount > rowsPerPage &&
                totalPages &&
                totalPages > 1 &&
                currentPage &&
                `, ${currentPage} av ${totalPages} sider`}
            </p>
          </div>
        )}
        <RowsPerPageSelector
          rowsPerPage={rowsPerPage}
          updateRowsPerPage={updateRowsPerPage}
        />
      </div>
    </div>
  );
};

export default TableControls;
