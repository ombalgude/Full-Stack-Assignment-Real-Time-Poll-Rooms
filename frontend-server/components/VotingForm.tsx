// Voting form component
import { Button } from './Button';

export function VotingForm({ options, selected, onSelect, onSubmit, loading, isLoggedIn }: any) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Cast Your Vote</h2>
      <div className="space-y-3 mb-6">
        {options.map((option: any) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
              selected === option.id
                ? 'border-blue-600 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">{option.text}</span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selected === option.id ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
              }`}>
                {selected === option.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <Button onClick={onSubmit} disabled={!selected || loading}>
        {loading ? 'Submitting...' : 'Submit Vote'}
      </Button>
      
      {!isLoggedIn && (
        <p className="mt-4 text-sm text-center text-gray-500">
          You need to sign in to vote
        </p>
      )}
    </>
  );
}
