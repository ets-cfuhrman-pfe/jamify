// Post-it component for feedback section
const { widget } = figma;
const { useSyncedState, AutoLayout, Text, Input } = widget;

interface PostIt {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  color: string;
  timestamp: number;
}

export function PostItBoard() {
  // Store all post-its
  const [postIts, setPostIts] = useSyncedState<PostIt[]>("postIts", []);

  // UI state for new post-it
  const [isCreating, setIsCreating] = useSyncedState("isCreatingPostIt", false);
  const [newPostItContent, setNewPostItContent] = useSyncedState(
    "newPostItContent",
    ""
  );

  // Store current user info in synced state (set once when needed)
  const [currentUserId, setCurrentUserId] = useSyncedState<string>(
    "currentUserId",
    ""
  );
  const [currentUserName, setCurrentUserName] = useSyncedState<string>(
    "currentUserName",
    "Anonyme"
  );

  // Available colors for post-its
  const colors = [
    "#FFE5B4",
    "#FFB6C1",
    "#B4E5FF",
    "#C1FFB6",
    "#E5B4FF",
    "#FFD700",
  ];

  // Add a new post-it
  const addPostIt = () => {
    return new Promise<void>((resolve) => {
      // Get current user info inside the event handler
      const user = figma.currentUser;
      const userId = user?.id || "anonymous";
      const userName = user?.name || "Anonyme";

      // Update stored user info if needed
      if (!currentUserId) {
        setCurrentUserId(userId);
        setCurrentUserName(userName);
      }

      if (newPostItContent.trim()) {
        const newPostIt: PostIt = {
          id: `postit_${Date.now()}_${Math.random()}`,
          content: newPostItContent,
          authorId: userId,
          authorName: userName,
          color: colors[Math.floor(Math.random() * colors.length)],
          timestamp: Date.now(),
        };
        setPostIts([...postIts, newPostIt]);
        setNewPostItContent("");
        setIsCreating(false);
      }
      resolve();
    });
  };

  // Check if current user is the author of a post-it
  const isCurrentUserAuthor = (authorId: string): boolean => {
    const user = figma.currentUser;
    return user?.id === authorId;
  };

  // Delete a post-it (only author can delete)
  const deletePostIt = (id: string, authorId: string) => {
    return new Promise<void>((resolve) => {
      if (isCurrentUserAuthor(authorId)) {
        setPostIts(postIts.filter((p) => p.id !== id));
        figma.notify("🗑️ Post-it supprimé");
      } else {
        figma.notify("⚠️ Vous ne pouvez supprimer que vos propres post-its");
      }
      resolve();
    });
  };

  // Edit a post-it
  const editPostIt = (id: string, newContent: string) => {
    setPostIts(
      postIts.map((p) => (p.id === id ? { ...p, content: newContent } : p))
    );
  };

  return (
    <AutoLayout
      direction="vertical"
      spacing={12}
      padding={16}
      cornerRadius={12}
      fill="#FFFFFF"
      stroke="#E6E6E6"
      width={600}
    >
      <AutoLayout
        direction="horizontal"
        spacing={8}
        verticalAlignItems="center"
        width={"fill-parent"}
      >
        <Text fontSize={18} fontWeight="bold">
          📝 Idéation
        </Text>
        <AutoLayout
          padding={{ vertical: 6, horizontal: 12 }}
          cornerRadius={6}
          fill="#4CAF50"
          onClick={() => setIsCreating(!isCreating)}
        >
          <Text fontSize={12} fill="#FFFFFF" fontWeight="bold">
            {isCreating ? "Annuler" : "+ Nouveau post-it"}
          </Text>
        </AutoLayout>
      </AutoLayout>

      {/* Create new post-it form */}
      {isCreating && (
        <AutoLayout
          direction="vertical"
          spacing={8}
          padding={12}
          cornerRadius={8}
          fill="#FFF9E6"
          stroke="#FFD700"
          width={"fill-parent"}
        >
          <Text fontSize={13} fontWeight="bold">
            Nouveau post-it :
          </Text>
          <AutoLayout
            padding={{ vertical: 8, horizontal: 8 }}
            cornerRadius={6}
            fill="#FFFFFF"
            stroke="#CCCCCC"
            width={"fill-parent"}
          >
            <Input
              value={newPostItContent}
              placeholder="Écrivez votre rétroaction..."
              fontSize={12}
              width={"fill-parent"}
              onTextEditEnd={(e) => setNewPostItContent(e.characters)}
            />
          </AutoLayout>
          <AutoLayout
            padding={{ vertical: 6, horizontal: 12 }}
            cornerRadius={6}
            fill="#4CAF50"
            horizontalAlignItems="center"
            onClick={addPostIt}
          >
            <Text fontSize={12} fill="#FFFFFF" fontWeight="bold">
              Ajouter le post-it
            </Text>
          </AutoLayout>
        </AutoLayout>
      )}

      {/* Display all post-its */}
      <AutoLayout
        direction="horizontal"
        spacing={12}
        wrap={true}
        width={"fill-parent"}
      >
        {postIts.length === 0 ? (
          <Text fontSize={12} fill="#999">
            Aucun post-it pour le moment. Cliquez sur "+ Nouveau post-it" pour
            commencer !
          </Text>
        ) : (
          postIts.map((postIt) => {
            const [isEditing, setIsEditing] = useSyncedState(
              `editing_${postIt.id}`,
              false
            );
            const [editContent, setEditContent] = useSyncedState(
              `editContent_${postIt.id}`,
              postIt.content
            );

            return (
              <AutoLayout
                key={postIt.id}
                direction="vertical"
                spacing={8}
                padding={12}
                cornerRadius={8}
                fill={postIt.color}
                stroke="#00000020"
                width={180}
              >
                {isEditing ? (
                  // Edit mode
                  <>
                    <AutoLayout
                      padding={{ vertical: 6, horizontal: 8 }}
                      cornerRadius={6}
                      fill="#FFFFFF"
                      width={"fill-parent"}
                    >
                      <Input
                        value={editContent}
                        fontSize={11}
                        width={"fill-parent"}
                        onTextEditEnd={(e) => setEditContent(e.characters)}
                      />
                    </AutoLayout>
                    <AutoLayout direction="horizontal" spacing={4}>
                      <AutoLayout
                        padding={{ vertical: 4, horizontal: 8 }}
                        cornerRadius={4}
                        fill="#4CAF50"
                        onClick={() => {
                          return new Promise<void>((resolve) => {
                            if (isCurrentUserAuthor(postIt.authorId)) {
                              editPostIt(postIt.id, editContent);
                              setIsEditing(false);
                            }
                            resolve();
                          });
                        }}
                      >
                        <Text fontSize={10} fill="#FFFFFF">
                          ✓ Sauvegarder
                        </Text>
                      </AutoLayout>
                      <AutoLayout
                        padding={{ vertical: 4, horizontal: 8 }}
                        cornerRadius={4}
                        fill="#999999"
                        onClick={() => {
                          setEditContent(postIt.content);
                          setIsEditing(false);
                        }}
                      >
                        <Text fontSize={10} fill="#FFFFFF">
                          Annuler
                        </Text>
                      </AutoLayout>
                    </AutoLayout>
                  </>
                ) : (
                  // View mode
                  <>
                    <Text fontSize={11}>{postIt.content}</Text>
                    <AutoLayout
                      direction="vertical"
                      spacing={4}
                      width={"fill-parent"}
                    >
                      <Text fontSize={9} fill="#666">
                        — {postIt.authorName}
                      </Text>
                      {/* Always show buttons, but check author on click */}
                      <AutoLayout direction="horizontal" spacing={4}>
                        <AutoLayout
                          padding={{ vertical: 3, horizontal: 6 }}
                          cornerRadius={4}
                          fill="#2196F3"
                          onClick={() => {
                            return new Promise<void>((resolve) => {
                              if (isCurrentUserAuthor(postIt.authorId)) {
                                setIsEditing(true);
                              } else {
                                figma.notify(
                                  "⚠️ Vous ne pouvez modifier que vos propres post-its"
                                );
                              }
                              resolve();
                            });
                          }}
                        >
                          <Text fontSize={9} fill="#FFFFFF">
                            ✏️ Modifier
                          </Text>
                        </AutoLayout>
                        <AutoLayout
                          padding={{ vertical: 3, horizontal: 6 }}
                          cornerRadius={4}
                          fill="#F44336"
                          onClick={() =>
                            deletePostIt(postIt.id, postIt.authorId)
                          }
                        >
                          <Text fontSize={9} fill="#FFFFFF">
                            🗑️ Supprimer
                          </Text>
                        </AutoLayout>
                      </AutoLayout>
                    </AutoLayout>
                  </>
                )}
              </AutoLayout>
            );
          })
        )}
      </AutoLayout>
    </AutoLayout>
  );
}
