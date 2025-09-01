import React from 'react';

interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export default function Form({ children, onSubmit, className = '' }: Readonly<FormProps>) {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
}
