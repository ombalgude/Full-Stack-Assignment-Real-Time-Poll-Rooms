// Poll list component
export function PollList({ polls, onPollClick }: any) {
  if (polls.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No polls yet</h3>
        <p className="text-gray-600">Create the first poll to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {polls.map((poll: any) => (
        <div
          key={poll.id}
          onClick={() => onPollClick(poll.id)}
          className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md cursor-pointer transition-all"
        >
          <h3 className="font-bold text-xl mb-2">{poll.question}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>📝 {poll.options.length} options</span>
            <span>•</span>
            <span>🗳️ {poll.options.reduce((sum: number, o: any) => sum + o._count.votes, 0)} votes</span>
          </div>
        </div>
      ))}
    </div>
  );
}
