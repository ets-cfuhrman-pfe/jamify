import { Issue } from './types';
import { PRIORITY_COLORS } from './constants';

const { widget } = figma;
const { AutoLayout, Text, useSyncedState } = widget;

// Issue Card Component
export function IssueCard({
    issue,
    onMove,
    studentNames = [],
}: {
    issue: Issue;
    onMove: (issueId: string, newStatus: string) => void;
    studentNames?: string[];
    key?: string;
}) {
    const priorityColor = PRIORITY_COLORS[issue.priority];

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
                // Cycle through statuses: todo -> in-progress -> done -> todo
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
            {issue.description && (
                <Text fontSize={12} fill="#6B7280" width="fill-parent">
                    {issue.description}
                </Text>
            )}

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
        </AutoLayout>
    );
}
