import React, { useState } from 'react';
import HeaderSection from '@/components/layout/HeaderSection';
import QuestionList, { AIQLevel } from '@/components/Assessment/QuestionList';
import AIQLevelDisplay from '@/components/Assessment/AIQLevelDisplay';
import ScreenerNotes from '@/components/Assessment/ScreenerNotes';

const AIQAssessmentPage: React.FC = () => {
  const [currentAIQLevel, setCurrentAIQLevel] = useState<AIQLevel>(null);

  const handleAIQLevelChange = (level: AIQLevel) => {
    setCurrentAIQLevel(level);
  };

  return (
    // Overall layout: flex column, items centered, starting from top, full height, background, and text color.
    // overflow-y-auto allows scrolling if content exceeds screen height.
    <div className="flex flex-col items-center justify-start h-screen w-full bg-background text-foreground overflow-y-auto">
      {/* Main content wrapper: constrained width, overall padding, and flex column for children with gap. */}
      {/* Corresponds to 'overall.sizing.mainContent' from layout requirements. */}
      <div className="w-full max-w-4xl p-6 flex flex-col gap-6">
        
        {/* Header Section Component */}
        <HeaderSection />

        {/* Main content card holding QuestionList and AIQLevelDisplay */}
        {/* Corresponds to 'mainContent.container' with its specific background, shadow, and padding. */}
        <main className="bg-card text-card-foreground rounded-lg shadow-lg p-6">
          {/* Inner layout for QuestionList and AIQLevelDisplay, stacked vertically with a gap. */}
          {/* Corresponds to 'mainContent.layout'. */}
          <div className="flex flex-col gap-6">
            <QuestionList onAIQLevelChange={handleAIQLevelChange} />
            <AIQLevelDisplay currentLevel={currentAIQLevel} />
          </div>
        </main>

        {/* Screener Notes Area */}
        {/* Wrapper for ScreenerNotes. 'w-full' from 'overall.sizing.notesArea'. */}
        {/* 'mt-6' spacing is handled by the parent 'gap-6'. */}
        {/* 'p-4' for ScreenerNotes is handled internally by the Card component structure. */}
        <div className="w-full">
          <ScreenerNotes />
        </div>

      </div>
    </div>
  );
};

export default AIQAssessmentPage;
