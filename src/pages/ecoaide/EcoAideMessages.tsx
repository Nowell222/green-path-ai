import EcoAideLayout from '@/components/layouts/EcoAideLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

const messages = [
  { id: 1, from: 'Dispatch', message: 'New urgent pickup assigned at SM San Juan. Please prioritize.', time: '10:30 AM', isOwn: false },
  { id: 2, from: 'You', message: 'Acknowledged. Heading there after current task.', time: '10:32 AM', isOwn: true },
  { id: 3, from: 'Dispatch', message: 'Client requested pickup before 2 PM. Can you make it?', time: '10:45 AM', isOwn: false },
  { id: 4, from: 'You', message: 'Yes, ETA is around 1:30 PM.', time: '10:47 AM', isOwn: true },
];

export default function EcoAideMessages() {
  return (
    <EcoAideLayout>
      <div className="p-4 space-y-4 flex flex-col h-[calc(100vh-8rem)]">
        <h1 className="text-xl font-display font-bold">Messages</h1>
        <Card className="card-eco flex-1 flex flex-col">
          <CardHeader className="pb-2"><CardTitle className="text-base font-display flex items-center gap-2"><MessageSquare className="w-5 h-5 text-primary" />Dispatch & Admin</CardTitle></CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto mb-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${msg.isOwn ? 'bg-primary text-primary-foreground' : 'bg-accent'}`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${msg.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button size="icon"><Send className="w-4 h-4" /></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </EcoAideLayout>
  );
}
