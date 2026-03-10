import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

export default function Preloader() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Wait 2 seconds before triggering the split animation
        const timer = setTimeout(() => {
            setIsLoaded(true);
            window.dispatchEvent(new Event('preloaderComplete'));
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`${styles.preloader} ${isLoaded ? styles.loaded : ''}`}>
            <div className={styles.halfTop}></div>
            <div className={styles.halfBottom}></div>
            <div className={styles.brandText}>
                <img src="/logolv.png" alt="LUCE VOWS" className={styles.logoImage} />
            </div>
        </div>
    );
}
