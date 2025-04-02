import Button from "./base/Button";

interface AppButtonProps {
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
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export default function AppButton(props: AppButtonProps) {
  return <Button {...props}>{props.children}</Button>;
}
