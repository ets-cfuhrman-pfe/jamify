// Constants
export const COLUMNS = [
  { status: "todo", title: "To Do", color: "#4B5563" },
  { status: "in-progress", title: "In Progress", color: "#2563EB" },
  { status: "done", title: "Done", color: "#16A34A" },
];

export const XP_REWARDS = {
  ADD_ISSUE: 10,
  MOVE_ISSUE: 5,
  COMPLETE_ISSUE: 20,
};

export const XP_PER_LEVEL = 100;

export const PRIORITY_COLORS = {
  low: { bg: "#DEF7EC", text: "#03543F", border: "#9AE6B4" },
  medium: { bg: "#FEF3C7", text: "#92400E", border: "#FDE68A" },
  high: { bg: "#FEE2E2", text: "#991B1B", border: "#FCA5A5" },
};

// Trophy SVG icon
export const TrophySVG = `
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
  <path d="M4 22h16"></path>
  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
</svg>
`;

export const ZapSVG = `
<svg width="20" height="20" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" stroke-width="2">
  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
</svg>
`;
