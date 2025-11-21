// Teacher profile component - can be imported and reused
const { widget } = figma;
const { useSyncedState, AutoLayout, Text, Input } = widget;

export function TeacherProfile() {
  const [teacherClaimed, setTeacherClaimed] = useSyncedState<boolean>(
    "teacherClaimed",
    false
  );
  const [canEdit, setCanEdit] = useSyncedState<boolean>(
    "teacherCanEdit",
    false
  );
  const [numberOfStudents, setNumberOfStudents] = useSyncedState(
    "teacherNumStudents",
    ""
  );
  const [rules, setRules] = useSyncedState("teacherRules", "");
  const [context, setContext] = useSyncedState("teacherContext", "");
  const [isEditing, setIsEditing] = useSyncedState("teacherIsEditing", true);

  type Quest = {
    id: string;
    name: string;
    description: string;
    difficulty: string;
    xp: string;
  };

  // NEW STATE: Quests list
  const [quests, setQuests] = useSyncedState<Quest[]>("teacherQuests", []);
  const [expandedQuest, setExpandedQuest] = useSyncedState<string | null>(
    "expandedQuest",
    null
  );

  const claimTeacherRole = () => {
    if (!teacherClaimed) {
      setTeacherClaimed(true);
      setCanEdit(true);
    }
  };

  const isCreator = canEdit;

  const updateQuest = (id: string, field: keyof Quest, value: string) => {
    const updated = quests.map((q) => {
      if (q.id === id) {
        // Use object spread with explicit casting so TS doesn’t complain
        return { ...q, [field]: value } as Quest;
      }
      return q;
    });

    setQuests(updated);
  };

  const addQuest = () => {
    const newQuest: Quest = {
      id: Date.now().toString(),
      name: "Nouvelle quête",
      description: "",
      difficulty: "",
      xp: "",
    };
    quests.push(newQuest);
    setQuests(quests);
  };

  const deleteQuest = (id: string) => {
    setQuests(quests.filter((q) => q.id !== id));
  };

  return (
    <AutoLayout
      name="Teacher Profile Widget"
      direction="vertical"
      verticalAlignItems="center"
      spacing={12}
      padding={16}
      cornerRadius={12}
      fill="#FFFFFF"
      stroke="#E6E6E6"
      width={320}
    >
      {isEditing ? (
        <>
          <Text fontSize={18} fontWeight="bold">
            Formulaire enseignant
          </Text>

          {/* Claim teacher role */}
          {!teacherClaimed && (
            <AutoLayout
              padding={8}
              cornerRadius={8}
              fill="#E5F5FF"
              stroke="#99CCFF"
              width={"fill-parent"}
              direction="vertical"
              spacing={8}
            >
              <Text fontSize={12} fill="#0066CC">
                👋 Cliquez ci-dessous pour devenir l'enseignant
              </Text>
              <AutoLayout
                padding={{ vertical: 6, horizontal: 12 }}
                cornerRadius={6}
                fill="#0066CC"
                onClick={claimTeacherRole}
              >
                <Text fontSize={12} fill="#FFFFFF" fontWeight="bold">
                  Je suis l'enseignant
                </Text>
              </AutoLayout>
            </AutoLayout>
          )}

          {teacherClaimed && !isCreator && (
            <AutoLayout
              padding={8}
              cornerRadius={8}
              fill="#FFE5E5"
              stroke="#FF9999"
              width={"fill-parent"}
            >
              <Text fontSize={12} fill="#CC0000">
                ⚠️ Seul l'enseignant peut modifier ce formulaire
              </Text>
            </AutoLayout>
          )}

          {/* Number of students */}
          <AutoLayout direction="vertical" spacing={4} width={"fill-parent"}>
            <Text fontSize={14} fontWeight="bold">
              Nombre d'étudiants :
            </Text>
            <AutoLayout
              padding={{ vertical: 6, horizontal: 8 }}
              cornerRadius={6}
              fill={isCreator ? "#F5F5F5" : "#E0E0E0"}
              stroke="#CCCCCC"
              width={"fill-parent"}
            >
              <Input
                value={numberOfStudents}
                placeholder="Ex: 30"
                fontSize={14}
                width={"fill-parent"}
                inputFrameProps={{ opacity: isCreator ? 1 : 0.5 }}
                onTextEditEnd={(e) => {
                  if (isCreator) setNumberOfStudents(e.characters);
                }}
              />
            </AutoLayout>
          </AutoLayout>

          {/* Context */}
          <AutoLayout direction="vertical" spacing={4} width={"fill-parent"}>
            <Text fontSize={14} fontWeight="bold">
              Contexte du projet :
            </Text>
            <AutoLayout
              padding={{ vertical: 6, horizontal: 8 }}
              cornerRadius={6}
              fill={isCreator ? "#F5F5F5" : "#E0E0E0"}
              stroke="#CCCCCC"
              width={"fill-parent"}
            >
              <Input
                value={context}
                placeholder="Décrivez le contexte..."
                fontSize={14}
                width={"fill-parent"}
                inputFrameProps={{ opacity: isCreator ? 1 : 0.5 }}
                onTextEditEnd={(e) => {
                  if (isCreator) setContext(e.characters);
                }}
              />
            </AutoLayout>
          </AutoLayout>

          {/* Rules */}
          <AutoLayout direction="vertical" spacing={4} width={"fill-parent"}>
            <Text fontSize={14} fontWeight="bold">
              Règles :
            </Text>
            <AutoLayout
              padding={{ vertical: 6, horizontal: 8 }}
              cornerRadius={6}
              fill={isCreator ? "#F5F5F5" : "#E0E0E0"}
              stroke="#CCCCCC"
              width={"fill-parent"}
            >
              <Input
                value={rules}
                placeholder="Listez les règles..."
                fontSize={14}
                width={"fill-parent"}
                inputFrameProps={{ opacity: isCreator ? 1 : 0.5 }}
                onTextEditEnd={(e) => {
                  if (isCreator) setRules(e.characters);
                }}
              />
            </AutoLayout>
          </AutoLayout>

          {/* --- NEW SECTION: QUESTS --- */}
          <AutoLayout direction="vertical" spacing={6} width={"fill-parent"}>
            <Text fontSize={14} fontWeight="bold">
              Quêtes :
            </Text>

            {quests.map((quest) => (
              <AutoLayout
                key={quest.id}
                direction="vertical"
                fill="#F9F9F9"
                stroke="#CCCCCC"
                cornerRadius={6}
                padding={8}
                width={"fill-parent"}
                spacing={6}
              >
                <AutoLayout
                  width={"fill-parent"}
                  onClick={() =>
                    setExpandedQuest(
                      expandedQuest === quest.id ? null : quest.id
                    )
                  }
                >
                  <AutoLayout
                    width={"fill-parent"}
                    horizontalAlignItems={"start"}
                  >
                    <Text fontWeight="bold" fontSize={13}>
                      {quest.name || "Sans titre"}
                    </Text>
                  </AutoLayout>
                  <AutoLayout horizontalAlignItems={"end"}>
                    <Text fontSize={12} fill="#667">
                      {expandedQuest === quest.id ? "▲" : "▼"}
                    </Text>
                  </AutoLayout>
                </AutoLayout>

                {expandedQuest === quest.id && (
                  <AutoLayout
                    direction="vertical"
                    spacing={4}
                    width={"fill-parent"}
                  >
                    <Text fontSize={12}>Nom :</Text>
                    <AutoLayout
                      padding={{ vertical: 6, horizontal: 8 }}
                      cornerRadius={6}
                      fill={isCreator ? "#FFFFFF" : "#E0E0E0"}
                      stroke="#CCCCCC"
                      width={"fill-parent"}
                    >
                      <Input
                        value={quest.name}
                        placeholder="Nom de la quête"
                        fontSize={12}
                        width={"fill-parent"}
                        onTextEditEnd={(e) =>
                          updateQuest(quest.id, "name", e.characters)
                        }
                      />
                    </AutoLayout>

                    <Text fontSize={12}>Description :</Text>
                    <AutoLayout
                      padding={{ vertical: 6, horizontal: 8 }}
                      cornerRadius={6}
                      fill={isCreator ? "#FFFFFF" : "#E0E0E0"}
                      stroke="#CCCCCC"
                      width={"fill-parent"}
                    >
                      <Input
                        value={quest.description}
                        placeholder="Décrivez la quête..."
                        fontSize={12}
                        width={"fill-parent"}
                        onTextEditEnd={(e) =>
                          updateQuest(quest.id, "description", e.characters)
                        }
                      />
                    </AutoLayout>

                    <Text fontSize={12}>Difficulté :</Text>
                    <AutoLayout
                      padding={{ vertical: 6, horizontal: 8 }}
                      cornerRadius={6}
                      fill={isCreator ? "#FFFFFF" : "#E0E0E0"}
                      stroke="#CCCCCC"
                      width={"fill-parent"}
                    >
                      <Input
                        value={quest.difficulty}
                        placeholder="Facile / Moyenne / Difficile"
                        fontSize={12}
                        width={"fill-parent"}
                        onTextEditEnd={(e) =>
                          updateQuest(quest.id, "difficulty", e.characters)
                        }
                      />
                    </AutoLayout>

                    <Text fontSize={12}>Points d'expérience :</Text>
                    <AutoLayout
                      padding={{ vertical: 6, horizontal: 8 }}
                      cornerRadius={6}
                      fill={isCreator ? "#FFFFFF" : "#E0E0E0"}
                      stroke="#CCCCCC"
                      width={"fill-parent"}
                    >
                      <Input
                        value={quest.xp}
                        placeholder="Ex: 100"
                        fontSize={12}
                        width={"fill-parent"}
                        onTextEditEnd={(e) =>
                          updateQuest(quest.id, "xp", e.characters)
                        }
                      />
                    </AutoLayout>

                    <AutoLayout
                      fill="#FFCCCC"
                      cornerRadius={6}
                      padding={{ vertical: 4, horizontal: 8 }}
                      horizontalAlignItems="center"
                      onClick={() => deleteQuest(quest.id)}
                    >
                      <Text fontSize={12} fill="#CC0000">
                        Supprimer 🗑️
                      </Text>
                    </AutoLayout>
                  </AutoLayout>
                )}
              </AutoLayout>
            ))}

            {isCreator && (
              <AutoLayout
                fill="#D6EAF8"
                cornerRadius={6}
                padding={{ vertical: 6, horizontal: 12 }}
                horizontalAlignItems="center"
                width={"fill-parent"}
                onClick={addQuest}
              >
                <Text fontSize={13} fontWeight="bold">
                  ➕ Ajouter une quête
                </Text>
              </AutoLayout>
            )}
          </AutoLayout>
          {/* --- END NEW SECTION --- */}

          {isCreator && (
            <AutoLayout
              padding={{ vertical: 8, horizontal: 50 }}
              fill="#CCE5FF"
              cornerRadius={8}
              horizontalAlignItems="center"
              onClick={() => setIsEditing(false)}
            >
              <Text fontSize={14} fontWeight="bold">
                Sauvegarder le formulaire
              </Text>
            </AutoLayout>
          )}
        </>
      ) : (
        <>
          <Text fontSize={18} fontWeight="bold">
            Informations du projet
          </Text>

          <AutoLayout direction="vertical" spacing={12} width={"fill-parent"}>
            <AutoLayout direction="vertical" spacing={4}>
              <Text fontSize={13} fontWeight="bold">
                Nombre d'étudiants :
              </Text>
              <Text fontSize={14}>{numberOfStudents || "—"}</Text>
            </AutoLayout>

            <AutoLayout direction="vertical" spacing={4}>
              <Text fontSize={13} fontWeight="bold">
                Contexte :
              </Text>
              <Text fontSize={14}>{context || "—"}</Text>
            </AutoLayout>

            <AutoLayout direction="vertical" spacing={4}>
              <Text fontSize={13} fontWeight="bold">
                Règles :
              </Text>
              <Text fontSize={14}>{rules || "—"}</Text>
            </AutoLayout>

            {/* --- VIEW MODE QUESTS --- */}
            <AutoLayout direction="vertical" spacing={4} width={"fill-parent"}>
              <Text fontSize={13} fontWeight="bold">
                Quêtes :
              </Text>
              {quests.length === 0 && (
                <Text fontSize={12} fill="#999">
                  Aucune quête définie.
                </Text>
              )}
              {quests.map((quest) => (
                <AutoLayout
                  key={quest.id}
                  direction="vertical"
                  fill="#F9F9F9"
                  stroke="#CCCCCC"
                  cornerRadius={6}
                  padding={8}
                  width={"fill-parent"}
                  spacing={4}
                  onClick={() =>
                    setExpandedQuest(
                      expandedQuest === quest.id ? null : quest.id
                    )
                  }
                >
                  <AutoLayout width={"fill-parent"}>
                    <AutoLayout
                      width={"fill-parent"}
                      horizontalAlignItems={"start"}
                    >
                      <Text fontWeight="bold" fontSize={13}>
                        {quest.name || "Sans titre"}
                      </Text>
                    </AutoLayout>
                    <AutoLayout horizontalAlignItems={"end"}>
                      <Text fontSize={12} fill="#667">
                        {expandedQuest === quest.id ? "▲" : "▼"}
                      </Text>
                    </AutoLayout>
                  </AutoLayout>

                  {expandedQuest === quest.id && (
                    <AutoLayout
                      direction="vertical"
                      spacing={2}
                      width={"fill-parent"}
                    >
                      <Text fontSize={12}>
                        Description : {quest.description || "—"}
                      </Text>
                      <Text fontSize={12}>
                        Difficulté : {quest.difficulty || "—"}
                      </Text>
                      <Text fontSize={12}>XP : {quest.xp || "—"}</Text>
                    </AutoLayout>
                  )}
                </AutoLayout>
              ))}
            </AutoLayout>
            {/* --- END VIEW QUESTS --- */}
          </AutoLayout>

          {/* Teacher action buttons */}
          {isCreator && (
            <AutoLayout direction="vertical" spacing={8} width={"fill-parent"}>
              {/* Download Excel button */}
              <AutoLayout
                padding={{ vertical: 8, horizontal: 24 }}
                cornerRadius={8}
                fill="#28A745"
                horizontalAlignItems="center"
                width={"fill-parent"}
                onClick={() => {
                  return new Promise<void>((resolve) => {
                    const csvContent =
                      "Nom,Classe,Titre,Nombre_Etudiants,Contexte,Regles\n";
                    const csvData = `"Données","du","projet","${numberOfStudents}","${context}","${rules}"\n`;
                    const fullCsv = csvContent + csvData;

                    // Use figma.showUI to access browser APIs for download
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
                          </script>
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

                    figma.notify("📊 Téléchargement du fichier en cours...");
                  });
                }}
              >
                <Text fontSize={13} fill="#FFFFFF" fontWeight="bold">
                  📊 Télécharger données Excel
                </Text>
              </AutoLayout>

              <AutoLayout
                padding={{ vertical: 8, horizontal: 24 }}
                cornerRadius={8}
                fill="#F5F5F5"
                horizontalAlignItems="center"
                width={"fill-parent"}
                onClick={() => setIsEditing(true)}
              >
                <Text fontSize={13}>Modifier</Text>
              </AutoLayout>
            </AutoLayout>
          )}
        </>
      )}
    </AutoLayout>
  );
}
