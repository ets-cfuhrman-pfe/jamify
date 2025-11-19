"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  // widget-src/profile-constants.ts
  var CDN_BASE = "https://cdn.jsdelivr.net/gh/ets-cfuhrman-pfe/jamify@gh-pages/img";
  var CLASSES = ["R\xF4deur", "Mage", "Barde", "Alchimiste"];
  var CLASS_TITLES = {
    "R\xF4deur": [
      "Apprenti du Sablier",
      "Ma\xEEtre des Horloges",
      "Strat\xE8ge du Temps"
    ],
    "Mage": [
      "\xC9veilleur des Murmures",
      "Gardien des Voix",
      "Chanteur des \xC2mes Unies"
    ],
    "Barde": [
      "Copiste des Premiers Parchemins",
      "Chroniqueur du Savoir",
      "Scribe du Royaume"
    ],
    "Alchimiste": [
      "Distillateur d'Exp\xE9riences",
      "Sage des M\xE9tamorphoses",
      "Alchimiste du Progr\xE8s"
    ]
  };
  var CLASS_LEVEL_IMAGE_MAP = {
    "R\xF4deur": {
      1: `${CDN_BASE}/Ranger_1.png`,
      2: `${CDN_BASE}/Ranger_2.png`,
      3: `${CDN_BASE}/Ranger_3.png`
    },
    "Mage": {
      1: `${CDN_BASE}/Mage_1.png`,
      2: `${CDN_BASE}/Mage_2.png`,
      3: `${CDN_BASE}/Mage_3.png`
    },
    "Barde": {
      1: `${CDN_BASE}/Bard_1.png`,
      2: `${CDN_BASE}/Bard_2.png`,
      3: `${CDN_BASE}/Bard_3.png`
    },
    "Alchimiste": {
      1: `${CDN_BASE}/Alchemist_1.png`,
      2: `${CDN_BASE}/Alchemist_2.png`,
      3: `${CDN_BASE}/Alchemist_3.png`
    }
  };
  function getProfileImage(selectedClass, level) {
    const images = CLASS_LEVEL_IMAGE_MAP[selectedClass];
    if (!images) return `${CDN_BASE}/Ranger_1.png`;
    if (level >= 3) return images[3];
    if (level === 2) return images[2];
    return images[1];
  }
  function getTitleFor(selectedClass, level) {
    const titlesArr = CLASS_TITLES[selectedClass];
    if (!titlesArr) return "Aventurier";
    const idx = level >= 3 ? 2 : level === 2 ? 1 : 0;
    return titlesArr[idx];
  }

  // widget-src/code.tsx
  var { widget } = figma;
  var { useSyncedState, AutoLayout, Text, Input, Image } = widget;
  function StudentProfile({ studentId = 0 }) {
    const [name, setName] = useSyncedState(
      `student_${studentId}_name`,
      `\xC9tudiant ${studentId + 1}`
    );
    const [selectedClass, setSelectedClass] = useSyncedState(
      `student_${studentId}_class`,
      "R\xF4deur"
    );
    const [xp] = useSyncedState(`student_${studentId}_xp`, 0);
    const [level] = useSyncedState(`student_${studentId}_level`, 1);
    const [uiState, setUiState] = useSyncedState(
      `student_${studentId}_ui`,
      {
        showAvatarSelector: false,
        showClassDropdown: false,
        isEditing: true
      }
    );
    const classes = CLASSES;
    const xpToNextLevel = level * 100;
    const firstRow = classes.slice(0, 3);
    const secondRow = classes.slice(3);
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout,
      {
        name: "Profile Widget",
        direction: "vertical",
        verticalAlignItems: "center",
        spacing: 12,
        padding: 16,
        cornerRadius: 12,
        fill: "#FFFFFF",
        stroke: "#E6E6E6",
        width: 280
      },
      uiState.isEditing ? /* @__PURE__ */ figma.widget.h(figma.widget.Fragment, null, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 18, fontWeight: "bold" }, "Profil de l'\xE9tudiant"), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 8 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14 }, "Avatar :"), !uiState.showAvatarSelector ? /* @__PURE__ */ figma.widget.h(AutoLayout, { padding: 4, cornerRadius: 8, fill: "#FFFFFF", stroke: "#CCCCCC", onClick: () => setUiState(__spreadProps(__spreadValues({}, uiState), { showAvatarSelector: true })) }, /* @__PURE__ */ figma.widget.h(Image, { src: getProfileImage(selectedClass, level), width: 64, height: 64, cornerRadius: 8 })) : /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 8, padding: 8, cornerRadius: 12, fill: "#F9F9F9", stroke: "#DDDDDD" }, /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 8 }, /* @__PURE__ */ figma.widget.h(AutoLayout, { spacing: 8 }, firstRow.map((c) => /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          key: c,
          padding: 4,
          cornerRadius: 8,
          fill: c === selectedClass ? "#CCE5FF" : "#FFFFFF",
          stroke: "#CCCCCC",
          onClick: () => {
            setSelectedClass(c);
            setUiState(__spreadProps(__spreadValues({}, uiState), { showAvatarSelector: false }));
          }
        },
        /* @__PURE__ */ figma.widget.h(Image, { src: getProfileImage(c, level), width: 64, height: 64, cornerRadius: 8 })
      ))), secondRow.length > 0 && /* @__PURE__ */ figma.widget.h(AutoLayout, { spacing: 8 }, secondRow.map((c) => /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          key: c,
          padding: 4,
          cornerRadius: 8,
          fill: c === selectedClass ? "#CCE5FF" : "#FFFFFF",
          stroke: "#CCCCCC",
          onClick: () => {
            setSelectedClass(c);
            setUiState(__spreadProps(__spreadValues({}, uiState), { showAvatarSelector: false }));
          }
        },
        /* @__PURE__ */ figma.widget.h(Image, { src: getProfileImage(c, level), width: 64, height: 64, cornerRadius: 8 })
      )))), /* @__PURE__ */ figma.widget.h(AutoLayout, { padding: { vertical: 4, horizontal: 8 }, cornerRadius: 6, fill: "#E0E0E0", onClick: () => setUiState(__spreadProps(__spreadValues({}, uiState), { showAvatarSelector: false })) }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12 }, "Fermer"))), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 11, fill: "#6B7280" }, "L'avatar est automatiquement choisi selon la classe.")), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 4 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14 }, "Nom :"), /* @__PURE__ */ figma.widget.h(AutoLayout, { padding: { vertical: 6, horizontal: 8 }, cornerRadius: 6, fill: "#F5F5F5", stroke: "#CCCCCC" }, /* @__PURE__ */ figma.widget.h(Input, { value: name, placeholder: "Entrez votre nom", fontSize: 14, onTextEditEnd: (e) => setName(e.characters) }))), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 4 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14 }, "Classe :"), /* @__PURE__ */ figma.widget.h(AutoLayout, { padding: { vertical: 6, horizontal: 10 }, fill: "#F5F5F5", stroke: "#CCCCCC", cornerRadius: 8, spacing: 4, onClick: () => setUiState(__spreadProps(__spreadValues({}, uiState), { showClassDropdown: !uiState.showClassDropdown })) }, /* @__PURE__ */ figma.widget.h(Text, null, selectedClass), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 10 }, uiState.showClassDropdown ? "\u25B2" : "\u25BC")), uiState.showClassDropdown && /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", fill: "#FFFFFF", stroke: "#DDDDDD", cornerRadius: 8, padding: 6, spacing: 4, width: 120 }, classes.map((c) => /* @__PURE__ */ figma.widget.h(AutoLayout, { key: c, padding: { vertical: 4, horizontal: 8 }, cornerRadius: 6, fill: selectedClass === c ? "#CCE5FF" : "#FFFFFF", onClick: () => {
        setSelectedClass(c);
        setUiState(__spreadProps(__spreadValues({}, uiState), { showClassDropdown: false }));
      } }, /* @__PURE__ */ figma.widget.h(Text, null, c))))), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 4, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14 }, "Titre :"), /* @__PURE__ */ figma.widget.h(AutoLayout, { padding: { vertical: 6, horizontal: 10 }, fill: "#F5F5F5", stroke: "#CCCCCC", cornerRadius: 8, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text, { width: "fill-parent" }, getTitleFor(selectedClass, level)))), /* @__PURE__ */ figma.widget.h(AutoLayout, { padding: { vertical: 8, horizontal: 50 }, fill: "#CCE5FF", cornerRadius: 8, horizontalAlignItems: "center", onClick: () => setUiState(__spreadProps(__spreadValues({}, uiState), { isEditing: false })) }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14, fontWeight: "bold" }, "Sauvegarder le profil"))) : /* @__PURE__ */ figma.widget.h(figma.widget.Fragment, null, /* @__PURE__ */ figma.widget.h(AutoLayout, { spacing: 8, verticalAlignItems: "center", width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Image, { src: getProfileImage(selectedClass, level), width: 40, height: 40, cornerRadius: 8 }), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 16, fontWeight: "bold" }, name), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12 }, selectedClass), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12, width: "fill-parent" }, getTitleFor(selectedClass, level)))), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 4, width: "fill-parent", horizontalAlignItems: "center" }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14, fontWeight: "bold" }, "Level ", level), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12, fill: "#666666" }, xp, " / ", xpToNextLevel, " XP")), /* @__PURE__ */ figma.widget.h(AutoLayout, { padding: { vertical: 8, horizontal: 24 }, cornerRadius: 8, fill: "#F5F5F5", onClick: () => setUiState(__spreadProps(__spreadValues({}, uiState), { isEditing: true })) }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 13 }, "Modifier")))
    );
  }

  // widget-src/teacher.tsx
  var { widget: widget2 } = figma;
  var { useSyncedState: useSyncedState2, AutoLayout: AutoLayout2, Text: Text2, Input: Input2 } = widget2;
  function TeacherProfile() {
    const [teacherClaimed, setTeacherClaimed] = useSyncedState2(
      "teacherClaimed",
      false
    );
    const [canEdit, setCanEdit] = useSyncedState2(
      "teacherCanEdit",
      false
    );
    const [numberOfStudents, setNumberOfStudents] = useSyncedState2(
      "teacherNumStudents",
      ""
    );
    const [rules, setRules] = useSyncedState2("teacherRules", "");
    const [context, setContext] = useSyncedState2("teacherContext", "");
    const [isEditing, setIsEditing] = useSyncedState2("teacherIsEditing", true);
    const claimTeacherRole = () => {
      if (!teacherClaimed) {
        setTeacherClaimed(true);
        setCanEdit(true);
      }
    };
    const isCreator = canEdit;
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout2,
      {
        name: "Teacher Profile Widget",
        direction: "vertical",
        verticalAlignItems: "center",
        spacing: 12,
        padding: 16,
        cornerRadius: 12,
        fill: "#FFFFFF",
        stroke: "#E6E6E6",
        width: 320
      },
      isEditing ? (
        // EDIT MODE (only for creator)
        /* @__PURE__ */ figma.widget.h(figma.widget.Fragment, null, /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 18, fontWeight: "bold" }, "Formulaire enseignant"), !teacherClaimed && /* @__PURE__ */ figma.widget.h(
          AutoLayout2,
          {
            padding: 8,
            cornerRadius: 8,
            fill: "#E5F5FF",
            stroke: "#99CCFF",
            width: "fill-parent",
            direction: "vertical",
            spacing: 8
          },
          /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 12, fill: "#0066CC" }, "\u{1F44B} Cliquez ci-dessous pour devenir l'enseignant"),
          /* @__PURE__ */ figma.widget.h(
            AutoLayout2,
            {
              padding: { vertical: 6, horizontal: 12 },
              cornerRadius: 6,
              fill: "#0066CC",
              onClick: claimTeacherRole
            },
            /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 12, fill: "#FFFFFF", fontWeight: "bold" }, "Je suis l'enseignant")
          )
        ), teacherClaimed && !isCreator && /* @__PURE__ */ figma.widget.h(
          AutoLayout2,
          {
            padding: 8,
            cornerRadius: 8,
            fill: "#FFE5E5",
            stroke: "#FF9999",
            width: "fill-parent"
          },
          /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 12, fill: "#CC0000" }, "\u26A0\uFE0F Seul l'enseignant peut modifier ce formulaire")
        ), /* @__PURE__ */ figma.widget.h(AutoLayout2, { direction: "vertical", spacing: 4, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 14, fontWeight: "bold" }, "Nombre d'\xE9tudiants :"), /* @__PURE__ */ figma.widget.h(
          AutoLayout2,
          {
            padding: { vertical: 6, horizontal: 8 },
            cornerRadius: 6,
            fill: isCreator ? "#F5F5F5" : "#E0E0E0",
            stroke: "#CCCCCC",
            width: "fill-parent"
          },
          /* @__PURE__ */ figma.widget.h(
            Input2,
            {
              value: numberOfStudents,
              placeholder: "Ex: 30",
              fontSize: 14,
              width: "fill-parent",
              inputFrameProps: { opacity: isCreator ? 1 : 0.5 },
              onTextEditEnd: (e) => {
                if (isCreator) {
                  setNumberOfStudents(e.characters);
                }
              }
            }
          )
        )), /* @__PURE__ */ figma.widget.h(AutoLayout2, { direction: "vertical", spacing: 4, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 14, fontWeight: "bold" }, "Contexte du projet :"), /* @__PURE__ */ figma.widget.h(
          AutoLayout2,
          {
            padding: { vertical: 6, horizontal: 8 },
            cornerRadius: 6,
            fill: isCreator ? "#F5F5F5" : "#E0E0E0",
            stroke: "#CCCCCC",
            width: "fill-parent"
          },
          /* @__PURE__ */ figma.widget.h(
            Input2,
            {
              value: context,
              placeholder: "D\xE9crivez le contexte...",
              fontSize: 14,
              width: "fill-parent",
              inputFrameProps: { opacity: isCreator ? 1 : 0.5 },
              onTextEditEnd: (e) => {
                if (isCreator) {
                  setContext(e.characters);
                }
              }
            }
          )
        )), /* @__PURE__ */ figma.widget.h(AutoLayout2, { direction: "vertical", spacing: 4, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 14, fontWeight: "bold" }, "R\xE8gles :"), /* @__PURE__ */ figma.widget.h(
          AutoLayout2,
          {
            padding: { vertical: 6, horizontal: 8 },
            cornerRadius: 6,
            fill: isCreator ? "#F5F5F5" : "#E0E0E0",
            stroke: "#CCCCCC",
            width: "fill-parent"
          },
          /* @__PURE__ */ figma.widget.h(
            Input2,
            {
              value: rules,
              placeholder: "Listez les r\xE8gles...",
              fontSize: 14,
              width: "fill-parent",
              inputFrameProps: { opacity: isCreator ? 1 : 0.5 },
              onTextEditEnd: (e) => {
                if (isCreator) {
                  setRules(e.characters);
                }
              }
            }
          )
        )), isCreator && /* @__PURE__ */ figma.widget.h(
          AutoLayout2,
          {
            padding: { vertical: 8, horizontal: 50 },
            fill: "#CCE5FF",
            cornerRadius: 8,
            horizontalAlignItems: "center",
            onClick: () => setIsEditing(false)
          },
          /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 14, fontWeight: "bold" }, "Sauvegarder le formulaire")
        ))
      ) : (
        // VIEW MODE (everyone can see)
        /* @__PURE__ */ figma.widget.h(figma.widget.Fragment, null, /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 18, fontWeight: "bold" }, "Informations du projet"), /* @__PURE__ */ figma.widget.h(AutoLayout2, { direction: "vertical", spacing: 12, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(AutoLayout2, { direction: "vertical", spacing: 4 }, /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 13, fontWeight: "bold" }, "Nombre d'\xE9tudiants :"), /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 14 }, numberOfStudents || "\u2014")), /* @__PURE__ */ figma.widget.h(AutoLayout2, { direction: "vertical", spacing: 4 }, /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 13, fontWeight: "bold" }, "Contexte :"), /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 14 }, context || "\u2014")), /* @__PURE__ */ figma.widget.h(AutoLayout2, { direction: "vertical", spacing: 4 }, /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 13, fontWeight: "bold" }, "R\xE8gles :"), /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 14 }, rules || "\u2014"))), isCreator && /* @__PURE__ */ figma.widget.h(AutoLayout2, { direction: "vertical", spacing: 8, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(
          AutoLayout2,
          {
            padding: { vertical: 8, horizontal: 24 },
            cornerRadius: 8,
            fill: "#28A745",
            horizontalAlignItems: "center",
            width: "fill-parent",
            onClick: () => {
              return new Promise((resolve) => {
                const csvContent = "Nom,Classe,Titre,Nombre_Etudiants,Contexte,Regles\n";
                const csvData = `"Donn\xE9es","du","projet","${numberOfStudents}","${context}","${rules}"
`;
                const fullCsv = csvContent + csvData;
                figma.showUI(
                  `
                      <!DOCTYPE html>
                      <html>
                        <body>
                          <script>
                            const csvData = ${JSON.stringify(fullCsv)};
                            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = 'donnees_projet.csv';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            URL.revokeObjectURL(url);
                            
                            setTimeout(() => {
                              parent.postMessage({ pluginMessage: { type: 'download-complete' } }, '*');
                            }, 500);
                          <\/script>
                        </body>
                      </html>
                    `,
                  { visible: false, width: 1, height: 1 }
                );
                figma.ui.onmessage = (msg) => {
                  if (msg.type === "download-complete") {
                    figma.closePlugin();
                    resolve();
                  }
                };
                figma.notify("\u{1F4CA} T\xE9l\xE9chargement du fichier en cours...");
              });
            }
          },
          /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 13, fill: "#FFFFFF", fontWeight: "bold" }, "\u{1F4CA} T\xE9l\xE9charger donn\xE9es Excel")
        ), /* @__PURE__ */ figma.widget.h(
          AutoLayout2,
          {
            padding: { vertical: 8, horizontal: 24 },
            cornerRadius: 8,
            fill: "#F5F5F5",
            horizontalAlignItems: "center",
            width: "fill-parent",
            onClick: () => setIsEditing(true)
          },
          /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 13 }, "Modifier")
        )), !isCreator && /* @__PURE__ */ figma.widget.h(Text2, { fontSize: 11, fill: "#666" }, "Cr\xE9\xE9 par l'enseignant"))
      )
    );
  }

  // widget-src/kanban board/constants.ts
  var COLUMNS = [
    { status: "todo", title: "\xC0 faire", color: "#4B5563" },
    { status: "in-progress", title: "En cours", color: "#2563EB" },
    { status: "done", title: "Termin\xE9", color: "#16A34A" }
  ];
  var XP_REWARDS = {
    ADD_ISSUE: 10,
    MOVE_ISSUE: 5,
    COMPLETE_ISSUE: 20
  };
  var XP_PER_LEVEL = 100;
  var PRIORITY_COLORS = {
    low: { bg: "#DEF7EC", text: "#03543F", border: "#9AE6B4" },
    medium: { bg: "#FEF3C7", text: "#92400E", border: "#FDE68A" },
    high: { bg: "#FEE2E2", text: "#991B1B", border: "#FCA5A5" }
  };

  // widget-src/kanban board/IssueCard.tsx
  var { widget: widget3 } = figma;
  var { AutoLayout: AutoLayout3, Text: Text3, useSyncedState: useSyncedState3 } = widget3;
  function IssueCard({
    issue,
    onMove,
    studentNames = []
  }) {
    const priorityColor = PRIORITY_COLORS[issue.priority];
    const getPriorityLabel = (p) => p === "low" ? "bas" : p === "medium" ? "moyen" : "\xE9lev\xE9";
    const getAssignedName = () => {
      if (issue.assignedToId === void 0) return "Non assign\xE9";
      return studentNames[issue.assignedToId] || "\xC9tudiant";
    };
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout3,
      {
        direction: "vertical",
        spacing: 12,
        padding: 16,
        fill: "#FFFFFF",
        cornerRadius: 8,
        stroke: { type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } },
        width: "fill-parent",
        strokeWidth: 1,
        onClick: () => {
          const statusOrder = ["todo", "in-progress", "done"];
          const currentIndex = statusOrder.indexOf(issue.status);
          const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
          onMove(issue.id, nextStatus);
        }
      },
      /* @__PURE__ */ figma.widget.h(Text3, { fontSize: 14, fontWeight: 600, fill: "#111827", width: "fill-parent" }, issue.title),
      issue.description.trim().length > 0 ? /* @__PURE__ */ figma.widget.h(Text3, { fontSize: 12, fill: "#6B7280", width: "fill-parent" }, issue.description) : null,
      /* @__PURE__ */ figma.widget.h(AutoLayout3, { direction: "horizontal", spacing: 8, width: "fill-parent", verticalAlignItems: "center" }, /* @__PURE__ */ figma.widget.h(
        AutoLayout3,
        {
          padding: { vertical: 4, horizontal: 8 },
          fill: "#F0F9FF",
          cornerRadius: 4,
          stroke: { type: "solid", color: { r: 0.7, g: 0.85, b: 1, a: 1 } },
          strokeWidth: 1
        },
        /* @__PURE__ */ figma.widget.h(Text3, { fontSize: 11, fill: "#0369A1" }, getAssignedName())
      )),
      /* @__PURE__ */ figma.widget.h(AutoLayout3, { direction: "horizontal", spacing: 8, width: "fill-parent", verticalAlignItems: "center" }, /* @__PURE__ */ figma.widget.h(
        AutoLayout3,
        {
          padding: { vertical: 2, horizontal: 8 },
          fill: priorityColor.bg,
          cornerRadius: 4,
          stroke: priorityColor.border,
          strokeWidth: 1
        },
        /* @__PURE__ */ figma.widget.h(Text3, { fontSize: 11, fill: priorityColor.text }, getPriorityLabel(issue.priority))
      ), /* @__PURE__ */ figma.widget.h(AutoLayout3, { width: "fill-parent" }), /* @__PURE__ */ figma.widget.h(Text3, { fontSize: 10, fill: "#9CA3AF" }, new Date(issue.createdAt).toLocaleDateString()))
    );
  }

  // widget-src/kanban board/AddIssueDialog.tsx
  var { widget: widget4 } = figma;
  var { useSyncedState: useSyncedState4, AutoLayout: AutoLayout4, Text: Text4, Input: Input3 } = widget4;
  function AddIssueDialog({
    status,
    onAdd,
    onCancel,
    studentNames = []
  }) {
    const [title, setTitle] = useSyncedState4(`newIssueTitle_${status}`, "");
    const [description, setDescription] = useSyncedState4(`newIssueDesc_${status}`, "");
    const [priority, setPriority] = useSyncedState4(`newIssuePriority_${status}`, "medium");
    const [showPriorityDropdown, setShowPriorityDropdown] = useSyncedState4(`showPriorityDropdown_${status}`, false);
    const [assignedToId, setAssignedToId] = useSyncedState4(`newIssueAssignedTo_${status}`, null);
    const [showStudentDropdown, setShowStudentDropdown] = useSyncedState4(`showStudentDropdown_${status}`, false);
    const priorities = ["low", "medium", "high"];
    const getPriorityLabel = (p) => p === "low" ? "bas" : p === "medium" ? "moyen" : "\xE9lev\xE9";
    const getAssignedName = () => {
      if (assignedToId == null) return "Non assign\xE9";
      return studentNames[assignedToId] || "\xC9tudiant";
    };
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout4,
      {
        direction: "vertical",
        spacing: 12,
        padding: 16,
        fill: "#FFFFFF",
        cornerRadius: 8,
        stroke: { type: "solid", color: { r: 0.37, g: 0.51, b: 0.82, a: 1 } },
        strokeWidth: 2,
        width: "fill-parent"
      },
      /* @__PURE__ */ figma.widget.h(Text4, { fontSize: 14, fontWeight: 600, fill: "#374151" }, "Nouveau T\xE2che"),
      /* @__PURE__ */ figma.widget.h(AutoLayout4, { direction: "vertical", spacing: 4, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text4, { fontSize: 12, fill: "#6B7280" }, "Titre :"), /* @__PURE__ */ figma.widget.h(
        AutoLayout4,
        {
          padding: 8,
          fill: { type: "solid", color: { r: 0.98, g: 0.98, b: 0.98, a: 1 } },
          cornerRadius: 4,
          stroke: { type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } },
          width: "fill-parent"
        },
        /* @__PURE__ */ figma.widget.h(
          Input3,
          {
            value: title,
            placeholder: "Entrer le titre de la t\xE2che",
            onTextEditEnd: (e) => setTitle(e.characters),
            fontSize: 12,
            width: "fill-parent"
          }
        )
      )),
      /* @__PURE__ */ figma.widget.h(AutoLayout4, { direction: "vertical", spacing: 4, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text4, { fontSize: 12, fill: "#6B7280" }, "Description:"), /* @__PURE__ */ figma.widget.h(
        AutoLayout4,
        {
          padding: 8,
          fill: { type: "solid", color: { r: 0.98, g: 0.98, b: 0.98, a: 1 } },
          cornerRadius: 4,
          stroke: { type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } },
          width: "fill-parent"
        },
        /* @__PURE__ */ figma.widget.h(
          Input3,
          {
            value: description,
            placeholder: "Entrer la description",
            onTextEditEnd: (e) => setDescription(e.characters),
            fontSize: 12,
            width: "fill-parent"
          }
        )
      )),
      /* @__PURE__ */ figma.widget.h(AutoLayout4, { direction: "vertical", spacing: 4, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text4, { fontSize: 12, fill: "#6B7280" }, "Priorit\xE9:"), /* @__PURE__ */ figma.widget.h(
        AutoLayout4,
        {
          padding: 8,
          fill: { type: "solid", color: { r: 0.98, g: 0.98, b: 0.98, a: 1 } },
          cornerRadius: 4,
          stroke: { type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } },
          spacing: 4,
          onClick: () => setShowPriorityDropdown(!showPriorityDropdown)
        },
        /* @__PURE__ */ figma.widget.h(Text4, { fontSize: 12 }, getPriorityLabel(priority)),
        /* @__PURE__ */ figma.widget.h(Text4, { fontSize: 10 }, showPriorityDropdown ? "\u25B2" : "\u25BC")
      ), showPriorityDropdown && /* @__PURE__ */ figma.widget.h(
        AutoLayout4,
        {
          direction: "vertical",
          spacing: 4,
          padding: 8,
          fill: "#FFFFFF",
          cornerRadius: 4,
          stroke: { type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } },
          width: "fill-parent"
        },
        priorities.map((p) => /* @__PURE__ */ figma.widget.h(
          AutoLayout4,
          {
            key: p,
            padding: 6,
            fill: priority === p ? { type: "solid", color: { r: 0.8, g: 0.9, b: 1, a: 1 } } : "#FFFFFF",
            cornerRadius: 4,
            onClick: () => {
              setPriority(p);
              setShowPriorityDropdown(false);
            },
            width: "fill-parent"
          },
          /* @__PURE__ */ figma.widget.h(Text4, { fontSize: 12 }, getPriorityLabel(p))
        ))
      )),
      /* @__PURE__ */ figma.widget.h(AutoLayout4, { direction: "vertical", spacing: 4, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text4, { fontSize: 12, fill: "#6B7280" }, "Attribuer \xE0 :"), /* @__PURE__ */ figma.widget.h(
        AutoLayout4,
        {
          padding: 8,
          fill: { type: "solid", color: { r: 0.98, g: 0.98, b: 0.98, a: 1 } },
          cornerRadius: 4,
          stroke: { type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } },
          spacing: 4,
          onClick: () => setShowStudentDropdown(!showStudentDropdown)
        },
        /* @__PURE__ */ figma.widget.h(Text4, { fontSize: 12 }, getAssignedName()),
        /* @__PURE__ */ figma.widget.h(Text4, { fontSize: 10 }, showStudentDropdown ? "\u25B2" : "\u25BC")
      ), showStudentDropdown && /* @__PURE__ */ figma.widget.h(
        AutoLayout4,
        {
          direction: "vertical",
          spacing: 4,
          padding: 8,
          fill: "#FFFFFF",
          cornerRadius: 4,
          stroke: { type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } },
          width: "fill-parent"
        },
        /* @__PURE__ */ figma.widget.h(
          AutoLayout4,
          {
            padding: 6,
            fill: assignedToId == null ? { type: "solid", color: { r: 0.8, g: 0.9, b: 1, a: 1 } } : "#FFFFFF",
            cornerRadius: 4,
            onClick: () => {
              setAssignedToId(null);
              setShowStudentDropdown(false);
            },
            width: "fill-parent"
          },
          /* @__PURE__ */ figma.widget.h(Text4, { fontSize: 12 }, "Non assign\xE9")
        ),
        studentNames.map((name, idx) => /* @__PURE__ */ figma.widget.h(
          AutoLayout4,
          {
            key: idx,
            padding: 6,
            fill: assignedToId === idx ? { type: "solid", color: { r: 0.8, g: 0.9, b: 1, a: 1 } } : "#FFFFFF",
            cornerRadius: 4,
            onClick: () => {
              setAssignedToId(idx);
              setShowStudentDropdown(false);
            },
            width: "fill-parent"
          },
          /* @__PURE__ */ figma.widget.h(Text4, { fontSize: 12 }, name)
        ))
      )),
      /* @__PURE__ */ figma.widget.h(AutoLayout4, { direction: "horizontal", spacing: 8, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(
        AutoLayout4,
        {
          padding: 10,
          fill: { type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } },
          cornerRadius: 6,
          onClick: onCancel,
          width: "fill-parent",
          horizontalAlignItems: "center"
        },
        /* @__PURE__ */ figma.widget.h(Text4, { fontSize: 12, fontWeight: 600, fill: "#374151" }, "Annuler")
      ), /* @__PURE__ */ figma.widget.h(
        AutoLayout4,
        {
          padding: 10,
          fill: { type: "solid", color: { r: 0.37, g: 0.51, b: 0.82, a: 1 } },
          cornerRadius: 6,
          onClick: () => {
            if (title.trim()) {
              onAdd(title, description, priority, assignedToId == null ? void 0 : assignedToId);
              setTitle("");
              setDescription("");
              setPriority("medium");
              setAssignedToId(null);
            } else {
              figma.notify("Please enter a title");
            }
          },
          width: "fill-parent",
          horizontalAlignItems: "center"
        },
        /* @__PURE__ */ figma.widget.h(Text4, { fontSize: 12, fontWeight: 600, fill: "#FFFFFF" }, "Ajouter une t\xE2che")
      ))
    );
  }

  // widget-src/kanban board/KanbanColumn.tsx
  var { widget: widget5 } = figma;
  var { AutoLayout: AutoLayout5, Text: Text5 } = widget5;
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255,
      a: 1
    } : { r: 0.5, g: 0.5, b: 0.5, a: 1 };
  }
  function KanbanColumn({
    column,
    issues,
    onMove,
    addingToColumn,
    setAddingToColumn,
    onAddIssue,
    studentNames = []
  }) {
    const columnIssues = issues.filter((issue) => issue.status === column.status);
    const columnColor = hexToRgb(column.color);
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout5,
      {
        direction: "vertical",
        spacing: 12,
        padding: 16,
        fill: "#F9FAFB",
        cornerRadius: 8,
        width: 500,
        stroke: { type: "solid", color: columnColor },
        strokeWidth: 2
      },
      /* @__PURE__ */ figma.widget.h(
        AutoLayout5,
        {
          direction: "horizontal",
          spacing: 8,
          width: "fill-parent",
          verticalAlignItems: "center"
        },
        /* @__PURE__ */ figma.widget.h(
          AutoLayout5,
          {
            width: 24,
            height: 24,
            cornerRadius: 12,
            fill: columnColor
          }
        ),
        /* @__PURE__ */ figma.widget.h(Text5, { fontSize: 18, fontWeight: 700, fill: "#111827", width: "fill-parent" }, column.title),
        /* @__PURE__ */ figma.widget.h(
          AutoLayout5,
          {
            padding: { horizontal: 12, vertical: 6 },
            fill: columnColor,
            cornerRadius: 12
          },
          /* @__PURE__ */ figma.widget.h(Text5, { fontSize: 14, fontWeight: 600, fill: "#FFFFFF" }, columnIssues.length)
        )
      ),
      /* @__PURE__ */ figma.widget.h(
        AutoLayout5,
        {
          direction: "vertical",
          spacing: 12,
          width: "fill-parent"
        },
        columnIssues.map((issue) => /* @__PURE__ */ figma.widget.h(
          IssueCard,
          {
            key: issue.id,
            issue,
            onMove: (issueId, newStatus) => {
              onMove(issueId);
            },
            studentNames
          }
        )),
        addingToColumn === column.status ? /* @__PURE__ */ figma.widget.h(
          AddIssueDialog,
          {
            status: column.status,
            onAdd: (title, description, priority, assignedToId) => {
              onAddIssue(column.status, title, description, priority, assignedToId);
              setAddingToColumn(null);
            },
            onCancel: () => setAddingToColumn(null),
            studentNames
          }
        ) : /* @__PURE__ */ figma.widget.h(
          AutoLayout5,
          {
            padding: 12,
            fill: "#053b50ff",
            cornerRadius: 8,
            onClick: () => setAddingToColumn(column.status),
            width: "fill-parent",
            horizontalAlignItems: "center",
            stroke: { type: "solid", color: { r: 0.8, g: 0.8, b: 0.8, a: 1 } },
            strokeWidth: 1
          },
          /* @__PURE__ */ figma.widget.h(Text5, { fontSize: 14, fill: "#ffffffff" }, "+ Ajouter une t\xE2che")
        )
      )
    );
  }

  // widget-src/kanban board/KanbanBoard.tsx
  var { widget: widget6 } = figma;
  var { useSyncedState: useSyncedState5, useEffect, AutoLayout: AutoLayout6, Text: Text6 } = widget6;
  function KanbanBoard() {
    const [issues, setIssues] = useSyncedState5("issues", [
      {
        id: "1",
        title: "Setup project repository",
        description: "Initialize the project with all necessary dependencies",
        status: "done",
        priority: "high",
        createdAt: (/* @__PURE__ */ new Date("2025-01-19")).toISOString()
      },
      {
        id: "2",
        title: "Design database schema",
        description: "Create the initial database design for the application",
        status: "in-progress",
        priority: "high",
        createdAt: (/* @__PURE__ */ new Date("2025-01-20")).toISOString()
      },
      {
        id: "3",
        title: "Implement user authentication",
        description: "Add login and registration functionality",
        status: "todo",
        priority: "medium",
        createdAt: (/* @__PURE__ */ new Date("2025-01-21")).toISOString()
      },
      {
        id: "4",
        title: "Write unit tests",
        description: "Add test coverage for core components",
        status: "todo",
        priority: "low",
        createdAt: (/* @__PURE__ */ new Date("2025-01-21")).toISOString()
      }
    ]);
    const [numberOfStudentsStr] = useSyncedState5("teacherNumStudents", "0");
    const numberOfStudents = parseInt(numberOfStudentsStr) || 0;
    const studentNames = [];
    const studentXP = [];
    const studentLevels = [];
    const setStudentXP = [];
    const setStudentLevels = [];
    for (let i = 0; i < numberOfStudents; i++) {
      const [studentName] = useSyncedState5(`student_${i}_name`, `\xC9tudiant ${i + 1}`);
      const [xp2, setXp2] = useSyncedState5(`student_${i}_xp`, 0);
      const [level2, setLevel2] = useSyncedState5(`student_${i}_level`, 1);
      studentNames.push(studentName);
      studentXP.push(xp2);
      studentLevels.push(level2);
      setStudentXP.push(setXp2);
      setStudentLevels.push(setLevel2);
    }
    const [xp, setXp] = useSyncedState5("xp", 45);
    const [level, setLevel] = useSyncedState5("level", 1);
    const [addingToColumn, setAddingToColumn] = useSyncedState5(
      "addingToColumn",
      null
    );
    const xpToNextLevel = level * XP_PER_LEVEL;
    useEffect(() => {
      if (xp >= xpToNextLevel) {
        setLevel(level + 1);
        setXp(xp - xpToNextLevel);
        figma.notify(`\uFFFD\uFFFD Level Up! You're now Level ${level + 1}!`);
      }
    });
    const addXP = (amount, reason) => {
      setXp(xp + amount);
      figma.notify(`+${amount} XP - ${reason}`);
    };
    const addStudentXP = (studentId, amount) => {
      if (studentId === void 0) return;
      const currentXP = studentXP[studentId];
      const currentLevel = studentLevels[studentId];
      const xpToNextLevel2 = currentLevel * XP_PER_LEVEL;
      const newXP = currentXP + amount;
      setStudentXP[studentId](newXP);
      if (newXP >= xpToNextLevel2) {
        setStudentLevels[studentId](currentLevel + 1);
        setStudentXP[studentId](newXP - xpToNextLevel2);
        try {
          figma.notify(`\u{1F389} ${studentNames[studentId]} leveled up to level ${currentLevel + 1}!`);
        } catch (_) {
        }
      }
    };
    const handleMove = (issueId) => {
      const issue = issues.find((i) => i.id === issueId);
      if (!issue) return;
      if (issue.status === "done") {
        try {
          figma.notify("Cette t\xE2che est d\xE9j\xE0 termin\xE9e.");
        } catch (_) {
        }
        return;
      }
      const statusOrder = ["todo", "in-progress", "done"];
      const currentIndex = statusOrder.indexOf(issue.status);
      const newStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
      if (issue.status === newStatus) return;
      const updatedIssues = issues.map(
        (i) => i.id === issueId ? Object.assign({}, i, { status: newStatus }) : i
      );
      setIssues(updatedIssues);
      if (newStatus === "done") {
        addXP(XP_REWARDS.COMPLETE_ISSUE, "Issue completed");
        addStudentXP(issue.assignedToId, XP_REWARDS.COMPLETE_ISSUE);
      } else {
        addXP(XP_REWARDS.MOVE_ISSUE, "Issue moved");
        addStudentXP(issue.assignedToId, XP_REWARDS.MOVE_ISSUE);
      }
    };
    const handleAddIssue = (status, title, description, priority, assignedToId) => {
      const newId = Math.random().toString();
      const newIssue = {
        id: newId,
        title,
        description,
        status,
        priority,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        assignedToId
      };
      setIssues(issues.concat([newIssue]));
      addXP(XP_REWARDS.ADD_ISSUE, "Issue created");
      addStudentXP(assignedToId, XP_REWARDS.ADD_ISSUE);
    };
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout6,
      {
        direction: "vertical",
        spacing: 32,
        padding: 32,
        fill: { type: "solid", color: { r: 0.97, g: 0.98, b: 0.99, a: 1 } },
        cornerRadius: 16,
        width: "hug-contents",
        height: "hug-contents"
      },
      /* @__PURE__ */ figma.widget.h(AutoLayout6, { direction: "vertical", spacing: 8, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text6, { fontSize: 32, fontWeight: 700, fill: "#111827" }, "Missions"), /* @__PURE__ */ figma.widget.h(Text6, { fontSize: 14, fill: "#6B7280" }, "Compl\xE9tez les qu\xEAtes et am\xE9liorez votre personnage!")),
      /* @__PURE__ */ figma.widget.h(AutoLayout6, { direction: "horizontal", spacing: 16 }, COLUMNS.map((column) => /* @__PURE__ */ figma.widget.h(
        KanbanColumn,
        {
          key: column.status,
          column,
          issues,
          onMove: handleMove,
          addingToColumn,
          setAddingToColumn,
          onAddIssue: handleAddIssue,
          studentNames
        }
      )))
    );
  }

  // widget-src/postit.tsx
  var { widget: widget7 } = figma;
  var { useSyncedState: useSyncedState6, AutoLayout: AutoLayout7, Text: Text7, Input: Input4 } = widget7;
  function PostItBoard() {
    const [postIts, setPostIts] = useSyncedState6("postIts", []);
    const [isCreating, setIsCreating] = useSyncedState6("isCreatingPostIt", false);
    const [newPostItContent, setNewPostItContent] = useSyncedState6(
      "newPostItContent",
      ""
    );
    const [editingPostItId, setEditingPostItId] = useSyncedState6("editingPostItId", null);
    const [editContents, setEditContents] = useSyncedState6("editContents", {});
    const [currentUserId, setCurrentUserId] = useSyncedState6(
      "currentUserId",
      ""
    );
    const [currentUserName, setCurrentUserName] = useSyncedState6(
      "currentUserName",
      "Anonyme"
    );
    const colors = [
      "#FFE5B4",
      "#FFB6C1",
      "#B4E5FF",
      "#C1FFB6",
      "#E5B4FF",
      "#FFD700"
    ];
    const addPostIt = () => {
      return new Promise((resolve) => {
        const user = figma.currentUser;
        const userId = (user == null ? void 0 : user.id) || "anonymous";
        const userName = (user == null ? void 0 : user.name) || "Anonyme";
        if (!currentUserId) {
          setCurrentUserId(userId);
          setCurrentUserName(userName);
        }
        if (newPostItContent.trim()) {
          const newPostIt = {
            id: `postit_${Date.now()}_${Math.random()}`,
            content: newPostItContent,
            authorId: userId,
            authorName: userName,
            color: colors[Math.floor(Math.random() * colors.length)],
            timestamp: Date.now()
          };
          setPostIts([...postIts, newPostIt]);
          setNewPostItContent("");
          setIsCreating(false);
        }
        resolve();
      });
    };
    const isCurrentUserAuthor = (authorId) => {
      const user = figma.currentUser;
      return (user == null ? void 0 : user.id) === authorId;
    };
    const deletePostIt = (id, authorId) => {
      return new Promise((resolve) => {
        if (isCurrentUserAuthor(authorId)) {
          setPostIts(postIts.filter((p) => p.id !== id));
          figma.notify("\u{1F5D1}\uFE0F Post-it supprim\xE9");
        } else {
          figma.notify("\u26A0\uFE0F Vous ne pouvez supprimer que vos propres post-its");
        }
        resolve();
      });
    };
    const editPostIt = (id, newContent) => {
      setPostIts(
        postIts.map((p) => p.id === id ? __spreadProps(__spreadValues({}, p), { content: newContent }) : p)
      );
    };
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout7,
      {
        direction: "vertical",
        spacing: 12,
        padding: 16,
        cornerRadius: 12,
        fill: "#FFFFFF",
        stroke: "#E6E6E6",
        width: 600
      },
      /* @__PURE__ */ figma.widget.h(
        AutoLayout7,
        {
          direction: "horizontal",
          spacing: 8,
          verticalAlignItems: "center",
          width: "fill-parent"
        },
        /* @__PURE__ */ figma.widget.h(Text7, { fontSize: 18, fontWeight: "bold" }, "\u{1F4DD} Id\xE9ation"),
        /* @__PURE__ */ figma.widget.h(
          AutoLayout7,
          {
            padding: { vertical: 6, horizontal: 12 },
            cornerRadius: 6,
            fill: "#4CAF50",
            onClick: () => setIsCreating(!isCreating)
          },
          /* @__PURE__ */ figma.widget.h(Text7, { fontSize: 12, fill: "#FFFFFF", fontWeight: "bold" }, isCreating ? "Annuler" : "+ Nouveau post-it")
        )
      ),
      isCreating && /* @__PURE__ */ figma.widget.h(
        AutoLayout7,
        {
          direction: "vertical",
          spacing: 8,
          padding: 12,
          cornerRadius: 8,
          fill: "#FFF9E6",
          stroke: "#FFD700",
          width: "fill-parent"
        },
        /* @__PURE__ */ figma.widget.h(Text7, { fontSize: 13, fontWeight: "bold" }, "Nouveau post-it :"),
        /* @__PURE__ */ figma.widget.h(
          AutoLayout7,
          {
            padding: { vertical: 8, horizontal: 8 },
            cornerRadius: 6,
            fill: "#FFFFFF",
            stroke: "#CCCCCC",
            width: "fill-parent"
          },
          /* @__PURE__ */ figma.widget.h(
            Input4,
            {
              value: newPostItContent,
              placeholder: "\xC9crivez votre r\xE9troaction...",
              fontSize: 12,
              width: "fill-parent",
              onTextEditEnd: (e) => setNewPostItContent(e.characters)
            }
          )
        ),
        /* @__PURE__ */ figma.widget.h(
          AutoLayout7,
          {
            padding: { vertical: 6, horizontal: 12 },
            cornerRadius: 6,
            fill: "#4CAF50",
            horizontalAlignItems: "center",
            onClick: addPostIt
          },
          /* @__PURE__ */ figma.widget.h(Text7, { fontSize: 12, fill: "#FFFFFF", fontWeight: "bold" }, "Ajouter le post-it")
        )
      ),
      /* @__PURE__ */ figma.widget.h(
        AutoLayout7,
        {
          direction: "horizontal",
          spacing: 12,
          wrap: true,
          width: "fill-parent"
        },
        postIts.length === 0 ? /* @__PURE__ */ figma.widget.h(Text7, { fontSize: 12, fill: "#999" }, 'Aucun post-it pour le moment. Cliquez sur "+ Nouveau post-it" pour commencer !') : postIts.map((postIt) => {
          const isEditing = editingPostItId === postIt.id;
          const editContent = editContents[postIt.id] !== void 0 ? editContents[postIt.id] : postIt.content;
          return /* @__PURE__ */ figma.widget.h(
            AutoLayout7,
            {
              key: postIt.id,
              direction: "vertical",
              spacing: 8,
              padding: 12,
              cornerRadius: 8,
              fill: postIt.color,
              stroke: "#00000020",
              width: 180
            },
            isEditing ? (
              // Edit mode
              /* @__PURE__ */ figma.widget.h(figma.widget.Fragment, null, /* @__PURE__ */ figma.widget.h(
                AutoLayout7,
                {
                  padding: { vertical: 6, horizontal: 8 },
                  cornerRadius: 6,
                  fill: "#FFFFFF",
                  width: "fill-parent"
                },
                /* @__PURE__ */ figma.widget.h(
                  Input4,
                  {
                    value: editContent,
                    fontSize: 11,
                    width: "fill-parent",
                    onTextEditEnd: (e) => {
                      const newContents = __spreadValues({}, editContents);
                      newContents[postIt.id] = e.characters;
                      setEditContents(newContents);
                    }
                  }
                )
              ), /* @__PURE__ */ figma.widget.h(AutoLayout7, { direction: "horizontal", spacing: 4 }, /* @__PURE__ */ figma.widget.h(
                AutoLayout7,
                {
                  padding: { vertical: 4, horizontal: 8 },
                  cornerRadius: 4,
                  fill: "#4CAF50",
                  onClick: () => {
                    return new Promise((resolve) => {
                      if (isCurrentUserAuthor(postIt.authorId)) {
                        editPostIt(postIt.id, editContent);
                        setEditingPostItId(null);
                      }
                      resolve();
                    });
                  }
                },
                /* @__PURE__ */ figma.widget.h(Text7, { fontSize: 10, fill: "#FFFFFF" }, "\u2713 Sauvegarder")
              ), /* @__PURE__ */ figma.widget.h(
                AutoLayout7,
                {
                  padding: { vertical: 4, horizontal: 8 },
                  cornerRadius: 4,
                  fill: "#999999",
                  onClick: () => {
                    const newContents = __spreadValues({}, editContents);
                    newContents[postIt.id] = postIt.content;
                    setEditContents(newContents);
                    setEditingPostItId(null);
                  }
                },
                /* @__PURE__ */ figma.widget.h(Text7, { fontSize: 10, fill: "#FFFFFF" }, "Annuler")
              )))
            ) : (
              // View mode
              /* @__PURE__ */ figma.widget.h(figma.widget.Fragment, null, /* @__PURE__ */ figma.widget.h(Text7, { fontSize: 11 }, postIt.content), /* @__PURE__ */ figma.widget.h(
                AutoLayout7,
                {
                  direction: "vertical",
                  spacing: 4,
                  width: "fill-parent"
                },
                /* @__PURE__ */ figma.widget.h(Text7, { fontSize: 9, fill: "#666" }, "\u2014 ", postIt.authorName),
                /* @__PURE__ */ figma.widget.h(AutoLayout7, { direction: "horizontal", spacing: 4 }, /* @__PURE__ */ figma.widget.h(
                  AutoLayout7,
                  {
                    padding: { vertical: 3, horizontal: 6 },
                    cornerRadius: 4,
                    fill: "#2196F3",
                    onClick: () => {
                      return new Promise((resolve) => {
                        if (isCurrentUserAuthor(postIt.authorId)) {
                          const newContents = __spreadValues({}, editContents);
                          newContents[postIt.id] = postIt.content;
                          setEditContents(newContents);
                          setEditingPostItId(postIt.id);
                        } else {
                          figma.notify(
                            "\u26A0\uFE0F Vous ne pouvez modifier que vos propres post-its"
                          );
                        }
                        resolve();
                      });
                    }
                  },
                  /* @__PURE__ */ figma.widget.h(Text7, { fontSize: 9, fill: "#FFFFFF" }, "\u270F\uFE0F Modifier")
                ), /* @__PURE__ */ figma.widget.h(
                  AutoLayout7,
                  {
                    padding: { vertical: 3, horizontal: 6 },
                    cornerRadius: 4,
                    fill: "#F44336",
                    onClick: () => deletePostIt(postIt.id, postIt.authorId)
                  },
                  /* @__PURE__ */ figma.widget.h(Text7, { fontSize: 9, fill: "#FFFFFF" }, "\u{1F5D1}\uFE0F Supprimer")
                ))
              ))
            )
          );
        })
      )
    );
  }

  // widget-src/widget.tsx
  var { widget: widget8 } = figma;
  var { AutoLayout: AutoLayout8, Text: Text8, useSyncedState: useSyncedState7 } = widget8;
  function Widget() {
    const [numberOfStudents] = useSyncedState7("teacherNumStudents", "");
    const numStudents = parseInt(numberOfStudents) || 0;
    const studentIndices = Array.from({ length: numStudents }, (_, i) => i);
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout8,
      {
        name: "Main Widget Container",
        direction: "vertical",
        spacing: 16,
        padding: 16,
        cornerRadius: 12,
        fill: "#F0F0F0"
      },
      /* @__PURE__ */ figma.widget.h(AutoLayout8, { direction: "horizontal", spacing: 16 }, /* @__PURE__ */ figma.widget.h(TeacherProfile, null), numStudents > 0 ? /* @__PURE__ */ figma.widget.h(AutoLayout8, { direction: "horizontal", spacing: 16 }, /* @__PURE__ */ figma.widget.h(
        AutoLayout8,
        {
          direction: "vertical",
          spacing: 12,
          padding: 16,
          cornerRadius: 12,
          fill: "#FFFFFF",
          stroke: "#E6E6E6"
        },
        /* @__PURE__ */ figma.widget.h(Text8, { fontSize: 18, fontWeight: "bold" }, "Groupe d'aventuriers"),
        /* @__PURE__ */ figma.widget.h(
          AutoLayout8,
          {
            direction: "horizontal",
            spacing: 16,
            wrap: true,
            width: "fill-parent"
          },
          studentIndices.map((index) => /* @__PURE__ */ figma.widget.h(StudentProfile, { key: index, studentId: index }))
        )
      ), /* @__PURE__ */ figma.widget.h(PostItBoard, null)) : /* @__PURE__ */ figma.widget.h(
        AutoLayout8,
        {
          direction: "vertical",
          spacing: 12,
          padding: 16,
          cornerRadius: 12,
          fill: "#FFFFFF",
          stroke: "#E6E6E6",
          width: 280
        },
        /* @__PURE__ */ figma.widget.h(Text8, { fontSize: 16, fontWeight: "bold" }, "\u{1F465} Profils des \xE9tudiants"),
        /* @__PURE__ */ figma.widget.h(Text8, { fontSize: 12, fill: "#666" }, "L'enseignant doit d'abord d\xE9finir le nombre d'\xE9tudiants dans le formulaire ci-dessus.")
      )),
      /* @__PURE__ */ figma.widget.h(KanbanBoard, null)
    );
  }
  widget8.register(Widget);
})();
