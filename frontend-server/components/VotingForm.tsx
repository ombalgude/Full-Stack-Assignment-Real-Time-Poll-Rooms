import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react';

export function VotingForm({ options, selected, onSelect, onSubmit, loading, isLoggedIn }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Cast Your Vote</h2>
      
      <RadioGroup value={selected?.toString()} onValueChange={(val) => onSelect(parseInt(val))}>
        <div className="space-y-3">
            {options.map((option: any) => (
            <div key={option.id} className="flex items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer" onClick={() => onSelect(option.id)}>
                <RadioGroupItem value={option.id.toString()} id={`option-${option.id}`} />
                <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer font-medium text-base">
                {option.text}
                </Label>
            </div>
            ))}
        </div>
      </RadioGroup>
      
      <Button onClick={onSubmit} disabled={!selected || loading} size="lg" className="w-full">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading ? 'Submitting...' : 'Submit Vote'}
      </Button>
      
      {!isLoggedIn && (
        <p className="text-sm text-center text-muted-foreground">
          You need to sign in to vote
        </p>
      )}
    </div>
  );
}
