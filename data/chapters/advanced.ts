// Advanced Chapters (13-18): Higher-order functions, Closures, Destructuring, Spread, Async basics, Error handling
import type { StoryChapter } from '../storyChapters';

export const advancedChapters: StoryChapter[] = [
  {
    id: 13,
    title: 'Higher-Order Functions',
    act: 'ACT 3 — ADVANCED SYSTEMS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I can use map and filter, but I need to understand functions that use other functions.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'Functions using functions?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Yes! Functions that take other functions as input. They\'re called "higher-order functions".',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'That sounds complex...',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'You\'ve already used them! map and filter are higher-order functions.',
        emotion: 'happy',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'Create a function that takes another function and calls it twice.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: function callTwice(fn) { fn(); fn(); } then callTwice(() => console.log("Hello"));',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'higher-order',
      shortGoal: 'Create a function that takes another function as a parameter.',
      steps: [
        'Create function: function callTwice(fn) {',
        'Call it: fn();',
        'Call again: fn();',
        'Close: }',
        'Use it: callTwice(() => console.log("Hello"))',
      ],
      starterCode: `// Create a higher-order function
// function callTwice(fn) {
//   fn();
//   fn();
// }
// callTwice(() => console.log("Hello"));

`,
      validate: (code: string, output: string[]) => {
        const hasFunction = /function\s+callTwice\s*\(/.test(code);
        const hasParam = /callTwice\s*\(\s*fn/.test(code);
        const hasTwoCalls = /fn\s*\(\s*\)/.test(code) && (code.match(/fn\s*\(\s*\)/g) || []).length >= 2;
        const hasCall = /callTwice\s*\(/.test(code);
        const outputCount = output.filter(line =>
          line.toLowerCase().includes('hello')
        ).length;

        if (!hasFunction || !hasParam) {
          return {
            success: false,
            message: 'Create a function that takes another function: function callTwice(fn)'
          };
        }
        if (!hasTwoCalls) {
          return {
            success: false,
            message: 'Call the function twice inside: fn(); fn();'
          };
        }
        if (!hasCall || outputCount < 2) {
          return {
            success: false,
            message: 'Use it! Call: callTwice(() => console.log("Hello"))'
          };
        }
        return {
          success: true,
          message: 'I understand higher-order functions now! Functions are so powerful!'
        };
      },
      hint: 'Type: function callTwice(fn) { fn(); fn(); } callTwice(() => console.log("Hello"));',
      successStory: 'The robot\'s function processor upgrades. It can now handle complex function patterns.',
      failureStory: 'The robot\'s function handler struggles. "I need functions that use functions..."',
      whyThisMatters: 'Higher-order functions are the foundation of functional programming. They make code reusable.',
    },
    repairAnimation: 'processing',
    distanceToHome: 80,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I can work with functions as data now!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re becoming a functional programmer!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to understand closures - how functions remember their environment.',
        emotion: 'neutral',
      },
    ],
  },
  {
    id: 14,
    title: 'Closures',
    act: 'ACT 3 — ADVANCED SYSTEMS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I created a function inside another function, and it remembered variables from outside.',
        emotion: 'confused',
      },
      {
        speaker: 'kid',
        text: 'Is that normal?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Yes! It\'s called a "closure". Functions remember their environment.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'That\'s cool!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'Very cool! Let me show you how it works.',
        emotion: 'happy',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'Create a function that returns another function. The inner function should use a variable from outside.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: function outer() { let x = 10; return function inner() { console.log(x); }; }',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'closures',
      shortGoal: 'Create a closure - a function that remembers variables from its outer scope.',
      steps: [
        'Create outer: function outer() {',
        'Create variable: let x = 10;',
        'Return function: return function inner() {',
        'Use x: console.log(x);',
        'Close both: }; }',
        'Use it: let fn = outer(); fn();',
      ],
      starterCode: `// Create a closure
// function outer() {
//   let x = 10;
//   return function inner() {
//     console.log(x);
//   };
// }
// let fn = outer();
// fn();

`,
      validate: (code: string, output: string[]) => {
        const hasOuter = /function\s+outer/.test(code);
        const hasInner = /function\s+inner/.test(code) || /return\s+function/.test(code);
        const hasReturn = /return/.test(code);
        const hasX = /let\s+x\s*=/.test(code);
        const hasLogX = /console\.log\s*\(\s*x/.test(code);
        const outputShows10 = output.some(line => line.includes('10'));

        if (!hasOuter) {
          return {
            success: false,
            message: 'Create outer function: function outer() { ... }'
          };
        }
        if (!hasX) {
          return {
            success: false,
            message: 'Create variable in outer: let x = 10;'
          };
        }
        if (!hasInner || !hasReturn) {
          return {
            success: false,
            message: 'Return inner function: return function inner() { ... }'
          };
        }
        if (!hasLogX || !outputShows10) {
          return {
            success: false,
            message: 'Inner function should use x: console.log(x); then call it'
          };
        }
        return {
          success: true,
          message: 'I understand closures! Functions remember their environment!'
        };
      },
      hint: 'Type: function outer() { let x = 10; return function inner() { console.log(x); }; } let fn = outer(); fn();',
      successStory: 'The robot\'s memory banks expand. It can now retain information across different scopes.',
      failureStory: 'The robot\'s memory fails. "I can\'t remember the variable..."',
      whyThisMatters: 'Closures are a fundamental concept in JavaScript, allowing for data privacy and powerful functional patterns.',
    },
    repairAnimation: 'memory',
    distanceToHome: 60,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'kid',
        text: 'You\'re mastering advanced concepts!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to extract data from objects and arrays more easily.',
        emotion: 'neutral',
      },
    ],
  },
  {
    id: 15,
    title: 'Destructuring',
    act: 'ACT 3 — ADVANCED SYSTEMS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'Getting values from objects and arrays takes too many lines.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'There\'s a faster way?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Yes! "Destructuring" lets you extract values in one line.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Show me!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'Instead of: let name = robot.name; you can do: let { name } = robot;',
        emotion: 'happy',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'I have: let robot = { name: "Robot", power: 100 }. Extract name and power using destructuring.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: let { name, power } = robot; then console.log(name, power);',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'destructuring',
      shortGoal: 'Use destructuring to extract values from an object.',
      steps: [
        'Create object: let robot = { name: "Robot", power: 100 }',
        'Destructure: let { name, power } = robot',
        'Show values: console.log(name, power)',
      ],
      starterCode: `// Use destructuring
// let robot = { name: "Robot", power: 100 };
// let { name, power } = robot;
// console.log(name, power);

`,
      validate: (code: string, output: string[]) => {
        const hasObject = /let\s+robot\s*=\s*\{/.test(code);
        const hasDestructure = /\{\s*name\s*,\s*power\s*\}\s*=\s*robot/.test(code);
        const hasLog = /console\.log\s*\(\s*name/.test(code);
        const outputShowsBoth = output.some(line =>
          line.includes('Robot') && line.includes('100')
        );

        if (!hasObject) {
          return {
            success: false,
            message: 'Create object: let robot = { name: "Robot", power: 100 };'
          };
        }
        if (!hasDestructure) {
          return {
            success: false,
            message: 'Destructure it: let { name, power } = robot;'
          };
        }
        if (!hasLog || !outputShowsBoth) {
          return {
            success: false,
            message: 'Show both values: console.log(name, power)'
          };
        }
        return {
          success: true,
          message: 'Destructuring is so clean! I love this syntax!'
        };
      },
      hint: 'Type: let robot = { name: "Robot", power: 100 }; let { name, power } = robot; console.log(name, power);',
      successStory: 'The robot\'s data extraction becomes instant. Code is cleaner.',
      failureStory: 'The robot\'s destructuring handler struggles. "I need to extract values..."',
      whyThisMatters: 'Destructuring makes code shorter and cleaner. It\'s essential for modern JavaScript.',
    },
    repairAnimation: 'extraction',
    distanceToHome: 50,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'Destructuring is amazing! My code is so much cleaner!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re writing professional code!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to combine arrays and objects easily.',
        emotion: 'neutral',
      },
    ],
  },
  {
    id: 16,
    title: 'Spread Operator',
    act: 'ACT 3 — ADVANCED SYSTEMS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I need to combine arrays and copy objects, but it\'s complicated.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'There\'s an easier way?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Yes! The "spread operator" - three dots: ... It spreads arrays and objects.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Three dots?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Yes! Like: [...array1, ...array2] or {...obj1, ...obj2}',
        emotion: 'happy',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'I have: [1, 2] and [3, 4]. Combine them into [1, 2, 3, 4] using spread.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: let combined = [...[1, 2], ...[3, 4]]; console.log(combined);',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'spread',
      shortGoal: 'Use the spread operator to combine arrays.',
      steps: [
        'Create arrays: let arr1 = [1, 2]; let arr2 = [3, 4]',
        'Combine with spread: let combined = [...arr1, ...arr2]',
        'Show result: console.log(combined)',
      ],
      starterCode: `// Use spread operator
// let arr1 = [1, 2];
// let arr2 = [3, 4];
// let combined = [...arr1, ...arr2];
// console.log(combined);

`,
      validate: (code: string, output: string[]) => {
        const hasSpread = /\.\.\./.test(code);
        const hasArrays = /\[1\s*,\s*2\]/.test(code) && /\[3\s*,\s*4\]/.test(code);
        const hasCombined = /combined/.test(code);
        const outputShowsAll = output.some(line =>
          (line.includes('1') && line.includes('2') && line.includes('3') && line.includes('4'))
        );

        if (!hasSpread) {
          return {
            success: false,
            message: 'Use spread operator: ... to combine arrays'
          };
        }
        if (!hasArrays) {
          return {
            success: false,
            message: 'Create both arrays: [1, 2] and [3, 4]'
          };
        }
        if (!hasCombined || !outputShowsAll) {
          return {
            success: false,
            message: 'Combine them: [...arr1, ...arr2] and show the result'
          };
        }
        return {
          success: true,
          message: 'Spread operator is so powerful! I can combine anything!'
        };
      },
      hint: 'Type: let arr1 = [1, 2]; let arr2 = [3, 4]; let combined = [...arr1, ...arr2]; console.log(combined);',
      successStory: 'The robot\'s data combiner activates. Arrays merge seamlessly.',
      failureStory: 'The robot\'s spread handler struggles. "I need to combine arrays..."',
      whyThisMatters: 'Spread operator makes combining and copying data easy. It\'s essential for modern JavaScript.',
    },
    repairAnimation: 'combining',
    distanceToHome: 40,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'Spread operator is amazing! I can combine anything!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re mastering modern JavaScript!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to handle things that take time - like waiting for data.',
        emotion: 'neutral',
      },
    ],
  },
  {
    id: 17,
    title: 'Async Basics',
    act: 'ACT 3 — ADVANCED SYSTEMS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'Some operations take time. I need to wait without freezing.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'Like loading data?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Exactly! JavaScript uses "Promises" and "async/await" for this.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Promises?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'A Promise says "I\'ll give you data later". async/await makes waiting easy.',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'Create a function that waits 1 second, then says "Done". Use async/await.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: async function wait() { await new Promise(r => setTimeout(r, 1000)); console.log("Done"); } wait();',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'async-await',
      shortGoal: 'Create an async function that waits before completing.',
      steps: [
        'Create async function: async function wait() {',
        'Wait: await new Promise(r => setTimeout(r, 1000))',
        'Say done: console.log("Done")',
        'Close: }',
        'Call it: wait()',
      ],
      starterCode: `// Use async/await
// async function wait() {
//   await new Promise(r => setTimeout(r, 1000));
//   console.log("Done");
// }
// wait();

`,
      validate: (code: string, output: string[]) => {
        const hasAsync = /async\s+function/.test(code);
        const hasAwait = /await/.test(code);
        const hasPromise = /new\s+Promise/.test(code);
        const hasSetTimeout = /setTimeout/.test(code);
        const hasCall = /wait\s*\(/.test(code);
        const outputShowsDone = output.some(line =>
          line.toLowerCase().includes('done')
        );

        if (!hasAsync) {
          return {
            success: false,
            message: 'Create async function: async function wait() { ... }'
          };
        }
        if (!hasAwait || !hasPromise) {
          return {
            success: false,
            message: 'Wait with: await new Promise(r => setTimeout(r, 1000))'
          };
        }
        if (!hasCall || !outputShowsDone) {
          return {
            success: false,
            message: 'Call the function: wait() and wait for "Done" to appear'
          };
        }
        return {
          success: true,
          message: 'I can handle async operations now! Time doesn\'t freeze anymore!'
        };
      },
      hint: 'Type: async function wait() { await new Promise(r => setTimeout(r, 1000)); console.log("Done"); } wait();',
      successStory: 'The robot\'s async processor activates. It can now handle time-based operations.',
      failureStory: 'The robot\'s async handler struggles. "I need to wait without freezing..."',
      whyThisMatters: 'Async/await makes handling time-based operations easy. Essential for real applications.',
    },
    repairAnimation: 'async',
    distanceToHome: 30,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I can handle async operations now! This is powerful!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re becoming a real programmer!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to handle errors gracefully. What if something goes wrong?',
        emotion: 'neutral',
      },
    ],
  },
  {
    id: 18,
    title: 'Error Handling',
    act: 'ACT 3 — ADVANCED SYSTEMS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'Sometimes things break. I need to catch errors before they crash me.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How do you handle errors?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'JavaScript has "try/catch" blocks. Try risky code, catch errors if they happen.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Like a safety net?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Exactly! Try/catch prevents crashes.',
        emotion: 'happy',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'Try to access a property that doesn\'t exist, but catch the error gracefully.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: try { console.log(obj.missing); } catch(e) { console.log("Error caught:", e.message); }',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'try-catch',
      shortGoal: 'Use try/catch to handle errors gracefully.',
      steps: [
        'Start try: try {',
        'Risky code: let obj = {}; console.log(obj.missing.property)',
        'Close try: }',
        'Catch errors: catch(e) {',
        'Handle it: console.log("Error:", e.message)',
        'Close: }',
      ],
      starterCode: `// Handle errors with try/catch
// try {
//   let obj = {};
//   console.log(obj.missing.property);
// } catch(e) {
//   console.log("Error:", e.message);
// }

`,
      validate: (code: string, output: string[]) => {
        const hasTry = /try\s*\{/.test(code);
        const hasCatch = /catch\s*\(/.test(code);
        const hasRiskyCode = /obj\.missing/.test(code) || /\.property/.test(code);
        const hasErrorLog = /console\.log.*[Ee]rror/.test(code);
        const outputShowsError = output.some(line =>
          line.toLowerCase().includes('error')
        );

        if (!hasTry) {
          return {
            success: false,
            message: 'Start try block: try { ... }'
          };
        }
        if (!hasCatch) {
          return {
            success: false,
            message: 'Add catch block: catch(e) { ... }'
          };
        }
        if (!hasRiskyCode) {
          return {
            success: false,
            message: 'Try risky code: obj.missing.property'
          };
        }
        if (!hasErrorLog || !outputShowsError) {
          return {
            success: false,
            message: 'Log the error: console.log("Error:", e.message)'
          };
        }
        return {
          success: true,
          message: 'I can handle errors now! I won\'t crash anymore!'
        };
      },
      hint: 'Type: try { let obj = {}; console.log(obj.missing.property); } catch(e) { console.log("Error:", e.message); }',
      successStory: 'The robot\'s error handler activates. It can now recover from failures gracefully.',
      failureStory: 'The robot\'s error handler is missing. "I need to catch errors..."',
      whyThisMatters: 'Error handling prevents crashes. Real applications need try/catch to be robust.',
    },
    repairAnimation: 'error-handling',
    distanceToHome: 20,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I can handle errors gracefully now! I\'m more robust!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re becoming production-ready!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to learn pro-level concepts to fully restore my advanced systems.',
        emotion: 'neutral',
      },
    ],
  },
];



