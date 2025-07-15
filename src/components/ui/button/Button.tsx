import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  colorScheme?: 'brand' | 'error' | 'warning' | 'success' | 'gray' | 'blue-light';
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = 'md',
  variant = 'primary',
  startIcon,
  endIcon,
  onClick,
  className = '',
  disabled = false,
  colorScheme = 'brand',
}) => {
  const sizeClasses = {
    sm: 'px-3.5 py-2 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3.5 text-sm',
  };

  const variantClasses = {
    primary: `
      bg-${colorScheme}-500 
      text-white 
      shadow-theme-xs 
      hover:bg-${colorScheme}-600
      active:scale-95
      disabled:bg-${colorScheme}-300
    `,
    outline: `
      bg-transparent
      text-${colorScheme}-500
      ring-1 ring-inset ring-${colorScheme}-500
      hover:bg-white/90 
      dark:hover:bg-transparent
      dark:hover:text-white
      active:scale-95
    `,
  };

  const safeVariantClass = variantClasses[variant].replace(/\$\{colorScheme\}/g, colorScheme);

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-lg 
        transition-all duration-150 ease-in-out 
        focus:outline-none 
        ${className} 
        ${sizeClasses[size]} 
        ${safeVariantClass} 
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
