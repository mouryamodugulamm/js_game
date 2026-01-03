'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './StoryDialogue.module.css';
import SoundManager, { SOUNDS } from '@/utils/soundManager';

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
  onSpeakerChange?: (speaker: 'robot' | 'kid' | 'narrator') => void;
  onEmotionChange?: (emotion: 'happy' | 'sad' | 'excited' | 'confused' | 'neutral') => void;
}

export default function StoryDialogue({ dialogues, onComplete, onSave, initialIndex = 0, onIndexChange, onSpeakerChange, onEmotionChange }: StoryDialogueProps) {
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

    // Notify parent about speaker and emotion change
    onSpeakerChange?.(dialogues[currentIndex].speaker);
    onEmotionChange?.(dialogues[currentIndex].emotion || 'neutral');

    const text = dialogues[currentIndex].text;
    setDisplayedText('');
    setIsTyping(true);
    let charIndex = 0;

    // ... (inside component)

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
  }, [currentIndex, dialogues, onComplete, onSpeakerChange]);

  const handleNext = () => {
    SoundManager.getInstance().play(SOUNDS.CLICK);
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
  const isKid = currentDialogue.speaker === 'kid';
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
