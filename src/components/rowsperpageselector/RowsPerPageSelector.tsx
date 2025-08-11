import { ChevronDownIcon } from "@navikt/aksel-icons";
import { Button, Dropdown } from "@navikt/ds-react";
import styles from "./RowsPerPageSelector.module.css";

interface RowsPerPageSelectorProps {
  rowsPerPage: number;
  updateRowsPerPage: (rows: number) => void;
}

export default function RowsPerPageSelector({
  rowsPerPage,
  updateRowsPerPage,
}: RowsPerPageSelectorProps) {
  return (
    <div className={styles["selector-container"]}>
      <Dropdown>
        <Button
          size="small"
          variant="tertiary"
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
                onClick={() => updateRowsPerPage(rows)}
              >
                {rows}
              </Dropdown.Menu.GroupedList.Item>
            ))}
          </Dropdown.Menu.GroupedList>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
