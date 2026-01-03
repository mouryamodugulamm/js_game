// Beginner Chapters (1-5): Foundation concepts
import type { StoryChapter } from '../storyChapters';

export const beginnerChapters: StoryChapter[] = [
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
        const hasMessage = /console\.log\s*\([^)]+\)/.test(code);
        const hasOutput = output.length > 0;

        if (!hasConsoleLog) {
          return {
            success: false,
            message: 'I can\'t hear you yet... try speaking through console.log'
          };
        }
        if (!hasMessage) {
          return {
            success: false,
            message: 'Say something! Put your message inside console.log("your message")'
          };
        }
        if (!hasOutput) {
          return {
            success: false,
            message: 'Hmm... I didn\'t hear anything. Make sure you close it with );'
          };
        }
        return {
          success: true,
          message: 'I can hear you! My voice module is coming back online!'
        };
      },
      hint: 'Type: console.log("Hello, Robot!");',
      successStory: 'The robot\'s eyes flicker to life. A soft blue glow spreads across its chest.',
      failureStory: 'The robot\'s lights dim. "I\'m still waiting... can you try again?"',
      whyThisMatters: 'Without hearing your voice, I can\'t process any commands. This is how we communicate.',
    },
    repairAnimation: 'voice',
    distanceToHome: 1000,
    backgroundImage: '/images/bg_garage.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'Voice module restored! I can speak clearly now.',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'That worked! What\'s next?',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'I need power. My energy cells are empty.',
        emotion: 'sad',
      },
    ],
  },
  {
    id: 2,
    title: 'Power Restoration',
    act: 'ACT 1 — THE CRASH',
    dialogues: [
      {
        speaker: 'robot',
        text: 'My power cells are at 0%. I can\'t move.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How do we charge you?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Earth machines use something called "variables" to store energy.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Variables? Like in math?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Exactly! But here, we can store anything: numbers, words, even true or false.',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'I need you to create a box called "powerLevel" and put the number 100 in it.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'A box?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Yes! In code, we call it a variable. Type: let powerLevel = 100;',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'variables',
      shortGoal: 'Store energy in a variable to power the robot.',
      steps: [
        'Create a variable: let powerLevel',
        'Give it energy: = 100',
        'Show me: console.log(powerLevel)',
      ],
      starterCode: `// Store energy here
// let powerLevel = 100;
// console.log(powerLevel);

`,
      validate: (code: string, output: string[]) => {
        const hasVariable = /let\s+powerLevel/.test(code);
        const hasValue = /powerLevel\s*=\s*100/.test(code);
        const hasLog = code.includes('console.log');
        const outputShows100 = output.some(line => line.includes('100'));

        if (!hasVariable) {
          return {
            success: false,
            message: 'Create the energy box! Type: let powerLevel'
          };
        }
        if (!hasValue) {
          return {
            success: false,
            message: 'Put energy in it! Add: = 100'
          };
        }
        if (!hasLog || !outputShows100) {
          return {
            success: false,
            message: 'Show me the energy! Use: console.log(powerLevel)'
          };
        }
        return {
          success: true,
          message: 'Power cells charging! Energy level: 100%!'
        };
      },
      hint: 'Type: let powerLevel = 100; console.log(powerLevel);',
      successStory: 'The robot\'s chest panel lights up. Green energy flows through its circuits.',
      failureStory: 'The robot\'s lights flicker weakly. "I need energy... please try again."',
      whyThisMatters: 'Without stored energy, I can\'t function. Variables are how we remember things in code.',
    },
    repairAnimation: 'power',
    distanceToHome: 900,
    backgroundImage: '/images/bg_garage.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'Power restored! I can move my head now.',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re moving!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But my arms and legs are still locked. I need to repeat movements.',
        emotion: 'sad',
      },
    ],
  },
  {
    id: 3,
    title: 'Movement & Memory',
    act: 'ACT 2 — MOVEMENT & MEMORY',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I can move, but I keep forgetting what to do.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'What do you mean?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'I need to repeat actions. On my planet, we use "loops" to do things again and again.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Like repeating a task?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Exactly! Help me create a loop to test my arm movements.',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'I need to move my arm 3 times. Can you create a loop that repeats?',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How do I do that?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: for (let i = 0; i < 3; i++) { console.log("Moving arm"); }',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'loops',
      shortGoal: 'Create a loop to help the robot repeat arm movements.',
      steps: [
        'Start a loop: for (let i = 0; i < 3; i++)',
        'Open curly braces: {',
        'Inside, say: console.log("Moving arm")',
        'Close with: }',
      ],
      starterCode: `// Create a loop to repeat movements
// for (let i = 0; i < 3; i++) {
//   console.log("Moving arm");
// }

`,
      validate: (code: string, output: string[]) => {
        const hasForLoop = /for\s*\(/.test(code);
        const hasCondition = /i\s*<\s*3/.test(code);
        const hasIncrement = /i\+\+/.test(code);
        const outputCount = output.filter(line =>
          line.toLowerCase().includes('moving') ||
          line.toLowerCase().includes('arm')
        ).length;

        if (!hasForLoop) {
          return {
            success: false,
            message: 'I need a loop! Start with: for (let i = 0; i < 3; i++)'
          };
        }
        if (!hasCondition || !hasIncrement) {
          return {
            success: false,
            message: 'The loop needs: i < 3 and i++ to count'
          };
        }
        if (outputCount < 3) {
          return {
            success: false,
            message: 'I need to see "Moving arm" 3 times! Check your console.log'
          };
        }
        return {
          success: true,
          message: 'My arms are working! I can repeat movements perfectly!'
        };
      },
      hint: 'Type: for (let i = 0; i < 3; i++) { console.log("Moving arm"); }',
      successStory: 'The robot\'s arms move smoothly. It raises them up and down three times.',
      failureStory: 'The robot\'s arm twitches. "I\'m trying, but something\'s not right..."',
      whyThisMatters: 'Without loops, I\'d have to type the same command over and over. Loops help me repeat actions.',
    },
    repairAnimation: 'movement',
    distanceToHome: 800,
    backgroundImage: '/images/bg_garage.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'Arms and legs functional! I can walk now.',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'This is amazing!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I can\'t make decisions. My decision chip is damaged.',
        emotion: 'sad',
      },
    ],
  },
  {
    id: 4,
    title: 'Decisions',
    act: 'ACT 3 — DECISIONS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I crashed because I had to choose between two planets.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'What happened?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'I chose Earth because it was safer. But my decision chip broke during the crash.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'How do we fix it?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'I need to learn "if" and "else" again. Can you help?',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'If my power is above 50, I should say "I\'m strong". Otherwise, say "I need energy".',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How do I write that?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: if (powerLevel > 50) { console.log("I\'m strong"); } else { console.log("I need energy"); }',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'conditionals',
      shortGoal: 'Help the robot make decisions using if/else.',
      steps: [
        'Set power: let powerLevel = 60',
        'Start decision: if (powerLevel > 50)',
        'If true: { console.log("I\'m strong") }',
        'If false: else { console.log("I need energy") }',
      ],
      starterCode: `// Help the robot make a decision
// let powerLevel = 60;
// if (powerLevel > 50) {
//   console.log("I'm strong");
// } else {
//   console.log("I need energy");
// }

`,
      validate: (code: string, output: string[]) => {
        const hasIf = /if\s*\(/.test(code);
        const hasCondition = /powerLevel\s*>\s*50/.test(code);
        const hasElse = code.includes('else');
        const outputShowsStrong = output.some(line =>
          line.toLowerCase().includes('strong') ||
          line.toLowerCase().includes("i'm strong")
        );

        if (!hasIf) {
          return {
            success: false,
            message: 'I need an if statement! Start with: if (powerLevel > 50)'
          };
        }
        if (!hasCondition) {
          return {
            success: false,
            message: 'Check if power is greater than 50: powerLevel > 50'
          };
        }
        if (!hasElse) {
          return {
            success: false,
            message: 'What if power is low? Add: else { console.log("I need energy") }'
          };
        }
        if (!outputShowsStrong) {
          return {
            success: false,
            message: 'I should say "I\'m strong" when power is above 50!'
          };
        }
        return {
          success: true,
          message: 'Decision chip repaired! I can choose paths again!'
        };
      },
      hint: 'Type: let powerLevel = 60; if (powerLevel > 50) { console.log("I\'m strong"); } else { console.log("I need energy"); }',
      successStory: 'A green light flashes on the robot\'s head. It nods confidently.',
      failureStory: 'The robot\'s head tilts. "I\'m confused... I can\'t decide..."',
      whyThisMatters: 'Without decisions, I can\'t choose the right path. If/else helps me think.',
    },
    repairAnimation: 'decision',
    distanceToHome: 700,
    backgroundImage: '/images/bg_garage.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'Decision chip online! I can think clearly now.',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re getting better!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But my thoughts are messy. I need to organize them into recipes.',
        emotion: 'sad',
      },
    ],
  },
  {
    id: 5,
    title: 'Thinking',
    act: 'ACT 4 — THINKING',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I can act, but my thoughts are all jumbled.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'What do you mean?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'I need to organize my actions into "functions" - like recipes I can reuse.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Recipes?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Yes! A function is like a recipe. Once I write it, I can use it anytime.',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'Create a repair recipe called "repairRobot". It should say "Repairing..." and return true.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How do I make a recipe?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: function repairRobot() { console.log("Repairing..."); return true; }',
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
      failureStory: 'The robot\'s lights flicker. "My thoughts are still scattered..."',
      whyThisMatters: 'Functions help me organize my code. Without them, everything is messy and hard to reuse.',
    },
    repairAnimation: 'brain',
    distanceToHome: 600,
    backgroundImage: '/images/bg_garage.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'My brain module is working! I can think clearly now.',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re almost fully repaired!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'Almost. But I need to learn more advanced concepts to fully restore my systems.',
        emotion: 'neutral',
      },
    ],
  },
];



