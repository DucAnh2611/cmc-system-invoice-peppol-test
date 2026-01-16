import React from 'react';
import { cn } from '../utils/cn';

interface SuspendProps {
  loading: boolean;
  element: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Suspend = ({ loading, element, children, className }: SuspendProps) => {
  if (loading) {
    return <div className={cn(className)}>{element}</div>;
  }

  return <>{children}</>;
};

export default Suspend;
