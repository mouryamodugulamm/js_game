'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { hasSavedGame, getSaveInfo, clearGameState, loadGameState } from '@/utils/saveGame';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);
  const [hasSave, setHasSave] = useState(false);
  const [saveInfo, setSaveInfo] = useState<{ chapter: number; timestamp: number } | null>(null);

  useEffect(() => {
    // Check for saved progress
    if (typeof window !== 'undefined') {
      const saved = hasSavedGame();
      setHasSave(saved);
      if (saved) {
        const info = getSaveInfo();
        setSaveInfo(info);
      }
    }
    
    // Animate button appearance
    setTimeout(() => setShowButton(true), 2000);
  }, []);

  const handleStart = () => {
    // Clear any previous progress or start fresh
    clearGameState();
    router.push('/story/intro');
  };

  const handleContinue = () => {
    const savedState = loadGameState();
    if (savedState) {
      // Navigate to the exact chapter and let it restore the state
      if (savedState.chapter === 0) {
        router.push('/story/intro');
      } else {
        router.push(`/story/${savedState.chapter}`);
      }
    } else {
      handleStart();
    }
  };

  const formatSaveTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>The Robot & The Kid</h1>
          <p className={styles.subtitle}>A story-driven journey into JavaScript</p>
        </div>

        <div className={styles.robotPreview}>
          <Image
            src="/images/robo_neutral.png"
            alt="Robot"
            width={400}
            height={500}
            className={styles.robotImage}
            priority
          />
        </div>

        <div className={`${styles.actions} ${showButton ? styles.visible : ''}`}>
          {hasSave && saveInfo && (
            <button 
              className={styles.savedGameButton}
              onClick={handleContinue}
            >
              <div className={styles.savedGameContent}>
                <span className={styles.savedGameLabel}>💾 Saved Game</span>
                <span className={styles.savedGameInfo}>
                  Chapter {saveInfo.chapter} • {formatSaveTime(saveInfo.timestamp)}
                </span>
              </div>
            </button>
          )}
          <button 
            className={styles.startButton}
            onClick={handleStart}
          >
            {hasSave ? 'Start New Game' : 'Start Story'}
          </button>
        </div>

        <div className={styles.creatorSection}>
          <p className={styles.creatorText}>
            Independently created with a passion for learning, storytelling, and code.{' '}
            Want to connect?{' '}
            <a 
              href="https://www.infi-studio.website/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.supportLink}
            >
              Visit INFI Studio
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
