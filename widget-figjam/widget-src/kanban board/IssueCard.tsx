const { widget } = figma;
const { AutoLayout, useSyncedState, Text } = widget;
import { Issue } from './types';
import { PRIORITY_COLORS } from './constants';

// Issue Card Component
export function IssueCard({ issue, onMove }: { issue: Issue; onMove: (issueId: string, newStatus: string) => void }) {
    const priorityColor = PRIORITY_COLORS[issue.priority];

    const [quests] = useSyncedState("teacherQuests", []);
    const questName = quests.find((q: any) => q.id === issue.questId)?.name || "Aucune";

    return (
        <AutoLayout
            direction="vertical"
            spacing={12}
            padding={16}
            fill="#FFFFFF"
            cornerRadius={8}
            stroke={{ type: "solid", color: { r: 0.9, g: 0.9, b: 0.9, a: 1 } }}
            width="fill-parent"
            strokeWidth={1}
            onClick={() => {
                // Cycle through statuses: todo -> in-progress -> done -> todo
                const statusOrder = ["todo", "in-progress", "done"];
                const currentIndex = statusOrder.indexOf(issue.status);
                const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
                onMove(issue.id, nextStatus);
            }}
        >
            {/* Title */}
            <Text fontSize={14} fontWeight={600} fill="#111827" width="fill-parent">{issue.title}</Text>

            {/* Description */}
            {issue.description && (
                <Text fontSize={12} fill="#6B7280" width="fill-parent">{issue.description}</Text>
            )}

            <AutoLayout
                padding={{ vertical: 2, horizontal: 8 }}
                fill={"#80a7f6ba"}
                cornerRadius={4}
                stroke={"#153089ff"}
                strokeWidth={1}
            >
                {questName && (
                    <Text fontSize={10} fill="#153089ff">
                        Quête: {questName}
                    </Text>
                )}
            </AutoLayout>

            {/* Footer with priority and date */}
            <AutoLayout direction="horizontal" spacing={8} width="fill-parent" verticalAlignItems="center">
                <AutoLayout
                    padding={{ vertical: 2, horizontal: 8 }}
                    fill={priorityColor.bg}
                    cornerRadius={4}
                    stroke={priorityColor.border}
                    strokeWidth={1}
                >
                    <Text fontSize={11} fill={priorityColor.text}>{issue.priority}</Text>
                </AutoLayout>

                <AutoLayout width="fill-parent" />

                <Text fontSize={10} fill="#9CA3AF">
                    {new Date(issue.createdAt).toLocaleDateString()}
                </Text>
            </AutoLayout>
        </AutoLayout>
    );
}
