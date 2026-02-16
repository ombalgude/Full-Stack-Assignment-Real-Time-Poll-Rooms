'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { roomAPI } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [roomName, setRoomName] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/signin');
    }
  }, [router]);

  const createRoom = async () => {
    setLoading(true);
    try {
      const { data } = await roomAPI.create(roomName || 'Untitled Room');
      setOpen(false);
      router.push(`/room/${data.roomId}`);
    } catch (err) {
      alert('Failed to create room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="lg">+ Create Room</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Room</DialogTitle>
                <DialogDescription>
                  Give your room a name to get started. You can add polls later.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Room Name</Label>
                  <Input
                    id="name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="e.g., Team Meeting, Class Poll"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={createRoom} disabled={loading}>
                  {loading ? 'Creating...' : 'Create Room'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 
                TODO: Fetch actual rooms list. 
                Currently the API might only support creating rooms or implicit rooms.
                Based on previous code, there was no "Your Rooms" list in state, only empty state or headers.
                If there is an API to get rooms, we should add it.
                For now, preserving the "No rooms yet" state but styled better.
            */}
            
            <Card className="col-span-full py-16 text-center bg-muted/50 border-dashed">
                <CardContent>
                    <h3 className="text-xl font-semibold mb-2">No rooms yet</h3>
                    <p className="text-muted-foreground mb-6">Create your first room to start organizing polls</p>
                    <Button variant="outline" onClick={() => setOpen(true)}>Create Room</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </Container>
  );
}
