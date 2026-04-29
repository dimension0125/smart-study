import React, { useState, useEffect } from 'react';
import { useStudy } from '@/contexts/StudyContext';
import ChapterSelector from '@/components/ChapterSelector';
import SectionSelector from '@/components/SectionSelector';
import StudyModeSelector, { StudyMode } from '@/components/StudyModeSelector';
import StudyContent from '@/components/StudyContent';
import { BookOpen, Menu, X } from 'lucide-react';

export default function Home() {
  const [studyMode, setStudyMode] = useState<StudyMode>('summary');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { chapters, setCurrentChapter } = useStudy();

  useEffect(() => {
    if (chapters.length > 0) {
      setCurrentChapter(chapters[0].id);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-sm">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/15">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Smart Study</h1>
              <p className="text-xs text-muted-foreground font-medium">과학 학습 플랫폼</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div
            className={`md:col-span-1 space-y-6 ${
              !sidebarOpen && 'hidden md:block'
            }`}
          >
            <div className="space-y-6 sticky top-24">
              <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
                <ChapterSelector />
              </div>
              <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
                <SectionSelector />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-8">
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
                <StudyModeSelector currentMode={studyMode} onModeChange={setStudyMode} />
              </div>
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <StudyContent mode={studyMode} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Smart Study</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                과학 학습을 위한 종합 플랫폼으로, 다양한 학습 방식을 제공합니다.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">학습 기능</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>📖 요약: 핵심 내용 정리</li>
                <li>💡 개념: 상세한 설명</li>
                <li>🧠 암기: 중요 포인트</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">더 알아보기</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>⚡ 플래시카드: 양방향 학습</li>
                <li>🧪 퀴즈: 기초/심화 난이도</li>
                <li>📊 진행 상황 추적</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
            <p>&copy; 2026 Smart Study. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
