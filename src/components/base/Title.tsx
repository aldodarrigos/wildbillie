export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-5xl md:text-6xl font-bold text-center my-12 bg-gradient-to-r from-[#FF9B05] to-[#FF5005] bg-clip-text text-transparent">
      {children}
    </h2>
  );
}