'use client';

import Image from 'next/image';
import styles from './Kid.module.css';

interface KidProps {
    emotion?: 'happy' | 'sad' | 'excited' | 'confused' | 'neutral';
}

export default function Kid({ emotion = 'neutral' }: KidProps) {
    const getKidImage = () => {
        switch (emotion) {
            case 'excited':
                return '/images/kid_excited.png';
            case 'confused':
            case 'sad':
                return '/images/kid_confused.png';
            default:
                return '/images/kid_neutral.png';
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.kid}>
                <Image
                    src={getKidImage()}
                    alt="Kid"
                    width={300}
                    height={450}
                    className={styles.kidImage}
                    priority
                />
            </div>
        </div>
    );
}
