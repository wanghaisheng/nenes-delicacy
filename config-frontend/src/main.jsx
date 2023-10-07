import React from 'react'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import ReactDOM from 'react-dom/client'
import { allReducers } from './reducers'
import { Provider} from 'react-redux'
import App from './components/app/app';
import './main.scss';


const store = createStore(allReducers, applyMiddleware(thunk));


const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          refetchOnWindowFocus: false,
          refetchOnMount: false, 
          refetchOnReconnect: false,
          retry: false,
          staleTime: 1000 * 60 * 60 * 24
      }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
)
