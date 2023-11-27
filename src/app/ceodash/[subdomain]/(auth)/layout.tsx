export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:flex w-full h-screen">
      <div className="w-full md:w-1/2 bg-gradient-to-br from-green-400 to-blue-500"></div>
      <div className="w-full h-screen md:w-1/2 flex items-center justify-center px-[18%] md:px-[8%] lg:px-[10%]">
        {children}
      </div>
    </div>
  );
}
