import { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        venue: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission delay
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', date: '', venue: '', message: '' });
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <section className={styles.contactSection} id="contact">
            <div className={styles.container}>
                <div className={styles.textContent}>
                    <span className={styles.subtitle}>Inquire</span>
                    <h2 className={styles.heading}>Reserve<br />Your Date</h2>
                    <p className={styles.paragraph}>
                        We take on a limited number of commissions each year to ensure every couple receives our undivided attention and artistry. Please share the details of your celebration, and we will be in touch shortly.
                    </p>
                    <div className={styles.contactInfo}>
                        <a href="mailto:lucevoows@gmail.com" className={styles.link}>Email: lucevoows@gmail.com</a>
                        <br />
                        <a href="https://wa.me/94741446495" target="_blank" rel="noopener noreferrer" className={styles.link}>WhatsApp: +94 74 144 6495</a>
                        <br />
                        <br />
                        <span className={styles.location}>Based in Sri Lanka • Available Worldwide</span>
                    </div>
                </div>

                <div className={styles.formContainer}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name" className={styles.label}>Names</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={styles.input}
                                placeholder="Bride & Groom"
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="email" className={styles.label}>Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                    placeholder="lucevoows@gmail.com"
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="date" className={styles.label}>Wedding Date</label>
                                <input
                                    type="text"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="DD.MM.YYYY"
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="venue" className={styles.label}>Venue & Location</label>
                            <input
                                type="text"
                                id="venue"
                                name="venue"
                                value={formData.venue}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="The Grand Walawwa "
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="message" className={styles.label}>Tell us about your celebration</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className={styles.textarea}
                                placeholder="Share your vision, aesthetic, and what matters most to you..."
                                rows={5}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending inquiry...' : 'Submit Inquiry'}
                        </button>

                        {submitStatus === 'success' && (
                            <p className={styles.successMessage}>Thank you. We will be in touch within 48 hours.</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
