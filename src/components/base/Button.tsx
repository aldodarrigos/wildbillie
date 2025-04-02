import { cn } from '@/lib/utils';
import { Button as ButtonBase } from '@heroui/button';

interface ButtonProps {
  children: React.ReactNode;
  color?: 'primary' | 'secondary';
  className?: string;
  variant?:
    | 'flat'
    | 'ghost'
    | 'solid'
    | 'bordered'
    | 'light'
    | 'faded'
    | 'shadow';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  loading?: boolean;
  onClick?: () => void;
}

const colorStyles = {
  primary: 'bg-primary-gradient text-white',
  secondary: 'bg-secondary-gradient text-white',
};

export default function Button(props: ButtonProps) {
  const {
    color = 'primary',
    variant = 'solid',
    size = 'md',
    radius = 'md',
    ...rest
  } = props;

  return (
    <ButtonBase
      radius={radius}
      variant={variant}
      size={size}
      className={cn(colorStyles[color], props.className)}
      {...rest}
    >
      {props.children}
    </ButtonBase>
  );
}
