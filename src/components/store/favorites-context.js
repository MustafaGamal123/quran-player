import { createContext, useState } from "react";

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteSong) => {},
  removeFavorite: (songId) => {},
  isFavorite: (songId) => {},
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);

  function addFavoriteHandler(favoriteSong) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteSong);
    });
  }

  function removeFavoriteHandler(songId) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter((song) => song.id !== songId);
    });
  }

  function isFavoriteHandler(songId) {
    return userFavorites.some((song) => song.id === songId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    isFavorite: isFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
