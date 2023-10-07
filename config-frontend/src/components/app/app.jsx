import { useSelector } from 'react-redux'
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from 'react-query'
import Layout from './appLayout';
import { get, getCookie } from '../../utils';
import CheckoutNav from '../checkout/checkoutNav';
import CheckoutLayout from '../checkout/checkoutLayout';
import './app.scss';


const Index = lazy(() => import("../index")) 
const Shipping = lazy(() => import('../checkout/Shipping'))
const Product = lazy(() => import("../products/product"))
const Checkout = lazy(() => import("../checkout/checkout")) 
const Item = lazy(() => import("../item/item"))



const App = () => {

    const state = useSelector(state => state.getBlurred)


    const getCart = useQuery({
        queryKey: ['carts'],
        queryFn: () =>  get(`cart?sessionid=${getCookie()}`), 
    }, )
    
    if (getCart.isLoading) {
        return <div>Loading...</div>
     }
    
     if (getCart.isError) {
        return <pre>Something happened {JSON.stringify(getCart.error)}</pre>
     }
    
    return ( 
        <div className={state? 'show': 'app'}>
            <Router>
                <Routes>
                    <Route element={<Layout />}>
                             <Route path="/" element={<Suspense><Index /></Suspense>}/>
                             <Route path="/:type" element={<Suspense><Product /></Suspense>}/>
                             <Route path="/:type/:name" element={<Suspense><Item /></Suspense>}/>
                    </Route>
                            
                    <Route element={<CheckoutLayout />}>
                                <Route element={<CheckoutNav />}>
                                    <Route path="/pre-cart" element={<Suspense><Checkout /></Suspense>} />
                                    <Route path="/shipping" element={<Suspense><Shipping /></Suspense>} />
                                </Route>
                    </Route>   
                </Routes> 
            </Router>
        </div>
     ); 
}

export default App;