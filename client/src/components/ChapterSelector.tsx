import React from 'react';
import { useStudy } from '@/contexts/StudyContext';
import { BookOpen } from 'lucide-react';

export default function ChapterSelector() {
  const { chapters, currentChapterId, setCurrentChapter } = useStudy();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2.5 rounded-lg bg-primary/15">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">학습 단원</h2>
      </div>
      <div className="space-y-2.5">
        {chapters.map((chapter) => {
          const chapterLabel = chapter.id === 0 ? '기초단원' : `${chapter.id}단원`;

          return (
            <button
              key={chapter.id}
              onClick={() => setCurrentChapter(chapter.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left duration-200 ${
                currentChapterId === chapter.id
                  ? 'border-primary bg-primary/8 shadow-md'
                  : 'border-border bg-card hover:border-primary/40 hover:shadow-sm'
              }`}
            >
              <div className="font-semibold text-foreground mb-1.5 text-sm">
                {chapterLabel}. {chapter.title}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {chapter.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
