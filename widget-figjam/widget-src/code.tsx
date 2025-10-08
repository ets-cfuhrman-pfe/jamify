// This is a counter widget with buttons to increment and decrement the number.

const { widget } = figma

const { useSyncedState, usePropertyMenu, AutoLayout, Text, SVG, Input, Frame, Image, Rectangle } = widget

function Widget() {
  // Persistent synced states
  const [name, setName] = useSyncedState("name", "Student");
  const [selectedAvatar, setSelectedAvatar] = useSyncedState("avatar", 0);
  const [selectedClass, setSelectedClass] = useSyncedState("class", "Guerrier");
  const [selectedTitle, setSelectedTitle] = useSyncedState("title", "Apprenti");

  const [showAvatarSelector, setShowAvatarSelector] = useSyncedState("showAvatarSelector", false);


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
      verticalAlignItems={'center'}
      spacing={12}
      padding={16}
      cornerRadius={12}
      fill={'#FFFFFF'}
      stroke={'#E6E6E6'}
      width={280}
    >
      {/* Title */}
      <Text fontSize={18} fontWeight="bold">
        Profil de l'étudiant
      </Text>

      {/* Avatar selector */}
      <AutoLayout direction="vertical" spacing={8}>
        <Text fontSize={14}>Avatar :</Text>

        {/* When selector is closed -> show only chosen avatar */}
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
        <Input
          value={name}
          placeholder="Entrez votre nom"
          fontSize={14}
          onTextEditEnd={(e) => setName(e.characters)}
        />
      </AutoLayout>

      {/* Class selector */}
      <AutoLayout direction="vertical" spacing={4}>
        <Text fontSize={14}>Classe :</Text>
        <AutoLayout spacing={6}>
          {classes.map((c) => (
            <AutoLayout
              key={c}
              padding={{ vertical: 4, horizontal: 8 }}
              cornerRadius={8}
              fill={selectedClass === c ? "#CCE5FF" : "#F5F5F5"}
              stroke="#CCCCCC"
              onClick={() => setSelectedClass(c)}
            >
              <Text>{c}</Text>
            </AutoLayout>
          ))}
        </AutoLayout>
      </AutoLayout>

      {/* Title selector */}
      <AutoLayout direction="vertical" spacing={4}>
        <Text fontSize={14}>Titre :</Text>
        <AutoLayout spacing={6}>
          {titles.map((t) => (
            <AutoLayout
              key={t}
              padding={{ vertical: 4, horizontal: 8 }}
              cornerRadius={8}
              fill={selectedTitle === t ? "#CCE5FF" : "#F5F5F5"}
              stroke="#CCCCCC"
              onClick={() => setSelectedTitle(t)}
            >
              <Text>{t}</Text>
            </AutoLayout>
          ))}
        </AutoLayout>
      </AutoLayout>

      {/* Display summary */}
      <AutoLayout direction="vertical" spacing={4} padding={{ top: 12 }}>
        <Text fontSize={14} fontWeight="bold">
          Résumé :
        </Text>
        <Text fontSize={13}>
          {name} — {selectedClass} ({titles.indexOf(selectedTitle) + 1}/
          {titles.length}) : {selectedTitle}
        </Text>
      </AutoLayout>
    </AutoLayout>
  )
}

widget.register(Widget)
