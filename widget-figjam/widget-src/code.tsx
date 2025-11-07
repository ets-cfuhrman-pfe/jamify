// Student profile component - can be imported and reused
const { widget } = figma;

const { useSyncedState, AutoLayout, Text, Input, Image } = widget;

// Reusable Student Profile Component
export function StudentProfile({ studentId = 0 }: { studentId?: number }) {
  // Persistent synced states - unique per student using studentId
  const [name, setName] = useSyncedState(
    `student_${studentId}_name`,
    `Étudiant ${studentId + 1}`
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

  // UI state - unique per student
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
    const me = figma.currentUser;
    return {
      id: me?.id ?? null,
      name: me?.name ?? "Anonymous",
      photoUrl: me?.photoUrl ?? null,
      color: me?.color ?? null,
      sessionId: me?.sessionId ?? null,
    };
  });
  const [activeUser, setActiveUser] = useSyncedState(
    `student_${studentId}_activeUser`,
    () => {
      const me = figma.activeUsers[0];
      return {
        id: me?.id ?? null,
        name: me?.name ?? "Anonymous",
        photoUrl: me?.photoUrl ?? null,
        color: me?.color ?? null,
        sessionId: me?.sessionId ?? null,
      };
    }
  );
  console.log(`Student ${studentId} - Current user:`, user);
  console.log(`Student ${studentId} - Active user:`, activeUser);
  const avatars = [
    "https://picsum.photos/id/1/200/300",
    "https://picsum.photos/id/2/200/300",
    "https://picsum.photos/id/3/200/300",
  ];
  const classes = ["Guerrier", "Mage", "Archer", "Soigneur"];
  const titles = ["Apprenti", "Aventurier", "Maître", "Légende"];

  return (
    <AutoLayout
      name="Profile Widget"
      direction="vertical"
      verticalAlignItems="center"
      spacing={12}
      padding={16}
      cornerRadius={12}
      fill="#FFFFFF"
      stroke="#E6E6E6"
      width={280}
    >
      {isEditing ? (
        // EDIT MODE
        <>
          <Text fontSize={18} fontWeight="bold">
            Profil de l'étudiant
          </Text>

          {/* Avatar selector */}
          <AutoLayout direction="vertical" spacing={8}>
            <Text fontSize={14}>Avatar :</Text>

            {!showAvatarSelector && (
              <AutoLayout
                padding={4}
                cornerRadius={8}
                fill="#FFFFFF"
                stroke="#CCCCCC"
                onClick={() => setShowAvatarSelector(true)}
              >
                <Image
                  src={avatars[selectedAvatar]}
                  width={64}
                  height={64}
                  cornerRadius={8}
                />
              </AutoLayout>
            )}
            {/* When selector is open -> show all avatars in a grid */}
            {showAvatarSelector && (
              <AutoLayout
                direction="vertical"
                spacing={8}
                padding={8}
                cornerRadius={12}
                fill="#F9F9F9"
                stroke="#DDDDDD"
              >
                <AutoLayout spacing={8}>
                  {avatars.map((src, index) => (
                    <AutoLayout
                      key={index}
                      padding={4}
                      cornerRadius={8}
                      fill={index === selectedAvatar ? "#CCE5FF" : "#FFFFFF"}
                      stroke="#CCCCCC"
                      onClick={() => {
                        setSelectedAvatar(index);
                        setShowAvatarSelector(false);
                      }}
                    >
                      <Image
                        src={src}
                        width={64}
                        height={64}
                        cornerRadius={8}
                      />
                    </AutoLayout>
                  ))}
                </AutoLayout>
                {/* A small cancel button */}
                <AutoLayout
                  padding={{ vertical: 4, horizontal: 8 }}
                  cornerRadius={6}
                  fill="#E0E0E0"
                  onClick={() => setShowAvatarSelector(false)}
                >
                  <Text fontSize={12}>Fermer</Text>
                </AutoLayout>
              </AutoLayout>
            )}
          </AutoLayout>

          {/* Name input */}
          <AutoLayout direction="vertical" spacing={4}>
            <Text fontSize={14}>Nom :</Text>
            <AutoLayout
              padding={{ vertical: 6, horizontal: 8 }}
              cornerRadius={6}
              fill="#F5F5F5"
              stroke="#CCCCCC"
            >
              <Input
                value={name}
                placeholder="Entrez votre nom"
                fontSize={14}
                onTextEditEnd={(e) => setName(e.characters)}
              />
            </AutoLayout>
          </AutoLayout>

          {/* Class dropdown */}
          <AutoLayout direction="vertical" spacing={4}>
            <Text fontSize={14}>Classe :</Text>
            {/* Compact dropdown button */}
            <AutoLayout
              padding={{ vertical: 6, horizontal: 10 }}
              fill="#F5F5F5"
              stroke="#CCCCCC"
              cornerRadius={8}
              spacing={4}
              onClick={() => setShowClassDropdown(!showClassDropdown)}
            >
              <Text>{selectedClass}</Text>
              <Text fontSize={10}>{showClassDropdown ? "▲" : "▼"}</Text>
            </AutoLayout>
            {/* If dropdown is open, show all options */}
            {showClassDropdown && (
              <AutoLayout
                direction="vertical"
                fill="#FFFFFF"
                stroke="#DDDDDD"
                cornerRadius={8}
                padding={6}
                spacing={4}
                width={100}
              >
                {classes.map((c) => (
                  <AutoLayout
                    key={c}
                    padding={{ vertical: 4, horizontal: 8 }}
                    cornerRadius={6}
                    fill={selectedClass === c ? "#CCE5FF" : "#FFFFFF"}
                    onClick={() => {
                      setSelectedClass(c);
                      setShowClassDropdown(false);
                    }}
                  >
                    <Text>{c}</Text>
                  </AutoLayout>
                ))}
              </AutoLayout>
            )}
          </AutoLayout>
          {/*TODO later make the code more reusable as drop down and color are repeated. More modular*/}

          {/* Title dropdown */}
          <AutoLayout direction="vertical" spacing={4}>
            <Text fontSize={14}>Titre :</Text>
            {/* Compact dropdown button */}
            <AutoLayout
              padding={{ vertical: 6, horizontal: 10 }}
              fill="#F5F5F5"
              stroke="#CCCCCC"
              cornerRadius={8}
              spacing={4}
              onClick={() => setShowTitleDropdown(!showTitleDropdown)}
            >
              <Text>{selectedTitle}</Text>
              <Text fontSize={10}>{showTitleDropdown ? "▲" : "▼"}</Text>
            </AutoLayout>
            {/* Expanded dropdown list */}
            {showTitleDropdown && (
              <AutoLayout
                direction="vertical"
                fill="#FFFFFF"
                stroke="#DDDDDD"
                cornerRadius={8}
                padding={6}
                spacing={4}
                width={120}
              >
                {titles.map((t) => (
                  <AutoLayout
                    key={t}
                    padding={{ vertical: 4, horizontal: 8 }}
                    cornerRadius={6}
                    fill={selectedTitle === t ? "#CCE5FF" : "#FFFFFF"}
                    onClick={() => {
                      setSelectedTitle(t);
                      setShowTitleDropdown(false);
                    }}
                  >
                    <Text>{t}</Text>
                  </AutoLayout>
                ))}
              </AutoLayout>
            )}
          </AutoLayout>

          {/* Submit button */}
          <AutoLayout
            padding={{ vertical: 8, horizontal: 50 }}
            fill="#CCE5FF"
            cornerRadius={8}
            horizontalAlignItems="center"
            onClick={() => setIsEditing(false)}
          >
            <Text fontSize={14} fontWeight="bold">
              Sauvegarder le profil
            </Text>
          </AutoLayout>
        </>
      ) : (
        // VIEW MODE
        <>
          <AutoLayout spacing={8} verticalAlignItems="center">
            <Image
              src={avatars[selectedAvatar]}
              width={48}
              height={48}
              cornerRadius={8}
            />
            <AutoLayout direction="vertical">
              <Text fontSize={16} fontWeight="bold">
                {name}
              </Text>
              <Text fontSize={12}>
                {selectedClass} • {selectedTitle}
              </Text>
            </AutoLayout>
          </AutoLayout>
          {/* Edit button */}
          <AutoLayout
            padding={{ vertical: 8, horizontal: 24 }}
            cornerRadius={8}
            fill="#F5F5F5"
            onClick={() => setIsEditing(true)}
          >
            <Text fontSize={13}>Modifier</Text>
          </AutoLayout>
        </>
      )}
    </AutoLayout>
  );
}
