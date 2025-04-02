import Container from './base/Container';
interface ContainerProps {
  children: React.ReactNode;
  variant?: 'sm' | 'md' | 'lg' | 'xl' | 'fluid';
  className?: string;
}

export default function AppContainer({
  children,
  variant = 'fluid',
}: ContainerProps) {
  return <Container variant={variant}>{children}</Container>;
}
