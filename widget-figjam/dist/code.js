"use strict";
(() => {
  // widget-src/code.tsx
  var { widget } = figma;
  var { useSyncedState, AutoLayout, Text, Input, Image } = widget;
  function Widget() {
    const [name, setName] = useSyncedState("name", "Student");
    const [selectedAvatar, setSelectedAvatar] = useSyncedState("avatar", 0);
    const [selectedClass, setSelectedClass] = useSyncedState("class", "Guerrier");
    const [selectedTitle, setSelectedTitle] = useSyncedState("title", "Apprenti");
    const [showAvatarSelector, setShowAvatarSelector] = useSyncedState("showAvatarSelector", false);
    const [showClassDropdown, setShowClassDropdown] = useSyncedState("showClassDropdown", false);
    const [showTitleDropdown, setShowTitleDropdown] = useSyncedState("showTitleDropdown", false);
    const [isEditing, setIsEditing] = useSyncedState("isEditing", true);
    const [user, setUser] = useSyncedState("user", () => {
      var _a, _b, _c, _d, _e;
      const me = figma.currentUser;
      return {
        id: (_a = me == null ? void 0 : me.id) != null ? _a : null,
        name: (_b = me == null ? void 0 : me.name) != null ? _b : "Anonymous",
        photoUrl: (_c = me == null ? void 0 : me.photoUrl) != null ? _c : null,
        color: (_d = me == null ? void 0 : me.color) != null ? _d : null,
        sessionId: (_e = me == null ? void 0 : me.sessionId) != null ? _e : null
      };
    });
    const [activeUser, setActiveUser] = useSyncedState("activeUser", () => {
      var _a, _b, _c, _d, _e;
      const me = figma.activeUsers[0];
      return {
        id: (_a = me == null ? void 0 : me.id) != null ? _a : null,
        name: (_b = me == null ? void 0 : me.name) != null ? _b : "Anonymous",
        photoUrl: (_c = me == null ? void 0 : me.photoUrl) != null ? _c : null,
        color: (_d = me == null ? void 0 : me.color) != null ? _d : null,
        sessionId: (_e = me == null ? void 0 : me.sessionId) != null ? _e : null
      };
    });
    console.log("Currents user:", user);
    console.log("Active user:", activeUser);
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
      isEditing ? (
        // EDIT MODE
        /* @__PURE__ */ figma.widget.h(figma.widget.Fragment, null, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 18, fontWeight: "bold" }, "Profil de l'\xE9tudiant"), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 8 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14 }, "Avatar :"), !showAvatarSelector && /* @__PURE__ */ figma.widget.h(
          AutoLayout,
          {
            padding: 4,
            cornerRadius: 8,
            fill: "#FFFFFF",
            stroke: "#CCCCCC",
            onClick: () => setShowAvatarSelector(true)
          },
          /* @__PURE__ */ figma.widget.h(
            Image,
            {
              src: avatars[selectedAvatar],
              width: 64,
              height: 64,
              cornerRadius: 8
            }
          )
        ), showAvatarSelector && /* @__PURE__ */ figma.widget.h(
          AutoLayout,
          {
            direction: "vertical",
            spacing: 8,
            padding: 8,
            cornerRadius: 12,
            fill: "#F9F9F9",
            stroke: "#DDDDDD"
          },
          /* @__PURE__ */ figma.widget.h(AutoLayout, { spacing: 8 }, avatars.map((src, index) => /* @__PURE__ */ figma.widget.h(
            AutoLayout,
            {
              key: index,
              padding: 4,
              cornerRadius: 8,
              fill: index === selectedAvatar ? "#CCE5FF" : "#FFFFFF",
              stroke: "#CCCCCC",
              onClick: () => {
                setSelectedAvatar(index);
                setShowAvatarSelector(false);
              }
            },
            /* @__PURE__ */ figma.widget.h(
              Image,
              {
                src,
                width: 64,
                height: 64,
                cornerRadius: 8
              }
            )
          ))),
          /* @__PURE__ */ figma.widget.h(
            AutoLayout,
            {
              padding: { vertical: 4, horizontal: 8 },
              cornerRadius: 6,
              fill: "#E0E0E0",
              onClick: () => setShowAvatarSelector(false)
            },
            /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12 }, "Fermer")
          )
        )), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 4 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14 }, "Nom :"), /* @__PURE__ */ figma.widget.h(
          AutoLayout,
          {
            padding: { vertical: 6, horizontal: 8 },
            cornerRadius: 6,
            fill: "#F5F5F5",
            stroke: "#CCCCCC"
          },
          /* @__PURE__ */ figma.widget.h(
            Input,
            {
              value: name,
              placeholder: "Entrez votre nom",
              fontSize: 14,
              onTextEditEnd: (e) => setName(e.characters)
            }
          )
        )), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 4 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14 }, "Classe :"), /* @__PURE__ */ figma.widget.h(
          AutoLayout,
          {
            padding: { vertical: 6, horizontal: 10 },
            fill: "#F5F5F5",
            stroke: "#CCCCCC",
            cornerRadius: 8,
            spacing: 4,
            onClick: () => setShowClassDropdown(!showClassDropdown)
          },
          /* @__PURE__ */ figma.widget.h(Text, null, selectedClass),
          /* @__PURE__ */ figma.widget.h(Text, { fontSize: 10 }, showClassDropdown ? "\u25B2" : "\u25BC")
        ), showClassDropdown && /* @__PURE__ */ figma.widget.h(
          AutoLayout,
          {
            direction: "vertical",
            fill: "#FFFFFF",
            stroke: "#DDDDDD",
            cornerRadius: 8,
            padding: 6,
            spacing: 4,
            width: 100
          },
          classes.map((c) => /* @__PURE__ */ figma.widget.h(
            AutoLayout,
            {
              key: c,
              padding: { vertical: 4, horizontal: 8 },
              cornerRadius: 6,
              fill: selectedClass === c ? "#CCE5FF" : "#FFFFFF",
              onClick: () => {
                setSelectedClass(c);
                setShowClassDropdown(false);
              }
            },
            /* @__PURE__ */ figma.widget.h(Text, null, c)
          ))
        )), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical", spacing: 4 }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14 }, "Titre :"), /* @__PURE__ */ figma.widget.h(
          AutoLayout,
          {
            padding: { vertical: 6, horizontal: 10 },
            fill: "#F5F5F5",
            stroke: "#CCCCCC",
            cornerRadius: 8,
            spacing: 4,
            onClick: () => setShowTitleDropdown(!showTitleDropdown)
          },
          /* @__PURE__ */ figma.widget.h(Text, null, selectedTitle),
          /* @__PURE__ */ figma.widget.h(Text, { fontSize: 10 }, showTitleDropdown ? "\u25B2" : "\u25BC")
        ), showTitleDropdown && /* @__PURE__ */ figma.widget.h(
          AutoLayout,
          {
            direction: "vertical",
            fill: "#FFFFFF",
            stroke: "#DDDDDD",
            cornerRadius: 8,
            padding: 6,
            spacing: 4,
            width: 120
          },
          titles.map((t) => /* @__PURE__ */ figma.widget.h(
            AutoLayout,
            {
              key: t,
              padding: { vertical: 4, horizontal: 8 },
              cornerRadius: 6,
              fill: selectedTitle === t ? "#CCE5FF" : "#FFFFFF",
              onClick: () => {
                setSelectedTitle(t);
                setShowTitleDropdown(false);
              }
            },
            /* @__PURE__ */ figma.widget.h(Text, null, t)
          ))
        )), /* @__PURE__ */ figma.widget.h(
          AutoLayout,
          {
            padding: { vertical: 8, horizontal: 50 },
            fill: "#CCE5FF",
            cornerRadius: 8,
            horizontalAlignItems: "center",
            onClick: () => setIsEditing(false)
          },
          /* @__PURE__ */ figma.widget.h(Text, { fontSize: 14, fontWeight: "bold" }, "Sauvegarder le profil")
        ))
      ) : (
        // VIEW MODE
        /* @__PURE__ */ figma.widget.h(figma.widget.Fragment, null, /* @__PURE__ */ figma.widget.h(AutoLayout, { spacing: 8, verticalAlignItems: "center" }, /* @__PURE__ */ figma.widget.h(Image, { src: avatars[selectedAvatar], width: 48, height: 48, cornerRadius: 8 }), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical" }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 16, fontWeight: "bold" }, name), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12 }, selectedClass, " \u2022 ", selectedTitle))), /* @__PURE__ */ figma.widget.h(AutoLayout, { padding: { vertical: 8, horizontal: 24 }, cornerRadius: 8, fill: "#F5F5F5", onClick: () => setIsEditing(true) }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 13 }, "Modifier")))
      )
    );
  }
  widget.register(Widget);
})();
