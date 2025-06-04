import React, { useEffect } from "react";
import { Button, Modal, Table } from "@navikt/ds-react";
import { useGetKorrigeringsaarsaker } from "../../api/apiService";

interface Props {
  refEl: React.RefObject<HTMLDialogElement>;
  kodeFagomraade: string;
}

const KorrigeringsarsakModal = ({ refEl, kodeFagomraade }: Props) => {
  const { data } = useGetKorrigeringsaarsaker(kodeFagomraade);

  useEffect(() => {
    const modal = refEl.current;
    if (!modal) return;

    const forceRevalidate = () => {};

    modal.addEventListener("show", forceRevalidate);
    return () => modal.removeEventListener("show", forceRevalidate);
  }, [refEl]);

  return (
    <Modal
      ref={refEl}
      header={{
        heading: `Faste data - Fagområde ${kodeFagomraade} - Korrigeringsårsak`,
      }}
      width={900}
    >
      <Modal.Body>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell scope="col">Kode</Table.HeaderCell>
              <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
              <Table.HeaderCell scope="col">
                Medfører korrigering
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?.map((item) => (
              <Table.Row key={item.kodeAarsakKorr}>
                <Table.DataCell>{item.kodeAarsakKorr}</Table.DataCell>
                <Table.DataCell>{item.beskrivelse}</Table.DataCell>
                <Table.DataCell>{item.medforerKorr ? "J" : "N"}</Table.DataCell>
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

export default KorrigeringsarsakModal;
