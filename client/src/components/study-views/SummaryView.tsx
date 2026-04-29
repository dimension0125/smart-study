import React from 'react';
import { Section } from '@/contexts/StudyContext';
import { Card } from '@/components/ui/card';

interface SummaryViewProps {
  section: Section;
}

export default function SummaryView({ section }: SummaryViewProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-primary/8 to-transparent border-primary/20">
        <div className="flex gap-3 mb-4">
          <div className="text-2xl">📖</div>
          <h3 className="text-lg font-semibold text-foreground">요약</h3>
        </div>
        <p className="text-foreground leading-relaxed whitespace-pre-wrap text-sm">
          {section.summary}
        </p>
      </Card>
    </div>
  );
}
