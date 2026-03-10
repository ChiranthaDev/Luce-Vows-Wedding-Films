import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.topSection}>
                    <h2 className={styles.cta}>Let's Frame Your<br />Story Together.</h2>
                    <button className={styles.contactBtn}>Start a Conversation</button>
                </div>

                <div className={styles.bottomSection}>
                    <div className={styles.contactInfo}>
                        <a href="mailto:lucevoows@gmail.com">Email: lucevoows@gmail.com</a>
                        <a href="https://wa.me/94741446495">WhatsApp: +94 74 144 6495</a>
                    </div>

                    <div className={styles.socials}>
                        <a href="https://www.tiktok.com/@lucevows?_r=1&_t=ZS-94ZCFaDHND6">TikTok</a>
                        <a href="https://www.instagram.com/lucevows?igsh=OWpldmJ1MDIwN3k5">Instagram</a>
                        <a href="https://web.facebook.com/lucevowsofficial">Facebook</a>
                    </div>

                    <div className={styles.copyright}>
                        <p>&copy; {new Date().getFullYear()} Luce Vows. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
