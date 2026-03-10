import { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        quote: "Our wedding film is a masterpiece. They didn't just record the day; they captured the feeling, the quiet moments, and the magic we felt.",
        author: "Yashodha & Dhanushka",
        location: "Colombo, Sri Lanka"
    },
    {
        quote: "Watching our film is like experiencing the day all over again. The cinematic quality and storytelling are beyond anything we could have imagined.",
        author: "Savindhi & Sanura",
        location: "Kurunegala, Sri Lanka"
    },
    {
        quote: "A seamless, unobtrusive presence on our wedding day. The final result is a timeless family heirloom that we will cherish forever.",
        author: "Janu & Prabhath",
        location: "Matale, Sri Lanka"
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className={styles.testimonialsSection}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Love Stories</h2>
                <div className={styles.slider}>
                    {testimonials.map((test, index) => (
                        <div
                            key={index}
                            className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
                        >
                            <p className={styles.quote}>"{test.quote}"</p>
                            <div className={styles.authorGroup}>
                                <p className={styles.author}>{test.author}</p>
                                <p className={styles.location}>{test.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.dots}>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
