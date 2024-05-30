import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import rootReducer from "./reducers/manageAllReducer";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';



const store = createStore(rootReducer, applyMiddleware(thunk))
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
