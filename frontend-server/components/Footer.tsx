export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-8 mt-auto">
      <div className="max-w-7xl mx-auto text-center text-gray-600">
        <p className="text-sm">© 2026 itsmyscreen. All rights reserved.</p>
        <p className="mt-2 text-sm">
          Built with ❤️ by{' '}
          <a 
            href="https://github.com/ombalgude" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Om Balgude
          </a>
          {' '} | {' '}
          <a 
            href="https://x.com/omm_0405" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            X (Twitter)
          </a>
        </p>
      </div>
    </footer>
  );
}
