import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Interface for question data, shared with QuestionList
export interface Question {
  id: string;
  number: string;
  text: string;
  subtext?: string;
}

export type QuestionSelection = 'relevant' | 'non-relevant' | null;

interface QuestionCardProps {
  question: Question;
  currentSelection: QuestionSelection;
  onSelectionChange: (questionId: string, selection: QuestionSelection) => void;
  className?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, currentSelection, onSelectionChange, className }) => {
  const handleRelevantClick = () => {
    onSelectionChange(question.id, currentSelection === 'relevant' ? null : 'relevant' as const);
  };

  const handleNonRelevantClick = () => {
    onSelectionChange(question.id, currentSelection === 'non-relevant' ? null : 'non-relevant' as const);
  };

  return (
    <div className={cn("flex items-start py-4 border-b border-border last:border-b-0", className)}>
      <div className="w-12 flex-shrink-0 pt-0.5">
        <span className="text-primary font-bold text-2xl">{question.number}</span>
      </div>
      <div className="flex-grow mr-4">
        <p className="text-foreground leading-snug">{question.text}</p>
        {question.subtext && (
          <p className="text-secondary-foreground italic text-sm mt-1 leading-snug">{question.subtext}</p>
        )}
      </div>
      <div className="flex flex-col items-center w-28 flex-shrink-0 mx-2">
        <Label htmlFor={`relevant-${question.id}`} className="text-sm font-medium text-foreground mb-2 cursor-pointer">Relevant</Label>
        <Checkbox
          id={`relevant-${question.id}`}
          checked={currentSelection === 'relevant'}
          onCheckedChange={handleRelevantClick}
          className="w-6 h-6 rounded-sm border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
      </div>
      <div className="flex flex-col items-center w-28 flex-shrink-0 mx-2">
        <Label htmlFor={`non-relevant-${question.id}`} className="text-sm font-medium text-foreground mb-2 cursor-pointer">Non-Relevant</Label>
        <Checkbox
          id={`non-relevant-${question.id}`}
          checked={currentSelection === 'non-relevant'}
          onCheckedChange={handleNonRelevantClick}
          className="w-6 h-6 rounded-sm border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
