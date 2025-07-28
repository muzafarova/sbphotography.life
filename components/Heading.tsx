export default function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-center sm:text-right">
      <span className="inline-block px-4 sm:py-1 text-3xl sm:w-2/5 sm:text-left sm:border-b-2 sm:text-xl mx-8">
        {children}
      </span>
    </h1>
  );
}
