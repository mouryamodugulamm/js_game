'use client';

import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import styles from './MonacoEditor.module.css';

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: string;
  height?: string;
}

export default function MonacoEditor({ 
  value, 
  onChange, 
  language = 'javascript',
  theme = 'vs-dark',
  height = '400px'
}: MonacoEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editorInstance: editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) => {
    editorRef.current = editorInstance;
    
    // Define custom theme matching game aesthetic
    monaco.editor.defineTheme('robot-kid-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'operator', foreground: 'D4D4D4' },
        { token: 'identifier', foreground: '9CDCFE' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'variable', foreground: '9CDCFE' },
      ],
      colors: {
        'editor.background': '#1a1a2e',
        'editor.foreground': '#e8e8e8',
        'editor.lineHighlightBackground': '#2a2a3e',
        'editor.selectionBackground': '#3a3a5e',
        'editor.inactiveSelectionBackground': '#2a2a3e',
        'editorCursor.foreground': '#4a90e2',
        'editorWhitespace.foreground': '#3a3a5e',
        'editorIndentGuide.activeBackground': '#4a90e2',
        'editorIndentGuide.background': '#2a2a3e',
        'editor.lineNumber.foreground': '#6a6a8e',
        'editor.lineNumber.activeForeground': '#4a90e2',
        'editorGutter.background': '#1a1a2e',
        'editorError.foreground': '#ff6b6b',
        'editorWarning.foreground': '#ffd700',
        'editorInfo.foreground': '#4a90e2',
        'editorBracketMatch.background': '#2a2a3e',
        'editorBracketMatch.border': '#4a90e2',
      },
    });

    // Set the theme
    monaco.editor.setTheme('robot-kid-theme');

    // Configure Monaco for JavaScript with enhanced linting
    const tsLang = monaco.languages.typescript;
    if (tsLang && 'javascriptDefaults' in tsLang) {
      const jsDefaults = (tsLang as any).javascriptDefaults;
      
      jsDefaults.setCompilerOptions({
        target: (monaco.languages.typescript as any).ScriptTarget.ES2020,
        allowNonTsExtensions: true,
        moduleResolution: (monaco.languages.typescript as any).ModuleResolutionKind.NodeJs,
        module: (monaco.languages.typescript as any).ModuleKind.CommonJS,
        noEmit: true,
        esModuleInterop: true,
        jsx: (monaco.languages.typescript as any).JsxEmit.React,
        reactNamespace: 'React',
        allowJs: true,
        typeRoots: ['node_modules/@types'],
        strict: false,
        checkJs: true,
      });

      // Enable all diagnostics with enhanced error checking
      jsDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
        noSuggestionDiagnostics: false,
        diagnosticCodesToIgnore: [],
      });

      // Add extra libs for better IntelliSense
      jsDefaults.addExtraLib(
        `declare var console: {
          log(...args: any[]): void;
          error(...args: any[]): void;
          warn(...args: any[]): void;
          info(...args: any[]): void;
        };`,
        'console.d.ts'
      );

      // Add common JavaScript globals
      jsDefaults.addExtraLib(
        `declare var setTimeout: (handler: () => void, timeout?: number) => number;
         declare var setInterval: (handler: () => void, timeout?: number) => number;
         declare var clearTimeout: (id: number) => void;
         declare var clearInterval: (id: number) => void;`,
        'globals.d.ts'
      );
    }
    
    // Configure editor options
    editorInstance.updateOptions({
      fontSize: 15,
      fontFamily: "'Fira Code', 'Courier New', monospace",
      fontLigatures: true,
      lineNumbers: 'on',
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      wordWrap: 'on',
      formatOnPaste: true,
      formatOnType: true,
      suggestOnTriggerCharacters: true,
      quickSuggestions: true,
      acceptSuggestionOnCommitCharacter: true,
      acceptSuggestionOnEnter: 'on',
      snippetSuggestions: 'top',
      tabCompletion: 'on',
      wordBasedSuggestions: 'allDocuments',
      parameterHints: { enabled: true },
      hover: { enabled: true },
      colorDecorators: true,
      bracketPairColorization: { enabled: true },
      guides: {
        bracketPairs: true,
        indentation: true,
      },
      renderWhitespace: 'selection',
      renderLineHighlight: 'all',
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
    });

    // Add custom keybindings
    editorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Format document
      editorInstance.getAction('editor.action.formatDocument')?.run();
    });
  };

  return (
    <div className={styles.editorWrapper}>
      <Editor
        height={height}
        language={language}
        theme="robot-kid-theme"
        value={value}
        onChange={(val) => onChange(val || '')}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 15,
          fontFamily: "'Fira Code', 'Courier New', monospace",
          fontLigatures: true,
          lineNumbers: 'on',
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          formatOnPaste: true,
          formatOnType: true,
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          acceptSuggestionOnCommitCharacter: true,
          acceptSuggestionOnEnter: 'on',
          snippetSuggestions: 'top',
          tabCompletion: 'on',
          wordBasedSuggestions: 'allDocuments',
          parameterHints: { enabled: true },
          hover: { enabled: true },
          colorDecorators: true,
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
          renderWhitespace: 'selection',
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
        }}
        loading={
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading editor...</p>
          </div>
        }
      />
    </div>
  );
}