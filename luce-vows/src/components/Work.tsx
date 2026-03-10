import React from 'react';
import styles from './Work.module.css';

const PROJECTS = [
    { id: 1, title: "Yashodha & Dhanushka", category: "Wedding", videoPreview: "/video1.mp4", link: "https://web.facebook.com/share/v/1Dgj3XpKam/" },
    { id: 2, title: "Bride & Groom", category: "Wedding", videoPreview: "/video2.mp4", link: "https://web.facebook.com/share/v/19wbiiUZvc/" },
    { id: 3, title: "Bride & Groom", category: "Engagement", videoPreview: "/video3.mp4", link: "https://web.facebook.com/share/v/18HxufVMtv/" },
    { id: 4, title: "Bride & Groom", category: "Wedding", videoPreview: "/video4.mp4", link: "https://web.facebook.com/share/v/1AiSvKczmT/" }
];

export default function Work() {
    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        window.dispatchEvent(new CustomEvent('bgAudioControl', { detail: { action: 'fade_out' } }));
        const video = e.currentTarget.querySelector('video');
        if (video) {
            video.currentTime = 0; // Restart video from 0 seconds
            video.muted = false;
            let vol = 0;
            video.volume = vol;
            clearInterval((video as any).fadeInterval);
            (video as any).fadeInterval = setInterval(() => {
                if (vol < 1) {
                    vol += 0.05;
                    video.volume = Math.min(vol, 1);
                } else {
                    clearInterval((video as any).fadeInterval);
                }
            }, 50);
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const video = e.currentTarget.querySelector('video');

        // If the video is playing in Picture-in-Picture, keep the audio ON!
        if (video && document.pictureInPictureElement === video) {
            return;
        }

        window.dispatchEvent(new CustomEvent('bgAudioControl', { detail: { action: 'fade_in' } }));
        if (video) {
            let vol = video.volume;
            clearInterval((video as any).fadeInterval);
            (video as any).fadeInterval = setInterval(() => {
                if (vol > 0) {
                    vol -= 0.05;
                    video.volume = Math.max(vol, 0);
                } else {
                    video.muted = true;
                    clearInterval((video as any).fadeInterval);
                }
            }, 50);
        }
    };

    const handleLeavePiP = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        // When Picture-in-Picture closes, fade out the video audio and restore background audio
        window.dispatchEvent(new CustomEvent('bgAudioControl', { detail: { action: 'fade_in' } }));
        const video = e.currentTarget;
        let vol = video.volume;
        clearInterval((video as any).fadeInterval);
        (video as any).fadeInterval = setInterval(() => {
            if (vol > 0) {
                vol -= 0.05;
                video.volume = Math.max(vol, 0);
            } else {
                video.muted = true;
                clearInterval((video as any).fadeInterval);
            }
        }, 50);
    };

    return (
        <section className={styles.workContainer}>
            <div className={styles.sectionHeader}>
                <p className={styles.sectionLabel}>— Portfolio</p>
                <h2 className={styles.sectionTitle}>Selected<br /><em>Works</em></h2>
            </div>

            <div className={styles.projectList}>
                {PROJECTS.map((project, index) => (
                    <a
                        href={project.link}
                        target={project.link !== "#" ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        key={project.id}
                        className={`${styles.projectRow} ${index % 2 !== 0 ? styles.rowReverse : ''}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Image Panel */}
                        <div className={styles.imagePanel}>
                            <div className={styles.imageWrapper}>
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className={styles.videoPreview}
                                    {...{ onLeavePictureInPicture: handleLeavePiP } as any}
                                >
                                    <source src={project.videoPreview} type="video/mp4" />
                                </video>

                            </div>
                        </div>

                        {/* Info Panel */}
                        <div className={styles.infoPanel}>
                            <span className={styles.projectNumber}>
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <div className={styles.projectMeta}>
                                <span className={styles.category}>{project.category}</span>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <div className={styles.divider}></div>
                                <span className={styles.viewLink}>Watch Video ↗</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
