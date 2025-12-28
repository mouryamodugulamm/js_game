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
  preChallengeDialogue: Array<{ // Added: dialogue before challenge explaining why it matters
    speaker: 'robot' | 'kid';
    text: string;
    emotion?: 'happy' | 'sad' | 'excited' | 'confused' | 'neutral';
  }>;
  challenge: CodeChallenge;
  repairAnimation: string;
  distanceToHome: number;
  successDialogue: Array<{ // Added: dialogue after success
    speaker: 'robot' | 'kid';
    text: string;
    emotion?: 'happy' | 'sad' | 'excited' | 'confused' | 'neutral';
  }>;
}

export const storyChapters: StoryChapter[] = [
  {
    id: 1,
    title: 'The Crash',
    act: 'ACT 1 — THE CRASH',
    dialogues: [
      {
        speaker: 'kid',
        text: 'What was that?!',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: '...e...rr...or...',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'A robot?! Are you okay?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'My voice... broken...',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'I don\'t know how to fix robots...',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'You can help. I just need to hear your voice.',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'If I can\'t hear you, I can\'t speak. Can you talk to me?',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type this magic spell: console.log. It\'s how computers listen.',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'console-log',
      shortGoal: 'Help the robot hear you by speaking through code.',
      steps: [
        'Type console.log(',
        'Put your message inside quotes: "Hello, Robot!"',
        'Close it with );',
      ],
      starterCode: `// Talk to the robot here
// Type: console.log("Hello, Robot!");

`,
      validate: (code: string, output: string[]) => {
        const hasConsoleLog = code.includes('console.log');
        const hasCorrectMessage = output.some(line => 
          line.toLowerCase().includes('hello') && 
          line.toLowerCase().includes('robot')
        );
        
        if (!hasConsoleLog) {
          return { 
            success: false, 
            message: 'I can\'t hear you yet... try speaking through console.log("your message")' 
          };
        }
        if (!hasCorrectMessage) {
          return { 
            success: false, 
            message: 'I heard something, but not quite right. Try saying "Hello, Robot!"' 
          };
        }
        return { 
          success: true, 
          message: 'I can hear you! My voice is coming back!' 
        };
      },
      hint: 'Type exactly: console.log("Hello, Robot!");',
      successStory: 'The robot\'s eyes glow brighter. A soft beep sounds. "I can speak again!"',
      failureStory: 'The robot looks at you, waiting. "Try again, friend. I believe in you."',
      whyThisMatters: 'Without your voice, I can\'t tell you what I need. Help me hear you first.',
    },
    repairAnimation: 'voice',
    distanceToHome: 1000,
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I can speak! Thank you!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'It worked! I actually did it!',
        emotion: 'excited',
      },
    ],
  },
  {
    id: 2,
    title: 'Power Restoration',
    act: 'ACT 2 — POWER RESTORATION',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I can speak, but I have no energy. I can\'t go home like this.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'What can I do?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'I need power. Can you help me store some?',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'I\'m not sure I can do this...',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'You already helped me speak. You can do this too.',
        emotion: 'happy',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'Without power, I\'m stuck here forever. I need you to create a power box.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'A power box?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Yes! In code, we call it a "variable". It\'s like a box that holds energy.',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'variables',
      shortGoal: 'Create a power box to store energy for the robot.',
      steps: [
        'Create a box called powerLevel',
        'Put 100 units of energy in it: = 100',
        'Show me the energy: console.log(powerLevel)',
      ],
      starterCode: `// Create a power box here
// Type: let powerLevel = 100;
// Then show it: console.log(powerLevel);

`,
      validate: (code: string, output: string[]) => {
        const hasVariable = /(let|const|var)\s+powerLevel\s*=/.test(code);
        const hasValue100 = code.includes('100');
        const hasConsoleLog = code.includes('console.log');
        const outputShows100 = output.some(line => line.includes('100'));
        
        if (!hasVariable) {
          return { 
            success: false, 
            message: 'I need a power box! Create it with: let powerLevel = 100;' 
          };
        }
        if (!hasValue100) {
          return { 
            success: false, 
            message: 'The box needs energy! Set it to 100' 
          };
        }
        if (!hasConsoleLog || !outputShows100) {
          return { 
            success: false, 
            message: 'Show me the energy! Use console.log(powerLevel)' 
          };
        }
        return { 
          success: true, 
          message: 'Energy flowing! I can feel power returning!' 
        };
      },
      hint: 'Type: let powerLevel = 100; then console.log(powerLevel);',
      successStory: 'The robot\'s chest panel lights up. A warm glow spreads across its body.',
      failureStory: 'The robot looks dim. "Almost there! Check your code one more time."',
      whyThisMatters: 'I have no energy left. Without power, I can\'t move or think. Please help me.',
    },
    repairAnimation: 'power',
    distanceToHome: 800,
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I can feel energy! My systems are waking up!',
        emotion: 'excited',
      },
      {
        speaker: 'kid',
        text: 'This is amazing! I\'m actually fixing you!',
        emotion: 'excited',
      },
    ],
  },
  {
    id: 3,
    title: 'Movement & Memory',
    act: 'ACT 3 — MOVEMENT & MEMORY',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I have power, but my legs are stuck. They need to practice moving.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'Practice?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Yes. I need to move my legs 5 times. Can you help me practice?',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Like counting steps?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Exactly! You\'re getting it!',
        emotion: 'happy',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'If my legs don\'t practice, I can\'t walk. I need to count: 1, 2, 3, 4, 5.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How do I make it count?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Use a "loop" - it\'s like telling me "do this 5 times".',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'loops',
      shortGoal: 'Help the robot practice moving by counting from 1 to 5.',
      steps: [
        'Start a loop: for (let i = 1; i <= 5; i++)',
        'Open curly braces: {',
        'Print the number: console.log(i);',
        'Close with: }',
      ],
      starterCode: `// Help the robot practice moving
// Count from 1 to 5
// Type: for (let i = 1; i <= 5; i++) { console.log(i); }

`,
      validate: (code: string, output: string[]) => {
        const hasForLoop = /for\s*\(/.test(code);
        const hasConsoleLog = code.includes('console.log');
        const numbers = output.filter(line => /^\d+$/.test(line.trim())).map(line => parseInt(line.trim()));
        const hasAllNumbers = [1, 2, 3, 4, 5].every(n => numbers.includes(n));
        
        if (!hasForLoop) {
          return { 
            success: false, 
            message: 'I need a loop to practice! Try: for (let i = 1; i <= 5; i++)' 
          };
        }
        if (!hasConsoleLog) {
          return { 
            success: false, 
            message: 'Count out loud! Use console.log(i) inside the loop' 
          };
        }
        if (!hasAllNumbers || numbers.length < 5) {
          return { 
            success: false, 
            message: 'I need to count all the way to 5! Make sure you see 1, 2, 3, 4, 5' 
          };
        }
        return { 
          success: true, 
          message: 'My legs are moving! I can walk again!' 
        };
      },
      hint: 'Type: for (let i = 1; i <= 5; i++) { console.log(i); }',
      successStory: 'The robot\'s legs twitch, then move. It takes a small step forward.',
      failureStory: 'The robot tries to move but stops. "Keep going! You\'re so close!"',
      whyThisMatters: 'I can\'t walk without practice. Help me count my steps so I can move again.',
    },
    repairAnimation: 'movement',
    distanceToHome: 600,
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I can move! Watch this!',
        emotion: 'excited',
      },
      {
        speaker: 'kid',
        text: 'You\'re walking! This is incredible!',
        emotion: 'excited',
      },
    ],
  },
  {
    id: 4,
    title: 'Decisions',
    act: 'ACT 4 — DECISIONS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I can move, but I can\'t decide anything. My choice-maker is broken.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'What do you mean?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'When I crashed, I had to choose: Earth or another planet. I chose Earth, but now I can\'t choose anything.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'That sounds scary...',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'You can help me learn to choose again. Will you?',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'If I can\'t make decisions, I can\'t know when I\'m ready to go home.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How do I fix that?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Teach me to ask: "Am I ready?" If yes, say "Ready to launch". If no, say "Not ready".',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'conditionals',
      shortGoal: 'Teach the robot to make decisions by checking if it\'s ready.',
      steps: [
        'Create a box: let canLaunch = true',
        'Ask a question: if (canLaunch)',
        'If yes, say: console.log("Ready to launch")',
        'If no, say: else { console.log("Not ready") }',
      ],
      starterCode: `// Help the robot decide
// Create: let canLaunch = true;
// Then ask: if (canLaunch) { ... } else { ... }

`,
      validate: (code: string, output: string[]) => {
        const hasVariable = /(let|const|var)\s+canLaunch\s*=/.test(code);
        const hasIf = /if\s*\(/.test(code);
        const hasElse = code.includes('else');
        const hasTrue = code.includes('true');
        const outputShowsReady = output.some(line => 
          line.toLowerCase().includes('ready') && 
          line.toLowerCase().includes('launch')
        );
        
        if (!hasVariable || !hasTrue) {
          return { 
            success: false, 
            message: 'I need a box first! Create: let canLaunch = true;' 
          };
        }
        if (!hasIf) {
          return { 
            success: false, 
            message: 'Ask me a question! Use: if (canLaunch)' 
          };
        }
        if (!hasElse) {
          return { 
            success: false, 
            message: 'What if I\'m not ready? Add: else { ... }' 
          };
        }
        if (!outputShowsReady) {
          return { 
            success: false, 
            message: 'I should say "Ready to launch" when I\'m ready!' 
          };
        }
        return { 
          success: true, 
          message: 'I can decide again! I feel... smarter!' 
        };
      },
      hint: 'Type: let canLaunch = true; if (canLaunch) { console.log("Ready to launch"); } else { console.log("Not ready"); }',
      successStory: 'The robot\'s eyes flicker thoughtfully. "I can think... I can choose!"',
      failureStory: 'The robot looks confused. "I\'m trying to understand... help me a bit more?"',
      whyThisMatters: 'Without choices, I\'m just a machine. Help me learn to decide again.',
    },
    repairAnimation: 'decision',
    distanceToHome: 400,
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I can think! I can choose! This feels amazing!',
        emotion: 'excited',
      },
      {
        speaker: 'kid',
        text: 'You\'re becoming more... alive.',
        emotion: 'happy',
      },
    ],
  },
  {
    id: 5,
    title: 'Thinking',
    act: 'ACT 5 — THINKING',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I can move and choose, but my thoughts are all jumbled.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'Like you can\'t focus?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Yes. My brain needs to organize thoughts into actions.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'This is getting complicated...',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'You\'ve helped me so much already. One more thing, I promise.',
        emotion: 'happy',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'If my thoughts stay scattered, I can\'t remember how to go home.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'What do I do?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Teach me to organize. Create a "function" - it\'s like a recipe I can remember.',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'functions',
      shortGoal: 'Help the robot organize its thoughts by creating a repair recipe.',
      steps: [
        'Create a recipe: function repairRobot()',
        'Open curly braces: {',
        'Say what you\'re doing: console.log("Repairing...")',
        'Say it worked: return true',
        'Close with: }',
        'Use the recipe: repairRobot()',
      ],
      starterCode: `// Create a repair recipe
// function repairRobot() {
//   console.log("Repairing...");
//   return true;
// }
// Then use it: repairRobot();

`,
      validate: (code: string, output: string[]) => {
        const hasFunction = /function\s+repairRobot\s*\(/.test(code);
        const hasReturn = code.includes('return');
        const hasReturnTrue = /return\s+true/.test(code);
        const hasCall = /repairRobot\s*\(/.test(code);
        const outputShowsRepairing = output.some(line => 
          line.toLowerCase().includes('repairing')
        );
        
        if (!hasFunction) {
          return { 
            success: false, 
            message: 'I need a recipe! Create: function repairRobot()' 
          };
        }
        if (!hasReturn || !hasReturnTrue) {
          return { 
            success: false, 
            message: 'Tell me it worked! Add: return true' 
          };
        }
        if (!outputShowsRepairing) {
          return { 
            success: false, 
            message: 'Say what you\'re doing! Use console.log("Repairing...")' 
          };
        }
        if (!hasCall) {
          return { 
            success: false, 
            message: 'Use the recipe! Call it: repairRobot()' 
          };
        }
        return { 
          success: true, 
          message: 'My thoughts are clear! I can remember everything now!' 
        };
      },
      hint: 'Type: function repairRobot() { console.log("Repairing..."); return true; } repairRobot();',
      successStory: 'The robot\'s whole body lights up. Its movements become fluid, confident.',
      failureStory: 'The robot tilts its head. "Almost... I can feel it coming together..."',
      whyThisMatters: 'My memories are fading. Without organized thoughts, I\'ll forget how to get home.',
    },
    repairAnimation: 'brain',
    distanceToHome: 200,
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I remember everything! I remember my home!',
        emotion: 'excited',
      },
      {
        speaker: 'kid',
        text: 'You\'re... you\'re really going home, aren\'t you?',
        emotion: 'sad',
      },
    ],
  },
  {
    id: 6,
    title: 'Goodbye',
    act: 'ACT 6 — GOODBYE',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I\'m fully repaired. All because of you.',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'I can\'t believe I did it. I actually learned to code.',
        emotion: 'happy',
      },
      {
        speaker: 'robot',
        text: 'You\'re a builder now. You can make anything.',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'Will I see you again?',
        emotion: 'sad',
      },
      {
        speaker: 'robot',
        text: 'Maybe. But you\'ll always have what you learned.',
        emotion: 'happy',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'Before I go... can you say goodbye? One last message.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'Of course.',
        emotion: 'sad',
      },
    ],
    challenge: {
      id: 'finale',
      shortGoal: 'Say goodbye to your friend one last time.',
      steps: [
        'Type: console.log(',
        'Say goodbye: "Goodbye, Robot! Safe journey!"',
        'Close it: );',
      ],
      starterCode: `// Say goodbye
// console.log("Goodbye, Robot! Safe journey!");

`,
      validate: (code: string, output: string[]) => {
        const hasConsoleLog = code.includes('console.log');
        const outputShowsGoodbye = output.some(line => 
          line.toLowerCase().includes('goodbye') || 
          line.toLowerCase().includes('safe journey')
        );
        
        if (!hasConsoleLog) {
          return { 
            success: false, 
            message: 'Say it out loud! Use console.log("your message")' 
          };
        }
        if (!outputShowsGoodbye) {
          return { 
            success: false, 
            message: 'I want to hear your goodbye...' 
          };
        }
        return { 
          success: true, 
          message: 'Thank you, friend. I\'ll never forget you. 🌟' 
        };
      },
      hint: 'Type: console.log("Goodbye, Robot! Safe journey!");',
      successStory: 'The robot\'s eyes glow warmly. Stars begin to appear around it.',
      failureStory: 'The robot waits patiently. "I\'m still here. Take your time."',
      whyThisMatters: 'I need to hear your voice one more time before I go home.',
    },
    repairAnimation: 'launch',
    distanceToHome: 0,
    successDialogue: [
      {
        speaker: 'robot',
        text: 'Launch sequence starting. Distance to home: 0 light-years.',
        emotion: 'excited',
      },
      {
        speaker: 'kid',
        text: 'Goodbye, friend. Thank you for teaching me.',
        emotion: 'happy',
      },
      {
        speaker: 'robot',
        text: 'Remember: every line of code is a step toward building something amazing.',
        emotion: 'happy',
      },
    ],
  },
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
