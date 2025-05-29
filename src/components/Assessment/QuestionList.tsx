import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import QuestionCard, { Question, QuestionSelection } from './QuestionCard';

export type AIQLevel = 'High' | 'Medium' | 'Low' | null;

interface QuestionListProps {
  onAIQLevelChange: (level: AIQLevel) => void;
  className?: string;
}

// This interface defines the structure of a question including its dynamic selection state
interface QuestionStateInternal extends Question {
  selection: QuestionSelection;
}

// Dummy data for assessment questions, defined directly in the component
const initialQuestionsData: Question[] = [
  { id: 'q1', number: '01', text: "Tell me about a time when you adopted a new technology or tool on your own. What motivated you, and what was the result?", subtext: "(Looks for curiosity and initiative)" },
  { id: 'q2', number: '02', text: "How do you stay up to date with new trends or tools in your field? Have you come across anything AI-related?", subtext: "(Assesses awareness and interest)" },
  { id: 'q3', number: '03', text: "Have you experimented with any AI tools, even casually? (e.g., ChatGPT, image generators, automation bots)", subtext: "(Gauges willingness to experiment)" },
  { id: 'q4', number: '04', text: "Can you think of a repetitive or time-consuming task in your role that could benefit from automation or AI?", subtext: "(Tests ability to identify practical AI opportunities)" },
  { id: 'q5', number: '05', text: "Tell me about a time you had to change your way of working because of a new process or tool. How did you respond?", subtext: "(Evaluates adaptability)" },
  { id: 'q6', number: '06', text: "Can you open an AI tool of your choice and show me how you would use it to solve something or get a result? Pls walk me through the process, step by step" }
];

const QuestionList: React.FC<QuestionListProps> = ({ onAIQLevelChange, className }) => {
  const [questions, setQuestions] = useState<QuestionStateInternal[]>(
    initialQuestionsData.map(q => ({ ...q, selection: null }))
  );

  const handleSelectionChange = useCallback((questionId: string, newSelection: QuestionSelection) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q =>
        q.id === questionId ? { ...q, selection: newSelection } : q
      )
    );
  }, []);

  useEffect(() => {
    const relevantCount = questions.filter(q => q.selection === 'relevant').length;
    const totalAnswered = questions.filter(q => q.selection !== null).length;
    
    let newLevel: AIQLevel = null;

    if (totalAnswered > 0) {
      if (relevantCount >= 5) {
        newLevel = 'High' as const;
      } else if (relevantCount >= 3) { // 3 or 4 relevant answers
        newLevel = 'Medium' as const;
      } else { // 0, 1, or 2 relevant answers
        newLevel = 'Low' as const;
      }
    } 
    // Example: To set a default level if no questions are answered, matching the image's 'Low' selection:
    // else {
    //   newLevel = 'Low' as const; 
    // }

    onAIQLevelChange(newLevel);
  }, [questions, onAIQLevelChange]);

  return (
    <div className={cn("flex flex-col", className)}>
      {questions.map(question => (
        <QuestionCard
          key={question.id}
          question={question}
          currentSelection={question.selection}
          onSelectionChange={handleSelectionChange}
        />
      ))}
    </div>
  );
};

export default QuestionList;
