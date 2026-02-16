import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CreatePollFormProps {
  onSubmit: (question: string, options: string[]) => void;
  loading: boolean;
}

export function CreatePollForm({ onSubmit, loading }: CreatePollFormProps) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const filteredOptions = options.filter(o => o.trim());
    if (filteredOptions.length < 2) {
      alert('Please add at least 2 options');
      return;
    }
    onSubmit(question, filteredOptions);
    setQuestion('');
    setOptions(['', '']);
  };

  const updateOption = (index: number, value: string) => {
    const newOpts = [...options];
    newOpts[index] = value;
    setOptions(newOpts);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, idx) => idx !== index));
  };

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What's your question?"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Options (2-5)</Label>
            {options.map((opt, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={opt}
                  onChange={(e) => updateOption(i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  required
                />
                {options.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(i)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          
          {options.length < 5 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={addOption}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
               Add Option
            </Button>
          )}
          
          <div className="pt-2">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Creating...' : 'Create Poll'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
