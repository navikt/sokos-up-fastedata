import React from "react";
import { BodyLong, Button, Modal } from "@navikt/ds-react";

interface Props {
  refEl: React.RefObject<HTMLDialogElement>;
  kodeFagomraade: string;
}

const BilagstypeModal = ({ refEl, kodeFagomraade }: Props) => {
  return (
    <Modal ref={refEl} header={{ heading: "Bilagstype" }}>
      <Modal.Body>
        <BodyLong>
          Her kan du legge inn informasjon om bilagstype for fagområde{" "}
          <b>{kodeFagomraade}</b>.
        </BodyLong>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => refEl.current?.close()}>Lukk</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BilagstypeModal;
