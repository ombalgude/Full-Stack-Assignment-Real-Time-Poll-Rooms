// Create poll form component
import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';

export function CreatePollForm({ onSubmit, loading }: any) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const handleSubmit = () => {
    const filteredOptions = options.filter(o => o.trim());
    if (filteredOptions.length < 2) {
      alert('Please add at least 2 options');
      return;
    }
    onSubmit(question, filteredOptions);
    setQuestion('');
    setOptions(['', '']);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <Input
        label="Question"
        value={question}
        onChange={(e: any) => setQuestion(e.target.value)}
        placeholder="What's your question?"
        required
      />
      
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Options (2-5)
      </label>
      {options.map((opt, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={opt}
            onChange={(e) => {
              const newOpts = [...options];
              newOpts[i] = e.target.value;
              setOptions(newOpts);
            }}
            placeholder={`Option ${i + 1}`}
            required
          />
          {options.length > 2 && (
            <button
              onClick={() => setOptions(options.filter((_, idx) => idx !== i))}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      ))}
      
      {options.length < 5 && (
        <button
          onClick={() => setOptions([...options, ''])}
          className="text-blue-600 text-sm mb-4 hover:underline"
        >
          + Add Option
        </button>
      )}
      
      <div className="mt-4">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Creating...' : 'Create Poll'}
        </Button>
      </div>
    </div>
  );
}
