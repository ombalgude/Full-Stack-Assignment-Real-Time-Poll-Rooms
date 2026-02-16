// Poll results component
export function PollResults({ options, getPercentage }: any) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Live Results</h2>
      <div className="space-y-4 mb-6">
        {options.map((option: any) => {
          const percentage = getPercentage(option.votes);
          return (
            <div key={option.id}>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-lg">{option.text}</span>
                <span className="text-gray-600">
                  {option.votes} ({percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <p className="text-green-700 font-medium">
          ✓ Your vote has been recorded. Results update in real-time!
        </p>
      </div>
    </>
  );
}
