import styles from './Marquee.module.css'

const venues = [
    "LAKE COMO",
    "TUSCANY",
    "AMALFI COAST",
    "PARIS",
    "PROVENCE",
    "SANTORINI",
    "BALI",
    "MALDIVES",
    "KYOTO",
    "NEW YORK"
]

export default function Marquee() {
    return (
        <div className={styles.marqueeContainer}>
            <div className={styles.marqueeContent}>
                {[...Array(2)].map((_, i) => (
                    <div key={i} className={styles.marqueeTrack}>
                        {venues.map((venue, index) => (
                            <span key={`${i}-${index}`} className={styles.venueItem}>
                                {venue}
                                <span className={styles.separator}>✦</span>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
