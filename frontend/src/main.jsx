import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';

const store = configureStore();

//  NOT SURE WHICH TO USE THIS IS IN THE READING THIS ONE OR THE ONE BELOW
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

// if (import.meta.env.MODE !== 'production') {
//   window.store = store;
// }

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
}




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
