import React, { useRef } from 'react';
import { useCustomCursor } from '../hooks/useCustomCursor.ts';

export const CustomCursor: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useCustomCursor({ rootRef, dotRef, ringRef, trailRef });

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-hover="default"
      className="custom-cursor"
    >
      <div ref={trailRef} className="custom-cursor-trail" />
      <div ref={ringRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
};
