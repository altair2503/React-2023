import logo from '../../assets/Spotify_App_Logo.svg.png';
import styles from './WelcomePage.module.css';

const WelcomePage = () => {
    return (
        <div className={styles.logo}>
            <img src={logo} alt={logo} />
        </div>
    )
};

export default WelcomePage;