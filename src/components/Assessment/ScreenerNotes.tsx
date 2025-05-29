import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ScreenerNotesProps {
  className?: string;
  initialNotes?: string;
  onNotesChange?: (notes: string) => void;
}

const ScreenerNotes: React.FC<ScreenerNotesProps> = ({ className, initialNotes = "", onNotesChange }) => {
  const [notes, setNotes] = useState<string>(initialNotes);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = event.target.value;
    setNotes(newNotes);
    if (onNotesChange) {
      onNotesChange(newNotes);
    }
  }, [onNotesChange]);

  return (
    // Per layout requirements, this component forms the 'notesArea' card
    <Card className={cn("w-full bg-card shadow-md", className)}> 
      <CardHeader className="p-4 pb-2"> 
        <CardTitle className="text-base font-semibold text-foreground">Screener Notes / Comments:</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <Textarea
          value={notes}
          onChange={handleChange}
          placeholder="Enter your notes here..."
          className="min-h-[120px] w-full resize-y rounded-md border border-border bg-input p-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        />
      </CardContent>
    </Card>
  );
};

export default ScreenerNotes;
