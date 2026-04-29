import React from 'react';
import { useStudy } from '@/contexts/StudyContext';
import { StudyMode } from './StudyModeSelector';
import SummaryView from './study-views/SummaryView';
import ConceptView from './study-views/ConceptView';
import MemorizeView from './study-views/MemorizeView';
import FlashcardView from './study-views/FlashcardView';
import QuizView from './study-views/QuizView';

interface StudyContentProps {
  mode: StudyMode;
}

export default function StudyContent({ mode }: StudyContentProps) {
  const { getCurrentSection } = useStudy();
  const section = getCurrentSection();

  if (!section) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">학습할 단원을 선택해주세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">{section.title}</h2>
      </div>

      {mode === 'summary' && <SummaryView section={section} />}
      {mode === 'concept' && <ConceptView section={section} />}
      {mode === 'memorize' && <MemorizeView section={section} />}
      {mode === 'flashcard' && <FlashcardView section={section} />}
      {mode === 'quiz' && <QuizView section={section} />}
    </div>
  );
}
