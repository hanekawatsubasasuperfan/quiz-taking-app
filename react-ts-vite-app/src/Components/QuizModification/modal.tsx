import { useRef, type ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
}

export default function Modal({ children, isOpen, onClose, labelledBy }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
    if (isOpen && !modal.open) {
      modal.showModal();
      modal.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    }
    else if (!isOpen && modal.open) modal.close();
  }, [isOpen]);

  return <dialog ref={modalRef} aria-labelledby={labelledBy} onCancel={event => { event.preventDefault(); onClose(); }}>{children}</dialog>;
}
