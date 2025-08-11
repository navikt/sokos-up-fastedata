import { ChevronDownIcon } from "@navikt/aksel-icons";
import { Button, Dropdown } from "@navikt/ds-react";
import styles from "./RowsPerPageSelector.module.css";

interface RowsPerPageSelectorProps {
  rowsPerPage: number;
  updateRowsPerPage: (rows: number) => void;
  totalCount: number;
  currentPage?: number;
  pageCount?: number;
}

export default function RowsPerPageSelector(props: RowsPerPageSelectorProps) {
  const { totalCount, currentPage, pageCount, rowsPerPage } = props;

  return (
    <div className={styles["selector-container"]}>
      <Dropdown>
        <Button
          size="small"
          variant="primary"
          as={Dropdown.Toggle}
          className={styles["selector-button"]}
        >
          <span>Vis {rowsPerPage} per side</span>
          <ChevronDownIcon className={styles["arrow-icon"]} />
        </Button>
        <Dropdown.Menu className={styles["dropdown-menu"]}>
          <Dropdown.Menu.GroupedList>
            <Dropdown.Menu.GroupedList.Heading>
              Hvor mange rader ønsker du å vise per side?
            </Dropdown.Menu.GroupedList.Heading>
            <Dropdown.Menu.Divider />
            {[5, 10, 25, 50].map((rows) => (
              <Dropdown.Menu.GroupedList.Item
                key={rows}
                onClick={() => props.updateRowsPerPage(rows)}
              >
                {rows}
              </Dropdown.Menu.GroupedList.Item>
            ))}
          </Dropdown.Menu.GroupedList>
        </Dropdown.Menu>
      </Dropdown>

      <p className={styles["treff-info"]}>
        {`${totalCount} treff`}
        {totalCount > rowsPerPage &&
          currentPage &&
          pageCount &&
          `, ${currentPage} av ${pageCount} sider`}
      </p>
    </div>
  );
}
