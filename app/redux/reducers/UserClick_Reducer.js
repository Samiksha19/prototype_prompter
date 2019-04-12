import * as action_types from "../action_types";
import * as colors from "../../utils/colors";

const initialState = {
  UserData: []
};

export const UserDataReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case action_types.ADD_TO_FAVORITE:
      return {
        ...state,
        UserData: action.data
      };

    case action_types.ADD_TO_HISTORY:
      return {
        ...state,
        UserData: action.data
      };

    default:
      return state;
  }
};
