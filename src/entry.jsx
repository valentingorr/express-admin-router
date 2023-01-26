
import React, {
	useState,
	useEffect
} from "react";
import { createRoot } from "react-dom/client";

import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";

import * as CONTEXT from "./context.jsx";
import { createStore } from "redux";
import {
	Provider,
	useSelector,
	useDispatch
} from "react-redux";

import reducers from "./redux/reducers.js";
import * as ACTIONS from "./redux/actions.js";

import * as STYLE from "./style/_config.scss";
import "./style/style.scss";

import Navbar from "./components/Navbar.jsx";

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const App = () => {

	const dispatch = useDispatch();

	dispatch(ACTIONS.routes.set(r));
	const routes = useSelector(state => state.routes);

	return (
		<CONTEXT.default {...{
			route
		}} >
			<Navbar />
			<main>
				{/*<Routes>
					<Route exact path="/" element={<Home />} />
				</Routes>*/}
			</main>
		</CONTEXT.default>
	);
};

export default App;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);