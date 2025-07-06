export default function MainLayout({ children }) {
  return (
    <div className="w-screen h-screen min-h-0 min-w-20 bg-gray-100 overflow-hidden flex flex-col">
      {/* Main content fills all available space */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0">
        {children}
      </div>
    </div>
  );
}
