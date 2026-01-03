# The Robot & The Kid

A story-driven educational game where learning JavaScript is the only way to progress the story.

## 🎮 About

An interstellar robot crashes in a quiet garage owned by a lonely kid who hates school and coding. The robot is damaged and powerless, and the only way to repair it and help it return home is by learning JavaScript - one concept at a time.

This is **not a tutorial**. This is an **interactive story** that happens to teach JavaScript.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Story Structure

The game is divided into 6 acts:

- **ACT 1 — THE CRASH**: Learn `console.log()` to restore the robot's voice
- **ACT 2 — POWER RESTORATION**: Learn variables & data types to restore power
- **ACT 3 — MOVEMENT & MEMORY**: Learn loops to repair movement
- **ACT 4 — DECISIONS**: Learn conditionals to repair decision-making
- **ACT 5 — THINKING**: Learn functions to repair the brain module
- **ACT 6 — GOODBYE**: Final farewell and launch sequence

## 🎯 Features

- **Story-driven learning**: Each JavaScript concept is introduced naturally through the narrative
- **Code execution**: Real-time JavaScript execution in the browser
- **Progress tracking**: Save your progress with localStorage
- **Visual feedback**: Robot animations and repair sequences
- **Mobile-first design**: Works beautifully on all devices

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **CSS Modules**

## 📁 Project Structure

```
/app
  /page.tsx              # Intro page
  /story
    /[chapter]/page.tsx   # Chapter pages
    /complete/page.tsx    # Final page
/components
  StoryDialogue.tsx       # Dialogue system
  Robot.tsx              # Robot character
  CodeRunner.tsx         # Code execution
  RepairAnimation.tsx    # Repair animations
  ProgressTracker.tsx    # Progress display
/data
  storyChapters.ts       # Story data
```

## 🎨 Design Philosophy

- **Teach by doing**: Every concept is learned through hands-on coding
- **Emotion first, syntax second**: The story drives the learning
- **One idea per screen**: No overwhelming information
- **Always show cause → effect**: Code changes have immediate visual feedback

## 🔧 Extending the Game

To add new chapters or modify existing ones, edit `/data/storyChapters.ts`. Each chapter includes:

- Dialogues between the robot and kid
- A code challenge with validation
- Repair animation type
- Distance to home planet

## 📝 License

This project is open source and available for educational purposes.

---

**Remember**: Every line of code is a step toward building something amazing. Keep coding, keep building, keep learning. 🌟




