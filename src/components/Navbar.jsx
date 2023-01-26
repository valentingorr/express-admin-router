import React, {
	useEffect,
	useContext
} from "react";

import {
	useSelector
} from "react-redux";

import {
	Link
} from "react-router-dom";

import * as CONTEXT from "../context.jsx";

export default props => {

	const route = useContext(CONTEXT.route);
	const routes = useSelector(state => state.routes);

	// useEffect(() => console.log(route), [route]);

	return (
		<nav>
			<ul>
				{
					routes.map((r, rKey) => (
						<li key={rKey}>
							<Link to={`${route}/${r.slug}`}>{r.title}</Link>
						</li>
					))
				}
			</ul>
		</nav>
	);
};