import Container from './base/Container';
interface ContainerProps {
  children: React.ReactNode;
  variant?: 'sm' | 'md' | 'lg' | 'xl' | 'fluid';
  className?: string;
}

export default function   AppContainer({
  children,
  variant = 'xl',
  className
}: ContainerProps) {
  return <Container variant={variant} className={className}>{children}</Container>;
}
