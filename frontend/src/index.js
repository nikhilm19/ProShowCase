import React from "react";
import ReactDOM from "react-dom";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import { CookiesProvider } from "react-cookie";
import "./styles/tailwind.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

const token = localStorage.getItem("token");
console.log(token);
if (token !== null) {
  console.log(token);
}

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <App token={token} />
    </CookiesProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
