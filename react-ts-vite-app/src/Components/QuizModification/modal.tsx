import { useRef, type ReactNode, useEffect, type KeyboardEvent, } from "react"

interface ModalProps {
    isOpen: boolean;
    hasCloseBtn?: boolean;
    onClose?: () => void;
    children: ReactNode;
}


export default function Modal({children,isOpen, onClose, hasCloseBtn}:ModalProps) {
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

    function handleClose(){
            if(onClose) {
                onClose();
            }
        }
        
        function handleKeyDown(e: KeyboardEvent<HTMLDialogElement>){
            if(e.key == "Escape"){
                handleClose();
            }
        }

    return(
        <dialog ref = {modalRef} onKeyDown={handleKeyDown}>
            {hasCloseBtn && (
                <button onClick={handleClose}>
                    Close
                </button>
            )}
            {children}
        </dialog>
    )
}
