import { useDispatch, useSelector } from "react-redux";
import { ISongData, set_song_data } from "../state/song_data_slice";
import { RootState } from "../state/store";
import styles from "./UploadStep2.module.scss";
import { FC, useEffect, useState } from "react";

const UploadStep2: FC = () => {
  const [size_counters, set_size_counters] = useState({
    name: 0,
    lyric: 0,
  });
  const song_data = useSelector<RootState, ISongData>(
    (state) => state.song_data
  );
  const dispatch = useDispatch();

  function handle_input_change(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    e.preventDefault();

    const { name, value } = e.target;

    if (name === "name" && value.length > 30) {
      return;
    }

    dispatch(
      set_song_data({
        ...song_data.song,
        [name]: value,
      })
    );
  }

  useEffect(() => {
    set_size_counters({
      name: song_data.song.name.length,
      lyric: song_data.song.lyric.length,
    });
  }, [song_data.song.name, song_data.song.lyric]);

  return (
    <div className={styles.upload_step_2}>
      <div className={styles.input_container}>
        <div className={styles.label_and_counter}>
          <label
            htmlFor="name"
            className={styles.label}
          >
            Название песни
          </label>
          <p className={styles.max_size_counter}>{size_counters.name} / 30</p>
        </div>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Новая песня"
          value={song_data.song.name}
          className={styles.input_filed}
          onChange={handle_input_change}
          autoComplete="off"
        />
      </div>
      <div className={styles.input_container}>
        <div className={styles.label_and_counter}>
          <label
            htmlFor="lyric"
            className={styles.label}
          >
            Текст песни
          </label>
          <p className={styles.max_size_counter}>
            {size_counters.lyric} / 5000
          </p>
        </div>
        <textarea
          name="lyric"
          id="lyric"
          placeholder="Текст новой песни"
          value={song_data.song.lyric}
          className={`${styles.input_filed} ${styles.lyric_input}`}
          onChange={handle_input_change}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default UploadStep2;
