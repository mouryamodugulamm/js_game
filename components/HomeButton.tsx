'use client';

import { useRouter } from 'next/navigation';
import styles from './HomeButton.module.css';

interface HomeButtonProps {
  disabled?: boolean;
}

export default function HomeButton({ disabled = false }: HomeButtonProps) {
  const router = useRouter();

  const handleGoHome = () => {
    if (!disabled) {
      router.push('/');
    }
  };

  return (
    <button
      className={styles.homeButton}
      onClick={handleGoHome}
      disabled={disabled}
      title="Go to home page"
    >
      <span className={styles.icon}>🏠</span>
      Home
    </button>
  );
}
