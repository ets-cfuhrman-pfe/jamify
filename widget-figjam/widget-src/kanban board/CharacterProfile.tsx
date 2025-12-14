// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const figma: any;
const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;
import { TrophySVG, ZapSVG } from './constants';

// Character Profile Component
export function CharacterProfile({ level, xp, xpToNextLevel }: { level: number; xp: number; xpToNextLevel: number }) {
    const progressPercentage = (xp / xpToNextLevel);

    return (
        <AutoLayout
            direction="vertical"
            spacing={16}
            padding={24}
            fill={{ type: "solid", color: { r: 0.95, g: 0.94, b: 0.98, a: 1 } }}
            cornerRadius={12}
            stroke={{ type: "solid", color: { r: 0.82, g: 0.76, b: 0.95, a: 1 } }}
            strokeWidth={2}
            width="fill-parent"
        >
            <AutoLayout direction="horizontal" spacing={12} width="fill-parent" verticalAlignItems="center">
                {/* Avatar Circle */}
                <AutoLayout
                    width={64}
                    height={64}
                    cornerRadius={32}
                    fill={{ type: "solid", color: { r: 0.67, g: 0.51, b: 0.82, a: 1 } }}
                    verticalAlignItems="center"
                    horizontalAlignItems="center"
                >
                    <SVG src={TrophySVG} />
                </AutoLayout>

                {/* Name and Level */}
                <AutoLayout direction="vertical" spacing={4}>
                    <Text fontSize={20} fontWeight={600} fill="#111827">Student Hero</Text>
                    <AutoLayout
                        padding={{ vertical: 2, horizontal: 8 }}
                        fill={{ type: "solid", color: { r: 0.94, g: 0.94, b: 0.97, a: 1 } }}
                        cornerRadius={4}
                    >
                        <Text fontSize={12} fill="#374151">Niveau {level}</Text>
                    </AutoLayout>
                </AutoLayout>

                {/* XP Display */}
                <AutoLayout direction="vertical" spacing={2} horizontalAlignItems="end" width="fill-parent">
                    <AutoLayout direction="horizontal" spacing={4} verticalAlignItems="center">
                        <SVG src={ZapSVG} />
                        <Text fontSize={24} fontWeight={700} fill="#CA8A04">{xp}</Text>
                    </AutoLayout>
                    <Text fontSize={12} fill="#6B7280">XP</Text>
                </AutoLayout>
            </AutoLayout>

            {/* Progress Bar */}
            <AutoLayout direction="vertical" spacing={8} width="fill-parent">
                <AutoLayout direction="horizontal" width="fill-parent">
                    <Text fontSize={12} fill="#6B7280">Progrès au niveau {level + 1}</Text>
                    <AutoLayout width="fill-parent" />
                    <Text fontSize={12} fill="#6B7280">{xp} / {xpToNextLevel} XP</Text>
                </AutoLayout>

                {/* Progress bar background */}
                <AutoLayout width="fill-parent" height={12} fill="#E5E7EB" cornerRadius={6}>
                    <AutoLayout
                        width={progressPercentage}
                        height={12}
                        fill={{ type: "solid", color: { r: 0.67, g: 0.51, b: 0.82, a: 1 } }}
                        cornerRadius={6}
                    />
                </AutoLayout>
            </AutoLayout>
        </AutoLayout>
    );
}
