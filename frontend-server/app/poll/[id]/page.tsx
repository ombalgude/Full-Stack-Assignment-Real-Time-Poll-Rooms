'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container } from '@/components/Container';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PageHeader } from '@/components/PageHeader';
import { VotingForm } from '@/components/VotingForm';
import { PollResults } from '@/components/PollResults';
import { pollAPI } from '@/lib/api';

const WS_URL = 'ws://localhost:8080';

export default function PollPage() {
  const params = useParams();
  const router = useRouter();
  const pollId = parseInt(params.id as string);
  
  const [poll, setPoll] = useState<any>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPoll();
    
    // WebSocket for real-time updates
    const ws = new WebSocket(WS_URL);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'poll_updated' && data.payload.pollId === pollId) {
        setPoll((prev: any) => {
          if (!prev) return prev;
          return {
            ...prev,
            options: prev.options.map((opt: any) => {
              const updated = data.payload.options.find((o: any) => o.id === opt.id);
              return updated ? { ...opt, votes: updated.votes } : opt;
            }),
          };
        });
      }
    };
    
    return () => ws.close();
  }, [pollId]);

  const loadPoll = async () => {
    try {
      const { data } = await pollAPI.get(pollId);
      setPoll(data);
    } catch (err) {
      alert('Failed to load poll');
    }
  };

  const handleVote = async () => {
    if (!selected) return;
    
    if (!localStorage.getItem('token')) {
      router.push(`/signin?redirect=/poll/${pollId}`);
      return;
    }

    setLoading(true);
    try {
      await pollAPI.vote(pollId, selected);
      setHasVoted(true);
      loadPoll();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to vote. You may have already voted.');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('✓ Poll link copied to clipboard!');
  };

  const getTotalVotes = () => {
    return poll?.options.reduce((sum: number, o: any) => sum + o.votes, 0) || 0;
  };

  const getPercentage = (votes: number) => {
    const total = getTotalVotes();
    return total === 0 ? 0 : Math.round((votes / total) * 100);
  };

  if (!poll) {
    return (
      <Container>
        <LoadingSpinner message="Loading poll..." />
      </Container>
    );
  }

  const totalVotes = getTotalVotes();

  return (
    <Container>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <PageHeader
          title={poll.question}
          subtitle={poll.description || `Created by ${poll.creator}`}
          onShare={copyLink}
        />

        {/* Vote Count */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center mb-8">
          <span className="text-3xl font-bold text-blue-600">{totalVotes}</span>
          <span className="text-gray-600 ml-2">
            {totalVotes === 1 ? 'vote' : 'votes'}
          </span>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          {!hasVoted ? (
            <VotingForm
              options={poll.options}
              selected={selected}
              onSelect={setSelected}
              onSubmit={handleVote}
              loading={loading}
              isLoggedIn={!!localStorage.getItem('token')}
            />
          ) : (
            <PollResults
              options={poll.options}
              getPercentage={getPercentage}
            />
          )}
        </div>
      </div>
    </Container>
  );
}
