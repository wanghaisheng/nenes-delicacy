import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { allReducers } from './reducers';
import { Provider} from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/navbar'
import Main from './components/main/main'
import Product from './components/products/product';
import './index.scss';


const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/:parameter" element={<Product />}/>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
)
