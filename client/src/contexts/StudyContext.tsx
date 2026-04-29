import React, { createContext, useContext, useState, useCallback } from 'react';
import studyData from '../../../study_content.json';

export interface Chapter {
  id: number;
  title: string;
  description: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  summary: string;
  concept: string;
  memorize: string[];
  flashcards: Flashcard[];
  quiz: {
    basic: Quiz[];
    advanced: Quiz[];
  };
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface StudyContextType {
  chapters: Chapter[];
  currentChapterId: number;
  currentSectionId: string;
  setCurrentChapter: (id: number) => void;
  setCurrentSection: (id: string) => void;
  getCurrentChapter: () => Chapter | null;
  getCurrentSection: () => Section | null;
  getChapterById: (id: number) => Chapter | null;
  getSectionById: (id: string) => Section | null;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export const StudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const chapters = studyData.chapters as Chapter[];
  const [currentChapterId, setCurrentChapterId] = useState<number>(
    chapters.length > 0 ? chapters[0].id : 1
  );
  const [currentSectionId, setCurrentSectionId] = useState<string>(
    chapters.length > 0 && chapters[0].sections.length > 0
      ? chapters[0].sections[0].id
      : ''
  );

  const setCurrentChapter = useCallback((id: number) => {
    setCurrentChapterId(id);
    const chapter = chapters.find(c => c.id === id);
    if (chapter && chapter.sections.length > 0) {
      setCurrentSectionId(chapter.sections[0].id);
    }
  }, [chapters]);

  const setCurrentSection = (id: string) => {
    setCurrentSectionId(id);
  };

  const getCurrentChapter = () => {
    return chapters.find(c => c.id === currentChapterId) || null;
  };

  const getCurrentSection = () => {
    const chapter = getCurrentChapter();
    if (!chapter) return null;
    return chapter.sections.find(s => s.id === currentSectionId) || null;
  };

  const getChapterById = (id: number) => {
    return chapters.find(c => c.id === id) || null;
  };

  const getSectionById = (id: string) => {
    for (const chapter of chapters) {
      const section = chapter.sections.find(s => s.id === id);
      if (section) return section;
    }
    return null;
  };

  return (
    <StudyContext.Provider
      value={{
        chapters,
        currentChapterId,
        currentSectionId,
        setCurrentChapter,
        setCurrentSection,
        getCurrentChapter,
        getCurrentSection,
        getChapterById,
        getSectionById,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within StudyProvider');
  }
  return context;
};
