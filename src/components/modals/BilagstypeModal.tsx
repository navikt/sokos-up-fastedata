import React, { useRef } from "react";
import { Button, Modal, Table } from "@navikt/ds-react";
import { useGetBilagstyper } from "../../api/apiService";

interface Props {
  kodeFagomraade: string;
  buttonText: string;
  disabled: boolean;
}

const BilagstypeModal = ({ kodeFagomraade, buttonText, disabled }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);
  const { data } = useGetBilagstyper(kodeFagomraade);

  const handleClick = () => {
    ref.current?.showModal();
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
      >
        <Modal.Body>
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
                  <Table.DataCell>{item.autoFagsystemId}</Table.DataCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={() => ref.current?.close()}>
            Lukk
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BilagstypeModal;
