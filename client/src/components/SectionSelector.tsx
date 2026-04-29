import React from 'react';
import { useStudy } from '@/contexts/StudyContext';
import { ChevronRight } from 'lucide-react';

export default function SectionSelector() {
  const { getCurrentChapter, currentSectionId, setCurrentSection } = useStudy();
  const chapter = getCurrentChapter();

  if (!chapter) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-foreground uppercase tracking-wide opacity-70 mb-4">
        {chapter.title}
      </h3>
      <div className="space-y-2">
        {chapter.sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setCurrentSection(section.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 text-left text-sm ${
              currentSectionId === section.id
                ? 'border-primary bg-primary/8 shadow-sm'
                : 'border-border bg-card hover:bg-muted/50 hover:border-primary/30'
            }`}
          >
            <span className="font-medium text-foreground">{section.title}</span>
            <ChevronRight className={`w-4 h-4 transition-transform ${currentSectionId === section.id ? 'text-primary' : 'text-muted-foreground'}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
