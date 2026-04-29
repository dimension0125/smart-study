import React from 'react';
import { Section } from '@/contexts/StudyContext';
import { Card } from '@/components/ui/card';

interface ConceptViewProps {
  section: Section;
}

export default function ConceptView({ section }: ConceptViewProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-accent/8 to-transparent border-accent/20">
        <div className="flex gap-3 mb-4">
          <div className="text-2xl">💡</div>
          <h3 className="text-lg font-semibold text-foreground">개념</h3>
        </div>
        <p className="text-foreground leading-relaxed whitespace-pre-wrap text-sm">
          {section.concept}
        </p>
      </Card>
    </div>
  );
}
