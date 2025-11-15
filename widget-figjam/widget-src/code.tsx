// Student profile component for FigJam widget
const { widget } = figma;

const { useSyncedState, AutoLayout, Text, Input, Image } = widget;

// Import all class images for levels 1-3 so esbuild bundles them as data-URIs
import Ranger_1 from './img/Ranger_1.png';
import Ranger_2 from './img/Ranger_2.png';
import Ranger_3 from './img/Ranger_3.png';
import Mage_1 from './img/Mage_1.png';
import Mage_2 from './img/Mage_2.png';
import Mage_3 from './img/Mage_3.png';
import Bard_1 from './img/Bard_1.png';
import Bard_2 from './img/Bard_2.png';
import Bard_3 from './img/Bard_3.png';
import Alchemist_1 from './img/Alchemist_1.png';
import Alchemist_2 from './img/Alchemist_2.png';
import Alchemist_3 from './img/Alchemist_3.png';

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
      showTitleDropdown: false,
      isEditing: true,
    }
  );

  const classes = ['Rôdeur', 'Mage', 'Barde', 'Alchimiste'];

  const classTitles: Record<string, [string, string, string]> = {
    'Rôdeur': [
      'Apprenti du Sablier',
      'Maître des Horloges',
      'Stratège du Temps'
    ],
    'Mage': [
      'Éveilleur des Murmures',
      'Gardien des Voix',
      'Chanteur des Âmes Unies'
    ],
    'Barde': [
      'Copiste des Premiers Parchemins',
      'Chroniqueur du Savoir',
      'Scribe du Royaume'
    ],
    'Alchimiste': [
      "Distillateur d'Expériences",
      'Sage des Métamorphoses',
      'Alchimiste du Progrès'
    ],
  };

  function getTitleFor(selectedClass: string, level: number): string {
    const titlesArr = classTitles[selectedClass];
    if (!titlesArr) return 'Aventurier';
    const idx = level >= 3 ? 2 : level === 2 ? 1 : 0;
    return titlesArr[idx];
  }

  const classBaseMap: Record<string, string> = {
    'Rôdeur': 'Ranger',
    'Mage': 'Mage',
    'Barde': 'Bard',
    'Alchimiste': 'Alchemist',
  };

  const classLevelImageMap: Record<string, Record<number, string>> = {
    'Rôdeur': { 1: Ranger_1, 2: Ranger_2, 3: Ranger_3 },
    'Mage': { 1: Mage_1, 2: Mage_2, 3: Mage_3 },
    'Barde': { 1: Bard_1, 2: Bard_2, 3: Bard_3 },
    'Alchimiste': { 1: Alchemist_1, 2: Alchemist_2, 3: Alchemist_3 },
  };

  function getProfileImage(selectedClass: string, level: number): string {
    const images = classLevelImageMap[selectedClass];
    if (!images) return Ranger_1;
    if (level >= 3) return images[3];
    if (level === 2) return images[2];
    return images[1];
  }

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
      {uiState.isEditing ? (
        <>
          <Text fontSize={18} fontWeight="bold">Profil de l'étudiant</Text>

          {/* Avatar */}
          <AutoLayout direction="vertical" spacing={8}>
            <Text fontSize={14}>Avatar :</Text>
            {!uiState.showAvatarSelector ? (
              <AutoLayout padding={4} cornerRadius={8} fill="#FFFFFF" stroke="#CCCCCC" onClick={() => setUiState({...uiState, showAvatarSelector: true})}>
                <Image src={getProfileImage(selectedClass, level)} width={64} height={64} cornerRadius={8} />
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
                        setUiState({...uiState, showAvatarSelector: false});
                      }}
                    >
                      <Image src={getProfileImage(c, level)} width={64} height={64} cornerRadius={8} />
                    </AutoLayout>
                  ))}
                </AutoLayout>
                <AutoLayout padding={{ vertical: 4, horizontal: 8 }} cornerRadius={6} fill="#E0E0E0" onClick={() => setUiState({...uiState, showAvatarSelector: false})}>
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
            <AutoLayout padding={{ vertical: 6, horizontal: 10 }} fill="#F5F5F5" stroke="#CCCCCC" cornerRadius={8} spacing={4} onClick={() => setUiState({...uiState, showClassDropdown: !uiState.showClassDropdown})}>
              <Text>{selectedClass}</Text>
              <Text fontSize={10}>{uiState.showClassDropdown ? '▲' : '▼'}</Text>
            </AutoLayout>
            {uiState.showClassDropdown && (
              <AutoLayout direction="vertical" fill="#FFFFFF" stroke="#DDDDDD" cornerRadius={8} padding={6} spacing={4} width={100}>
                {classes.map((c) => (
                  <AutoLayout key={c} padding={{ vertical: 4, horizontal: 8 }} cornerRadius={6} fill={selectedClass === c ? '#CCE5FF' : '#FFFFFF'} onClick={() => { setSelectedClass(c); setUiState({...uiState, showClassDropdown: false}); }}>
                    <Text>{c}</Text>
                  </AutoLayout>
                ))}
              </AutoLayout>
            )}
          </AutoLayout>

          {/* Static computed title  */}
          <AutoLayout direction="vertical" spacing={4}>
            <Text fontSize={14}>Titre :</Text>
            <AutoLayout padding={{ vertical: 6, horizontal: 10 }} fill="#F5F5F5" stroke="#CCCCCC" cornerRadius={8}>
              <Text>{getTitleFor(selectedClass, level)}</Text>
            </AutoLayout>
          </AutoLayout>

          <AutoLayout padding={{ vertical: 8, horizontal: 50 }} fill="#CCE5FF" cornerRadius={8} horizontalAlignItems="center" onClick={() => setUiState({...uiState, isEditing: false})}>
            <Text fontSize={14} fontWeight="bold">Sauvegarder le profil</Text>
          </AutoLayout>
        </>
      ) : (
        <>
          <AutoLayout spacing={8} verticalAlignItems="center">
            <Image src={getProfileImage(selectedClass, level)} width={48} height={48} cornerRadius={8} />
            <AutoLayout direction="vertical">
              <Text fontSize={16} fontWeight="bold">{name}</Text>
              <Text fontSize={12}>{selectedClass} • {getTitleFor(selectedClass, level)}</Text>
            </AutoLayout>
          </AutoLayout>

          <AutoLayout direction="vertical" spacing={4} width="fill-parent" horizontalAlignItems="center">
            <Text fontSize={14} fontWeight="bold">Level {level}</Text>
            <Text fontSize={12} fill="#666666">{xp} / {xpToNextLevel} XP</Text>
          </AutoLayout>

          <AutoLayout padding={{ vertical: 8, horizontal: 24 }} cornerRadius={8} fill="#F5F5F5" onClick={() => setUiState({...uiState, isEditing: true})}>
            <Text fontSize={13}>Modifier</Text>
          </AutoLayout>
        </>
      )}
    </AutoLayout>
  );
}
 
