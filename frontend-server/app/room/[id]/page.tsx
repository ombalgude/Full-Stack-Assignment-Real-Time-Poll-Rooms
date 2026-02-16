'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PageHeader } from '@/components/PageHeader';
import { CreatePollForm } from '@/components/CreatePollForm';
import { PollList } from '@/components/PollList';
import { roomAPI, pollAPI } from '@/lib/api';

const WS_URL = 'ws://localhost:8080';

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = parseInt(params.id as string);
  
  const [room, setRoom] = useState<any>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadRoom = useCallback(async () => {
    try {
      const { data } = await roomAPI.get(roomId);
      setRoom(data);
    } catch {
      alert('Failed to load room');
    }
  }, [roomId]);

  useEffect(() => {
    loadRoom();
    
    // WebSocket for real-time updates
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'join_room', roomId }));
    };
    ws.onmessage = () => loadRoom();
    
    return () => ws.close();
  }, [roomId, loadRoom]);

  const handleCreatePoll = async (question: string, options: string[]) => {
    setLoading(true);
    try {
      const { data } = await pollAPI.create(question, roomId, options);
      setShowCreate(false);
      if (data && data.poll && data.poll.id) {
          router.push(`/poll/${data.poll.id}`);
      } else {
          loadRoom();
      }
    } catch (err) {
      alert('Failed to create poll');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('✓ Link copied to clipboard!');
  };

  if (!room) {
    return (
      <Container>
        <LoadingSpinner message="Loading room..." />
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <PageHeader 
          title={room.name}
          subtitle={`Created by ${room.creator.username}`}
          onShare={copyLink}
        />

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight">Polls</h2>
            <Button onClick={() => setShowCreate(!showCreate)}>
              {showCreate ? 'Cancel' : '+ Create Poll'}
            </Button>
          </div>

          {showCreate && (
            <CreatePollForm onSubmit={handleCreatePoll} loading={loading} />
          )}

          <PollList 
            polls={room.polls} 
            onPollClick={(id: number) => router.push(`/poll/${id}`)} 
          />
        </div>
      </div>
    </Container>
  );
}
