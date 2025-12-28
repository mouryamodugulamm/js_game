'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function CompletePage() {
  const router = useRouter();

  useEffect(() => {
    // Clear saved progress
    localStorage.removeItem('currentChapter');
  }, []);

  const handleRestart = () => {
    router.push('/story/1');
  };

  const handleHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.celebration}>
          <div className={styles.stars}>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={styles.star}
                style={{
                  '--delay': `${i * 0.1}s`,
                  '--x': `${Math.random() * 100}%`,
                  '--y': `${Math.random() * 100}%`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>

        <h1 className={styles.title}>🌟 You Are A Builder Now 🌟</h1>

        <div className={styles.message}>
          <p className={styles.mainMessage}>
            The robot has returned home, and you've learned something incredible.
          </p>
          <p className={styles.subMessage}>
            You've mastered the fundamentals of JavaScript:
          </p>
          
          <div className={styles.skills}>
            <div className={styles.skill}>✓ console.log()</div>
            <div className={styles.skill}>✓ Variables & Data Types</div>
            <div className={styles.skill}>✓ Loops</div>
            <div className={styles.skill}>✓ Conditionals</div>
            <div className={styles.skill}>✓ Functions</div>
          </div>

          <p className={styles.finalMessage}>
            Every line of code is a step toward building something amazing.
            <br />
            Keep coding, keep building, keep learning.
          </p>
        </div>

        <div className={styles.robotFinal}>
          <Image
            src="/images/robot-excited.svg"
            alt="Robot"
            width={200}
            height={300}
            className={styles.robotImage}
            priority
          />
        </div>

        <div className={styles.actions}>
          <button 
            className={styles.restartButton}
            onClick={handleRestart}
          >
            Play Again
          </button>
          <button 
            className={styles.homeButton}
            onClick={handleHome}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
