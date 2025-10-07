"use strict";
(() => {
  // widget-src/code.tsx
  var { widget } = figma;
  var { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG, Input, Frame, Image, Rectangle } = widget;
  function Widget() {
    const [name, setName] = useSyncedState("name", "Student");
    const [selectedAvatar, setSelectedAvatar] = useSyncedState("avatar", 0);
    const [selectedClass, setSelectedClass] = useSyncedState("class", "Guerrier");
    const [selectedTitle, setSelectedTitle] = useSyncedState("title", "Apprenti");
    const avatars = [
      "https://picsum.photos/id/1/200/300",
      "https://picsum.photos/id/2/200/300",
      "https://picsum.photos/id/3/200/300"
    ];
    const classes = ["Guerrier", "Mage", "Archer", "Soigneur"];
    const titles = ["Apprenti", "Aventurier", "Ma\xEEtre", "L\xE9gende"];
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
      /* @__PURE__ */ figma.widget.h(Text, { fontSize: 18, fontWeight: "bold" }, "Profil de l'\xE9tudiant"),
      /* @__PURE__ */ figma.widget.h(AutoLayout, { spacing: 8 }, avatars.map((src, index) => /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          key: index,
          padding: 4,
          cornerRadius: 8,
          fill: index === selectedAvatar ? "#CCE5FF" : "#FFFFFF",
          stroke: "#CCCCCC",
          onClick: () => setSelectedAvatar(index)
        },
        /* @__PURE__ */ figma.widget.h(
          Image,
          {
            src,
            width: 48,
            height: 48,
            cornerRadius: 8
          }
        )
      ))),
      /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 4 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14 }, "Nom :"), /* @__PURE__ */ figma.widget.h(
        Input,
        {
          value: name,
          placeholder: "Entrez votre nom",
          fontSize: 14,
          onTextEditEnd: (e) => setName(e.characters)
        }
      )),
      /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 4 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14 }, "Classe :"), /* @__PURE__ */ figma.widget.h(AutoLayout, { spacing: 6 }, classes.map((c) => /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          key: c,
          padding: { vertical: 4, horizontal: 8 },
          cornerRadius: 8,
          fill: selectedClass === c ? "#CCE5FF" : "#F5F5F5",
          stroke: "#CCCCCC",
          onClick: () => setSelectedClass(c)
        },
        /* @__PURE__ */ figma.widget.h(Text, null, c)
      )))),
      /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 4 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14 }, "Titre :"), /* @__PURE__ */ figma.widget.h(AutoLayout, { spacing: 6 }, titles.map((t) => /* @__PURE__ */ figma.widget.h(
        AutoLayout,
        {
          key: t,
          padding: { vertical: 4, horizontal: 8 },
          cornerRadius: 8,
          fill: selectedTitle === t ? "#CCE5FF" : "#F5F5F5",
          stroke: "#CCCCCC",
          onClick: () => setSelectedTitle(t)
        },
        /* @__PURE__ */ figma.widget.h(Text, null, t)
      )))),
      /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 4, padding: { top: 12 } }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14, fontWeight: "bold" }, "R\xE9sum\xE9 :"), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 13 }, name, " \u2014 ", selectedClass, " (", titles.indexOf(selectedTitle) + 1, "/", titles.length, ") : ", selectedTitle))
    );
  }
  widget.register(Widget);
})();
