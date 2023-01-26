import React, {
	createContext
} from "react";

export const route = createContext();

export default props => {
	return (
		<route.Provider value={props.route}>
			{props.children}
		</route.Provider>
	);
};