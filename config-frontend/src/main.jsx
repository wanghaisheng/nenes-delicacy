import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/navbar'
import Main from './components/main/main'
import Product from './components/products/product';
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/products/:type" element={<Product />}/>
      </Routes>
    </Router>
  </React.StrictMode>
)
