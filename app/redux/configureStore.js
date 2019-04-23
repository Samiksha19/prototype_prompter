/* create store for all reducer*/

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";
import {
  UserDataReducer,
  UserFavReducer,
  UserSearchReducer
} from "./reducers/UserClick_Reducer";
import logger from "redux-logger";

//create store
const store = createStore(
  combineReducers({
    UserData: UserDataReducer,
    UserFav: UserFavReducer,
    UserSearch: UserSearchReducer
  }),
  applyMiddleware(thunk, apiMiddleware, logger)
);

export default store;
