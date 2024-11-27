import { 
    BrowserRouter as Router, 
    Routes, 
    Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import { lazy, Suspense, useEffect } from "react";
import { Spinner } from "../preloader/preloader";
import ProductPreloader from '../products/productPreloader';
import ItemPreloader from '../item/itemPreloader';
import Layout from './appLayout';
import Index from '../index';
import './app.scss';

const Product = lazy(() => import("../products/product"))
const Item = lazy(() => import("../item/item"))
const NotFound = lazy(() => import("../404/404"))
const Payment = lazy(() => import("../payments/payment"))
const Grocery = lazy(() => import("../grocery/grocery"))
const Shipping = lazy(() => import("../shipping/shipping"))
const Checkout = lazy(() => import("../checkout/checkout"))
const Search = lazy(() => import("../search/search"))
const CheckoutLayout = lazy(() => import('../checkout/checkoutLayout').then(
    module => ({default: module.CheckoutLayout})
));


const App = () => {
   
    const state = useSelector(state => state.getBlurred)
    const menuState = useSelector(state => state.getMenu)

    
    useEffect(() => {
        if (!state && !menuState) {
            document.body.style.overflow = '';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }, [state, menuState])
 

    return (  
        <div className={(!state && !menuState)? 'app': 'show'}>
            <Router>
                <Routes>
                    <Route element={<Layout />}>
                            <Route path="*" element={<NotFound/>}/>
                            <Route path="/not-found" element={<NotFound />}/>
                            <Route path="/" element={<Index />} />

                            <Route path="/products" element={
                                <Suspense fallback={<ProductPreloader/>}>
                                    <Grocery/>
                                </Suspense>
                            }/>

                            <Route path="/products/:type" element={
                                <Suspense fallback={<ProductPreloader/>}>
                                    <Product/>
                                </Suspense>
                            }/>

                            <Route path="/collections" element={
                                <Suspense fallback={<ProductPreloader/>}>
                                    <Grocery/>
                                </Suspense>
                            }/>

                            <Route path="/collections/:type" element={
                                <Suspense fallback={<ProductPreloader/>}>
                                    <Product/>
                                </Suspense>
                            }/>

                            <Route path="/search" element={
                                <Suspense fallback={<ProductPreloader/>}>
                                    <Search/>
                                </Suspense>
                            }/>

                             <Route path="/:name" element={
                                <Suspense fallback={<ItemPreloader/>}>
                                    <Item />
                                </Suspense>
                             }/>
                    </Route>
                            
                    <Route element={
                        <Suspense fallback={<Spinner message="Loading, please wait"/>}>
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