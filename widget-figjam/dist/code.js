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

  // widget-src/code.tsx
  var { widget } = figma;
  var { useSyncedState, AutoLayout, Text, Input, Image } = widget;
  function StudentProfile({ studentId = 0 }) {
    const [name, setName] = useSyncedState(
      `student_${studentId}_name`,
      `\xC9tudiant ${studentId + 1}`
    );
    const [selectedAvatar, setSelectedAvatar] = useSyncedState(
      `student_${studentId}_avatar`,
      0
    );
    const [selectedClass, setSelectedClass] = useSyncedState(
      `student_${studentId}_class`,
      "Guerrier"
    );
    const [selectedTitle, setSelectedTitle] = useSyncedState(
      `student_${studentId}_title`,
      "Apprenti"
    );
    const [showAvatarSelector, setShowAvatarSelector] = useSyncedState(
      `student_${studentId}_showAvatarSelector`,
      false
    );
    const [showClassDropdown, setShowClassDropdown] = useSyncedState(
      `student_${studentId}_showClassDropdown`,
      false
    );
    const [showTitleDropdown, setShowTitleDropdown] = useSyncedState(
      `student_${studentId}_showTitleDropdown`,
      false
    );
    const [isEditing, setIsEditing] = useSyncedState(
      `student_${studentId}_isEditing`,
      true
    );
    const [user, setUser] = useSyncedState(`student_${studentId}_user`, () => {
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
    const [activeUser, setActiveUser] = useSyncedState(
      `student_${studentId}_activeUser`,
      () => {
        var _a, _b, _c, _d, _e;
        const me = figma.activeUsers[0];
        return {
          id: (_a = me == null ? void 0 : me.id) != null ? _a : null,
          name: (_b = me == null ? void 0 : me.name) != null ? _b : "Anonymous",
          photoUrl: (_c = me == null ? void 0 : me.photoUrl) != null ? _c : null,
          color: (_d = me == null ? void 0 : me.color) != null ? _d : null,
          sessionId: (_e = me == null ? void 0 : me.sessionId) != null ? _e : null
        };
      }
    );
    console.log(`Student ${studentId} - Current user:`, user);
    console.log(`Student ${studentId} - Active user:`, activeUser);
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
        /* @__PURE__ */ figma.widget.h(figma.widget.Fragment, null, /* @__PURE__ */ figma.widget.h(AutoLayout, { spacing: 8, verticalAlignItems: "center" }, /* @__PURE__ */ figma.widget.h(
          Image,
          {
            src: avatars[selectedAvatar],
            width: 48,
            height: 48,
            cornerRadius: 8
          }
        ), /* @__PURE__ */ figma.widget.h(AutoLayout, { direction: "vertical" }, /* @__PURE__ */ figma.widget.h(Text, { fontSize: 16, fontWeight: "bold" }, name), /* @__PURE__ */ figma.widget.h(Text, { fontSize: 12 }, selectedClass, " \u2022 ", selectedTitle))), /* @__PURE__ */ figma.widget.h(
          AutoLayout,
          {
            padding: { vertical: 8, horizontal: 24 },
            cornerRadius: 8,
            fill: "#F5F5F5",
            onClick: () => setIsEditing(true)
          },
          /* @__PURE__ */ figma.widget.h(Text, { fontSize: 13 }, "Modifier")
        ))
      )
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

  // widget-src/postit.tsx
  var { widget: widget3 } = figma;
  var { useSyncedState: useSyncedState3, AutoLayout: AutoLayout3, Text: Text3, Input: Input3 } = widget3;
  function PostItBoard() {
    const [postIts, setPostIts] = useSyncedState3("postIts", []);
    const [isCreating, setIsCreating] = useSyncedState3("isCreatingPostIt", false);
    const [newPostItContent, setNewPostItContent] = useSyncedState3(
      "newPostItContent",
      ""
    );
    const [currentUserId, setCurrentUserId] = useSyncedState3(
      "currentUserId",
      ""
    );
    const [currentUserName, setCurrentUserName] = useSyncedState3(
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
      AutoLayout3,
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
        AutoLayout3,
        {
          direction: "horizontal",
          spacing: 8,
          verticalAlignItems: "center",
          width: "fill-parent"
        },
        /* @__PURE__ */ figma.widget.h(Text3, { fontSize: 18, fontWeight: "bold" }, "\u{1F4DD} R\xE9troaction"),
        /* @__PURE__ */ figma.widget.h(
          AutoLayout3,
          {
            padding: { vertical: 6, horizontal: 12 },
            cornerRadius: 6,
            fill: "#4CAF50",
            onClick: () => setIsCreating(!isCreating)
          },
          /* @__PURE__ */ figma.widget.h(Text3, { fontSize: 12, fill: "#FFFFFF", fontWeight: "bold" }, isCreating ? "Annuler" : "+ Nouveau post-it")
        )
      ),
      isCreating && /* @__PURE__ */ figma.widget.h(
        AutoLayout3,
        {
          direction: "vertical",
          spacing: 8,
          padding: 12,
          cornerRadius: 8,
          fill: "#FFF9E6",
          stroke: "#FFD700",
          width: "fill-parent"
        },
        /* @__PURE__ */ figma.widget.h(Text3, { fontSize: 13, fontWeight: "bold" }, "Nouveau post-it :"),
        /* @__PURE__ */ figma.widget.h(
          AutoLayout3,
          {
            padding: { vertical: 8, horizontal: 8 },
            cornerRadius: 6,
            fill: "#FFFFFF",
            stroke: "#CCCCCC",
            width: "fill-parent"
          },
          /* @__PURE__ */ figma.widget.h(
            Input3,
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
          AutoLayout3,
          {
            padding: { vertical: 6, horizontal: 12 },
            cornerRadius: 6,
            fill: "#4CAF50",
            horizontalAlignItems: "center",
            onClick: addPostIt
          },
          /* @__PURE__ */ figma.widget.h(Text3, { fontSize: 12, fill: "#FFFFFF", fontWeight: "bold" }, "Ajouter le post-it")
        )
      ),
      /* @__PURE__ */ figma.widget.h(
        AutoLayout3,
        {
          direction: "horizontal",
          spacing: 12,
          wrap: true,
          width: "fill-parent"
        },
        postIts.length === 0 ? /* @__PURE__ */ figma.widget.h(Text3, { fontSize: 12, fill: "#999" }, 'Aucun post-it pour le moment. Cliquez sur "+ Nouveau post-it" pour commencer !') : postIts.map((postIt) => {
          const [isEditing, setIsEditing] = useSyncedState3(
            `editing_${postIt.id}`,
            false
          );
          const [editContent, setEditContent] = useSyncedState3(
            `editContent_${postIt.id}`,
            postIt.content
          );
          return /* @__PURE__ */ figma.widget.h(
            AutoLayout3,
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
                AutoLayout3,
                {
                  padding: { vertical: 6, horizontal: 8 },
                  cornerRadius: 6,
                  fill: "#FFFFFF",
                  width: "fill-parent"
                },
                /* @__PURE__ */ figma.widget.h(
                  Input3,
                  {
                    value: editContent,
                    fontSize: 11,
                    width: "fill-parent",
                    onTextEditEnd: (e) => setEditContent(e.characters)
                  }
                )
              ), /* @__PURE__ */ figma.widget.h(AutoLayout3, { direction: "horizontal", spacing: 4 }, /* @__PURE__ */ figma.widget.h(
                AutoLayout3,
                {
                  padding: { vertical: 4, horizontal: 8 },
                  cornerRadius: 4,
                  fill: "#4CAF50",
                  onClick: () => {
                    return new Promise((resolve) => {
                      if (isCurrentUserAuthor(postIt.authorId)) {
                        editPostIt(postIt.id, editContent);
                        setIsEditing(false);
                      }
                      resolve();
                    });
                  }
                },
                /* @__PURE__ */ figma.widget.h(Text3, { fontSize: 10, fill: "#FFFFFF" }, "\u2713 Sauvegarder")
              ), /* @__PURE__ */ figma.widget.h(
                AutoLayout3,
                {
                  padding: { vertical: 4, horizontal: 8 },
                  cornerRadius: 4,
                  fill: "#999999",
                  onClick: () => {
                    setEditContent(postIt.content);
                    setIsEditing(false);
                  }
                },
                /* @__PURE__ */ figma.widget.h(Text3, { fontSize: 10, fill: "#FFFFFF" }, "Annuler")
              )))
            ) : (
              // View mode
              /* @__PURE__ */ figma.widget.h(figma.widget.Fragment, null, /* @__PURE__ */ figma.widget.h(Text3, { fontSize: 11 }, postIt.content), /* @__PURE__ */ figma.widget.h(
                AutoLayout3,
                {
                  direction: "vertical",
                  spacing: 4,
                  width: "fill-parent"
                },
                /* @__PURE__ */ figma.widget.h(Text3, { fontSize: 9, fill: "#666" }, "\u2014 ", postIt.authorName),
                /* @__PURE__ */ figma.widget.h(AutoLayout3, { direction: "horizontal", spacing: 4 }, /* @__PURE__ */ figma.widget.h(
                  AutoLayout3,
                  {
                    padding: { vertical: 3, horizontal: 6 },
                    cornerRadius: 4,
                    fill: "#2196F3",
                    onClick: () => {
                      return new Promise((resolve) => {
                        if (isCurrentUserAuthor(postIt.authorId)) {
                          setIsEditing(true);
                        } else {
                          figma.notify(
                            "\u26A0\uFE0F Vous ne pouvez modifier que vos propres post-its"
                          );
                        }
                        resolve();
                      });
                    }
                  },
                  /* @__PURE__ */ figma.widget.h(Text3, { fontSize: 9, fill: "#FFFFFF" }, "\u270F\uFE0F Modifier")
                ), /* @__PURE__ */ figma.widget.h(
                  AutoLayout3,
                  {
                    padding: { vertical: 3, horizontal: 6 },
                    cornerRadius: 4,
                    fill: "#F44336",
                    onClick: () => deletePostIt(postIt.id, postIt.authorId)
                  },
                  /* @__PURE__ */ figma.widget.h(Text3, { fontSize: 9, fill: "#FFFFFF" }, "\u{1F5D1}\uFE0F Supprimer")
                ))
              ))
            )
          );
        })
      )
    );
  }

  // widget-src/widget.tsx
  var { widget: widget4 } = figma;
  var { AutoLayout: AutoLayout4, Text: Text4, useSyncedState: useSyncedState4 } = widget4;
  function Widget() {
    const [numberOfStudents] = useSyncedState4("teacherNumStudents", "");
    const numStudents = parseInt(numberOfStudents) || 0;
    const studentIndices = Array.from({ length: numStudents }, (_, i) => i);
    return /* @__PURE__ */ figma.widget.h(
      AutoLayout4,
      {
        name: "Main Widget Container",
        direction: "horizontal",
        spacing: 16,
        padding: 16,
        cornerRadius: 12,
        fill: "#F0F0F0"
      },
      /* @__PURE__ */ figma.widget.h(TeacherProfile, null),
      numStudents > 0 ? /* @__PURE__ */ figma.widget.h(AutoLayout4, { direction: "horizontal", spacing: 16 }, /* @__PURE__ */ figma.widget.h(
        AutoLayout4,
        {
          direction: "vertical",
          spacing: 12,
          padding: 16,
          cornerRadius: 12,
          fill: "#FFFFFF",
          stroke: "#E6E6E6"
        },
        /* @__PURE__ */ figma.widget.h(Text4, { fontSize: 18, fontWeight: "bold" }, "\xC9quipe"),
        /* @__PURE__ */ figma.widget.h(
          AutoLayout4,
          {
            direction: "horizontal",
            spacing: 16,
            wrap: true,
            width: "fill-parent"
          },
          studentIndices.map((index) => /* @__PURE__ */ figma.widget.h(StudentProfile, { key: index, studentId: index }))
        )
      ), /* @__PURE__ */ figma.widget.h(PostItBoard, null)) : /* @__PURE__ */ figma.widget.h(
        AutoLayout4,
        {
          direction: "vertical",
          spacing: 12,
          padding: 16,
          cornerRadius: 12,
          fill: "#FFFFFF",
          stroke: "#E6E6E6",
          width: 280
        },
        /* @__PURE__ */ figma.widget.h(Text4, { fontSize: 16, fontWeight: "bold" }, "\u{1F465} Profils des \xE9tudiants"),
        /* @__PURE__ */ figma.widget.h(Text4, { fontSize: 12, fill: "#666" }, "L'enseignant doit d'abord d\xE9finir le nombre d'\xE9tudiants dans le formulaire ci-dessus.")
      )
    );
  }
  widget4.register(Widget);
})();
