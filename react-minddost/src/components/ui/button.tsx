import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({ className, ...props }: ButtonProps) {
  return <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium ${className}`} {...props} />;
} 