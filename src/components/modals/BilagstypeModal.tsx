import React from "react";
import { Button, Modal, Table } from "@navikt/ds-react";
import { useGetBilagstyper } from "../../api/apiService";

interface Props {
  refEl: React.RefObject<HTMLDialogElement>;
  kodeFagomraade: string;
}

const BilagstypeModal = ({ refEl, kodeFagomraade }: Props) => {
  const { data } = useGetBilagstyper(kodeFagomraade);

  return (
    <Modal
      ref={refEl}
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
        <Button onClick={() => refEl.current?.close()}>Lukk</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BilagstypeModal;
