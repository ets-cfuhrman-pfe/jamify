// Student profile component for FigJam widget
const { widget } = figma;

const { useSyncedState, AutoLayout, Text, Input, Image } = widget;

// Profile constants and helpers
import { CLASSES, getProfileImage, getTitleFor } from './profile-constants';

export function StudentProfile({ studentId = 0 }: { studentId?: number }) {
  // Persistent synced states - unique per student using studentId
  const [name, setName] = useSyncedState(
    `student_${studentId}_name`,
    `Étudiant ${studentId + 1}`
  );
  const [selectedClass, setSelectedClass] = useSyncedState(
    `student_${studentId}_class`,
    'Rôdeur'
  );

  const [xp] = useSyncedState(`student_${studentId}_xp`, 0);
  const [level] = useSyncedState(`student_${studentId}_level`, 1);

  const [uiState, setUiState] = useSyncedState(
    `student_${studentId}_ui`,
    {
      showAvatarSelector: false,
      showClassDropdown: false,
      isEditing: true,
    }
  );

  const classes = CLASSES;

  const xpToNextLevel = level * 100;

  const firstRow = classes.slice(0, 3);
  const secondRow = classes.slice(3);

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
      {uiState.isEditing ? (
        <>
          <Text fontSize={18} fontWeight="bold">Profil de l'étudiant</Text>

          {/* Avatar */}
          <AutoLayout direction="vertical" spacing={8}>
            <Text fontSize={14}>Avatar :</Text>
            {!uiState.showAvatarSelector ? (
              <AutoLayout padding={4} cornerRadius={8} fill="#FFFFFF" stroke="#CCCCCC" onClick={() => setUiState({ ...uiState, showAvatarSelector: true })}>
                <Image src={getProfileImage(selectedClass as any, level)} width={64} height={64} cornerRadius={8} />
              </AutoLayout>
            ) : (
              <AutoLayout direction="vertical" spacing={8} padding={8} cornerRadius={12} fill="#F9F9F9" stroke="#DDDDDD">
                <AutoLayout direction="vertical" spacing={8}>
                  <AutoLayout spacing={8}>
                    {firstRow.map((c) => (
                      <AutoLayout
                        key={c}
                        padding={4}
                        cornerRadius={8}
                        fill={c === selectedClass ? '#CCE5FF' : '#FFFFFF'}
                        stroke="#CCCCCC"
                        onClick={() => {
                          setSelectedClass(c);
                          setUiState({ ...uiState, showAvatarSelector: false });
                        }}
                      >
                        <Image src={getProfileImage(c as any, level)} width={64} height={64} cornerRadius={8} />
                      </AutoLayout>
                    ))}
                  </AutoLayout>
                  {secondRow.length > 0 && (
                    <AutoLayout spacing={8}>
                      {secondRow.map((c) => (
                        <AutoLayout
                          key={c}
                          padding={4}
                          cornerRadius={8}
                          fill={c === selectedClass ? '#CCE5FF' : '#FFFFFF'}
                          stroke="#CCCCCC"
                          onClick={() => {
                            setSelectedClass(c);
                            setUiState({ ...uiState, showAvatarSelector: false });
                          }}
                        >
                          <Image src={getProfileImage(c as any, level)} width={64} height={64} cornerRadius={8} />
                        </AutoLayout>
                      ))}
                    </AutoLayout>
                  )}
                </AutoLayout>
                <AutoLayout padding={{ vertical: 4, horizontal: 8 }} cornerRadius={6} fill="#E0E0E0" onClick={() => setUiState({ ...uiState, showAvatarSelector: false })}>
                  <Text fontSize={12}>Fermer</Text>
                </AutoLayout>
              </AutoLayout>
            )}
            <Text fontSize={11} fill="#6B7280">L'avatar est automatiquement choisi selon la classe.</Text>
          </AutoLayout>

          {/* Name input */}
          <AutoLayout direction="vertical" spacing={4}>
            <Text fontSize={14}>Nom :</Text>
            <AutoLayout padding={{ vertical: 6, horizontal: 8 }} cornerRadius={6} fill="#F5F5F5" stroke="#CCCCCC">
              <Input value={name} placeholder="Entrez votre nom" fontSize={14} onTextEditEnd={(e) => setName(e.characters)} />
            </AutoLayout>
          </AutoLayout>

          {/* Class dropdown */}
          <AutoLayout direction="vertical" spacing={4}>
            <Text fontSize={14}>Classe :</Text>
            <AutoLayout padding={{ vertical: 6, horizontal: 10 }} fill="#F5F5F5" stroke="#CCCCCC" cornerRadius={8} spacing={4} onClick={() => setUiState({ ...uiState, showClassDropdown: !uiState.showClassDropdown })}>
              <Text>{selectedClass}</Text>
              <Text fontSize={10}>{uiState.showClassDropdown ? '▲' : '▼'}</Text>
            </AutoLayout>
            {uiState.showClassDropdown && (
              <AutoLayout direction="vertical" fill="#FFFFFF" stroke="#DDDDDD" cornerRadius={8} padding={6} spacing={4} width={120}>
                {classes.map((c) => (
                  <AutoLayout key={c} padding={{ vertical: 4, horizontal: 8 }} cornerRadius={6} fill={selectedClass === c ? '#CCE5FF' : '#FFFFFF'} onClick={() => { setSelectedClass(c); setUiState({ ...uiState, showClassDropdown: false }); }}>
                    <Text>{c}</Text>
                  </AutoLayout>
                ))}
              </AutoLayout>
            )}
          </AutoLayout>

          {/* Static computed title */}
          <AutoLayout direction="vertical" spacing={4} width="fill-parent">
            <Text fontSize={14}>Titre :</Text>
            <AutoLayout padding={{ vertical: 6, horizontal: 10 }} fill="#F5F5F5" stroke="#CCCCCC" cornerRadius={8} width="fill-parent">
              <Text width="fill-parent">{getTitleFor(selectedClass as any, level)}</Text>
            </AutoLayout>
          </AutoLayout>

          <AutoLayout padding={{ vertical: 8, horizontal: 50 }} fill="#CCE5FF" cornerRadius={8} horizontalAlignItems="center" onClick={() => setUiState({ ...uiState, isEditing: false })}>
            <Text fontSize={14} fontWeight="bold">Sauvegarder le profil</Text>
          </AutoLayout>
        </>
      ) : (
        <>
          <AutoLayout spacing={8} verticalAlignItems="center" width="fill-parent">
            <Image src={getProfileImage(selectedClass as any, level)} width={40} height={40} cornerRadius={8} />
            <AutoLayout direction="vertical" width="fill-parent">
              <Text fontSize={16} fontWeight="bold">{name}</Text>
              <Text fontSize={12}>{selectedClass}</Text>
              <Text fontSize={12} width="fill-parent">{getTitleFor(selectedClass as any, level)}</Text>
            </AutoLayout>
          </AutoLayout>

          <AutoLayout direction="vertical" spacing={4} width="fill-parent" horizontalAlignItems="center">
            <Text fontSize={14} fontWeight="bold">Level {level}</Text>
            <Text fontSize={12} fill="#666666">{xp} / {xpToNextLevel} XP</Text>
          </AutoLayout>

          <AutoLayout padding={{ vertical: 8, horizontal: 24 }} cornerRadius={8} fill="#F5F5F5" onClick={() => setUiState({ ...uiState, isEditing: true })}>
            <Text fontSize={13}>Modifier</Text>
          </AutoLayout>
        </>
      )}
    </AutoLayout>
  );
}
 
