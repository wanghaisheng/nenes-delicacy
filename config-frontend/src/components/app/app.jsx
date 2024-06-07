import { 
    BrowserRouter as Router, 
    Routes, 
    Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import { get, getCookie } from '../../utils';
import { lazy, Suspense, useEffect } from "react";
import { useQuery } from "react-query";
import ProductPreloader from '../products/productPreloader';
import CheckoutLayout from '../checkout/checkoutLayout';
import ItemPreloader from '../item/itemPreloader';
import Shipping from "../shipping/shipping";
import Payment from "../payments/payment";
import Checkout from "../checkout/checkout";
import { CheckoutNav } from '../checkout/checkoutNav';
import { useMediaQuery } from 'react-responsive'
import Layout from './appLayout';
import PaymentStatus from "../payments/Paymentstatus";
import Index from '../index';
import './app.scss';

const Product = lazy(() => import("../products/product"))
const Item = lazy(() => import("../item/item"))


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
 
  
    const getCart = useQuery({
        queryKey: ['carts'],
        queryFn: () =>  get(`cart/getCart`), 
        staleTime: Infinity,
        retry: 1
    }, )

    
    if (getCart.isLoading) {
          return <p>Loading Bitch</p>
     }   
    
     if (getCart.isError) {
        return <pre>Something happened {JSON.stringify(getCart.error)}</pre>
     }
    

    return (  
        <div className={(!state && !menuState || (isDesktop && menuState)) ? 'app': 'show'}>
            <Router>
                <Routes>
                    <Route element={<Layout />}>
                            <Route path="/" element={<Index />} />
                            <Route path="/:type" element={
                                <Suspense fallback={<ProductPreloader />}>
                                    <Product />
                                </Suspense>
                            }/>

                             <Route path="/:type/:name" element={
                                <Suspense fallback={<ItemPreloader />}>
                                    <Item />
                                </Suspense>
                             }/>
                    </Route>
                            
                    <Route element={<CheckoutLayout />}>
                        <Route element={<CheckoutNav />}>
                            <Route path="/checkout" element={<Checkout />}/>
                            <Route path="/shipping" element={<Shipping />}/>
                            <Route path="/payment" element={<Payment />}/>
                        </Route>
                    </Route>
                    <Route path="/payment-status" element={<PaymentStatus/>}/>
                </Routes> 
            </Router>
        </div> 
     ); 
}

export default App;