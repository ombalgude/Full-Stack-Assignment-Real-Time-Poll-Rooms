// Simple Button Component
export function Button({ children, onClick, variant = 'primary', type = 'button', disabled = false }: any) {
  const styles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-2 rounded-lg font-medium transition-colors',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-medium transition-colors',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles[variant as keyof typeof styles]} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}
