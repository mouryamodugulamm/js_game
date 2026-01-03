'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import StoryDialogue from '@/components/StoryDialogue';
import Robot from '@/components/Robot';
import SaveButton from '@/components/SaveButton';
import HomeButton from '@/components/HomeButton';
import { saveGameState, loadGameState } from '@/utils/saveGame';
import Image from 'next/image';
import styles from './page.module.css';

const preStoryDialogues = [
  {
    speaker: 'narrator' as const,
    text: 'A robot from the stars crashes into a quiet garage.',
    emotion: 'sad' as const,
  },
  {
    speaker: 'narrator' as const,
    text: 'A lonely kid who hates coding finds it.',
    emotion: 'confused' as const,
  },
  {
    speaker: 'narrator' as const,
    text: 'The robot can\'t go home unless it\'s repaired.',
    emotion: 'sad' as const,
  },
  {
    speaker: 'narrator' as const,
    text: 'And the only way to fix it…',
    emotion: 'neutral' as const,
  },
  {
    speaker: 'narrator' as const,
    text: 'is to learn JavaScript—one small step at a time.',
    emotion: 'happy' as const,
  },
];

export default function PreStoryPage() {
  const router = useRouter();
  const [showContinue, setShowContinue] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<'happy' | 'sad' | 'excited' | 'confused' | 'neutral'>('neutral');
  const [dialogueIndex, setDialogueIndex] = useState(0);

  useEffect(() => {
    // Try to restore saved state for intro page
    const savedState = loadGameState();
    if (savedState && savedState.chapter === 0) {
      // If we were at intro and had completed it, show continue button
      if (savedState.gameState === 'complete' || savedState.dialogueIndex === preStoryDialogues.length - 1) {
        setShowContinue(true);
      }
      if (savedState.dialogueIndex !== undefined) {
        setDialogueIndex(savedState.dialogueIndex);
      }
      // Restore emotion
      if (savedState.dialogueIndex !== undefined && preStoryDialogues[savedState.dialogueIndex]) {
        setCurrentEmotion(preStoryDialogues[savedState.dialogueIndex].emotion || 'neutral');
      }
    }
  }, []);

  const handleDialogueComplete = () => {
    setShowContinue(true);
    // Save that we completed the intro
    saveGameState({
      chapter: 0,
      gameState: 'complete',
      dialogueIndex: preStoryDialogues.length - 1,
      timestamp: Date.now(),
    });
  };

  const handleDialogueIndexChange = (index: number) => {
    setDialogueIndex(index);
  };

  const handleContinue = () => {
    router.push('/story/1');
  };

  const handleSave = () => {
    saveGameState({
      chapter: 0, // Pre-story
      gameState: showContinue ? 'complete' : 'dialogue',
      dialogueIndex: dialogueIndex,
      timestamp: Date.now(),
    });
  };

  // Auto-save on dialogue index changes
  useEffect(() => {
    saveGameState({
      chapter: 0,
      gameState: showContinue ? 'complete' : 'dialogue',
      dialogueIndex: dialogueIndex,
      timestamp: Date.now(),
    });
  }, [dialogueIndex, showContinue]);

  // Update emotion based on dialogue
  const handleDialogueChange = (index: number) => {
    if (preStoryDialogues[index]) {
      setCurrentEmotion(preStoryDialogues[index].emotion || 'neutral');
    }
  };

  return (
    <div className={styles.container}>
      <Image
        src="/images/bg_garage.png"
        alt="Background"
        fill
        className={styles.backgroundImage}
        priority
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <div className={styles.spaceScene}>
            {dialogueIndex === 0 ? (
              <div className={styles.rocketContainer}>
                <Image
                  src="/images/rocket_image.png"
                  alt="Rocket"
                  width={200}
                  height={300}
                  className={styles.rocketImage}
                  priority
                />
              </div>
            ) : dialogueIndex === 1 ? (
              <div className={styles.robotKidContainer}>
                <Robot
                  emotion={currentEmotion}
                  isRepairing={false}
                />
                <div className={styles.kidContainer}>
                  <Image
                    src="/images/kid_confused.png"
                    alt="Kid"
                    width={120}
                    height={180}
                    className={styles.kidImage}
                    priority
                  />
                </div>
              </div>
            ) : (
              <Robot
                emotion={currentEmotion}
                isRepairing={false}
              />
            )}
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.narrativeContainer}>
            <div className={styles.headerRow}>
              <div className={styles.narrativeTitle}>🌌 The Beginning</div>
              <div className={styles.actionButtons}>
                <HomeButton />
                <SaveButton onSave={handleSave} />
              </div>
            </div>
            <StoryDialogue
              dialogues={preStoryDialogues}
              onComplete={handleDialogueComplete}
              initialIndex={dialogueIndex}
              onIndexChange={handleDialogueIndexChange}
            />

            {showContinue && (
              <div className={styles.continueSection}>
                <div className={styles.crashEffect}>
                  <div className={styles.crashText}>💥 CRASH! 💥</div>
                </div>
                <button
                  className={styles.continueButton}
                  onClick={handleContinue}
                >
                  What Happens Next? →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
