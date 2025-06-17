import { useRef, useState } from "react";
import { Alert, Button, Loader, Modal, Table } from "@navikt/ds-react";
import { useGetKorrigeringsaarsaker } from "../../api/apiService";
import commonstyles from "../../styles/Commonstyles.module.css";

interface Props {
  kodeFagomraade: string;
  buttonText: string;
  disabled: boolean;
}

const KorrigeringsarsakModal = ({
  kodeFagomraade,
  buttonText,
  disabled,
}: Props) => {
  const ref = useRef<HTMLDialogElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, isLoading } = useGetKorrigeringsaarsaker(
    kodeFagomraade,
    isModalOpen,
  );

  const handleClick = () => {
    setIsModalOpen(true);
    ref.current?.showModal();
  };

  const handleClose = () => {
    setIsModalOpen(false);
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
          heading: `Faste data - Fagområde ${kodeFagomraade} - Korrigeringsårsak`,
        }}
        width={900}
        onClose={handleClose}
      >
        <Modal.Body>
          {isLoading ? (
            <div className={commonstyles["modal-loader"]}>
              <Loader size="large" title="Laster korrigeringsårsaker..." />
            </div>
          ) : error ? (
            <Alert variant="error">
              Feil ved lasting av korrigeringsårsaker
            </Alert>
          ) : (
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
                    <Table.DataCell>
                      {item.medforerKorr ? "J" : "N"}
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

export default KorrigeringsarsakModal;
