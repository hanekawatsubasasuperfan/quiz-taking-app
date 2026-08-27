import { useRef, type ReactNode, useEffect } from "react"

interface ModalProps {
    isOpen: boolean;
    hasCloseBtn?: boolean;
    onClose?: () => void;
    children: ReactNode;
}


export default function Modal({children,isOpen}:ModalProps) {
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(()=>{
        const modal = modalRef.current;
        if(!modal){
            return;
        }

        if(isOpen){
            modal.showModal()
        }else{
            modal.close();
        }

    },[isOpen])

    return(
        <dialog ref={modalRef}>
            {children}
        </dialog>
    )
}
