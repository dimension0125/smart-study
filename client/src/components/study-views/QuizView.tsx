import React, { useState } from 'react';
import { Section, Quiz } from '@/contexts/StudyContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, XCircle, RotateCw } from 'lucide-react';

interface QuizViewProps {
  section: Section;
}

interface QuizState {
  currentIndex: number;
  selectedAnswer: number | null;
  answered: boolean;
  score: number;
  total: number;
}

export default function QuizView({ section }: QuizViewProps) {
  const [difficulty, setDifficulty] = useState<'basic' | 'advanced'>('basic');
  const [quizState, setQuizState] = useState<QuizState>({
    currentIndex: 0,
    selectedAnswer: null,
    answered: false,
    score: 0,
    total: 0,
  });

  const quizzes = difficulty === 'basic' ? section.quiz.basic : section.quiz.advanced;
  const current = quizzes[quizState.currentIndex];

  const handleSelectAnswer = (index: number) => {
    if (quizState.answered) return;
    setQuizState((prev) => ({
      ...prev,
      selectedAnswer: index,
      answered: true,
      score: index === current.correctAnswer ? prev.score + 1 : prev.score,
      total: prev.total + 1,
    }));
  };

  const handleNext = () => {
    if (quizState.currentIndex < quizzes.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedAnswer: null,
        answered: false,
      }));
    }
  };

  const handleReset = () => {
    setQuizState({
      currentIndex: 0,
      selectedAnswer: null,
      answered: false,
      score: 0,
      total: 0,
    });
  };

  const handleChangeDifficulty = (newDifficulty: 'basic' | 'advanced') => {
    setDifficulty(newDifficulty);
    handleReset();
  };

  const isAnswered = quizState.answered;
  const isCorrect = quizState.selectedAnswer === current.correctAnswer;
  const isLastQuestion = quizState.currentIndex === quizzes.length - 1;

  return (
    <div className="space-y-6">
      <div className="flex gap-3 mb-4">
        <div className="text-2xl">🧪</div>
        <h3 className="text-lg font-semibold text-foreground">퀴즈</h3>
      </div>

      <Tabs
        value={difficulty}
        onValueChange={(value) => handleChangeDifficulty(value as 'basic' | 'advanced')}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">🎯 기초 난이도</TabsTrigger>
          <TabsTrigger value="advanced">⭐ 심화 난이도</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <QuizContent
            current={current}
            quizState={quizState}
            quizzes={quizzes}
            isAnswered={isAnswered}
            isCorrect={isCorrect}
            isLastQuestion={isLastQuestion}
            onSelectAnswer={handleSelectAnswer}
            onNext={handleNext}
            onReset={handleReset}
          />
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <QuizContent
            current={current}
            quizState={quizState}
            quizzes={quizzes}
            isAnswered={isAnswered}
            isCorrect={isCorrect}
            isLastQuestion={isLastQuestion}
            onSelectAnswer={handleSelectAnswer}
            onNext={handleNext}
            onReset={handleReset}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface QuizContentProps {
  current: Quiz;
  quizState: QuizState;
  quizzes: Quiz[];
  isAnswered: boolean;
  isCorrect: boolean;
  isLastQuestion: boolean;
  onSelectAnswer: (index: number) => void;
  onNext: () => void;
  onReset: () => void;
}

function QuizContent({
  current,
  quizState,
  quizzes,
  isAnswered,
  isCorrect,
  isLastQuestion,
  onSelectAnswer,
  onNext,
  onReset,
}: QuizContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground font-medium">
          문제 {quizState.currentIndex + 1} / {quizzes.length}
        </p>
        {isAnswered && (
          <p className="text-sm font-semibold text-primary">
            현재 점수: {quizState.score} / {quizState.total}
          </p>
        )}
      </div>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="text-base font-semibold text-foreground mb-6">{current.question}</h3>

        <div className="space-y-3">
          {current.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelectAnswer(index)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                quizState.selectedAnswer === index
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                    : 'border-red-500 bg-red-50 dark:bg-red-950/30'
                  : isAnswered && index === current.correctAnswer
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                    : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{option}</p>
                </div>
                {isAnswered && index === current.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                )}
                {isAnswered && quizState.selectedAnswer === index && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>
      </Card>

      {isAnswered && (
        <Card className={`p-4 border-l-4 ${isCorrect ? 'border-l-green-500 bg-green-50 dark:bg-green-950/30' : 'border-l-red-500 bg-red-50 dark:bg-red-950/30'}`}>
          <p className="font-semibold mb-2 text-foreground text-sm">
            {isCorrect ? '✅ 정답입니다!' : '❌ 오답입니다.'}
          </p>
          <p className="text-sm text-foreground leading-relaxed">{current.explanation}</p>
        </Card>
      )}

      <div className="flex gap-3">
        {isAnswered && (
          <>
            {isLastQuestion ? (
              <Button onClick={onReset} className="flex-1">
                <RotateCw className="w-4 h-4 mr-2" />
                다시 풀기
              </Button>
            ) : (
              <Button onClick={onNext} className="flex-1">
                다음 문제
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
