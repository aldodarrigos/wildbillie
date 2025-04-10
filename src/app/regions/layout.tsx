import AppContainer from "@/components/AppContainer";

export default function RegionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppContainer variant="fluid">{children}</AppContainer>;
}