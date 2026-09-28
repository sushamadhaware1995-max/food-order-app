import { createContext, useState } from "react";

const UserProgressConext= createContext(
   { progress: '',
    showCart: ()=> {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {}
   }

)

export function UserPrgressContextProvider({children}){
    const [userProgressState, setUserProgressState] = useState('');

    function showCart() {
        setUserProgressState('cart');
    }

    function hideCart(){
        setUserProgressState('');
    }

    function showCheckout() {
        setUserProgressState('checkout');
    }

    function hideCheckout() {
        setUserProgressState('');
    }

    const userCtx = {
        progress: userProgressState,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return <UserProgressConext value={userCtx}>{children}</UserProgressConext>
}


export default UserProgressConext;