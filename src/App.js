import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import HomePage from "./components/Pages/HomePage";
import AllMusicList from "./components/Pages/AllMusicList";
import MyFavorites from "./components/Pages/MyFavorites";
function App() {
  useEffect(() => {
    document.title = "القرآن الكريم"; 
  }, []); // 
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/music-list" element={<AllMusicList />} />
        <Route path="/my-favorites" element={<MyFavorites />} />
      </Routes>
    </Layout>
  );
}

export default App;
