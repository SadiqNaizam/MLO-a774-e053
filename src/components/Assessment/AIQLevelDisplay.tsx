import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export type AIQLevel = 'High' | 'Medium' | 'Low' | null;

interface AIQLevelDisplayProps {
  currentLevel: AIQLevel;
  className?: string;
}

const AIQLevelDisplay: React.FC<AIQLevelDisplayProps> = ({ currentLevel, className }) => {
  const levels: Exclude<AIQLevel, null>[] = ['High' as const, 'Medium' as const, 'Low' as const];

  return (
    <div className={cn("py-6 flex flex-col items-start sm:flex-row sm:items-center sm:justify-start", className)}>
      <Label className="text-base font-semibold text-foreground mr-4 mb-2 sm:mb-0 whitespace-nowrap">AIQ Level:</Label>
      <div className="flex items-center space-x-6">
        {levels.map(level => (
          <div key={level} className="flex items-center space-x-2">
            <Checkbox
              id={`level-${level.toLowerCase()}`}
              checked={currentLevel === level}
              aria-readonly={true} // Indicates the checkbox is not user-editable here
              tabIndex={-1} // Removes it from keyboard navigation as it's for display
              className={cn(
                "w-5 h-5 rounded-sm border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground",
                "disabled:opacity-100" // Ensure it doesn't look faded if disabled attribute were used elsewhere
              )}
            />
            <Label htmlFor={`level-${level.toLowerCase()}`} className="text-base text-foreground">
              {level}
            </Label>
          </div>
        ))}
      </div>
      <p className="text-xs text-secondary-foreground mt-2 sm:mt-0 sm:ml-4 whitespace-nowrap">
        (Auto calculated using above inputs)
      </p>
    </div>
  );
};

export default AIQLevelDisplay;
