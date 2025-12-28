'use client';

import { useEffect, useState } from 'react';
import styles from './RepairAnimation.module.css';

interface RepairAnimationProps {
  type: 'voice' | 'power' | 'movement' | 'decision' | 'brain' | 'launch';
  onComplete: () => void;
}

export default function RepairAnimation({ type, onComplete }: RepairAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowComplete(true);
          setTimeout(() => {
            onComplete();
          }, 2000);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  const getRepairMessage = () => {
    switch (type) {
      case 'voice':
        return '🔊 Voice Module Restored!';
      case 'power':
        return '⚡ Power Core Restored!';
      case 'movement':
        return '🦾 Movement System Repaired!';
      case 'decision':
        return '🧠 Decision Chip Repaired!';
      case 'brain':
        return '💭 Brain Module Repaired!';
      case 'launch':
        return '🚀 Launch Sequence Complete!';
      default:
        return 'Repair Complete!';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.animation}>
        <div className={styles.sparkles}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={styles.sparkle}
              style={{
                '--delay': `${i * 0.1}s`,
                '--angle': `${(i * 360) / 12}deg`,
              } as React.CSSProperties}
            />
          ))}
        </div>
        <div className={styles.centerGlow}></div>
      </div>
      
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className={styles.progressText}>
          {progress < 100 ? `${progress}%` : '100%'}
        </div>
      </div>

      {showComplete && (
        <div className={styles.completeMessage}>
          {getRepairMessage()}
        </div>
      )}
    </div>
  );
}
