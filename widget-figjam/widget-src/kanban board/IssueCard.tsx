import { Issue } from './types';
import { PRIORITY_COLORS } from './constants';

const { widget } = figma;
const { AutoLayout, Text, useSyncedState } = widget;

// Issue Card Component
export function IssueCard({
    issue,
    onMove,
    onDelete,
    onModify,
    studentNames = [],
}: {
    issue: Issue;
    onMove: (issueId: string, newStatus: string) => void;
    onDelete: (issueId: string) => void;
    onModify: (issueId: string, updates: Partial<Issue>) => void;
    studentNames?: string[];
    key?: string;
}) {
    const priorityColor = PRIORITY_COLORS[issue.priority];

    const [quests] = useSyncedState("teacherQuests", []);
    const questName = quests.find((q: any) => q.id === issue.questId)?.name || "Aucune";

    const getPriorityLabel = (p: 'low' | 'medium' | 'high') => (p === 'low' ? 'bas' : p === 'medium' ? 'moyen' : 'élevé')
    const getAssignedName = () => {
        if (issue.assignedToId === undefined) return "Non assigné";
        return studentNames[issue.assignedToId] || "Étudiant";
    };

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
                const statusOrder = ["todo", "in-progress", "done"];
                const currentIndex = statusOrder.indexOf(issue.status);
                const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
                onMove(issue.id, nextStatus);
            }}
        >
            {/* Title */}
            <Text fontSize={14} fontWeight={600} fill="#111827" width="fill-parent">
                {issue.title}
            </Text>

            {/* Description */}
            {issue.description.trim().length > 0 ? (
                <Text fontSize={12} fill="#6B7280" width="fill-parent">
                    {issue.description}
                </Text>
            ) : null}

            {/* Student assignment display (read-only) */}
            <AutoLayout direction="horizontal" spacing={8} width="fill-parent" verticalAlignItems="center">
                <AutoLayout
                    padding={{ vertical: 4, horizontal: 8 }}
                    fill="#F0F9FF"
                    cornerRadius={4}
                    stroke={{ type: "solid", color: { r: 0.7, g: 0.85, b: 1, a: 1 } }}
                    strokeWidth={1}
                >
                    <Text fontSize={11} fill="#0369A1">
                        {getAssignedName()}
                    </Text>
                </AutoLayout>
            </AutoLayout>

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
                    <Text fontSize={11} fill={priorityColor.text}>
                        {getPriorityLabel(issue.priority)}
                    </Text>
                </AutoLayout>

                <AutoLayout width="fill-parent" />

                <Text fontSize={10} fill="#9CA3AF">
                    {new Date(issue.createdAt).toLocaleDateString()}
                </Text>
            </AutoLayout>

            {/* Action Buttons */}
            <AutoLayout direction="horizontal" spacing={8} width="fill-parent" verticalAlignItems="center">
                {/* Delete button */}
                <AutoLayout
                    padding={{ vertical: 6, horizontal: 12 }}
                    fill={{ type: "solid", color: { r: 0.92, g: 0.3, b: 0.3, a: 1 } }}
                    cornerRadius={6}
                    onClick={() => {
                        onDelete(issue.id);
                    }}
                >
                    <Text fontSize={11} fill="#FFFFFF" fontWeight={600}>
                        🗑️ Supprimer
                    </Text>
                </AutoLayout>
            </AutoLayout>
        </AutoLayout>
    );
}
