import { useContext } from "react";
import { Link } from "react-router-dom";
import FavoritesContext from "../store/favorites-context";

import classes from "./NavigationSection.module.css";

function NavigationSection() {
  const favoritesCtx = useContext(FavoritesContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">ماتيسر من القرآن الكريم</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">تشغيل</Link>
          </li>
          <li>
            <Link to="/music-list">قائمة القرآن الكريم</Link>
          </li>
          <li>
            <Link to="/my-favorites">
              الاصوات المفضلة
              <span className={classes.badge}>
                {favoritesCtx.totalFavorites}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavigationSection;
