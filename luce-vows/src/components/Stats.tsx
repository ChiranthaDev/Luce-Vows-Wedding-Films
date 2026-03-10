import styles from './Stats.module.css';

const STATS = [
    { value: '100+', label: 'Weddings Captured' },
    { value: '8', label: 'Years of Experience' },
    { value: '150+', label: 'Happy Couples' },
    { value: 'Featured', label: 'In Vogue & Brides' },
];

const MARQUEE_ITEMS = ['Weddings', 'Elopements', 'Engagements', 'Destination', 'Love Stories'];

export default function Stats() {
    return (
        <section className={styles.statsContainer}>
          {/* Scrolling marquee text */}
            <div className={styles.marqueeWrapper} aria-hidden="true">
                <div className={styles.marqueeTrack}>
                    {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                        <span key={i} className={styles.marqueeItem}>
                            {item}
                            <span className={styles.marqueeDot}>✦</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* Stats grid */}
            <div className={styles.grid}>
                {STATS.map((stat) => (
                    <div key={stat.label} className={styles.statItem}>
                        <span className={styles.statValue}>{stat.value}</span>
                        <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
