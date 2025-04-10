import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  variant?: 'sm' | 'md' | 'lg' | 'xl' | 'fluid';
  className?: string;
}

const variantClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  fluid: 'max-w-full w-full'
};

export default function Container({ 
  children, 
  variant = 'xl', 
  className 
}: ContainerProps) {
  return (
    <div
      className={cn(
       
        'container mx-auto px-4 sm:px-6 lg:px-8',
        className,
        variantClasses[variant]
      )}
    >
      {children}
    </div>
  );
} 