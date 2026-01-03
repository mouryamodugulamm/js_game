export interface GameSaveState {
  chapter: number;
  gameState: 'dialogue' | 'preChallenge' | 'challenge' | 'repairing' | 'successDialogue' | 'complete';
  code?: string;
  dialogueIndex?: number;
  timestamp: number;
}

const SAVE_KEY = 'robotKidGameSave';

export function saveGameState(state: GameSaveState): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
}

export function loadGameState(): GameSaveState | null {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      return JSON.parse(saved) as GameSaveState;
    }
  } catch (error) {
    console.error('Failed to load game state:', error);
  }
  return null;
}

export function clearGameState(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem('currentChapter');
  } catch (error) {
    console.error('Failed to clear game state:', error);
  }
}

export function hasSavedGame(): boolean {
  return loadGameState() !== null;
}

export function getSaveInfo(): { chapter: number; timestamp: number } | null {
  const state = loadGameState();
  if (state) {
    return {
      chapter: state.chapter,
      timestamp: state.timestamp,
    };
  }
  return null;
}




