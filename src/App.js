import React, {useState, useEffect} from 'react';
import {commerce} from './lib/commerce';
import {Products, Navbar, Cart, Checkout} from './components';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        const {data} = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const handlerAddToCart = async (productId, quantity) => {
        const {cart} = await commerce.cart.add(productId, quantity);

        setCart(cart)
    }

    const handlerUpdateCartQty = async (productId, quantity) => {
        const {cart} = await commerce.cart.update(productId, {quantity});

        setCart(cart)
    }

    const handlerRemoveFromCart = async (productId) => {
        const {cart} = await commerce.cart.remove(productId);

        setCart(cart)
    }

    const handlerEmptyCart = async () => {
        const {cart} = await commerce.cart.empty();

        setCart(cart)
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items}/>
                <Switch>
                    <Route exact path='/'>
                        <Products products={products} onAddToCart={handlerAddToCart}/>
                    </Route>
                    <Route exact path='/cart'>
                        <Cart
                            cart={cart}
                            handlerUpdateCartQty={handlerUpdateCartQty}
                            handlerRemoveFromCart={handlerRemoveFromCart}
                            handlerEmptyCart={handlerEmptyCart}
                        />
                    </Route>
                    <Route exact path='/checkout'>
                        <Checkout cart={cart}/>
                     </Route>
                </Switch>
            </div>
        </Router>
    );


}

export default App;
