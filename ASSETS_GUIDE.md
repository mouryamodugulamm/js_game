# Robot Assets Guide

## Current Implementation

The game now uses custom SVG vector images for the robot character. Each emotion state has its own SVG file:

- `/public/images/robot-neutral.svg` - Default/neutral state
- `/public/images/robot-happy.svg` - Happy/excited state
- `/public/images/robot-sad.svg` - Sad/damaged state
- `/public/images/robot-excited.svg` - Very happy/excited state
- `/public/images/robot-confused.svg` - Confused/questioning state

## Using Free Vector Images

If you want to replace these with different robot images, here are some great free resources:

### Recommended Free Vector Image Sources:

1. **Flaticon** (https://www.flaticon.com)
   - Search for "robot" or "android robot"
   - Free with attribution
   - Download as SVG

2. **Freepik** (https://www.freepik.com)
   - Search for "robot vector" or "cute robot"
   - Free with attribution
   - Download as SVG or PNG

3. **OpenClipart** (https://openclipart.org)
   - Public domain robot illustrations
   - No attribution required
   - Download as SVG

4. **The Noun Project** (https://thenounproject.com)
   - Simple robot icons
   - Free with attribution
   - Download as SVG

5. **unDraw** (https://undraw.co)
   - Open-source illustrations
   - Customizable colors
   - Download as SVG

### How to Replace Images:

1. **Download your robot images** from any of the above sources
2. **Save them** in `/public/images/` with these names:
   - `robot-neutral.svg`
   - `robot-happy.svg`
   - `robot-sad.svg`
   - `robot-excited.svg`
   - `robot-confused.svg`

3. **Ensure the images are:**
   - SVG format (scalable, best quality)
   - Approximately 200x300px viewBox
   - Transparent background
   - Fits the sci-fi/garage theme

### Alternative: Using PNG Images

If you prefer PNG images:

1. Save them in `/public/images/` with the same naming convention
2. Update `components/Robot.tsx` - the Next.js Image component supports PNG
3. Recommended size: 400x600px for high DPI displays

### Customization Tips:

- **Colors**: The current SVGs use blue (#4a90e2) and green (#00ff88) accents
- **Style**: Keep it friendly and approachable (not scary)
- **Size**: Maintain aspect ratio around 2:3 (width:height)
- **Animation**: SVGs can include animations (like the current ones)

## Current SVG Features

The included SVG files have:
- ✅ Animated eyes (blinking/pulsing)
- ✅ Animated chest panel (pulsing energy)
- ✅ Different expressions per emotion
- ✅ Smooth gradients and shadows
- ✅ Responsive sizing

You can edit these SVGs directly or replace them entirely with your own designs!

## License Note

When using free vector images, make sure to:
- Check the license (most require attribution)
- Credit the artist if required
- Use images that allow commercial/educational use




