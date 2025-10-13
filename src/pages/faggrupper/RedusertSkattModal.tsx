import { useRef, useState } from "react";
import { Alert, Button, Modal, Table } from "@navikt/ds-react";
import { useGetRedusertSkatt } from "../../api/apiService";
import { formatDate } from "../../util/dateUtil";

interface Props {
  kodeFaggruppe: string;
  buttonText: string;
  disabled: boolean;
}

const RedusertSkattModal = ({ kodeFaggruppe, buttonText, disabled }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, error } = useGetRedusertSkatt({
    faggruppe: shouldFetch ? kodeFaggruppe : "",
  });

  const handleClick = () => {
    setShouldFetch(true);
    ref.current?.showModal();
  };

  const handleClose = () => {
    ref.current?.close();
  };

  return (
    <div>
      <Button
        variant="tertiary"
        size="xsmall"
        disabled={disabled}
        onClick={handleClick}
      >
        {buttonText}
      </Button>

      <Modal
        ref={ref}
        header={{
          heading: `Faste data - Faggruppe ${kodeFaggruppe} - Redusert Skatt`,
        }}
        width={900}
        onClose={handleClose}
      >
        <Modal.Body style={{ height: "600px", overflow: "auto" }}>
          {error ? (
            <Alert variant="error">Feil ved lasting av redusert skatt</Alert>
          ) : (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell scope="col">Faggruppe</Table.HeaderCell>
                  <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
                  <Table.HeaderCell scope="col">Prosent</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data?.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.DataCell>{item.kodeFaggruppe}</Table.DataCell>
                    <Table.DataCell>{`${formatDate(item.datoFom.toString())} - ${formatDate(item.datoTom.toString())}`}</Table.DataCell>
                    <Table.DataCell>{item.prosent}</Table.DataCell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={handleClose}>
            Lukk
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RedusertSkattModal;
