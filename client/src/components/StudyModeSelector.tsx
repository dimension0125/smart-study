import React from 'react';
import { BookOpen, Brain, Lightbulb, Zap, HelpCircle } from 'lucide-react';

export type StudyMode = 'summary' | 'concept' | 'memorize' | 'flashcard' | 'quiz';

interface StudyModeSelectorProps {
  currentMode: StudyMode;
  onModeChange: (mode: StudyMode) => void;
}

const modes: { id: StudyMode; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: 'summary',
    label: '요약',
    icon: <BookOpen className="w-5 h-5" />,
    description: '핵심 내용',
  },
  {
    id: 'concept',
    label: '개념',
    icon: <Lightbulb className="w-5 h-5" />,
    description: '상세 설명',
  },
  {
    id: 'memorize',
    label: '암기',
    icon: <Brain className="w-5 h-5" />,
    description: '중요 포인트',
  },
  {
    id: 'flashcard',
    label: '플래시카드',
    icon: <Zap className="w-5 h-5" />,
    description: '양방향 학습',
  },
  {
    id: 'quiz',
    label: '퀴즈',
    icon: <HelpCircle className="w-5 h-5" />,
    description: '실력 평가',
  },
];

export default function StudyModeSelector({
  currentMode,
  onModeChange,
}: StudyModeSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-foreground uppercase tracking-wide opacity-70">
        학습 방식 선택
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border-2 transition-all duration-200 ${
              currentMode === mode.id
                ? 'border-primary bg-primary/10 shadow-md'
                : 'border-border bg-card hover:border-primary/40 hover:shadow-sm'
            }`}
          >
            <div
              className={`transition-colors ${
                currentMode === mode.id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {mode.icon}
            </div>
            <span className="text-xs font-semibold text-foreground text-center">{mode.label}</span>
            <span className="text-xs text-muted-foreground text-center">{mode.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
