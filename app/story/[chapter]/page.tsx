'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getChapter, getNextChapterId, storyChapters } from '@/data/storyChapters';
import StoryDialogue from '@/components/StoryDialogue';
import Robot from '@/components/Robot';
import CodeRunner from '@/components/CodeRunner';
import RepairAnimation from '@/components/RepairAnimation';
import ProgressTracker from '@/components/ProgressTracker';
import SaveButton from '@/components/SaveButton';
import HomeButton from '@/components/HomeButton';
import { saveGameState, loadGameState, type GameSaveState } from '@/utils/saveGame';
import styles from './page.module.css';

type GameState = 'dialogue' | 'preChallenge' | 'challenge' | 'repairing' | 'successDialogue' | 'complete';

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const chapterId = parseInt(params.chapter as string);
  
  const chapter = getChapter(chapterId);
  const [gameState, setGameState] = useState<GameState>('dialogue');
  const [currentEmotion, setCurrentEmotion] = useState<'happy' | 'sad' | 'excited' | 'confused' | 'neutral'>('neutral');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [savedCode, setSavedCode] = useState<string>('');

  useEffect(() => {
    if (!chapter) {
      router.push('/');
      return;
    }

    // Try to load saved game state FIRST, before setting defaults
    const savedState = loadGameState();
    if (savedState && savedState.chapter === chapterId) {
      // Restore exact game state
      setGameState(savedState.gameState);
      if (savedState.code) {
        setSavedCode(savedState.code);
      }
      if (savedState.dialogueIndex !== undefined) {
        setDialogueIndex(savedState.dialogueIndex);
      }
      
      // Restore emotion based on game state
      if (savedState.gameState === 'repairing' || savedState.gameState === 'successDialogue' || savedState.gameState === 'complete') {
        setCurrentEmotion('happy');
      } else if (chapter.dialogues.length > 0) {
        // Try to get emotion from saved dialogue index
        const dialogueIndex = savedState.dialogueIndex || 0;
        if (chapter.dialogues[dialogueIndex]) {
          setCurrentEmotion(chapter.dialogues[dialogueIndex].emotion || 'neutral');
        } else {
          setCurrentEmotion(chapter.dialogues[0].emotion || 'neutral');
        }
      }
    } else {
      // No saved state, start fresh
      setGameState('dialogue');
      setSavedCode('');
      setDialogueIndex(0);
      
      // Set initial emotion from first dialogue
      if (chapter.dialogues.length > 0) {
        setCurrentEmotion(chapter.dialogues[0].emotion || 'neutral');
      }
    }

    // Save current chapter progress
    localStorage.setItem('currentChapter', chapterId.toString());
  }, [chapter, chapterId, router]);

  // Auto-save on state changes
  useEffect(() => {
    if (chapter) {
      saveGameState({
        chapter: chapterId,
        gameState,
        code: savedCode,
        dialogueIndex,
        timestamp: Date.now(),
      });
    }
  }, [chapterId, gameState, savedCode, dialogueIndex, chapter]);

  if (!chapter) {
    return null;
  }

  const handleDialogueComplete = () => {
    if (chapter.preChallengeDialogue && chapter.preChallengeDialogue.length > 0) {
      setGameState('preChallenge');
    } else {
      setGameState('challenge');
    }
  };

  const handlePreChallengeComplete = () => {
    setGameState('challenge');
  };

  const handleCodeSuccess = () => {
    setGameState('repairing');
    setCurrentEmotion('happy');
  };

  const handleRepairComplete = () => {
    if (chapter.successDialogue && chapter.successDialogue.length > 0) {
      setGameState('successDialogue');
    } else {
      setGameState('complete');
    }
  };

  const handleSuccessDialogueComplete = () => {
    setGameState('complete');
  };

  const handleContinue = () => {
    const nextChapterId = getNextChapterId(chapterId);
    if (nextChapterId) {
      router.push(`/story/${nextChapterId}`);
    } else {
      // Story complete - go to ending
      router.push('/story/complete');
    }
  };

  const handleSave = () => {
    saveGameState({
      chapter: chapterId,
      gameState,
      code: savedCode,
      dialogueIndex,
      timestamp: Date.now(),
    });
  };

  const handleCodeChange = (code: string) => {
    setSavedCode(code);
  };

  const handleDialogueIndexChange = (index: number) => {
    setDialogueIndex(index);
  };

  const updateEmotion = (index: number) => {
    if (chapter.dialogues[index]) {
      setCurrentEmotion(chapter.dialogues[index].emotion || 'neutral');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerBar}>
        <ProgressTracker 
          currentChapter={chapterId}
          totalChapters={storyChapters.length}
          distanceToHome={chapter.distanceToHome}
        />
        <div className={styles.actionButtons}>
          <HomeButton />
          <SaveButton onSave={handleSave} />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <Robot 
            emotion={currentEmotion}
            isRepairing={gameState === 'repairing'}
            repairType={gameState === 'repairing' ? chapter.repairAnimation as any : undefined}
          />
        </div>

        <div className={styles.rightPanel}>
          {gameState === 'dialogue' && (
            <div className={styles.dialogueContainer}>
              <div className={styles.actTitle}>{chapter.act}</div>
              <StoryDialogue 
                dialogues={chapter.dialogues}
                onComplete={handleDialogueComplete}
                onSave={handleSave}
                initialIndex={dialogueIndex}
                onIndexChange={handleDialogueIndexChange}
              />
            </div>
          )}

          {gameState === 'preChallenge' && (
            <div className={styles.dialogueContainer}>
              <StoryDialogue 
                dialogues={chapter.preChallengeDialogue}
                onComplete={handlePreChallengeComplete}
                onSave={handleSave}
              />
            </div>
          )}

          {gameState === 'challenge' && (
            <div className={styles.challengeContainer}>
              <CodeRunner 
                challenge={chapter.challenge}
                onSuccess={handleCodeSuccess}
                onCodeChange={handleCodeChange}
                initialCode={savedCode || chapter.challenge.starterCode}
                onSave={handleSave}
              />
            </div>
          )}

          {gameState === 'repairing' && (
            <div className={styles.repairContainer}>
              <RepairAnimation 
                type={chapter.repairAnimation as any}
                onComplete={handleRepairComplete}
              />
            </div>
          )}

          {gameState === 'successDialogue' && (
            <div className={styles.dialogueContainer}>
              <StoryDialogue 
                dialogues={chapter.successDialogue}
                onComplete={handleSuccessDialogueComplete}
                onSave={handleSave}
              />
            </div>
          )}

          {gameState === 'complete' && (
            <div className={styles.completeContainer}>
              <div className={styles.completeMessage}>
                <h2>✨ Chapter Complete! ✨</h2>
                <p>You've successfully repaired part of the robot!</p>
                <p className={styles.distanceUpdate}>
                  Distance to home: {chapter.distanceToHome} light-years
                </p>
                <button 
                  className={styles.continueButton}
                  onClick={handleContinue}
                >
                  Continue Story →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
