import styles from "./MainLayout.module.scss";
import { FC, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { ColorThemes } from "../types";
import { RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import {
  IoPlay,
  IoPause,
  IoPlayBack,
  IoPlayForward,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoVolumeHigh,
  IoVolumeMute,
} from "react-icons/io5";
import { RiLoopLeftFill } from "react-icons/ri";
import H5AudioPlayer from "react-h5-audio-player";
import { ISong } from "../types";
import { set_current_song_playing } from "../state/current_song_data_slice";

const MainLayout: FC = () => {
  const songs = useSelector<RootState, ISong[]>((state) => state.songs.songs);
  const audio_url = useSelector<RootState, string>(
    (state) => state.song_url.url
  );
  const color_theme = useSelector<RootState, ColorThemes>(
    (state) => state.color_theme.theme
  );
  const current_song_id = useSelector<RootState, number>(
    (state) => state.current_song_data.id
  );
  const song_playing = useSelector<RootState, boolean>(
    (state) => state.current_song_data.is_palying
  );
  const audio_player_ref = useRef<H5AudioPlayer>(null);
  const dispatch = useDispatch();

  function handle_player_play_click() {
    if (audio_player_ref.current?.audio.current) {
      dispatch(set_current_song_playing(true));
    }
  }

  function handle_player_pause_click() {
    if (audio_player_ref.current?.audio.current) {
      dispatch(set_current_song_playing(false));
    }
  }

  // FIXME strange logic, why !song_playing???
  useEffect(() => {
    if (audio_url) {
      if (audio_player_ref.current?.audio.current) {
        if (!song_playing) {
          audio_player_ref.current.audio.current.pause();
        } else {
          audio_player_ref.current.audio.current.play();
        }
      }
    }
  }, [song_playing]);

  if (!color_theme) {
    return <div className={styles.preload}></div>;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      {current_song_id !== -1 && (
        <div className={styles.player_meta_info}>
          <div className={styles.image_wrapper}>
            <img
              src={songs.find((song) => song.id === current_song_id)?.cover_url}
              alt=""
            />
          </div>
          <p className={styles.name}>
            {songs.find((song) => song.id === current_song_id)?.name}
          </p>
        </div>
      )}
      <AudioPlayer
        ref={audio_player_ref}
        src={audio_url}
        style={{
          display: `${current_song_id !== -1 ? "flex" : "none"}`,
        }}
        showFilledVolume
        onPlay={handle_player_play_click}
        onPause={handle_player_pause_click}
        layout="horizontal"
        customIcons={{
          play: (
            <IoPlay
              className={styles.playback_icon}
              style={{
                width: "1.5rem",
                height: "1.5rem",
              }}
            />
          ),
          pause: (
            <IoPause
              className={styles.playback_icon}
              style={{
                width: "1.5rem",
                height: "1.5rem",
              }}
            />
          ),
          rewind: (
            <IoPlayBack
              className={styles.playback_icon}
              style={{
                width: "1.5rem",
                height: "1.5rem",
              }}
            />
          ),
          forward: (
            <IoPlayForward
              className={styles.playback_icon}
              style={{
                width: "1.5rem",
                height: "1.5rem",
              }}
            />
          ),
          previous: (
            <IoPlaySkipBack
              className={styles.playback_icon}
              style={{
                width: "1.5rem",
                height: "1.5rem",
              }}
            />
          ),
          next: (
            <IoPlaySkipForward
              className={styles.playback_icon}
              style={{
                width: "1.5rem",
                height: "1.5rem",
              }}
            />
          ),
          loop: <RiLoopLeftFill className={styles.playback_icon} />,
          loopOff: (
            <RiLoopLeftFill
              className={styles.playback_icon}
              style={{ color: "#959595" }}
            />
          ),
          volume: <IoVolumeHigh className={styles.playback_icon} />,
          volumeMute: <IoVolumeMute className={styles.playback_icon} />,
        }}
      />
      <div className={styles.decor_container}>
        <div
          className={styles.bg_decor}
          style={{ filter: `invert(${color_theme === "White" ? 0 : 1})` }}
        ></div>
      </div>
    </>
  );
};

export default MainLayout;
