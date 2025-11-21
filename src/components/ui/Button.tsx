import { ReactNode, ButtonHTMLAttributes, cloneElement, isValidElement } from 'react';
import { Link } from '../Link';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  asChild?: boolean;
  children: ReactNode;
}

export const Button = ({ 
  variant = 'default', 
  size = 'default',
  asChild = false,
  children,
  className = '',
  ...props 
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25',
    outline: 'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  };

  const sizes = {
    sm: 'h-9 px-3 text-sm rounded-xl',
    default: 'h-10 px-4 py-2 rounded-xl',
    lg: 'h-12 px-8 text-base rounded-full',
    icon: 'h-10 w-10 rounded-xl',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (asChild && isValidElement(children)) {
    // Check if children is a Link component by checking for 'to' prop
    if (children.props && 'to' in children.props) {
      return (
        <Link 
          to={children.props.to} 
          className={`${classes} ${children.props.className || ''}`}
        >
          {children.props.children || children}
        </Link>
      );
    }
    return cloneElement(children, {
      className: `${classes} ${children.props.className || ''}`,
      ...children.props,
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

