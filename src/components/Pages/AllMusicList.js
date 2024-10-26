import { musicList } from "../../music-list";
import classes from "./AllMusicList.module.css";

function AllMusicList() {
  return (
    <div className={classes.card}>
      {musicList.map((list) => (
        <div key={list.id} className={classes.margin}>
          <div className={classes.countContainer}>
            <h1>{list.id}</h1>
          </div>
          <div className={classes.image}>
            <img src={list.img_src} alt={`img${list.id}`} />
          </div>
          <div className={classes.ellipsis}>
            <span className={classes.title} title={list.title}>
              الاسم: {list.title}
            </span>
          </div>
          <br />
          <div className={classes.ellipsis}>
            <span className={classes.title} title={list.artist}>
              العنوان: {list.artist}
            </span>
            <br />
          </div>
          <br />
        </div>
      ))}
    </div>
  );
}

export default AllMusicList;
