import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";
import { routerMiddleware } from 'react-router-redux';
// import { browserHistory } from 'react-router';
import { BrowserRouter } from "react-router-dom";

const routersMiddleware = routerMiddleware(BrowserRouter);

const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk, routersMiddleware)
)

export default store;