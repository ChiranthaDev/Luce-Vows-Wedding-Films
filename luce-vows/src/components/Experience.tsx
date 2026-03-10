import styles from './Experience.module.css';

const steps = [
    {
        number: "01",
        title: "The Inquiry",
        description: "It begins with a conversation. We want to know your story, your vision, and what matters most to you on your wedding day."
    },
    {
        number: "02",
        title: "The Planning",
        description: "We work closely with you and your planner to map out the perfect timeline, ensuring a seamless and stress-free experience."
    },
    {
        number: "03",
        title: "The Wedding Day",
        description: "An unobtrusive, calming presence. We capture the genuine moments, the quiet glances, and the grand celebrations as they unfold naturally."
    },
    {
        number: "04",
        title: "The Delivery",
        description: "A meticulously crafted narrative. Your custom cinematic film is delivered, allowing you to relive your masterpiece for generations."
    }
];

export default function Experience() {
    return (
        <section className={styles.experienceSection} id="experience">
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.subtitle}>Our Process</span>
                    <h2 className={styles.heading}>The Experience</h2>
                    <p className={styles.intro}>
                        We believe that the journey should be as beautiful as the final film. Here is what you can expect when partnering with LUCE VOWS.
                    </p>
                </div>

                <div className={styles.timeline}>
                    {steps.map((step, index) => (
                        <div key={index} className={styles.step}>
                            <div className={styles.stepNumber}>{step.number}</div>
                            <div className={styles.stepContent}>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepDescription}>{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
