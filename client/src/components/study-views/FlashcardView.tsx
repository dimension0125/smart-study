import React, { useState } from 'react';
import { Section } from '@/contexts/StudyContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashcardViewProps {
  section: Section;
}

export default function FlashcardView({ section }: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const flashcards = section.flashcards;
  const current = flashcards[currentIndex];

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  if (flashcards.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">플래시카드가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3 mb-4">
        <div className="text-2xl">⚡</div>
        <h3 className="text-lg font-semibold text-foreground">플래시카드</h3>
      </div>

      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground font-medium">
          {currentIndex + 1} / {flashcards.length}
        </p>
      </div>

      <div
        className="h-80 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <Card
          className={`h-full p-8 flex items-center justify-center transition-all transform duration-300 ${
            isFlipped ? 'bg-accent/8 border-accent/30' : 'bg-primary/8 border-primary/30'
          }`}
        >
          <div className="text-center">
            <p className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
              {isFlipped ? '답변' : '질문'}
            </p>
            <p className="text-xl font-semibold text-foreground leading-relaxed">
              {isFlipped ? current.answer : current.question}
            </p>
            <p className="text-xs text-muted-foreground mt-8">클릭하여 뒤집기</p>
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          variant="outline"
          className="flex-1"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          이전
        </Button>
        <Button onClick={handleReset} variant="outline" size="sm">
          <RotateCw className="w-4 h-4" />
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          variant="outline"
          className="flex-1"
        >
          다음
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
