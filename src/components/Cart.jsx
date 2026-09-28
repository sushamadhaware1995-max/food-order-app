import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import {currencyFormatter} from '../util/formatting.js';
import Button from "./UI/Button";
import UserProgressConext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart(){
    const cartCtx= useContext(CartContext);
    const cartTotal = cartCtx.items.reduce((total, item) =>
        {return total + Number(item.quantity * item.price);    
        }
   , 1);

//    console.log("Carttota:", cartTotal)

    const userProgressCx = useContext(UserProgressConext);
    function handleCartClose(){
        userProgressCx.hideCart();
    }

    function handleGotoCheckout(){
        userProgressCx.showCheckout();
    }
    return(
        <Modal className="cart" open={userProgressCx.progress === 'cart'} 
        onClose={userProgressCx.progress === 'cart' ? handleCartClose : null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map(item => 
                <CartItem key={item.id} 
                name={item.name} 
                qty={item.quantity} 
                price={item.price}
                onIncrease={() => cartCtx.addItem(item)}
                onDecrease={() => cartCtx.removeItem(item.id)}></CartItem>
            )}

            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCartClose}>Close</Button>
                {cartCtx.items.length > 0 &&
                <Button onClick={handleGotoCheckout}>Go to checkout</Button>}
            </p>
        </Modal>
    )
}