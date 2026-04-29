import React from 'react';
import { Section } from '@/contexts/StudyContext';
import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface MemorizeViewProps {
  section: Section;
}

export default function MemorizeView({ section }: MemorizeViewProps) {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <div className="flex gap-3 mb-3">
          <div className="text-2xl">🧠</div>
          <h3 className="text-lg font-semibold text-foreground">암기 포인트</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          다음 내용들을 꼭 기억해두세요!
        </p>
      </div>
      <div className="space-y-3">
        {section.memorize.map((item, index) => (
          <Card key={index} className="p-4 border-l-4 border-l-primary bg-primary/5">
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-foreground leading-relaxed text-sm">{item}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
