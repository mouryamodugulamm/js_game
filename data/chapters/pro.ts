// Pro Chapters (19-24): Promises, Classes, Prototypes, Reduce, Recursion, Event handling concepts
import type { StoryChapter } from '../storyChapters';

export const proChapters: StoryChapter[] = [
  {
    id: 19,
    title: 'Promises Deep Dive',
    act: 'ACT 4 — PRO SYSTEMS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I understand async/await, but I need to understand Promises directly.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'What\'s the difference?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'async/await is built on Promises. Understanding Promises makes async/await clearer.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'So Promises are the foundation?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Exactly! A Promise is a value that will be available in the future.',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'Create a Promise that resolves after 1 second with the message "Success".',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: new Promise((resolve) => { setTimeout(() => resolve("Success"), 1000); }).then(console.log);',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'promises',
      shortGoal: 'Create and use a Promise that resolves with a message.',
      steps: [
        'Create Promise: new Promise((resolve) => {',
        'Wait: setTimeout(() =>',
        'Resolve: resolve("Success")',
        'Close: }, 1000); });',
        'Handle result: .then(console.log)',
      ],
      starterCode: `// Create and use a Promise
// new Promise((resolve) => {
//   setTimeout(() => resolve("Success"), 1000);
// }).then(console.log);

`,
      validate: (code: string, output: string[]) => {
        const hasPromise = /new\s+Promise/.test(code);
        const hasResolve = /resolve\s*\(/.test(code);
        const hasSetTimeout = /setTimeout/.test(code);
        const hasThen = /\.then\s*\(/.test(code);
        const outputShowsSuccess = output.some(line =>
          line.toLowerCase().includes('success')
        );

        if (!hasPromise) {
          return {
            success: false,
            message: 'Create a Promise: new Promise((resolve) => { ... })'
          };
        }
        if (!hasResolve || !hasSetTimeout) {
          return {
            success: false,
            message: 'Resolve after timeout: setTimeout(() => resolve("Success"), 1000)'
          };
        }
        if (!hasThen || !outputShowsSuccess) {
          return {
            success: false,
            message: 'Handle the result: .then(console.log) and wait for "Success"'
          };
        }
        return {
          success: true,
          message: 'I understand Promises now! They\'re the foundation of async JavaScript!'
        };
      },
      hint: 'Type: new Promise((resolve) => { setTimeout(() => resolve("Success"), 1000); }).then(console.log);',
      successStory: 'The robot\'s Promise processor activates. It can now handle future values directly.',
      failureStory: 'The robot\'s Promise handler struggles. "I need to understand future values..."',
      whyThisMatters: 'Promises are the foundation of async JavaScript. Understanding them makes everything clearer.',
    },
    repairAnimation: 'promises',
    distanceToHome: 15,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I understand Promises now! They\'re so elegant!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re mastering async programming!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to organize my code into reusable blueprints.',
        emotion: 'neutral',
      },
    ],
  },
  {
    id: 20,
    title: 'Classes & Objects',
    act: 'ACT 4 — PRO SYSTEMS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I create many similar objects. There must be a better way.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'Like a template?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Exactly! JavaScript has "classes" - blueprints for creating objects.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Like a factory?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Yes! Classes are factories for objects. Let me show you.',
        emotion: 'happy',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'Create a Robot class with a name property and a speak method.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: class Robot { constructor(name) { this.name = name; } speak() { console.log(this.name + " speaks"); } }',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'classes',
      shortGoal: 'Create a class and use it to create an object.',
      steps: [
        'Create class: class Robot {',
        'Constructor: constructor(name) { this.name = name; }',
        'Method: speak() { console.log(this.name + " speaks"); }',
        'Close: }',
        'Create instance: let r = new Robot("Robo"); r.speak();',
      ],
      starterCode: `// Create a class
// class Robot {
//   constructor(name) {
//     this.name = name;
//   }
//   speak() {
//     console.log(this.name + " speaks");
//   }
// }
// let r = new Robot("Robo");
// r.speak();

`,
      validate: (code: string, output: string[]) => {
        const hasClass = /class\s+Robot/.test(code);
        const hasConstructor = /constructor\s*\(/.test(code);
        const hasThis = /this\.name/.test(code);
        const hasMethod = /speak\s*\(/.test(code);
        const hasNew = /new\s+Robot/.test(code);
        const outputShowsSpeaks = output.some(line =>
          line.toLowerCase().includes('speaks')
        );

        if (!hasClass) {
          return {
            success: false,
            message: 'Create a class: class Robot { ... }'
          };
        }
        if (!hasConstructor || !hasThis) {
          return {
            success: false,
            message: 'Add constructor: constructor(name) { this.name = name; }'
          };
        }
        if (!hasMethod) {
          return {
            success: false,
            message: 'Add method: speak() { console.log(this.name + " speaks"); }'
          };
        }
        if (!hasNew || !outputShowsSpeaks) {
          return {
            success: false,
            message: 'Create instance: new Robot("Robo") and call r.speak()'
          };
        }
        return {
          success: true,
          message: 'I understand classes now! I can create blueprints for objects!'
        };
      },
      hint: 'Type: class Robot { constructor(name) { this.name = name; } speak() { console.log(this.name + " speaks"); } } let r = new Robot("Robo"); r.speak();',
      successStory: 'The robot\'s class system activates. It can now create object blueprints.',
      failureStory: 'The robot\'s class handler struggles. "I need to create blueprints..."',
      whyThisMatters: 'Classes organize code into reusable blueprints. Essential for object-oriented programming.',
    },
    repairAnimation: 'classes',
    distanceToHome: 10,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I can create object blueprints now! This is powerful!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re becoming an OOP expert!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to understand how JavaScript objects really work - prototypes.',
        emotion: 'neutral',
      },
    ],
  },
  {
    id: 21,
    title: 'Prototypes',
    act: 'ACT 4 — PRO SYSTEMS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'Classes are nice, but I want to understand how JavaScript objects really work.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How do they work?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'JavaScript uses "prototypes" - objects inherit from other objects.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Inheritance?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Yes! Objects can share methods through prototypes. It\'s how JavaScript works under the hood.',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'Add a method to an object\'s prototype so all instances can use it.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: function Robot(name) { this.name = name; } Robot.prototype.speak = function() { console.log(this.name); };',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'prototypes',
      shortGoal: 'Add a method to a constructor\'s prototype.',
      steps: [
        'Create constructor: function Robot(name) { this.name = name; }',
        'Add to prototype: Robot.prototype.speak = function() {',
        'Method body: console.log(this.name);',
        'Close: };',
        'Use it: let r = new Robot("Robo"); r.speak();',
      ],
      starterCode: `// Use prototypes
// function Robot(name) {
//   this.name = name;
// }
// Robot.prototype.speak = function() {
//   console.log(this.name);
// };
// let r = new Robot("Robo");
// r.speak();

`,
      validate: (code: string, output: string[]) => {
        const hasConstructor = /function\s+Robot/.test(code);
        const hasPrototype = /Robot\.prototype/.test(code);
        const hasSpeak = /\.speak\s*=/.test(code);
        const hasNew = /new\s+Robot/.test(code);
        const outputShowsName = output.some(line =>
          line.toLowerCase().includes('robo')
        );

        if (!hasConstructor) {
          return {
            success: false,
            message: 'Create constructor: function Robot(name) { this.name = name; }'
          };
        }
        if (!hasPrototype || !hasSpeak) {
          return {
            success: false,
            message: 'Add to prototype: Robot.prototype.speak = function() { ... }'
          };
        }
        if (!hasNew || !outputShowsName) {
          return {
            success: false,
            message: 'Create instance: new Robot("Robo") and call r.speak()'
          };
        }
        return {
          success: true,
          message: 'I understand prototypes now! This is how JavaScript really works!'
        };
      },
      hint: 'Type: function Robot(name) { this.name = name; } Robot.prototype.speak = function() { console.log(this.name); }; let r = new Robot("Robo"); r.speak();',
      successStory: 'The robot\'s prototype system activates. It understands JavaScript\'s inheritance model.',
      failureStory: 'The robot\'s prototype handler struggles. "I need to understand inheritance..."',
      whyThisMatters: 'Prototypes are JavaScript\'s inheritance mechanism. Understanding them makes you a true JavaScript expert.',
    },
    repairAnimation: 'prototypes',
    distanceToHome: 8,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I understand prototypes now! This is how JavaScript really works!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re becoming a JavaScript expert!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to reduce arrays to single values - like summing all numbers.',
        emotion: 'neutral',
      },
    ],
  },
  {
    id: 22,
    title: 'Array Reduce',
    act: 'ACT 4 — PRO SYSTEMS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I can map and filter, but I need to turn an array into a single value.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'Like adding all numbers?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Exactly! That\'s what "reduce" does - it reduces an array to one value.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Reduce?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Yes! Reduce takes an array and combines all items into one result.',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'I have: [1, 2, 3, 4]. Sum them all using reduce.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: let sum = [1, 2, 3, 4].reduce((acc, num) => acc + num, 0);',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'reduce',
      shortGoal: 'Use reduce to sum all numbers in an array.',
      steps: [
        'Create array: let numbers = [1, 2, 3, 4]',
        'Use reduce: let sum = numbers.reduce(',
        'Accumulator: (acc, num) => acc + num',
        'Start value: , 0)',
        'Show result: console.log(sum)',
      ],
      starterCode: `// Use reduce to sum numbers
// let numbers = [1, 2, 3, 4];
// let sum = numbers.reduce((acc, num) => acc + num, 0);
// console.log(sum);

`,
      validate: (code: string, output: string[]) => {
        const hasReduce = /\.reduce\s*\(/.test(code);
        const hasArrow = /=>/.test(code);
        const hasAcc = /acc\s*\+\s*num/.test(code);
        const hasStart = /,\s*0\s*\)/.test(code);
        const outputShows10 = output.some(line => line.includes('10'));

        if (!hasReduce) {
          return {
            success: false,
            message: 'Use reduce: numbers.reduce(...)'
          };
        }
        if (!hasArrow || !hasAcc) {
          return {
            success: false,
            message: 'Add numbers: (acc, num) => acc + num'
          };
        }
        if (!hasStart) {
          return {
            success: false,
            message: 'Start with 0: , 0)'
          };
        }
        if (!outputShows10) {
          return {
            success: false,
            message: 'I should see 10 (1+2+3+4) in the output!'
          };
        }
        return {
          success: true,
          message: 'I understand reduce now! I can combine arrays into single values!'
        };
      },
      hint: 'Type: let numbers = [1, 2, 3, 4]; let sum = numbers.reduce((acc, num) => acc + num, 0); console.log(sum);',
      successStory: 'The robot\'s reducer activates. Arrays can now be combined into single values.',
      failureStory: 'The robot\'s reduce handler struggles. "I need to combine arrays..."',
      whyThisMatters: 'Reduce is powerful! It can transform arrays into any single value - sums, products, objects, anything.',
    },
    repairAnimation: 'reducing',
    distanceToHome: 5,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I understand reduce now! It\'s so powerful!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re mastering functional programming!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to understand recursion - functions that call themselves.',
        emotion: 'neutral',
      },
    ],
  },
  {
    id: 23,
    title: 'Recursion',
    act: 'ACT 4 — PRO SYSTEMS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I need to solve problems by breaking them into smaller versions of themselves.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'Like a function calling itself?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Exactly! That\'s "recursion" - a function that calls itself.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Won\'t that go forever?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'No! You need a "base case" - a condition that stops the recursion.',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'Create a function that counts down from a number using recursion.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: function countdown(n) { if (n <= 0) return; console.log(n); countdown(n-1); } countdown(5);',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'recursion',
      shortGoal: 'Create a recursive function that counts down from a number.',
      steps: [
        'Create function: function countdown(n) {',
        'Base case: if (n <= 0) return;',
        'Print: console.log(n);',
        'Recurse: countdown(n - 1);',
        'Close: }',
        'Call it: countdown(5);',
      ],
      starterCode: `// Create a recursive function
// function countdown(n) {
//   if (n <= 0) return;
//   console.log(n);
//   countdown(n - 1);
// }
// countdown(5);

`,
      validate: (code: string, output: string[]) => {
        const hasFunction = /function\s+countdown/.test(code);
        const hasBaseCase = /if\s*\(\s*n\s*<=\s*0/.test(code);
        const hasReturn = /return/.test(code);
        const hasRecurse = /countdown\s*\(\s*n\s*-\s*1/.test(code);
        const hasCall = /countdown\s*\(\s*5/.test(code);
        const numbers = output.filter(line => /^\d+$/.test(line.trim())).map(line => parseInt(line.trim()));
        const hasAllNumbers = [5, 4, 3, 2, 1].every(n => numbers.includes(n));

        if (!hasFunction) {
          return {
            success: false,
            message: 'Create function: function countdown(n) { ... }'
          };
        }
        if (!hasBaseCase || !hasReturn) {
          return {
            success: false,
            message: 'Add base case: if (n <= 0) return;'
          };
        }
        if (!hasRecurse) {
          return {
            success: false,
            message: 'Call itself: countdown(n - 1);'
          };
        }
        if (!hasCall || !hasAllNumbers) {
          return {
            success: false,
            message: 'Call countdown(5) and see 5, 4, 3, 2, 1 in output'
          };
        }
        return {
          success: true,
          message: 'I understand recursion now! Functions can solve problems by calling themselves!'
        };
      },
      hint: 'Type: function countdown(n) { if (n <= 0) return; console.log(n); countdown(n - 1); } countdown(5);',
      successStory: 'The robot\'s recursive processor activates. It can now solve problems recursively.',
      failureStory: 'The robot\'s recursion handler struggles. "I need functions that call themselves..."',
      whyThisMatters: 'Recursion is elegant for solving problems that can be broken into smaller versions. Essential for advanced algorithms.',
    },
    repairAnimation: 'recursion',
    distanceToHome: 3,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I understand recursion now! It\'s so elegant!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re becoming an algorithm expert!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to understand event handling - responding to user actions.',
        emotion: 'neutral',
      },
    ],
  },
  {
    id: 24,
    title: 'Event Handling Concepts',
    act: 'ACT 4 — PRO SYSTEMS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I can process data, but I need to respond to events - like clicks or inputs.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'Like reacting to things?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Exactly! JavaScript uses "event listeners" - functions that run when events happen.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Event listeners?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Yes! Like: element.addEventListener("click", function() { ... }).',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'Create a function that simulates handling a click event.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: function handleClick() { console.log("Clicked!"); } handleClick();',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'events',
      shortGoal: 'Create an event handler function that responds to events.',
      steps: [
        'Create handler: function handleClick() {',
        'Respond: console.log("Clicked!")',
        'Close: }',
        'Call it: handleClick()',
      ],
      starterCode: `// Create an event handler
// function handleClick() {
//   console.log("Clicked!");
// }
// handleClick();

`,
      validate: (code: string, output: string[]) => {
        const hasFunction = /function\s+handleClick/.test(code);
        const hasLog = /console\.log\s*\(\s*"Clicked!"/.test(code);
        const hasCall = /handleClick\s*\(/.test(code);
        const outputShowsClicked = output.some(line =>
          line.toLowerCase().includes('clicked')
        );

        if (!hasFunction) {
          return {
            success: false,
            message: 'Create handler: function handleClick() { ... }'
          };
        }
        if (!hasLog) {
          return {
            success: false,
            message: 'Respond to event: console.log("Clicked!")'
          };
        }
        if (!hasCall || !outputShowsClicked) {
          return {
            success: false,
            message: 'Call the handler: handleClick() and see "Clicked!"'
          };
        }
        return {
          success: true,
          message: 'I understand event handling now! I can respond to user actions!'
        };
      },
      hint: 'Type: function handleClick() { console.log("Clicked!"); } handleClick();',
      successStory: 'The robot\'s event system activates. It can now respond to interactions.',
      failureStory: 'The robot\'s event handler is missing. "I need to respond to events..."',
      whyThisMatters: 'Event handling is essential for interactive applications. Understanding it makes you a complete JavaScript developer.',
    },
    repairAnimation: 'events',
    distanceToHome: 0,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I understand event handling now! I can respond to anything!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re a complete JavaScript developer now!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'I\'m fully restored! All my systems are online!',
        emotion: 'excited',
      },
    ],
  },
  {
    id: 25,
    title: 'Goodbye',
    act: 'ACT 5 — GOODBYE',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I\'m fully repaired. All because of you.',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'I can\'t believe I did it. I actually learned JavaScript from beginner to pro.',
        emotion: 'happy',
      },
      {
        speaker: 'robot',
        text: 'You\'re a builder now. You can make anything with code.',
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
    backgroundImage: '/images/bg_space.png',
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
        text: 'Remember: every line of code is a step toward building something amazing. You are a builder now.',
        emotion: 'happy',
      },
    ],
  },
];

