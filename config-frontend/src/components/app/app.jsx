import { 
    BrowserRouter as Router, 
    Routes, 
    Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import { lazy, Suspense, useEffect } from "react";
import ProductPreloader from '../products/productPreloader';
import ItemPreloader from '../item/itemPreloader';
import { useMediaQuery } from 'react-responsive'
import Layout from './appLayout';
import Index from '../index';
import './app.scss';

const Product = lazy(() => import("../products/product"))
const Item = lazy(() => import("../item/item"))
const Payment = lazy(() => import("../payments/payment"))
const Shipping = lazy(() => import("../shipping/shipping"))
const Checkout = lazy(() => import("../checkout/checkout"))
const CheckoutLayout = lazy(() => import('../checkout/checkoutLayout'));


const App = () => {
   
    const state = useSelector(state => state.getBlurred)
    const menuState = useSelector(state => state.getMenu)
    const isDesktop = useMediaQuery({query: '(min-width: 912px)'}); 

    
    useEffect(() => {
        if (!state && !menuState) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }, [state, menuState])
 

    return (  
        <div className={(!state && !menuState || (isDesktop && menuState)) ? 'app': 'show'}>
            <Router>
                <Routes>
                    <Route element={<Layout />}>
                            <Route path="/" element={<Index />} />
                            <Route path="/:type" element={
                                <Suspense fallback={<ProductPreloader/>}>
                                    <Product/>
                                </Suspense>
                            }/>

                             <Route path="/:type/:name" element={
                                <Suspense fallback={<ItemPreloader/>}>
                                    <Item />
                                </Suspense>
                             }/>
                    </Route>
                            
                    <Route element={
                        <Suspense>
                            <CheckoutLayout />
                        </Suspense>}> 
                        <Route path="/checkout" element={<Checkout/>}/>
                        <Route path="/shipping" element={<Shipping/>}/>
                        <Route path="/payment" element={<Payment/>}/>
                    </Route>
                </Routes> 
            </Router>
        </div> 
     )}

export default App;