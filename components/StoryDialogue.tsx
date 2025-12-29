'use client';

import { useEffect, useState } from 'react';
import styles from './StoryDialogue.module.css';

interface Dialogue {
  speaker: 'robot' | 'kid' | 'narrator';
  text: string;
  emotion?: 'happy' | 'sad' | 'excited' | 'confused' | 'neutral';
}

interface StoryDialogueProps {
  dialogues: Dialogue[];
  onComplete: () => void;
  onSave?: () => void;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
}

export default function StoryDialogue({ dialogues, onComplete, onSave, initialIndex = 0, onIndexChange }: StoryDialogueProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // If we have an initial index, start from there
    if (initialIndex > 0 && initialIndex < dialogues.length) {
      setCurrentIndex(initialIndex);
      setDisplayedText(dialogues[initialIndex].text);
      setIsTyping(false);
    }
  }, [initialIndex, dialogues]);

  const currentDialogue = dialogues[currentIndex];

  useEffect(() => {
    if (currentIndex >= dialogues.length) {
      onComplete();
      return;
    }

    const text = dialogues[currentIndex].text;
    setDisplayedText('');
    setIsTyping(true);
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText(text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [currentIndex, dialogues]);

  const handleNext = () => {
    if (isTyping) {
      // Skip to end of current text
      setDisplayedText(currentDialogue.text);
      setIsTyping(false);
    } else {
      // Move to next dialogue
      if (currentIndex < dialogues.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        onIndexChange?.(nextIndex);
      } else {
        onComplete();
      }
    }
  };

  if (currentIndex >= dialogues.length) {
    return null;
  }

  const isRobot = currentDialogue.speaker === 'robot';
  const isNarrator = currentDialogue.speaker === 'narrator';
  const emotion = currentDialogue.emotion || 'neutral';

  return (
    <div className={styles.container}>
      <div className={`${styles.dialogue} ${isRobot ? styles.robot : isNarrator ? styles.narrator : styles.kid}`}>
        <div className={styles.speaker}>
          {isRobot ? '🤖 Robot' : isNarrator ? '🌌 Narrator' : '👦 Kid'}
        </div>
        <div className={styles.text}>
          {displayedText}
          {isTyping && <span className={styles.cursor}>|</span>}
        </div>
        <button 
          className={styles.nextButton}
          onClick={handleNext}
        >
          {isTyping ? 'Skip' : currentIndex < dialogues.length - 1 ? 'Next' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
