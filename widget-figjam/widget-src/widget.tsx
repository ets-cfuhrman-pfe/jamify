// Main Widget - Combines multiple components
import { StudentProfile } from "./code";
import { TeacherProfile } from "./teacher";

const { widget } = figma;
const { AutoLayout, Text } = widget;

// Main Widget Container - Add your other functionalities here!
function Widget() {
  return (
    <AutoLayout
      name="Main Widget Container"
      direction="horizontal"
      spacing={16}
      padding={16}
      cornerRadius={12}
      fill="#F0F0F0"
    >
      <TeacherProfile />
      {/* Student Profile Section */}
      <StudentProfile />

      {/* 
        Add your other functionalities here!
        Examples:
        - <TaskList />
        - <ProgressTracker />
        - <TeamView />
        etc.
      */}

      {/* Placeholder for future features */}
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
          Autres fonctionnalités
        </Text>
        <Text fontSize={12} fill="#666">
          Placeholder.
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(Widget);
