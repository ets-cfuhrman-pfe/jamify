const { widget } = figma;
const { AutoLayout, Text } = widget;

import { Column, Issue } from './types';
import { PRIORITY_COLORS } from './constants';
import { IssueCard } from './IssueCard';
import { AddIssueDialog } from './AddIssueDialog';

// Helper function to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number; a: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255,
            a: 1
        }
        : { r: 0.5, g: 0.5, b: 0.5, a: 1 };
}

// Kanban Column Component
export function KanbanColumn({
    column,
    issues,
    onMove,
    addingToColumn,
    setAddingToColumn,
    onAddIssue,
    studentNames = [],
}: {
    column: Column;
    issues: Issue[];
    onMove: (issueId: string) => void;
    addingToColumn: string | null;
    setAddingToColumn: (status: string | null) => void;
    onAddIssue: (status: string, title: string, description: string, priority: "low" | "medium" | "high", assignedToId?: number) => void;
    studentNames?: string[];
}) {
    const columnIssues = issues.filter((issue) => issue.status === column.status);
    const columnColor = hexToRgb(column.color);

    return (
        <AutoLayout
            direction="vertical"
            spacing={12}
            padding={16}
            fill="#F9FAFB"
            cornerRadius={8}
            width={500}
            stroke={{ type: "solid", color: columnColor }}
            strokeWidth={2}
        >
            {/* Column Header */}
            <AutoLayout
                direction="horizontal"
                spacing={8}
                width="fill-parent"
                verticalAlignItems="center"
            >
                <AutoLayout
                    width={24}
                    height={24}
                    cornerRadius={12}
                    fill={columnColor}
                />
                <Text fontSize={18} fontWeight={700} fill="#111827" width="fill-parent">
                    {column.title}
                </Text>
                <AutoLayout
                    padding={{ horizontal: 12, vertical: 6 }}
                    fill={columnColor}
                    cornerRadius={12}
                >
                    <Text fontSize={14} fontWeight={600} fill="#FFFFFF">
                        {columnIssues.length}
                    </Text>
                </AutoLayout>
            </AutoLayout>

            {/* Column Body */}
            <AutoLayout
                direction="vertical"
                spacing={12}
                width="fill-parent"
            >
                {columnIssues.map((issue) => (
                    <IssueCard
                        issue={issue}
                        onMove={(issueId: string, newStatus: string) => {
                            onMove(issueId);
                        }}
                        studentNames={studentNames}
                    />
                ))}

                {/* Add Issue Dialog or Button */}
                {addingToColumn === column.status ? (
                    <AddIssueDialog
                        status={column.status}
                        onAdd={(title, description, priority, assignedToId) => {
                            onAddIssue(column.status, title, description, priority, assignedToId);
                            setAddingToColumn(null);
                        }}
                        onCancel={() => setAddingToColumn(null)}
                        studentNames={studentNames}
                    />
                ) : (
                    <AutoLayout
                        padding={12}
                        fill="#053b50ff"
                        cornerRadius={8}
                        onClick={() => setAddingToColumn(column.status)}
                        width="fill-parent"
                        horizontalAlignItems="center"
                        stroke={{ type: "solid", color: { r: 0.8, g: 0.8, b: 0.8, a: 1 } }}
                        strokeWidth={1}
                    >
                        <Text fontSize={14} fill="#ffffffff">+ Ajouter une tâche</Text>
                    </AutoLayout>
                )}
            </AutoLayout>
        </AutoLayout>
    );
}
