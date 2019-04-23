import * as action_types from "../action_types";

export const addToFavs = articleData => {
  return {
    type: action_types.ADD_TO_FAVORITE,
    data: articleData
  };
};

export const deleteFromFavs = articleData => {
  return {
    type: action_types.DELETE_FROM_FAVORITES,
    data: articleData
  };
};

export const addToHistory = newData => {
  return {
    type: action_types.ADD_TO_HISTORY,
    data: newData
  };
};

export const addToSearch = newData => {
  console.warn(newData);
  debugger;
  return {
    type: action_types.ADD_TO_SEARCH,
    data: newData
  };
};

export const addToHistoryChangeDate = newData => {
  return {
    type: action_types.ADD_TO_HISTORY_CHANGE_DATE,
    data: newData
  };
};
