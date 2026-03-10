import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (cursorRef.current && ringRef.current) {
                // Adjust translation so the cursor is centered on the mouse pointer
                cursorRef.current.style.transform = `translate3d(${e.clientX - 5}px, ${e.clientY - 5}px, 0)`;
                // Give the ring a slight delay by using a smoother transform updating, 
                // but direct transform is fine for pure follow
                ringRef.current.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
            }
        };

        const onMouseDown = () => {
            if (cursorRef.current && ringRef.current) {
                cursorRef.current.style.width = '20px';
                cursorRef.current.style.height = '20px';
                cursorRef.current.style.transform = `translate3d(${window.event ? (window.event as MouseEvent).clientX - 10 : 0}px, ${(window.event as MouseEvent).clientY - 10}px, 0)`;
            }
        }

        const onMouseUp = () => {
            if (cursorRef.current && ringRef.current) {
                cursorRef.current.style.width = '10px';
                cursorRef.current.style.height = '10px';
            }
        }

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        // Also add logic to disable default cursor in css
        document.body.style.cursor = 'none';

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            document.body.style.cursor = 'auto';
        }
    }, []);

    return (
        <>
            <div ref={cursorRef} className={styles.cursor} />
            <div ref={ringRef} className={styles.cursorRing} />
        </>
    );
}
