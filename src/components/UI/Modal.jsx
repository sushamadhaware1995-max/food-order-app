import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({children, open,onClose, claasName = ''}){
    const dialogRef= useRef();
    useEffect(()=> {

        const modalVal = dialogRef.current;
        if(open){
            modalVal.showModal();
        }
        // clean up function
        return () => modalVal.close();
    }, [open]);
    return createPortal(
        <dialog ref={dialogRef} className={`modal ${claasName}`} onClose={onClose}>
            {children}
        </dialog>, document.getElementById('modal')
    )

}