import Title from "./base/Title";


interface AppTitleProps {
  children: React.ReactNode;
}

export default function AppTitle({ children }: AppTitleProps) {
  return (
    <Title>{children}</Title>
  );
}
