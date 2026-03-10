import { useRef, useEffect } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handlePreloaderComplete = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.error("Video play blocked:", e));
      }
    };
    window.addEventListener('preloaderComplete', handlePreloaderComplete);
    return () => window.removeEventListener('preloaderComplete', handlePreloaderComplete);
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      window.dispatchEvent(
        new CustomEvent('heroVideoTimeUpdate', {
          detail: { currentTime: videoRef.current.currentTime }
        })
      );
    }
  };

  return (
    <section className={`full-screen fade-in ${styles.heroContainer}`}>
      {/* Video Background */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        className={styles.videoBackground}
        onTimeUpdate={handleTimeUpdate}
      >
        <source
          src="/video4.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient overlays */}
      <div className={styles.overlayTop}></div>
      <div className={styles.overlayBottom}></div>

      {/* Film grain texture */}
      <div className={styles.grain}></div>

      {/* Top bar */}
      <div className={styles.topBar}>
        <img src="/logolv.png" alt="LUCE VOWS" className={styles.navLogo} />
        <div className={styles.availability}>
          <span className={styles.dot}></span>
          Booking 2026/2027 Weddings
        </div>
      </div>

      {/* Main content */}
      <div className={styles.content}>
        <p className={styles.eyebrow}>Timeless & Authentic</p>
        <h1 className={styles.title}>
          <span className={styles.titleLine}>Capturing</span>
          <span className={`${styles.titleLine} ${styles.titleLineItalic}`}>Love</span>
          <span className={styles.titleLine}>Frame by Frame</span>
        </h1>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollLine}></div>
          <span className={styles.scrollText}>Scroll</span>
        </div>

      </div>
    </section>
  );
}
