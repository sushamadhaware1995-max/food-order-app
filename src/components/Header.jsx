import logo from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import { useCallback, useContext } from 'react';
import UserProgressConext from '../store/UserProgressContext';

export default function Header(){

    const cartCtx = useContext(CartContext);
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);
    const userProgressCx = useContext(UserProgressConext);
    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="Logo of food panda app"></img>
                <h1>Panda food</h1>

            </div>
            <nav>
                <Button textOnly={true} onClick={userProgressCx.showCart}>
                    Cart ({totalCartItems})
                </Button>
            </nav>
        </header>
    )
}