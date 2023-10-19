import React from "react";
import styles from './player.module.css'

import songImg from '../../assets/music.jpg'

const Player = () => {
  return (
      <div className={styles.background}>
          <div className={styles.background_layer}>
              <div className={styles.song_img}>
                  <img src={songImg} alt={songImg} />
              </div>
              <div className={styles.player_controllers}>
                  <div className={styles.song_details}>
                      <div className={styles.name}>She's On My Mind (Acoustic)</div>
                      <div className={styles.artist}>JP Cooper She's On My — Mind (Acoustics) - Single</div>
                  </div>
                  <div className={styles.song_progress}>
                      <div className={styles.progress_bar}></div>
                      <div className={styles.timer}>
                          <span className={styles.current}>1:24</span>
                          <span className={styles.duration}>2:32</span>
                      </div>
                  </div>
                  <div className={styles.player_navigation}></div>
              </div>
          </div>
      </div>
  )
}

export default Player;