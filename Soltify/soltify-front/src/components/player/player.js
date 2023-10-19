import React from "react";
import styles from './player.module.css'

import songImg from '../../assets/music.jpg'

const Player = () => {
  return (
      <div className={styles.background}>
          <div className={styles.background_layer}>
              <div className={styles.close}>
                  <ion-icon name="close-outline"></ion-icon>
              </div>
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
                      <audio className={styles.main_audio}></audio>
                  </div>
                  <div className={styles.player_navigation}>
                      <ion-icon name="shuffle-outline" id={styles.random}></ion-icon>
                      <div className={styles.center}>
                          <ion-icon name="play-skip-back-outline"></ion-icon>
                          <div className={styles.play_pause}>
                              <ion-icon name="play" id={styles.play}></ion-icon>
                              <ion-icon name="pause-outline" id={styles.pause}></ion-icon>
                          </div>
                          <ion-icon name="play-skip-forward-outline"></ion-icon>
                      </div>
                      <ion-icon name="repeat-outline" id={styles.repeat}></ion-icon>
                  </div>
                  <div className={styles.song_volume}>
                      <ion-icon name="volume-off-outline"></ion-icon>
                      <div className={styles.volume_progress}>
                          <div className={styles.volume_progress_bar}></div>
                      </div>
                      <ion-icon name="volume-high-outline"></ion-icon>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Player;