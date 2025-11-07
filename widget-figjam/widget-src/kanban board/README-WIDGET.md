# Gamified Kanban Board Widget

This FigJam widget is a gamified Kanban board that helps you track tasks while earning XP and leveling up!

## Features

✨ **Gamification System**
- Earn XP by creating, moving, and completing tasks
- Level up your character as you progress
- Visual progress bar showing XP to next level

📋 **Kanban Board**
- Three columns: To Do, In Progress, Done
- Color-coded priority levels (low, medium, high)
- Click on cards to move them between columns
- Add new issues directly to any column

🎮 **XP Rewards**
- +10 XP for creating a new issue
- +5 XP for moving an issue
- +20 XP for completing an issue (moving to Done)

## How to Use

### Running the Widget

1. Open FigJam
2. Go to Widgets → Development → Import widget from manifest
3. Select the `manifest.json` file from this folder
4. The widget will appear in your FigJam file

### Interacting with the Widget

**Moving Tasks:**
- Click on any task card to cycle it through statuses:
  - To Do → In Progress → Done → To Do (cycles)
- You'll earn XP each time you move a task

**Adding Tasks:**
- Click the "+ Add Issue" button at the bottom of any column
- A new issue will be created with default values
- Issues are automatically synced across all users viewing the widget

**Leveling Up:**
- Every 100 XP earns you a new level
- A notification appears when you level up
- Progress bar shows your advancement

### Customization

You can edit the widget code to customize:

**XP Rewards** (lines 22-26):
```typescript
const XP_REWARDS = {
  ADD_ISSUE: 10,
  MOVE_ISSUE: 5,
  COMPLETE_ISSUE: 20,
};
```

**XP Per Level** (line 28):
```typescript
const XP_PER_LEVEL = 100;
```

**Default Issues** (lines 290-315):
Update the initial issues array in the `KanbanWidget` function.

## Technical Details

### Built With
- FigJam Widget API
- TypeScript
- esbuild

### Key Conversions from React

This widget was converted from a React webapp. Key differences:

| React                      | FigJam Widget                     |
| -------------------------- | --------------------------------- |
| `<div>`                    | `<AutoLayout>`                    |
| `className`                | Inline props (fill, stroke, etc.) |
| `useState`                 | `useSyncedState`                  |
| `toast.success()`          | `figma.notify()`                  |
| CSS colors                 | RGB objects `{ r, g, b }`         |
| Drag & Drop                | onClick cycling                   |
| Spread operator `{...obj}` | `Object.assign({}, obj)`          |

### File Structure
```
Kanban ludifier/
├── manifest.json         # Widget configuration
├── package.json          # Dependencies and build scripts
├── widget-src/
│   ├── code.tsx         # Main widget code
│   └── tsconfig.json    # TypeScript configuration
└── dist/
    └── code.js          # Built widget (generated)
```

### Building

```bash
# Install dependencies
npm install

# Build once
npm run build

# Watch mode (auto-rebuild on changes)
npm run watch
```

## Limitations

Since widgets don't support HTML UI:
- No drag-and-drop (replaced with click-to-cycle)
- No input dialogs (new issues created with default values)
- No hover effects
- Must avoid ES6+ features like spread operators

## Future Enhancements

Potential improvements:
- Custom issue titles/descriptions (requires UI input alternative)
- Achievement badges
- Streak tracking
- Team leaderboards
- Export progress data

## Support

For issues or questions, refer to:
- [FigJam Widget API Documentation](https://www.figma.com/widget-docs/)
- Conversion guide provided with this project
