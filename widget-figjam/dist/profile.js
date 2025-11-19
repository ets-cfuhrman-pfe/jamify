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
  var RAW_BASE = "https://raw.githubusercontent.com/ets-cfuhrman-pfe/jamify/UCE-01-Personnalisation-du-profil/widget-figjam/widget-src/img";
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
      1: `${RAW_BASE}/Ranger_1.png`,
      2: `${RAW_BASE}/Ranger_2.png`,
      3: `${RAW_BASE}/Ranger_3.png`
    },
    "Mage": {
      1: `${RAW_BASE}/Mage_1.png`,
      2: `${RAW_BASE}/Mage_2.png`,
      3: `${RAW_BASE}/Mage_3.png`
    },
    "Barde": {
      1: `${RAW_BASE}/Bard_1.png`,
      2: `${RAW_BASE}/Bard_2.png`,
      3: `${RAW_BASE}/Bard_3.png`
    },
    "Alchimiste": {
      1: `${RAW_BASE}/Alchemist_1.png`,
      2: `${RAW_BASE}/Alchemist_2.png`,
      3: `${RAW_BASE}/Alchemist_3.png`
    }
  };
  function getProfileImage(selectedClass, level) {
    const images = CLASS_LEVEL_IMAGE_MAP[selectedClass];
    if (!images) return `${RAW_BASE}/Ranger_1.png`;
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
      } }, /* @__PURE__ */ figma.widget.h(Text, null, c))))), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 4, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14 }, "Titre :"), /* @__PURE__ */ figma.widget.h(AutoLayout, { padding: { vertical: 6, horizontal: 10 }, fill: "#F5F5F5", stroke: "#CCCCCC", cornerRadius: 8, width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text, { width: "fill-parent" }, getTitleFor(selectedClass, level)))), /* @__PURE__ */ figma.widget.h(AutoLayout, { padding: { vertical: 8, horizontal: 50 }, fill: "#CCE5FF", cornerRadius: 8, horizontalAlignItems: "center", onClick: () => setUiState(__spreadProps(__spreadValues({}, uiState), { isEditing: false })) }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14, fontWeight: "bold" }, "Sauvegarder le profil"))) : /* @__PURE__ */ figma.widget.h(figma.widget.Fragment, null, /* @__PURE__ */ figma.widget.h(AutoLayout, { spacing: 8, verticalAlignItems: "center", width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Image, { src: getProfileImage(selectedClass, level), width: 48, height: 48, cornerRadius: 8 }), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", width: "fill-parent" }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 16, fontWeight: "bold" }, name), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12 }, selectedClass), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12, width: "fill-parent" }, getTitleFor(selectedClass, level)))), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 4, width: "fill-parent", horizontalAlignItems: "center" }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14, fontWeight: "bold" }, "Level ", level), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12, fill: "#666666" }, xp, " / ", xpToNextLevel, " XP")), /* @__PURE__ */ figma.widget.h(AutoLayout, { padding: { vertical: 8, horizontal: 24 }, cornerRadius: 8, fill: "#F5F5F5", onClick: () => setUiState(__spreadProps(__spreadValues({}, uiState), { isEditing: true })) }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 13 }, "Modifier")))
    );
  }
})();
