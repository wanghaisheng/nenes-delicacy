import Navbar from "../navbar/navbar";
import Index from "../index";
import { useSelector } from 'react-redux'
import Footer from "../footer/footer";
import Product from "../products/product";
import Item from "../item/item";
import { QueryClient, QueryClientProvider } from 'react-query';
import Cart from "../cart/cart";
import './app.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const queryClient = new QueryClient()

const App = () => {
    const state = useSelector(state => state.getBlurred)

    return ( 
        <div className={state? 'show': 'app'}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Navbar />
                    <Routes>
                    <Route path="/" element={<Index />}/>
                    <Route path="/:type" element={<Product />}/>
                    <Route path="/:type/:name" element={<Item />}/>
                    <Route path="cart" element={<Cart />}/>
                    </Routes>
                    <Footer />
                </Router>
            </QueryClientProvider>
        </div>
     );
}

export default App;