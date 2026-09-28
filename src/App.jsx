import Cart from "./components/Cart.jsx";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserPrgressContextProvider } from "./store/UserProgressContext.jsx";
import Checkout from './components/Checkout.jsx';

function App() {
  return (
    <UserPrgressContextProvider>
      <CartContextProvider>
        <Header></Header>
        <Meals></Meals>
        <Checkout></Checkout>
        <Cart></Cart>
      </CartContextProvider>
    </UserPrgressContextProvider>
  );
}

export default App;
