// Main Widget - Combines multiple components
import { StudentProfile } from "./code";
import { TeacherProfile } from "./teacher";
import { PostItBoard } from "./postit";

const { widget } = figma;
const { AutoLayout, Text, useSyncedState } = widget;

// Main Widget Container - Add your other functionalities here!
function Widget() {
  // Get the number of students from synced state (shared with TeacherProfile)
  const [numberOfStudents] = useSyncedState("teacherNumStudents", "");

  // Parse the number of students (default to 0 if invalid)
  const numStudents = parseInt(numberOfStudents) || 0;

  // Generate array of student indices
  const studentIndices = Array.from({ length: numStudents }, (_, i) => i);

  return (
    <AutoLayout
      name="Main Widget Container"
      direction="horizontal"
      spacing={16}
      padding={16}
      cornerRadius={12}
      fill="#F0F0F0"
    >
      {/* Teacher Section */}
      <TeacherProfile />

      {/* Student Profiles Section */}
      {numStudents > 0 ? (
        <AutoLayout direction="horizontal" spacing={16}>
          {/* Équipe Section */}
          <AutoLayout
            direction="vertical"
            spacing={12}
            padding={16}
            cornerRadius={12}
            fill="#FFFFFF"
            stroke="#E6E6E6"
          >
            <Text fontSize={18} fontWeight="bold">
              Équipe
            </Text>

            {/* Grid layout for student profiles */}
            <AutoLayout
              direction="horizontal"
              spacing={16}
              wrap={true}
              width={"fill-parent"}
            >
              {studentIndices.map((index) => (
                <StudentProfile key={index} studentId={index} />
              ))}
            </AutoLayout>
          </AutoLayout>

          {/* Rétroaction with Post-its */}
          <PostItBoard />
        </AutoLayout>
      ) : (
        <AutoLayout
          direction="vertical"
          spacing={12}
          padding={16}
          cornerRadius={12}
          fill="#FFFFFF"
          stroke="#E6E6E6"
          width={280}
        >
          <Text fontSize={16} fontWeight="bold">
            👥 Profils des étudiants
          </Text>
          <Text fontSize={12} fill="#666">
            L'enseignant doit d'abord définir le nombre d'étudiants dans le
            formulaire ci-dessus.
          </Text>
        </AutoLayout>
      )}
    </AutoLayout>
  );
}

widget.register(Widget);
