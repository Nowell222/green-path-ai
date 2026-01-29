import { useState, useRef, useEffect } from 'react';
import DriverLayout from '@/components/layouts/DriverLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Phone,
  MessageCircle,
  Clock,
  User,
  CheckCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender: 'driver' | 'dispatch';
  text: string;
  time: string;
  read: boolean;
}

const initialMessages: Message[] = [
  { id: '1', sender: 'dispatch', text: 'Good evening! Route R-12 is ready. Please confirm when you start.', time: '5:45 PM', read: true },
  { id: '2', sender: 'driver', text: 'Copy that. Starting route now.', time: '6:00 PM', read: true },
  { id: '3', sender: 'dispatch', text: 'Be advised: Road work near Purok 3, Block C. Alternate route recommended.', time: '6:15 PM', read: true },
  { id: '4', sender: 'driver', text: 'Thanks for the heads up. Taking alternate route.', time: '6:18 PM', read: true },
  { id: '5', sender: 'dispatch', text: 'Great work on the first half! You\'re ahead of schedule.', time: '6:45 PM', read: true },
];

const quickReplies = [
  'On my way',
  'Arrived at stop',
  'Need assistance',
  'Taking a break',
  'Route completed',
];

export default function DriverMessages() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || newMessage.trim();
    if (!messageText) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'driver',
      text: messageText,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      read: false,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate dispatch response
    setTimeout(() => {
      const responses = [
        'Message received. Thank you!',
        'Copy that. Keep up the good work!',
        'Noted. Let us know if you need anything.',
        'Thanks for the update!',
      ];
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'dispatch',
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        read: false,
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleCall = () => {
    toast.info('Calling dispatch...', {
      description: 'Connecting to dispatch center'
    });
  };

  return (
    <DriverLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        {/* Header */}
        <div className="p-4 border-b border-border bg-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold">Dispatch Center</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-2 h-2 bg-[hsl(var(--status-success))] rounded-full" />
                Online
              </p>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={handleCall}>
            <Phone className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={cn(
                "flex",
                message.sender === 'driver' ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2",
                message.sender === 'driver' 
                  ? "bg-primary text-primary-foreground rounded-br-md" 
                  : "bg-muted rounded-bl-md"
              )}>
                <p className="text-sm">{message.text}</p>
                <div className={cn(
                  "flex items-center gap-1 mt-1",
                  message.sender === 'driver' ? "justify-end" : "justify-start"
                )}>
                  <span className={cn(
                    "text-[10px]",
                    message.sender === 'driver' ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}>
                    {message.time}
                  </span>
                  {message.sender === 'driver' && (
                    <CheckCheck className={cn(
                      "w-3 h-3",
                      message.read ? "text-primary-foreground" : "text-primary-foreground/50"
                    )} />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="px-4 py-2 border-t border-border overflow-x-auto">
          <div className="flex gap-2">
            {quickReplies.map((reply) => (
              <Button 
                key={reply}
                variant="outline" 
                size="sm"
                className="whitespace-nowrap text-xs"
                onClick={() => handleSend(reply)}
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button onClick={() => handleSend()} disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </DriverLayout>
  );
}
