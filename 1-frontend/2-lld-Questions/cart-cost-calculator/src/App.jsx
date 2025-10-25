import {useEffect, useReducer} from 'react'
import axios from 'axios'
import './App.css';
import Cart from './components/Cart.jsx';
import { cartReducer } from './reducers/cartReducer';
import Products from "./components/Product.jsx";

function App() {
    const [state, dispatch] = useReducer(cartReducer, {
        products: [],
        cart: [],
    });

    const fetchProducts = async()=>{
        const {data} = await axios.get("https://dummyjson.com/products")

        dispatch({
            type: 'ADD_PRODUCTS',
            payload: data.products
        })
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div style={{display:'flex'}}>
            <Products state={state} dispatch={dispatch}/>
            <Cart state={state} dispatch={dispatch}/>
        </div>
    );
}

export default App;
