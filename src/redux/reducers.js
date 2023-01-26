import {
	combineReducers
} from "redux";

export default combineReducers({
	routes: (state = [], action) => {
		switch(action.type) {
			case "set":
				return action.routes;
				break;
		}
		return state;
	}
});