import { useState, useRef, useEffect } from 'react';
import styles from './BackgroundAudio.module.css';

export default function BackgroundAudio() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const fadeIntervalRef = useRef<number | null>(null);
    const heroTimeRef = useRef<number>(0);

    // Track hero video time
    useEffect(() => {
        const handleHeroTimeUpdate = (e: Event) => {
            const customEvent = e as CustomEvent;
            heroTimeRef.current = customEvent.detail?.currentTime || 0;
        };
        window.addEventListener('heroVideoTimeUpdate', handleHeroTimeUpdate);
        return () => window.removeEventListener('heroVideoTimeUpdate', handleHeroTimeUpdate);
    }, []);

    // Listen for preloader complete to show but not necessarily play
    useEffect(() => {
        const handlePreloaderComplete = () => {
            if (audioRef.current) {
                // If the user already interacted globally, play might succeed.
                // We will rely on a global click interceptor instead.
                audioRef.current.volume = 1;
            }
        };

        window.addEventListener('preloaderComplete', handlePreloaderComplete);
        return () => window.removeEventListener('preloaderComplete', handlePreloaderComplete);
    }, []);

    // Attempt auto-play on mount
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 1;
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(() => {
                    // Autoplay was blocked by browser.
                    // The global click listener below will catch the first interaction.
                });
            }
        }
    }, []);

    // Global click listener to start audio on first interaction if not playing
    useEffect(() => {
        const handleFirstInteraction = (e: MouseEvent) => {
            // Only handle if it's not a click on the button itself
            // to avoid overriding the play toggle
            const target = e.target as HTMLElement;
            if (target.closest(`.${styles.audioButton}`)) return;

            if (audioRef.current && !isPlaying) {
                audioRef.current.volume = 1;
                audioRef.current.currentTime = heroTimeRef.current;
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        setIsPlaying(true);
                    }).catch(() => {
                        // ignore
                    });
                }
            }
        };

        // Listen for any click on the document
        document.addEventListener('click', handleFirstInteraction, { once: true });

        return () => {
            document.removeEventListener('click', handleFirstInteraction);
        };
    }, [isPlaying]);

    // Listen to custom events for fading
    useEffect(() => {
        const handleAudioControl = (e: Event) => {
            const customEvent = e as CustomEvent;
            const action = customEvent.detail?.action;
            if (!audioRef.current || !isPlaying) return;

            if (fadeIntervalRef.current) {
                window.clearInterval(fadeIntervalRef.current);
            }

            if (action === 'fade_out') {
                let vol = audioRef.current.volume;
                fadeIntervalRef.current = window.setInterval(() => {
                    if (vol > 0.05 && audioRef.current) {
                        vol -= 0.05;
                        audioRef.current.volume = Math.max(vol, 0);
                    } else if (audioRef.current) {
                        audioRef.current.volume = 0;
                        if (fadeIntervalRef.current) window.clearInterval(fadeIntervalRef.current);
                    }
                }, 50);
            } else if (action === 'fade_in') {
                let vol = audioRef.current.volume;
                fadeIntervalRef.current = window.setInterval(() => {
                    if (vol < 0.95 && audioRef.current) {
                        vol += 0.05;
                        audioRef.current.volume = Math.min(vol, 1);
                    } else if (audioRef.current) {
                        audioRef.current.volume = 1;
                        if (fadeIntervalRef.current) window.clearInterval(fadeIntervalRef.current);
                    }
                }, 50);
            }
        };

        window.addEventListener('bgAudioControl', handleAudioControl);
        return () => window.removeEventListener('bgAudioControl', handleAudioControl);
    }, [isPlaying]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.volume = 1; // Reset volume when turning on

                // If the user has scrolled down, heroTimeRef might be out of date/paused. 
                // A better approach is to only sync if we are close to the top of the page.
                // But for now, sync to the hero's video time.
                audioRef.current.currentTime = heroTimeRef.current;

                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    return (
        <div className={styles.audioContainer}>
            <button
                className={`${styles.audioButton} ${isPlaying ? styles.playing : ''}`}
                onClick={togglePlay}
                aria-label="Toggle background audio"
            >
                <span className={styles.text}>{isPlaying ? 'Sound On' : 'Sound Off'}</span>
                <span className={styles.soundWaves}>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </span>
            </button>
            <audio
                ref={audioRef}
                src="/video4.mp4"
                loop
                preload="auto"
                autoPlay
            />
        </div>
    );
}
