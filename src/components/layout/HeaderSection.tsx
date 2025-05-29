import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  className,
  title = "AI QUOTIENT (AIQ) ASSESSMENT", // Default based on Project Info and targetPage
  subtitle = "SCREENING AI-FRIENDLY TALENT", // Default based on Project Info and image
}) => {
  return (
    <header
      className={cn(
        'flex flex-col items-center justify-center py-6 md:py-8',
        className
      )}
    >
      <h1 className="text-3xl text-center sm:text-4xl font-extrabold text-foreground uppercase tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-center text-base sm:text-lg font-semibold text-secondary-foreground uppercase tracking-wider">
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default HeaderSection;
