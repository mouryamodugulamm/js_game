'use client';

import { useState, useEffect } from 'react';
import SaveButton from '@/components/SaveButton';
import HomeButton from '@/components/HomeButton';
import MonacoEditor from '@/components/MonacoEditor';
import styles from './CodeRunner.module.css';

interface CodeChallenge {
  id: string;
  shortGoal: string;
  steps: string[];
  starterCode: string;
  validate: (code: string, output: string[]) => { success: boolean; message: string };
  hint: string;
  successStory: string;
  failureStory: string;
  whyThisMatters: string;
}

interface CodeRunnerProps {
  challenge: CodeChallenge;
  onSuccess: () => void;
  onCodeChange?: (code: string) => void;
  initialCode?: string;
  onSave?: () => void;
}

export default function CodeRunner({ challenge, onSuccess, onCodeChange, initialCode, onSave }: CodeRunnerProps) {
  const [code, setCode] = useState(initialCode || challenge.starterCode);
  const [output, setOutput] = useState<string[]>([]);

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);
  const [error, setError] = useState<string>('');
  const [validation, setValidation] = useState<{ success: boolean; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setOutput([]);
    setError('');
    setValidation(null);
    setIsRunning(true);

    // Small delay for visual feedback
    setTimeout(() => {
      // Capture console.log output
      const logs: string[] = [];
      const originalLog = console.log;
      console.log = (...args: unknown[]) => {
        logs.push(args.map((arg: unknown) => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' '));
        originalLog(...args);
      };

      try {
        // Create a safe execution context
        const func = new Function(code);
        func();
        
        // Restore console.log
        console.log = originalLog;

        // Validate the code
        const result = challenge.validate(code, logs);
        
        // Add narrative story context
        const fullMessage = result.success
          ? `${result.message}\n\n${challenge.successStory}`
          : `${result.message}\n\n${challenge.failureStory}`;
        
        setValidation({
          ...result,
          message: fullMessage
        });
        setOutput(logs);
        setIsRunning(false);

        if (result.success) {
          setTimeout(() => {
            onSuccess();
          }, 2000);
        }
      } catch (e: unknown) {
        console.log = originalLog;
        const errorMessage = e instanceof Error ? e.message : 'An error occurred';
        setError(errorMessage);
        setValidation({
          success: false,
          message: `Error: ${errorMessage || 'Something went wrong. Check your syntax!'}`
        });
        setIsRunning(false);
      }
    }, 300);
  };

  const resetCode = () => {
    setCode(challenge.starterCode);
    setOutput([]);
    setError('');
    setValidation(null);
    setShowHint(false);
  };

  return (
    <div className={styles.container}>
      {onSave && (
        <div className={styles.actionButtonsContainer}>
          <div className={styles.actionButtons}>
            <HomeButton />
            <SaveButton onSave={onSave} />
          </div>
        </div>
      )}
      <div className={styles.instruction}>
        <h3>🎯 What We're Fixing</h3>
        <p className={styles.goal}>{challenge.shortGoal}</p>
        
        <div className={styles.whyMatters}>
          <p className={styles.whyText}>💭 {challenge.whyThisMatters}</p>
        </div>

        <div className={styles.steps}>
          <h4>📋 Step by Step:</h4>
          <ol>
            {challenge.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className={styles.editorContainer}>
        <div className={styles.editorHeader}>
          <div className={styles.editorTitle}>
            <span className={styles.editorIcon}>💻</span>
            <span>Code Editor</span>
            <span className={styles.editorBadge}>JavaScript</span>
          </div>
          <div className={styles.editorActions}>
            <button 
              className={styles.hintButton}
              onClick={() => setShowHint(!showHint)}
            >
              {showHint ? 'Hide' : 'Show'} Hint
            </button>
          </div>
        </div>
        
        {showHint && challenge.hint && (
          <div className={styles.hint}>
            💡 Hint: {challenge.hint}
          </div>
        )}

        <div className={styles.monacoWrapper}>
          <MonacoEditor
            value={code}
            onChange={(newCode) => {
              setCode(newCode);
              onCodeChange?.(newCode);
            }}
            language="javascript"
            theme="robot-kid-theme"
            height="450px"
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button 
          className={styles.runButton}
          onClick={runCode}
          disabled={isRunning}
        >
          {isRunning ? (
            <>
              <span className={styles.spinner}></span>
              Running...
            </>
          ) : (
            <>
              ▶ Run Code
            </>
          )}
        </button>
        <button 
          className={styles.resetButton}
          onClick={resetCode}
          disabled={isRunning}
        >
          ↻ Try Again
        </button>
      </div>

      {(output.length > 0 || error || validation) && (
        <div className={styles.outputContainer}>
          <div className={styles.outputHeader}>Output</div>
          {error && (
            <div className={styles.error}>
              ❌ {error}
            </div>
          )}
          {output.length > 0 && (
            <div className={styles.output}>
              {output.map((line: string, i: number) => (
                <div key={i} className={styles.outputLine}>
                  {line}
                </div>
              ))}
            </div>
          )}
          {validation && (
            <div className={`${styles.validation} ${validation.success ? styles.success : styles.failure}`}>
              {validation.success ? '✅' : '❌'} {validation.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
