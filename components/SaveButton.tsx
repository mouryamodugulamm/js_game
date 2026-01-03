'use client';

import { useState } from 'react';
import styles from './SaveButton.module.css';
import SoundManager, { SOUNDS } from '@/utils/soundManager';

interface SaveButtonProps {
  onSave: () => void;
  disabled?: boolean;
}

export default function SaveButton({ onSave, disabled = false }: SaveButtonProps) {
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    SoundManager.getInstance().play(SOUNDS.CLICK);
    onSave();
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  return (
    <button
      className={`${styles.saveButton} ${showSaved ? styles.saved : ''}`}
      onClick={handleSave}
      disabled={disabled}
      title="Save your progress"
    >
      {showSaved ? (
        <>
          <span className={styles.checkmark}>✓</span>
          Saved!
        </>
      ) : (
        <>
          <span className={styles.icon}>💾</span>
          Save
        </>
      )}
    </button>
  );
}




