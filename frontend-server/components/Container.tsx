// Container Component - wraps all pages with consistent layout
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen max-w-5xl mx-auto flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
