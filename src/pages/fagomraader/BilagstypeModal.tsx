import { useRef, useState } from "react";
import { Alert, Button, Modal, Table } from "@navikt/ds-react";
import { useGetBilagstyper } from "../../api/apiService";

interface Props {
  kodeFagomraade: string;
  buttonText: string;
  disabled: boolean;
}

const BilagstypeModal = ({ kodeFagomraade, buttonText, disabled }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, error } = useGetBilagstyper(shouldFetch ? kodeFagomraade : "");

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
        variant="secondary"
        size="xsmall"
        disabled={disabled}
        onClick={handleClick}
      >
        {buttonText}
      </Button>

      <Modal
        ref={ref}
        header={{
          heading: `Faste data - Fagområde ${kodeFagomraade} - Bilagstype`,
        }}
        width={900}
        onClose={handleClose}
      >
        <Modal.Body>
          {error ? (
            <Alert variant="error">Feil ved lasting av bilagstyper</Alert>
          ) : (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell scope="col">Type bilag</Table.HeaderCell>
                  <Table.HeaderCell scope="col">Dato fra</Table.HeaderCell>
                  <Table.HeaderCell scope="col">
                    Automatisk fagsystem-id
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data?.map((item, index) => (
                  <Table.Row key={`${item.typeBilag}-${index}`}>
                    <Table.DataCell>{item.typeBilag}</Table.DataCell>
                    <Table.DataCell>{item.datoFom}</Table.DataCell>
                    <Table.DataCell>
                      {item.autoFagsystemId ? "Nei" : ""}
                    </Table.DataCell>
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

export default BilagstypeModal;
