// Student profile component for FigJam widget
const { widget } = figma;

const { useSyncedState, AutoLayout, Text, Input, Image } = widget;

// Import class images so esbuild bundles them (they will become data-URIs)
import Ranger_1 from './img/Ranger_1.png';
import Mage_1 from './img/Mage_1.png';
import Bard_1 from './img/Bard_1.png';
import Alchemist_1 from './img/Alchemist_1.png';

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

  // Read per-student XP and level
  const [xp] = useSyncedState(`student_${studentId}_xp`, 0);
  const [level] = useSyncedState(`student_${studentId}_level`, 1);

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

  const classes = ['Rôdeur', 'Mage', 'Barde', 'Alchimiste'];
  const titles = ['Apprenti', 'Aventurier', 'Maître', 'Légende'];

  const classImageMap: Record<string, string> = {
    'Rôdeur': Ranger_1,
    'Mage': Mage_1,
    'Barde': Bard_1,
    'Alchimiste': Alchemist_1,
  };

  const xpToNextLevel = level * 100;

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
        <>
          <Text fontSize={18} fontWeight="bold">Profil de l'étudiant</Text>

          {/* Avatar */}
          <AutoLayout direction="vertical" spacing={8}>
            <Text fontSize={14}>Avatar :</Text>
            {!showAvatarSelector ? (
              <AutoLayout padding={4} cornerRadius={8} fill="#FFFFFF" stroke="#CCCCCC" onClick={() => setShowAvatarSelector(true)}>
                <Image src={classImageMap[selectedClass] || Ranger_1} width={64} height={64} cornerRadius={8} />
              </AutoLayout>
            ) : (
              <AutoLayout direction="vertical" spacing={8} padding={8} cornerRadius={12} fill="#F9F9F9" stroke="#DDDDDD">
                <AutoLayout spacing={8}>
                  {classes.map((c) => (
                    <AutoLayout
                      key={c}
                      padding={4}
                      cornerRadius={8}
                      fill={c === selectedClass ? '#CCE5FF' : '#FFFFFF'}
                      stroke="#CCCCCC"
                      onClick={() => {
                        setSelectedClass(c);
                        setShowAvatarSelector(false);
                      }}
                    >
                      <Image src={classImageMap[c] || Ranger_1} width={64} height={64} cornerRadius={8} />
                    </AutoLayout>
                  ))}
                </AutoLayout>
                <AutoLayout padding={{ vertical: 4, horizontal: 8 }} cornerRadius={6} fill="#E0E0E0" onClick={() => setShowAvatarSelector(false)}>
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
            <AutoLayout padding={{ vertical: 6, horizontal: 10 }} fill="#F5F5F5" stroke="#CCCCCC" cornerRadius={8} spacing={4} onClick={() => setShowClassDropdown(!showClassDropdown)}>
              <Text>{selectedClass}</Text>
              <Text fontSize={10}>{showClassDropdown ? '▲' : '▼'}</Text>
            </AutoLayout>
            {showClassDropdown && (
              <AutoLayout direction="vertical" fill="#FFFFFF" stroke="#DDDDDD" cornerRadius={8} padding={6} spacing={4} width={100}>
                {classes.map((c) => (
                  <AutoLayout key={c} padding={{ vertical: 4, horizontal: 8 }} cornerRadius={6} fill={selectedClass === c ? '#CCE5FF' : '#FFFFFF'} onClick={() => { setSelectedClass(c); setShowClassDropdown(false); }}>
                    <Text>{c}</Text>
                  </AutoLayout>
                ))}
              </AutoLayout>
            )}
          </AutoLayout>

          {/* Title dropdown */}
          <AutoLayout direction="vertical" spacing={4}>
            <Text fontSize={14}>Titre :</Text>
            <AutoLayout padding={{ vertical: 6, horizontal: 10 }} fill="#F5F5F5" stroke="#CCCCCC" cornerRadius={8} spacing={4} onClick={() => setShowTitleDropdown(!showTitleDropdown)}>
              <Text>{titles[0]}</Text>
              <Text fontSize={10}>{showTitleDropdown ? '▲' : '▼'}</Text>
            </AutoLayout>
            {showTitleDropdown && (
              <AutoLayout direction="vertical" fill="#FFFFFF" stroke="#DDDDDD" cornerRadius={8} padding={6} spacing={4} width={120}>
                {titles.map((t) => (
                  <AutoLayout key={t} padding={{ vertical: 4, horizontal: 8 }} cornerRadius={6} fill={'#FFFFFF'} onClick={() => setShowTitleDropdown(false)}>
                    <Text>{t}</Text>
                  </AutoLayout>
                ))}
              </AutoLayout>
            )}
          </AutoLayout>

          <AutoLayout padding={{ vertical: 8, horizontal: 50 }} fill="#CCE5FF" cornerRadius={8} horizontalAlignItems="center" onClick={() => setIsEditing(false)}>
            <Text fontSize={14} fontWeight="bold">Sauvegarder le profil</Text>
          </AutoLayout>
        </>
      ) : (
        <>
          <AutoLayout spacing={8} verticalAlignItems="center">
            <Image src={classImageMap[selectedClass] || Ranger_1} width={48} height={48} cornerRadius={8} />
            <AutoLayout direction="vertical">
              <Text fontSize={16} fontWeight="bold">{name}</Text>
              <Text fontSize={12}>{selectedClass} • {titles[0]}</Text>
            </AutoLayout>
          </AutoLayout>

          <AutoLayout direction="vertical" spacing={4} width="fill-parent" horizontalAlignItems="center">
            <Text fontSize={14} fontWeight="bold">Level {level}</Text>
            <Text fontSize={12} fill="#666666">{xp} / {xpToNextLevel} XP</Text>
          </AutoLayout>

          <AutoLayout padding={{ vertical: 8, horizontal: 24 }} cornerRadius={8} fill="#F5F5F5" onClick={() => setIsEditing(true)}>
            <Text fontSize={13}>Modifier</Text>
          </AutoLayout>
        </>
      )}
    </AutoLayout>
  );
}
 
