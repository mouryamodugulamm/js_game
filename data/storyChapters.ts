// Main story chapters file - combines all difficulty levels
import { beginnerChapters } from './chapters/beginner';
import { intermediateChapters } from './chapters/intermediate';
import { advancedChapters } from './chapters/advanced';
import { proChapters } from './chapters/pro';

export interface CodeChallenge {
  id: string;
  shortGoal: string; // One simple sentence - what are we fixing?
  steps: string[]; // Array of tiny actions (max 1 line each)
  starterCode: string;
  validate: (code: string, output: string[]) => { success: boolean; message: string };
  hint: string; // Friendly, spoken tone
  successStory: string; // Narrative text shown on success
  failureStory: string; // Narrative text shown on failure
  whyThisMatters: string; // Why this code matters in the story
}

export interface StoryChapter {
  id: number;
  title: string;
  act: string;
  dialogues: Array<{
    speaker: 'robot' | 'kid';
    text: string;
    emotion?: 'happy' | 'sad' | 'excited' | 'confused' | 'neutral';
  }>;
  preChallengeDialogue: Array<{
    speaker: 'robot' | 'kid';
    text: string;
    emotion?: 'happy' | 'sad' | 'excited' | 'confused' | 'neutral';
  }>;
  challenge: CodeChallenge;
  repairAnimation: string;
  distanceToHome: number;
  successDialogue: Array<{
    speaker: 'robot' | 'kid';
    text: string;
    emotion?: 'happy' | 'sad' | 'excited' | 'confused' | 'neutral';
  }>;
}

// Combine all chapters: Beginner (1-5), Intermediate (6-12), Advanced (13-18), Pro (19-24)
export const storyChapters: StoryChapter[] = [
  ...beginnerChapters,
  ...intermediateChapters,
  ...advancedChapters,
  ...proChapters,
];

export function getChapter(id: number): StoryChapter | undefined {
  return storyChapters.find(ch => ch.id === id);
}

export function getNextChapterId(currentId: number): number | null {
  const current = storyChapters.find(ch => ch.id === currentId);
  if (!current) return null;
  const next = storyChapters.find(ch => ch.id === currentId + 1);
  return next ? next.id : null;
}

export function getPreviousChapterId(currentId: number): number | null {
  const current = storyChapters.find(ch => ch.id === currentId);
  if (!current) return null;
  const prev = storyChapters.find(ch => ch.id === currentId - 1);
  return prev ? prev.id : null;
}
