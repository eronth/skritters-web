import React, { useState, useRef } from 'react';
import './Keyword.css'; // We'll define this CSS file separately
import './times/times.css'; // Importing times specific styles if needed

type Props = {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  hoverContent?: React.ReactNode; // Can be any React node, including fragments with components
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'; // Optional positioning
}

export default function Keyword({ 
  className, 
  style, 
  children, 
  hoverContent,
  tooltipPosition = 'top' // Default to showing below the keyword
}: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const keywordRef = useRef<HTMLSpanElement>(null);
  
  // Only show tooltip if hoverContent is provided
  const showTooltip = isHovering && hoverContent;
  const hasTooltip = !!hoverContent;
  
  return (
    <span
      ref={keywordRef}
      className={`keyword ${hasTooltip ? 'tooltip' : ''} ${className || ''}`}
      style={style}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      
      {showTooltip && (
        <div className={`keyword-tooltip keyword-tooltip-${tooltipPosition}`}>
          {hoverContent}
        </div>
      )}
    </span>
  );
}