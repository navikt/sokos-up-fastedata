import React from "react";
import { Button, Modal, Table } from "@navikt/ds-react";

interface Props {
  refEl: React.RefObject<HTMLDialogElement>;
  kodeFagomraade: string;
}

const KorrigeringsarsakModal = ({ refEl }: Props) => {
  return (
    <Modal
      ref={refEl}
      header={{ heading: "Faste data - Fagområder - Korrigeringsårsak" }}
      size="medium"
    >
      <Modal.Body>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Kode</Table.HeaderCell>
              <Table.HeaderCell>Navn</Table.HeaderCell>
              <Table.HeaderCell>Medfører korrigering</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {/* Replace with dynamic rows from backend */}
          </Table.Body>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => refEl.current?.close()}>Lukk</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default KorrigeringsarsakModal;
