export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-gradient-to-b from-purple-50 to-pink-50 min-h-screen">
      {children}
    </section>
  );
}
