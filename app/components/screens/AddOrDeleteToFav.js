import realm from "../../database/realmDB";

export default (saveArticle = article => {
  let realmData = realm.objects("Favourites");
  let previousArticles = realmData[0] ? JSON.parse(realmData[0].data) : [];
  let check = false;
  for (const index of previousArticles) {
    if (article.title === index.title) {
      previousArticles = previousArticles.filter(item => item !== index);
      article.icon_color = colors.white;
      check = true;
    }
  }
  let newData;
  if (check) {
    realm.write(() => {
      realmData[0].data = JSON.stringify(previousArticles);
    });
    this.props.deleteFromFavs(previousArticles);
    alert("Article is removed from favorites");
    this.setState({ icon_color: colors.white });
  } else {
    article.icon_color = colors.red;
    newData = previousArticles.concat([article]);
    if (Object.keys(realmData).length === 0) {
      realm.write(() => {
        realm.create("Favourites", {
          data: JSON.stringify(newData)
        });
      });
    } else {
      realm.write(() => {
        realmData[0].data = JSON.stringify(newData);
      });
    }
    this.props.addToFavs(newData);
    alert("Article is added in favorites");
    this.setState({ icon_color: colors.red });
  }
});
