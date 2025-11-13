import { ReactNode } from 'react';

interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export const Link = ({ to, children, className = '' }: LinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};
