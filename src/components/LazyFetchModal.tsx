import { Button, Modal } from "@navikt/ds-react";
import type React from "react";
import { useRef, useState } from "react";

interface LazyFetchModalProps {
	buttonText: string;
	disabled: boolean;
	heading: string;
	width?: number;
	bodyStyle?: React.CSSProperties;
	renderContent: (shouldFetch: boolean) => React.ReactNode;
}

const LazyFetchModal = ({
	buttonText,
	disabled,
	heading,
	width = 900,
	bodyStyle,
	renderContent,
}: LazyFetchModalProps) => {
	const ref = useRef<HTMLDialogElement>(null);
	const [shouldFetch, setShouldFetch] = useState(false);

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

			<Modal ref={ref} header={{ heading }} width={width} onClose={handleClose}>
				<Modal.Body style={bodyStyle}>{renderContent(shouldFetch)}</Modal.Body>
				<Modal.Footer>
					<Button type="button" onClick={handleClose}>
						Lukk
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default LazyFetchModal;
