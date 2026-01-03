'use client';

import styles from './ProgressTracker.module.css';

interface ProgressTrackerProps {
  currentChapter: number;
  totalChapters: number;
  distanceToHome: number;
}

export default function ProgressTracker({ currentChapter, totalChapters, distanceToHome }: ProgressTrackerProps) {
  const progress = ((currentChapter - 1) / totalChapters) * 100;

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className={styles.info}>
        <div className={styles.chapterInfo}>
          Chapter {currentChapter} of {totalChapters}
        </div>
        <div className={styles.distanceInfo}>
          🌌 Distance to Home: {distanceToHome} light-years
        </div>
      </div>
    </div>
  );
}




