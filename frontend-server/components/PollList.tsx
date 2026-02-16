import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


export function PollList({ polls, onPollClick }: any) {
  if (polls.length === 0) {
    return (
      <div className="text-center py-16 bg-muted/30 rounded-lg border border-dashed text-muted-foreground">
        <h3 className="text-xl font-semibold mb-2">No polls yet</h3>
        <p>Create the first poll to get started</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {polls.map((poll: any) => (
        <Card 
          key={poll.id}
          className="cursor-pointer hover:shadow-md transition-all hover:border-primary/50"
          onClick={() => onPollClick(poll.id)}
        >
          <CardHeader>
            <CardTitle className="text-lg line-clamp-2">{poll.question}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium text-xs">
                📝 {poll.options.length} options
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium text-xs">
                🗳️ {poll.options.reduce((sum: number, o: any) => sum + (o._count?.votes || 0), 0)} Total Votes
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
