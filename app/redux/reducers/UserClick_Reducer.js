import * as action_types from "../action_types";

export const UserDataReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case action_types.ADD_TO_HISTORY:
      return {
        ...state,
        UserData: action.data
      };

    default:
      return state;
  }
};

export const UserFavReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case action_types.ADD_TO_FAVORITE:
      return {
        ...state,
        UserFav: action.data
      };

    case action_types.DELETE_FROM_FAVORITES:
      return {
        ...state,
        UserFav: action.data
      };

    default:
      return state;
  }
};
