import React, { useContext, useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faHeart,
  faPause,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./Player.module.css"; // Ensure styles are defined appropriately
import FavoritesContext from "../store/favorites-context";

const storeColor = {};

function Player(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Volume from 0 to 1

  if (!storeColor[props.id]) storeColor[props.id] = "ivory";

  function toggleColor() {
    storeColor[props.id] = storeColor[props.id] === "red" ? "ivory" : "red";

    if (storeColor[props.id] === "red") {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.songs[props.id].title,
        artist: props.songs[props.id].artist,
        img_src: props.songs[props.id].img_src,
        src: props.songs[props.id].src,
      });
    } else {
      favoritesCtx.removeFavorite(props.id);
    }
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume; // Update audio element's volume
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime); // Update current time
  };

  const handleSongEnded = () => {
    setIsPlaying(false); // Reset the play state when the song ends
    setCurrentTime(0); // Reset the current time
  };

  // Automatic play when song changes
  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.addEventListener("timeupdate", handleTimeUpdate); // Update time
    audioElement.addEventListener("ended", handleSongEnded); // Handle when song ends

    // Play the audio when the component mounts or when the song changes
    if (isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate); // Clean up
      audioElement.removeEventListener("ended", handleSongEnded);
    };
  }, [props.songs[props.id]]); // Add props.songs[props.id] to the dependency array

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume; // Update volume when it changes
    }
  }, [volume]);

  return (
    <div className={classes.controlContainer}>
      <div
        className={storeColor[props.id] === "ivory" ? classes.ivory : classes.red}
      >
        <FontAwesomeIcon
          icon={faHeart}
          onClick={toggleColor}
          title="Add to Favorites"
        />
      </div>
      <div className={classes.controls}>
        <button
          className={classes.skipBtn}
          onClick={() => props.SkipSong(false)}
        >
          <FontAwesomeIcon icon={faBackward} title="Go to Back" />
        </button>
        <button
          className={classes.playBtn}
          onClick={handlePlayPause}
          title={isPlaying ? "Pause" : "Play"}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button className={classes.skipBtn} onClick={() => props.SkipSong()}>
          <FontAwesomeIcon icon={faForward} title="Go to Next" />
        </button>
      </div>

      <div className={classes.audioPlayer}>
        <audio ref={audioRef} src={props.songs[props.id].src} />
      </div>

      {/* Audio controls for time and volume */}
      <div className={classes.audioControls}>
        <input
          type="range"
          min="0"
          max={audioRef.current ? audioRef.current.duration : 0}
          value={currentTime}
          onChange={(e) => {
            const newTime = e.target.value;
            audioRef.current.currentTime = newTime; // Update audio time
            setCurrentTime(newTime);
          }}
          className={classes.timeSlider} // Custom class for styling
        />
        <div className={classes.volumeContainer}>
          <label htmlFor="volume" className={classes.volumeLabel}>
            Volume
          </label>
          <input
            type="range"
            id="volume"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className={classes.volumeSlider} // Custom class for styling
          />
        </div>
      </div>
    </div>
  );
}

export default Player;
