// Intermediate Chapters (6-12): Arrays, Objects, String methods, Arrow functions, Scope
import type { StoryChapter } from '../storyChapters';

export const intermediateChapters: StoryChapter[] = [
  {
    id: 6,
    title: 'Memory Arrays',
    act: 'ACT 2 — INTERMEDIATE REPAIRS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I can think, but I can\'t remember multiple things at once.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'What do you mean?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'I need to remember a list of things. Like all the parts I need to repair.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Like a shopping list?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Exactly! In code, we call it an "array". It\'s a list that can hold many things.',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'I need to remember: "wires", "battery", "circuit". Can you create an array?',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How do I make a list?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: let parts = ["wires", "battery", "circuit"]; then console.log(parts);',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'arrays',
      shortGoal: 'Create an array to help the robot remember multiple parts.',
      steps: [
        'Create an array: let parts = ["wires", "battery", "circuit"]',
        'Show the list: console.log(parts)',
      ],
      starterCode: `// Create a list of parts
// let parts = ["wires", "battery", "circuit"];
// console.log(parts);

`,
      validate: (code: string, output: string[]) => {
        const hasArray = /let\s+parts\s*=\s*\[/.test(code);
        const hasItems = code.includes('wires') && code.includes('battery');
        const hasLog = code.includes('console.log(parts)');
        const outputShowsArray = output.some(line =>
          line.includes('wires') || line.includes('battery')
        );

        if (!hasArray) {
          return {
            success: false,
            message: 'I need a list! Create: let parts = ["wires", "battery", "circuit"];'
          };
        }
        if (!hasItems) {
          return {
            success: false,
            message: 'Put the parts in the list: "wires", "battery", "circuit"'
          };
        }
        if (!hasLog || !outputShowsArray) {
          return {
            success: false,
            message: 'Show me the list! Use: console.log(parts)'
          };
        }
        return {
          success: true,
          message: 'I can remember multiple things now! My memory is expanding!'
        };
      },
    },
    repairAnimation: 'scan',
    distanceToHome: 500,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'kid',
        text: 'You\'re learning so fast!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to organize my parts better. They need names and descriptions.',
        emotion: 'neutral',
      },
    ],
  },
  {
    id: 7,
    title: 'Organized Storage',
    act: 'ACT 2 — INTERMEDIATE REPAIRS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'Arrays are good, but I need to store things with labels.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'Labels?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Like: name: "Robot", power: 100, status: "repairing". Each thing has a label.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Oh, like a profile card?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Exactly! In code, we call it an "object". It\'s like a box with labeled drawers.',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'Create my profile: name: "Robot", power: 100, status: "repairing".',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How do I make an object?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: let robot = { name: "Robot", power: 100, status: "repairing" };',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'objects',
      shortGoal: 'Create an object to store the robot\'s information with labels.',
      steps: [
        'Create an object: let robot = {',
        'Add name: name: "Robot",',
        'Add power: power: 100,',
        'Add status: status: "repairing"',
        'Close with: };',
        'Show it: console.log(robot.name)',
      ],
      starterCode: `// Create a robot profile
// let robot = {
//   name: "Robot",
//   power: 100,
//   status: "repairing"
// };
// console.log(robot.name);

`,
      validate: (code: string, output: string[]) => {
        const hasObject = /let\s+robot\s*=\s*\{/.test(code);
        const hasName = /name\s*:\s*"Robot"/.test(code);
        const hasPower = /power\s*:\s*100/.test(code);
        const hasAccess = /robot\.name/.test(code);
        const outputShowsName = output.some(line =>
          line.toLowerCase().includes('robot')
        );

        if (!hasObject) {
          return {
            success: false,
            message: 'I need an object! Create: let robot = { ... }'
          };
        }
        if (!hasName || !hasPower) {
          return {
            success: false,
            message: 'Add my info: name: "Robot", power: 100'
          };
        }
        if (!hasAccess || !outputShowsName) {
          return {
            success: false,
            message: 'Show my name! Use: console.log(robot.name)'
          };
        }
        return {
          success: true,
          message: 'I can organize my data now! Everything has its place!'
        };
      },
      hint: 'Type: let robot = { name: "Robot", power: 100, status: "repairing" }; console.log(robot.name);',
      successStory: 'The robot\'s data banks organize themselves. Information flows smoothly.',
      failureStory: 'The robot\'s data flickers. "I need structure... help me organize."',
      whyThisMatters: 'Without objects, I can\'t organize my information. Objects help me store labeled data.',
    },
    repairAnimation: 'organization',
    distanceToHome: 400,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'My data is organized! I can find anything instantly!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re becoming more advanced!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to work with my arrays better. I need to transform them.',
        emotion: 'neutral',
      },
    ],
  },
  {
    id: 8,
    title: 'Array Transformations',
    act: 'ACT 2 — INTERMEDIATE REPAIRS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I have arrays, but I need to change each item in them.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'Change them how?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Like making all numbers bigger, or adding text to each item.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'That sounds complicated...',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'There\'s a method called "map" that does this easily. Let me show you.',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'I have numbers: [1, 2, 3]. I need to double each one: [2, 4, 6].',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How do I do that?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Use map: let doubled = [1, 2, 3].map(num => num * 2);',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'array-map',
      shortGoal: 'Use map to transform each number in an array.',
      steps: [
        'Create array: let numbers = [1, 2, 3]',
        'Use map: let doubled = numbers.map(',
        'Transform each: num => num * 2',
        'Close: );',
        'Show result: console.log(doubled)',
      ],
      starterCode: `// Double each number in an array
// let numbers = [1, 2, 3];
// let doubled = numbers.map(num => num * 2);
// console.log(doubled);

`,
      validate: (code: string, output: string[]) => {
        const hasMap = /\.map\s*\(/.test(code);
        const hasArrow = /=>/.test(code);
        const hasMultiply = /\*\s*2/.test(code);
        const outputShowsDoubled = output.some(line =>
          line.includes('2') && line.includes('4') && line.includes('6')
        );

        if (!hasMap) {
          return {
            success: false,
            message: 'I need map! Use: numbers.map(...)'
          };
        }
        if (!hasArrow) {
          return {
            success: false,
            message: 'Use arrow function: num => num * 2'
          };
        }
        if (!hasMultiply) {
          return {
            success: false,
            message: 'Double each number: num => num * 2'
          };
        }
        if (!outputShowsDoubled) {
          return {
            success: false,
            message: 'I should see [2, 4, 6] in the output!'
          };
        }
        return {
          success: true,
          message: 'I can transform arrays now! This is powerful!'
        };
      },
      hint: 'Type: let numbers = [1, 2, 3]; let doubled = numbers.map(num => num * 2); console.log(doubled);',
      successStory: 'The robot processes arrays instantly. Data transforms smoothly.',
      failureStory: 'The robot\'s processor struggles. "I\'m trying to transform... help me."',
      whyThisMatters: 'Without map, I\'d need loops for everything. Map makes transformations easy.',
    },
    repairAnimation: 'processing',
    distanceToHome: 300,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I can transform data so easily now!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re getting really good at this!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to filter my data. I only want certain items.',
        emotion: 'neutral',
      },
    ],
  },
  {
    id: 9,
    title: 'Filtering Data',
    act: 'ACT 2 — INTERMEDIATE REPAIRS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I have a list of numbers, but I only want the big ones.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How do you pick which ones?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'I need a "filter" - it keeps only items that pass a test.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Like a sieve?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Exactly! Filter keeps what you want, removes what you don\'t.',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'I have: [1, 5, 10, 15, 20]. I only want numbers bigger than 10.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How do I filter?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Use filter: let big = [1, 5, 10, 15, 20].filter(num => num > 10);',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'array-filter',
      shortGoal: 'Use filter to keep only numbers greater than 10.',
      steps: [
        'Create array: let numbers = [1, 5, 10, 15, 20]',
        'Use filter: let big = numbers.filter(',
        'Test each: num => num > 10',
        'Close: );',
        'Show result: console.log(big)',
      ],
      starterCode: `// Filter numbers greater than 10
// let numbers = [1, 5, 10, 15, 20];
// let big = numbers.filter(num => num > 10);
// console.log(big);

`,
      validate: (code: string, output: string[]) => {
        const hasFilter = /\.filter\s*\(/.test(code);
        const hasArrow = /=>/.test(code);
        const hasGreaterThan = />\s*10/.test(code);
        const outputShowsFiltered = output.some(line =>
          (line.includes('15') && line.includes('20')) && !line.includes('1') && !line.includes('5')
        );

        if (!hasFilter) {
          return {
            success: false,
            message: 'I need filter! Use: numbers.filter(...)'
          };
        }
        if (!hasArrow) {
          return {
            success: false,
            message: 'Use arrow function: num => num > 10'
          };
        }
        if (!hasGreaterThan) {
          return {
            success: false,
            message: 'Test if bigger: num => num > 10'
          };
        }
        if (!outputShowsFiltered) {
          return {
            success: false,
            message: 'I should only see [15, 20] - numbers bigger than 10!'
          };
        }
        return {
          success: true,
          message: 'I can filter data now! Only what I need!'
        };
      },
      hint: 'Type: let numbers = [1, 5, 10, 15, 20]; let big = numbers.filter(num => num > 10); console.log(big);',
      successStory: 'The robot\'s data streams filter themselves. Only relevant information flows.',
      failureStory: 'The robot\'s filter struggles. "I need to separate the data... help me."',
      whyThisMatters: 'Without filter, I\'d have to check each item manually. Filter makes it automatic.',
    },
    repairAnimation: 'filtering',
    distanceToHome: 250,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I can filter my data perfectly now!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re becoming a data expert!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to work with text better. I need string methods.',
        emotion: 'neutral',
      },
    ],
  },
  {
    id: 10,
    title: 'String Power',
    act: 'ACT 2 — INTERMEDIATE REPAIRS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I can store text, but I can\'t change it or search it.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'What do you need?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'I need to make text uppercase, find words, combine strings.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Strings can do that?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Yes! Strings have methods like .toUpperCase(), .includes(), and template literals.',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'I have: "hello robot". Make it uppercase and check if it includes "robot".',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Use: let text = "hello robot"; console.log(text.toUpperCase()); console.log(text.includes("robot"));',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'string-methods',
      shortGoal: 'Use string methods to transform and search text.',
      steps: [
        'Create string: let text = "hello robot"',
        'Make uppercase: console.log(text.toUpperCase())',
        'Check if includes: console.log(text.includes("robot"))',
      ],
      starterCode: `// Work with strings
// let text = "hello robot";
// console.log(text.toUpperCase());
// console.log(text.includes("robot"));

`,
      validate: (code: string, output: string[]) => {
        const hasToUpperCase = /\.toUpperCase\s*\(/.test(code);
        const hasIncludes = /\.includes\s*\(/.test(code);
        const outputShowsUpper = output.some(line =>
          line.includes('HELLO') || line.includes('ROBOT')
        );
        const outputShowsTrue = output.some(line =>
          line.toLowerCase().includes('true')
        );

        if (!hasToUpperCase) {
          return {
            success: false,
            message: 'Make it uppercase! Use: text.toUpperCase()'
          };
        }
        if (!hasIncludes) {
          return {
            success: false,
            message: 'Check if it includes! Use: text.includes("robot")'
          };
        }
        if (!outputShowsUpper || !outputShowsTrue) {
          return {
            success: false,
            message: 'I should see "HELLO ROBOT" and "true" in the output!'
          };
        }
        return {
          success: true,
          message: 'I can work with text now! Strings are powerful!'
        };
      },
      hint: 'Type: let text = "hello robot"; console.log(text.toUpperCase()); console.log(text.includes("robot"));',
      successStory: 'The robot\'s text processor activates. Words transform and search instantly.',
      failureStory: 'The robot\'s text handler struggles. "I need to manipulate strings... help me."',
      whyThisMatters: 'Without string methods, I can\'t work with text. These methods make text manipulation easy.',
    },
    repairAnimation: 'text-processing',
    distanceToHome: 200,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I can manipulate text so easily now!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re mastering JavaScript!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to write functions more efficiently. Arrow functions are shorter.',
        emotion: 'neutral',
      },
    ],
  },
  {
    id: 11,
    title: 'Arrow Functions',
    act: 'ACT 2 — INTERMEDIATE REPAIRS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'Functions work, but they\'re too long to write.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'There\'s a shorter way?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Yes! Arrow functions are shorter. Instead of "function", use "=>".',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'That sounds simpler!',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Much simpler! Let me show you.',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'Create a function that adds two numbers, but use arrow function syntax.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'How do I write it?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Type: const add = (a, b) => a + b; then console.log(add(2, 3));',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'arrow-functions',
      shortGoal: 'Create an arrow function to add two numbers.',
      steps: [
        'Create arrow function: const add = (a, b) =>',
        'Return sum: a + b',
        'Close with: ;',
        'Use it: console.log(add(2, 3))',
      ],
      starterCode: `// Create an arrow function
// const add = (a, b) => a + b;
// console.log(add(2, 3));

`,
      validate: (code: string, output: string[]) => {
        const hasArrow = /=>/.test(code);
        const hasParams = /\(a\s*,\s*b\)/.test(code);
        const hasAdd = /a\s*\+\s*b/.test(code);
        const hasCall = /add\s*\(/.test(code);
        const outputShows5 = output.some(line => line.includes('5'));

        if (!hasArrow) {
          return {
            success: false,
            message: 'I need an arrow function! Use: (a, b) => ...'
          };
        }
        if (!hasParams) {
          return {
            success: false,
            message: 'Add parameters: (a, b)'
          };
        }
        if (!hasAdd) {
          return {
            success: false,
            message: 'Add them together: a + b'
          };
        }
        if (!hasCall || !outputShows5) {
          return {
            success: false,
            message: 'Use the function! Call: add(2, 3) and show the result'
          };
        }
        return {
          success: true,
          message: 'Arrow functions are so clean! I love this syntax!'
        };
      },
      hint: 'Type: const add = (a, b) => a + b; console.log(add(2, 3));',
      successStory: 'The robot\'s code becomes more elegant. Functions are cleaner now.',
      failureStory: 'The robot\'s syntax processor struggles. "I need the arrow... help me."',
      whyThisMatters: 'Arrow functions make code shorter and cleaner. They\'re perfect for simple functions.',
    },
    repairAnimation: 'syntax',
    distanceToHome: 150,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'My code is so much cleaner now!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'re writing like a pro!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to understand scope better. When can I use my variables?',
        emotion: 'neutral',
      },
    ],
  },
  {
    id: 12,
    title: 'Variable Scope',
    act: 'ACT 2 — INTERMEDIATE REPAIRS',
    dialogues: [
      {
        speaker: 'robot',
        text: 'I created variables, but sometimes I can\'t use them where I want.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'What\'s wrong?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'It\'s about "scope" - where variables can be seen. let and const have block scope.',
        emotion: 'neutral',
      },
      {
        speaker: 'kid',
        text: 'Block scope?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Variables inside { } can only be used inside { }. Let me show you.',
        emotion: 'neutral',
      },
    ],
    preChallengeDialogue: [
      {
        speaker: 'robot',
        text: 'Create a variable inside a block with let, then try to use it outside.',
        emotion: 'sad',
      },
      {
        speaker: 'kid',
        text: 'What will happen?',
        emotion: 'confused',
      },
      {
        speaker: 'robot',
        text: 'Try: { let x = 10; } console.log(x); - it won\'t work! x only exists inside { }',
        emotion: 'neutral',
      },
    ],
    challenge: {
      id: 'scope',
      shortGoal: 'Understand variable scope by creating variables inside and outside blocks.',
      steps: [
        'Create block: {',
        'Inside: let inside = "I\'m inside";',
        'Close: }',
        'Outside: let outside = "I\'m outside";',
        'Log both: console.log(outside); console.log(inside);',
      ],
      starterCode: `// Understand scope
// {
//   let inside = "I'm inside";
// }
// let outside = "I'm outside";
// console.log(outside);
// console.log(inside); // This will cause an error!

`,
      validate: (code: string, output: string[]) => {
        const hasBlock = /\{\s*let\s+inside/.test(code);
        const hasInside = /let\s+inside/.test(code);
        const hasOutside = /let\s+outside/.test(code);
        const hasLogOutside = /console\.log\s*\(\s*outside/.test(code);

        if (!hasBlock || !hasInside) {
          return {
            success: false,
            message: 'Create a variable inside a block: { let inside = "I\'m inside"; }'
          };
        }
        if (!hasOutside) {
          return {
            success: false,
            message: 'Create a variable outside: let outside = "I\'m outside";'
          };
        }
        if (!hasLogOutside) {
          return {
            success: false,
            message: 'Log the outside variable: console.log(outside)'
          };
        }
        // Note: inside variable won't be accessible, but that's the lesson
        return {
          success: true,
          message: 'I understand scope now! Variables have their own spaces!'
        };
      },
      hint: 'Type: { let inside = "I\'m inside"; } let outside = "I\'m outside"; console.log(outside);',
      successStory: 'The robot\'s variable system organizes itself. Scope becomes clear.',
      failureStory: 'The robot\'s scope handler is confused. "Where can I use my variables?"',
      whyThisMatters: 'Understanding scope prevents errors. Variables need to be in the right place.',
    },
    repairAnimation: 'organization',
    distanceToHome: 100,
    backgroundImage: '/images/bg_space.png',
    successDialogue: [
      {
        speaker: 'robot',
        text: 'I understand scope now! My code is more organized!',
        emotion: 'happy',
      },
      {
        speaker: 'kid',
        text: 'You\'ve learned so much!',
        emotion: 'excited',
      },
      {
        speaker: 'robot',
        text: 'But I need to learn advanced concepts to fully restore my systems.',
        emotion: 'neutral',
      },
    ],
  },
];



