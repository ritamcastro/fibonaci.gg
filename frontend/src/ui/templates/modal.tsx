import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./modal.css";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	cta: React.ReactNode;
	children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, title, cta, children }: ModalProps) => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen && !dialog.open) {
			dialog.showModal();
		}

		if (!isOpen && dialog.open) {
			dialog.close();
		}
	}, [isOpen]);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		const handleClose = () => {
			onClose();
		};

		dialog.addEventListener("close", handleClose);

		return () => {
			dialog.removeEventListener("close", handleClose);
		};
	}, [onClose]);

	if (!isOpen) return null;

	return createPortal(
		<dialog className="modal" ref={dialogRef} aria-labelledby="modalLabel">
			<>
				<h2 id="modalLabel">{title}</h2>

				{children}

				{cta}
			</>
		</dialog>,
		document.body,
	);
};

export default Modal;
