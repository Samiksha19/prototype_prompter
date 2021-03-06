const Realm = require("realm");

const FavoritesSchema = {
  name: "Favourites",
  properties: {
    data: "string"
  }
};

const HistorySchema = {
  name: "History",
  properties: {
    data: "string"
  }
};

const SearchSchema = {
  name: "Search",
  properties: {
    data: "string"
  }
};

export default (realm = new Realm({
  schema: [FavoritesSchema, HistorySchema, SearchSchema]
}));
