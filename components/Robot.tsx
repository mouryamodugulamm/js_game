'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Robot.module.css';

interface RobotProps {
  emotion?: 'happy' | 'sad' | 'excited' | 'confused' | 'neutral';
  isRepairing?: boolean;
  repairType?: 'voice' | 'power' | 'movement' | 'decision' | 'brain' | 'launch';
}

export default function Robot({ emotion = 'neutral', isRepairing = false, repairType }: RobotProps) {
  const [repairProgress, setRepairProgress] = useState(0);

  useEffect(() => {
    if (isRepairing && repairType) {
      setRepairProgress(0);
      const interval = setInterval(() => {
        setRepairProgress((prev: number) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isRepairing, repairType]);

  const getRobotImage = () => {
    switch (emotion) {
      case 'happy':
        return '/images/robot-happy.svg';
      case 'sad':
        return '/images/robot-sad.svg';
      case 'excited':
        return '/images/robot-excited.svg';
      case 'confused':
        return '/images/robot-confused.svg';
      default:
        return '/images/robot-neutral.svg';
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.robot} ${isRepairing ? styles.repairing : ''}`}>
        <Image
          src={getRobotImage()}
          alt="Robot"
          width={200}
          height={300}
          className={styles.robotImage}
          priority
        />
      </div>
      
      {isRepairing && repairType && (
        <div className={styles.repairOverlay}>
          <div className={styles.repairProgress}>
            <div 
              className={styles.progressBar}
              style={{ width: `${repairProgress}%` }}
            ></div>
          </div>
          <div className={styles.repairText}>
            {repairType === 'voice' && '🔊 Restoring voice module...'}
            {repairType === 'power' && '⚡ Restoring power core...'}
            {repairType === 'movement' && '🦾 Repairing movement system...'}
            {repairType === 'decision' && '🧠 Repairing decision chip...'}
            {repairType === 'brain' && '💭 Repairing brain module...'}
            {repairType === 'launch' && '🚀 Launch sequence initiated...'}
          </div>
        </div>
      )}
    </div>
  );
}
