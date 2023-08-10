import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { allReducers } from './reducers';
import { Provider} from 'react-redux'
import App from './components/app/app';
import './main.scss';


const store = createStore(allReducers, applyMiddleware(thunk));
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
