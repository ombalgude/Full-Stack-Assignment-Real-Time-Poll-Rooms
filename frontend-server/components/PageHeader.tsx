// Simple page header component
import { Button } from './Button';

export function PageHeader({ title, subtitle, onShare }: any) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
        
        {onShare && (
          <Button onClick={onShare} variant="outline">
             Share
          </Button>
        )}
      </div>
    </div>
  );
}
