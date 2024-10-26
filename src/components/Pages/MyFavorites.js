import { useContext } from "react";

import FavoritesContext from "../store/favorites-context";
import classes from "./AllMusicList.module.css";

function MyFavorites() {
  const favoritesCtx = useContext(FavoritesContext);

  let content;

  if (favoritesCtx.totalFavorites === 0) {
    content = (
      <p className={classes.noAnyFavorites}>
        !لم تقم بإضافة شيء في قائمه المفضلات بعد اضف ثم عد مرة اخري
       
      </p>
    );
  } else {
    content = (
      <div className={classes.card}>
        {favoritesCtx.favorites.map((list) => (
          <div key={list.id} className={classes.margin}>
            <div className={classes.countContainer}>
              <h1>{favoritesCtx.favorites.indexOf(list) + 1}</h1>
            </div>
            <div className={classes.image}>
              <img src={list.img_src} alt={`img${list.id}`} />
            </div>
            <div className={classes.ellipsis}>
              <span className={classes.title} title={list.title}>
                العنوان: {list.title}
              </span>
              <br />
            </div>
            <div className={classes.ellipsis}>
              <span className={classes.title} title={list.artist}>
                القاريء: {list.artist}
              </span>
              <br />
            </div>
            <br />
          </div>
        ))}
      </div>
    );
  }

  return <div>{content}</div>;
}

export default MyFavorites;
