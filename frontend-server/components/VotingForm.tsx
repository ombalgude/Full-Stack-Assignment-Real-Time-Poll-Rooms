import { Button } from '@/components/ui/button';

import { Loader2 } from 'lucide-react';

export function VotingForm({ question, options, selected, onSelect, onSubmit, loading, isLoggedIn }: any) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">{question}</h2>
        <p className="text-muted-foreground text-sm">Select an option to vote</p>
      </div>
      
      <div className="space-y-3">
        {options.map((option: any) => {
          const isSelected = selected === option.id;
          return (
            <div 
              key={option.id} 
              onClick={() => onSelect(option.id)}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center gap-4 group
                ${isSelected 
                  ? 'border-primary bg-primary/5 shadow-md scale-[1.01]' 
                  : 'border-border bg-card hover:border-primary/50 hover:bg-accent/50 hover:shadow-sm'
                }
              `}
            >
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                ${isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/30 group-hover:border-primary/50'}
              `}>
                {isSelected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
              </div>
              
              <span className={`font-medium text-lg ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                {option.text}
              </span>

              {isSelected && (
                <div className="absolute right-4 text-primary animate-in fade-in zoom-in duration-200">
                  <span className="sr-only">Selected</span>
                  ✓
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <Button 
        onClick={onSubmit} 
        disabled={!selected || loading} 
        size="lg" 
        className="w-full text-lg h-12 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
      >
        {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        {loading ? 'Submitting Vote...' : 'Submit Vote'}
      </Button>
      
      {!isLoggedIn && (
        <p className="text-sm text-center text-muted-foreground">
          You need to sign in to vote
        </p>
      )}
    </div>
  );
}
