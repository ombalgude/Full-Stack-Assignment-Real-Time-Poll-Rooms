import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onShare?: () => void;
}

export function PageHeader({ title, subtitle, onShare }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      
      {onShare && (
        <Button onClick={onShare} variant="outline" size="sm" className="gap-2">
           <Share2 className="h-4 w-4" />
           Share
        </Button>
      )}
    </div>
  );
}
