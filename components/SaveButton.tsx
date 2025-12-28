'use client';

import { useState } from 'react';
import styles from './SaveButton.module.css';

interface SaveButtonProps {
  onSave: () => void;
  disabled?: boolean;
}

export default function SaveButton({ onSave, disabled = false }: SaveButtonProps) {
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
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
