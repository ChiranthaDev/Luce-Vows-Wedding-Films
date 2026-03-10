import styles from './Services.module.css';

const SERVICES = [
    {
        number: '01',
        title: 'Wedding Films',
        description: 'Timeless, documentary-style wedding films that capture emotion and authenticity — every glance, laugh, and tear.',
    },
    {
        number: '02',
        title: 'Highlight Reels',
        description: 'Cinematic, fast-paced short films perfectly cut for social media to share your favorite moments with the world.',
    },
    {
        number: '03',
        title: 'Elopements',
        description: 'Intimate, majestic destination coverage that focuses entirely on your private vows and unique adventure.',
    },
    {
        number: '04',
        title: 'Engagement Stories',
        description: 'Pre-wedding narrative shoots that document how you met, giving your love story the cinematic prologue it deserves.',
    },
];

export default function Services() {
    return (
        <section className={styles.servicesContainer}>
            <div className={styles.sectionHeader}>
                <p className={styles.sectionLabel}>— What I Do</p>
                <h2 className={styles.sectionTitle}>Services</h2>
            </div>

            <div className={styles.grid}>
                {SERVICES.map((service) => (
                    <div key={service.number} className={styles.card}>
                        <span className={styles.number}>{service.number}</span>
                        <div className={styles.cardBody}>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <div className={styles.divider}></div>
                            <p className={styles.cardDesc}>{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
