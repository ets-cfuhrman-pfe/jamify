"use strict";
(() => {
  // widget-src/code.tsx
  var { widget } = figma;
  var { AutoLayout, Text, SVG, useSyncedState, useEffect, Input } = widget;
  var COLUMNS = [
    { status: "todo", title: "To Do", color: "#4B5563" },
    { status: "in-progress", title: "In Progress", color: "#2563EB" },
    { status: "done", title: "Done", color: "#16A34A" }
  ];
  var XP_REWARDS = { ADD_ISSUE: 10, MOVE_ISSUE: 5, COMPLETE_ISSUE: 20 };
  var XP_PER_LEVEL = 100;
  function CharacterProfile({ level, xp, xpToNextLevel }) {
    const pct = Math.max(0, Math.min(1, xp / xpToNextLevel));
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout,
      {
        direction: "vertical",
        spacing: 12,
        padding: 24,
        fill: "#F5F3FF",
        stroke: "#C4B5FD",
        strokeWidth: 2,
        cornerRadius: 8,
        width: "fill-parent"
      },
      /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "horizontal", spacing: 12, width: "fill-parent", verticalAlignItems: "center" }, /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          width: 64,
          height: 64,
          cornerRadius: 32,
          fill: "#8B5CF6",
          horizontalAlignItems: "center",
          verticalAlignItems: "center"
        },
        /* @__PURE__ */ figma.widget.h(SVG, { src: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
            <path d="M4 22h16"/>
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
          </svg>` })
      ), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 4 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 18, fontWeight: 600 }, "Student Hero"), /* @__PURE__ */ figma.widget.h(AutoLayout, { padding: { vertical: 4, horizontal: 8 }, fill: "#E5E7EB", cornerRadius: 4 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12 }, "Level ", level))), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 2, horizontalAlignItems: "end", width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 24, fontWeight: 700, fill: "#EAB308" }, xp), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12, fill: "#6B7280" }, "XP"))),
      /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 8, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "horizontal", width: "fill-parent", horizontalAlignItems: "space-between" }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12, fill: "#6B7280" }, "Progress to Level ", level + 1), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12, fill: "#6B7280" }, xp, " / ", xpToNextLevel, " XP")), /* @__PURE__ */ figma.widget.h(AutoLayout, { width: "fill-parent", height: 12, fill: "#E5E7EB", cornerRadius: 6 }, /* @__PURE__ */ figma.widget.h(AutoLayout, { width: pct, height: 12, fill: "#8B5CF6", cornerRadius: 6 })))
    );
  }
  function IssueCard({ issue, onMove }) {
    const palette = {
      low: { bg: "#D1FAE5", text: "#065F46", border: "#6EE7B7" },
      medium: { bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" },
      high: { bg: "#FEE2E2", text: "#991B1B", border: "#FCA5A5" }
    };
    const c = palette[issue.priority];
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout,
      {
        direction: "vertical",
        spacing: 12,
        padding: 16,
        fill: "#FFFFFF",
        stroke: "#E5E7EB",
        strokeWidth: 1,
        cornerRadius: 8,
        width: 280,
        onClick: () => {
          figma.notify('Click "Move" buttons to change status (coming soon!)');
        }
      },
      /* @__PURE__ */ figma.widget.h(Text, { fontSize: 16, fontWeight: 600 }, issue.title),
      issue.description && /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14, fill: "#6B7280" }, issue.description),
      /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "horizontal", spacing: 8, width: "fill-parent", verticalAlignItems: "center" }, /* @__PURE__ */ figma.widget.h(AutoLayout, { padding: { vertical: 4, horizontal: 8 }, fill: c.bg, stroke: c.border, strokeWidth: 1, cornerRadius: 4 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12, fill: c.text }, issue.priority)), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12, fill: "#9CA3AF" }, new Date(issue.createdAt).toLocaleDateString()))
    );
  }
  function KanbanColumn(props) {
    const { title, status, color, issues, onAddIssue, onMoveIssue } = props;
    return /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", width: 300, spacing: 0 }, /* @__PURE__ */ figma.widget.h(
      AutoLayout,
      {
        direction: "horizontal",
        padding: 16,
        fill: color,
        cornerRadius: { topLeft: 8, topRight: 8, bottomLeft: 0, bottomRight: 0 },
        width: "fill-parent",
        horizontalAlignItems: "space-between",
        verticalAlignItems: "center"
      },
      /* @__PURE__ */ figma.widget.h(Text, { fontSize: 16, fontWeight: 600, fill: "#FFFFFF" }, title),
      /* @__PURE__ */ figma.widget.h(AutoLayout, { padding: { vertical: 4, horizontal: 8 }, fill: "#FFFFFF33", cornerRadius: 4 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12, fill: "#FFFFFF" }, issues.length))
    ), /* @__PURE__ */ figma.widget.h(
      AutoLayout,
      {
        direction: "vertical",
        spacing: 12,
        padding: 16,
        fill: "#F9FAFB",
        stroke: "#E5E7EB",
        strokeWidth: 2,
        cornerRadius: { topLeft: 0, topRight: 0, bottomLeft: 8, bottomRight: 8 },
        width: "fill-parent",
        minHeight: 400
      },
      issues.length === 0 ? /* @__PURE__ */ figma.widget.h(AutoLayout, { width: "fill-parent", padding: 32, horizontalAlignItems: "center" }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14, fill: "#9CA3AF" }, "Drop issues here (click a card to move)")) : issues.map((issue) => /* @__PURE__ */ figma.widget.h(
        IssueCard,
        {
          key: issue.id,
          issue,
          onMove: (newStatus) => onMoveIssue(issue.id, newStatus)
        }
      )),
      /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          padding: 12,
          fill: "#E5E7EB",
          cornerRadius: 8,
          width: "fill-parent",
          horizontalAlignItems: "center",
          onClick: () => onAddIssue(status)
        },
        /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14, fill: "#374151" }, "+ Add Issue")
      )
    ));
  }
  function KanbanWidget() {
    const [issues, setIssues] = useSyncedState("issues", [
      {
        id: "1",
        title: "Setup project repository",
        description: "Initialize the project with all necessary dependencies",
        status: "done",
        priority: "high",
        createdAt: "2025-10-19"
      },
      {
        id: "2",
        title: "Design database schema",
        description: "Create the initial database design for the application",
        status: "in-progress",
        priority: "high",
        createdAt: "2025-10-20"
      },
      {
        id: "3",
        title: "Implement user authentication",
        description: "Add login and registration functionality",
        status: "todo",
        priority: "medium",
        createdAt: "2025-10-21"
      },
      {
        id: "4",
        title: "Write unit tests",
        description: "Add test coverage for core components",
        status: "todo",
        priority: "low",
        createdAt: "2025-10-21"
      }
    ]);
    const [xp, setXp] = useSyncedState("xp", 45);
    const [level, setLevel] = useSyncedState("level", 1);
    const xpToNextLevel = Math.max(1, level * XP_PER_LEVEL);
    useEffect(() => {
      let curXp = xp, curLvl = level, leveled = false;
      while (curXp >= curLvl * XP_PER_LEVEL) {
        curXp -= curLvl * XP_PER_LEVEL;
        curLvl += 1;
        leveled = true;
      }
      if (leveled) {
        setLevel(curLvl);
        setXp(curXp);
        figma.notify(`\u{1F389} Level Up! You're now Level ${curLvl}!`);
      }
    });
    const addXP = (amount, reason) => {
      setXp((prev) => prev + amount);
      figma.notify(`+${amount} XP \u2014 ${reason}`);
    };
    const createIssueViaModal = (presetStatus) => {
      const newIssue = {
        id: String(Date.now()),
        title: "New Task",
        description: "Click to edit description",
        priority: "medium",
        status: presetStatus,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      setIssues((prev) => prev.concat([newIssue]));
      addXP(XP_REWARDS.ADD_ISSUE, "Issue created");
      figma.notify("Task created! (Edit functionality coming soon)");
    };
    const moveIssue = (id, newStatus) => {
      setIssues((prev) => prev.map((i) => {
        if (i.id === id) {
          return Object.assign({}, i, { status: newStatus });
        }
        return i;
      }));
      addXP(
        newStatus === "done" ? XP_REWARDS.COMPLETE_ISSUE : XP_REWARDS.MOVE_ISSUE,
        newStatus === "done" ? "Issue completed" : "Issue moved"
      );
    };
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout,
      {
        direction: "vertical",
        spacing: 24,
        padding: 24,
        fill: "#F8FAFC",
        cornerRadius: 8,
        stroke: "#E2E8F0",
        strokeWidth: 1
      },
      /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 8, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 32, fontWeight: 700 }, "Student Kanban Board"), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14, fill: "#64748B" }, "Complete tasks and level up your character!")),
      /* @__PURE__ */ figma.widget.h(CharacterProfile, { level, xp, xpToNextLevel }),
      /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "horizontal", spacing: 16 }, COLUMNS.map((col) => /* @__PURE__ */ figma.widget.h(
        KanbanColumn,
        {
          key: col.status,
          title: col.title,
          status: col.status,
          color: col.color,
          issues: issues.filter((i) => i.status === col.status),
          onAddIssue: createIssueViaModal,
          onMoveIssue: moveIssue
        }
      ))),
      /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          direction: "vertical",
          spacing: 8,
          padding: 16,
          fill: "#FFFFFF",
          stroke: "#E5E7EB",
          strokeWidth: 1,
          cornerRadius: 8,
          width: "fill-parent"
        },
        /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14, fontWeight: 600 }, "XP Rewards"),
        /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "horizontal", spacing: 16 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12, fill: "#6B7280" }, "Add Issue: +", XP_REWARDS.ADD_ISSUE, " XP"), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12, fill: "#6B7280" }, "Move Issue: +", XP_REWARDS.MOVE_ISSUE, " XP"), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12, fill: "#6B7280" }, "Complete: +", XP_REWARDS.COMPLETE_ISSUE, " XP"))
      )
    );
  }
  widget.register(KanbanWidget);
})();
