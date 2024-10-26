import React, { useState, useRef, useEffect } from "react";
import Controls from "./Controls";

import classes from "./Player.module.css";

function Player(props) {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // حالة كتم الصوت

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }

    // ضبط مستوى الصوت
    audioEl.current.volume = isMuted ? 0 : 1; // كتم الصوت إذا كانت الحالة true
  }, [isPlaying, isMuted]); // إضافة isMuted كاعتماد

  const SkipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;

        if (temp > props.songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = props.songs.length - 1;
        }

        return temp;
      });
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev); // عكس حالة كتم الصوت
  };

  return (
    <div className={classes.player}>
      <audio
        src={props.songs[props.currentSongIndex].src}
        ref={audioEl}
      ></audio>
      <h4 className={classes.heading}>قائمة تشغيل قرآن كريم</h4>
      <div className={classes.songContainer}>
        <div>
          <img
            src={props.songs[props.currentSongIndex].img_src}
            alt=""
            className={classes.thumbnail}
          />
        </div>
        <div className={classes.songInfo}>
          <h3 className={classes.title}>
            {props.songs[props.currentSongIndex].title}
          </h3>
          <h4 className={classes.artist}>
            {props.songs[props.currentSongIndex].artist}
          </h4>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            SkipSong={SkipSong}
            id={props.currentSongIndex}
            songs={props.songs}
            toggleMute={toggleMute} // تمرير دالة كتم الصوت
            isMuted={isMuted} // تمرير حالة كتم الصوت
          />
        </div>
      </div>
    </div>
  );
}

export default Player;
