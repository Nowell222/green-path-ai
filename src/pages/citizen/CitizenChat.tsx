import { useState, useRef, useEffect } from 'react';
import CitizenLayout from '@/components/layouts/CitizenLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Send, 
  Bot,
  User,
  Sparkles,
  Trash2,
  Recycle,
  Calendar,
  MapPin,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

const quickQuestions = [
  { icon: Trash2, text: 'How do I dispose of batteries?' },
  { icon: Calendar, text: 'When is my collection day?' },
  { icon: Recycle, text: 'What plastics can I recycle?' },
  { icon: MapPin, text: 'Where is the nearest recycling center?' },
];

const botResponses: Record<string, string> = {
  'battery': `Great question! 🔋 Batteries are considered **hazardous waste** and should never be thrown in regular bins.\n\n**Here's what to do:**\n1. Store used batteries in a sealed container\n2. Bring them to the MENRO Hazardous Waste Collection (every Saturday, 8 AM - 12 PM)\n3. Or drop off at any authorized e-waste collection point\n\nTip: One battery can contaminate 600,000 liters of water if improperly disposed!`,
  'collection': `📅 **Your Collection Schedule (Brgy. San Jose)**\n\n**Biodegradable:** Monday, Wednesday, Friday (6:00 AM)\n**Recyclable:** Tuesday, Thursday (6:00 AM)\n**Residual:** Saturday (6:00 AM)\n\nMake sure to put your waste bins out by 5:30 AM! You can track the truck in real-time using the Track Truck feature.`,
  'plastic': `♻️ **Recyclable Plastics Guide**\n\n✅ **Accepted:**\n- PET bottles (#1) - water, soda bottles\n- HDPE (#2) - milk jugs, detergent bottles\n- PP (#5) - yogurt containers, bottle caps\n\n❌ **Not Accepted:**\n- Plastic bags\n- Styrofoam\n- Dirty or food-contaminated plastics\n\nRemember: Rinse containers and remove labels before recycling!`,
  'recycling center': `📍 **Nearby Recycling Centers**\n\n1. **Barangay Recycling Center**\n   - 0.8 km away\n   - Open: Mon-Sat, 8 AM - 5 PM\n\n2. **Municipal Materials Recovery Facility**\n   - 2.3 km away\n   - Open: Mon-Fri, 7 AM - 4 PM\n\n3. **Community Eco-Hub**\n   - 1.5 km away\n   - Open: Daily, 6 AM - 6 PM\n\nWould you like directions to any of these?`,
  'default': `I'm here to help with all your waste management questions! 🌱\n\nI can assist you with:\n- Waste classification and disposal\n- Collection schedules\n- Recycling guidelines\n- Drop-off locations\n- Environmental tips\n\nWhat would you like to know?`
};

export default function CitizenChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Hello! I'm WasteBot, your AI assistant for all things waste management. 🌱 How can I help you today?",
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('battery') || lowerMessage.includes('batteries')) {
      return botResponses.battery;
    }
    if (lowerMessage.includes('collection') || lowerMessage.includes('schedule') || lowerMessage.includes('when')) {
      return botResponses.collection;
    }
    if (lowerMessage.includes('plastic') || lowerMessage.includes('recycle') || lowerMessage.includes('recyclable')) {
      return botResponses.plastic;
    }
    if (lowerMessage.includes('center') || lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('drop')) {
      return botResponses['recycling center'];
    }
    return botResponses.default;
  };

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot typing
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: getBotResponse(messageText),
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <CitizenLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-4rem)]">
        {/* Header */}
        <div className="p-4 border-b border-border bg-card flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold">WasteBot</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI-Powered Assistant
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={cn(
                "flex gap-3",
                message.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              
              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                message.sender === 'user' 
                  ? "bg-primary text-primary-foreground rounded-br-md" 
                  : "bg-muted rounded-bl-md"
              )}>
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className={cn(
                  "text-[10px] mt-1",
                  message.sender === 'user' ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                  {message.time}
                </p>
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="px-4 py-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, idx) => (
                <Button 
                  key={idx}
                  variant="outline" 
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSend(q.text)}
                >
                  <q.icon className="w-3 h-3 mr-1" />
                  {q.text}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about waste management..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button onClick={() => handleSend()} disabled={!input.trim() || isTyping}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </CitizenLayout>
  );
}
