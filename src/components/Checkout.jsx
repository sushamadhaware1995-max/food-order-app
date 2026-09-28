import { useContext, useActionState } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressConext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import ErrorMsg from "./ErrorMsg.jsx";

const reqConfig = {
     method: 'POST',
     headers: {
                'Content-Type': 'application/json'
            },
}
;

export default function Checkout(){
   
    const cartCtx = useContext(CartContext);
     const cartTotal = cartCtx.items.reduce((total, item) =>
        {return total + Number(item.quantity * item.price);    
        }
   , 1);
    const userProgressCtx = useContext(UserProgressConext);
    const { data, 
        error,
        sendRequest,
        clearData} = useHttp('http://localhost:3000/orders', reqConfig);
    

    function handleClose(){
        userProgressCtx.hideCheckout();
    }

    function handleFinish(){
         userProgressCtx.hideCheckout();
         cartCtx.clearCart();
         clearData();
    }

    async function checkoutAction(previousState,fd){
        const customerData = Object.fromEntries(fd.entries());

        await sendRequest( JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
        }));
    }

    const [formState, formAction, isSending] = useActionState(checkoutAction, null);

    let actions = (
        <> <Button textOnly type="button" onClick={handleClose}>Close</Button>
                    <Button>Submit Order</Button>'
        </>
    );

    if(isSending){
        actions = <span>sending order data...</span>
    }

    if(data && !error){
        return  ( <Modal open={userProgressCtx.progress === 'checkout'} 
             onClose={handleFinish}>
                <h2>Success</h2>
                <p>Your order was sent successfully</p>
                <p className="modal-actions" onClick={handleFinish}>Okay</p>
        </Modal>)
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'}
        onClose={handleClose}>
            <form action={formAction}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Full Name" type="text" id="name"></Input>
                <Input label="E-mail Addresse" type="email" id="email"></Input>
                <Input label="Street" type="text" id="street"></Input>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"></Input>
                    <Input label="City" type="text" id="city"></Input>
                </div>
                {error && <ErrorMsg title= "Failed to submit order" message={error}></ErrorMsg>}

                <p className="modal-actions">{actions}</p>
            </form>

        </Modal>
    )
}