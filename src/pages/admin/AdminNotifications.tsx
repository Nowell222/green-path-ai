import { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Plus,
  Send,
  Clock,
  Users,
  Truck,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Info,
  Megaphone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

const notifications = [
  { id: 1, title: 'Collection delay in Brgy. San Jose', message: 'Due to road construction, collection will be delayed by 30 minutes.', type: 'alert', audience: 'Brgy. San Jose', sent: '2 hours ago', read: 1250 },
  { id: 2, title: 'Holiday schedule reminder', message: 'No collection on January 1. Regular schedule resumes January 2.', type: 'info', audience: 'All Users', sent: '1 day ago', read: 8500 },
  { id: 3, title: 'New recycling program', message: 'Starting next week, we accept e-waste at designated drop points.', type: 'announcement', audience: 'All Users', sent: '3 days ago', read: 12000 },
  { id: 4, title: 'Route R-15 completed early', message: 'Commercial collection completed 30 minutes ahead of schedule.', type: 'success', audience: 'Drivers', sent: '5 hours ago', read: 5 },
];

const typeConfig = {
  alert: { icon: AlertTriangle, color: 'text-[hsl(var(--status-warning))]', bg: 'bg-[hsl(var(--status-warning))]/10' },
  info: { icon: Info, color: 'text-[hsl(var(--status-info))]', bg: 'bg-[hsl(var(--status-info))]/10' },
  announcement: { icon: Megaphone, color: 'text-primary', bg: 'bg-primary/10' },
  success: { icon: CheckCircle, color: 'text-[hsl(var(--status-success))]', bg: 'bg-[hsl(var(--status-success))]/10' },
};

const audiences = [
  { id: 'all', label: 'All Users', icon: Users },
  { id: 'citizens', label: 'Citizens Only', icon: Users },
  { id: 'drivers', label: 'Drivers Only', icon: Truck },
  { id: 'barangay', label: 'Specific Barangay', icon: MapPin },
];

export default function AdminNotifications() {
  const [activeTab, setActiveTab] = useState('history');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState('all');
  const [notificationType, setNotificationType] = useState<'alert' | 'info' | 'announcement'>('info');

  const handleSend = () => {
    if (!title.trim() || !message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Notification sent successfully!', {
      description: `Sent to ${audiences.find(a => a.id === audience)?.label}`
    });
    setTitle('');
    setMessage('');
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Notifications</h1>
            <p className="text-muted-foreground">Send announcements and alerts to users</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="compose">Compose New</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4 mt-4">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="card-eco">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{notifications.length}</p>
                    <p className="text-sm text-muted-foreground">Total Sent</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-eco">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--status-success))]/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--status-success))]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">21.7K</p>
                    <p className="text-sm text-muted-foreground">Total Reads</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-eco">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--status-warning))]/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-[hsl(var(--status-warning))]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-sm text-muted-foreground">Alerts Today</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="card-eco">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--status-info))]/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[hsl(var(--status-info))]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">85%</p>
                    <p className="text-sm text-muted-foreground">Avg. Read Rate</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notification List */}
            <div className="space-y-3">
              {notifications.map((notification) => {
                const TypeIcon = typeConfig[notification.type as keyof typeof typeConfig].icon;
                return (
                  <Card key={notification.id} className="card-eco">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          typeConfig[notification.type as keyof typeof typeConfig].bg
                        )}>
                          <TypeIcon className={cn("w-5 h-5", typeConfig[notification.type as keyof typeof typeConfig].color)} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{notification.title}</h3>
                            <Badge variant="outline">{notification.audience}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {notification.sent}
                            </span>
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              {notification.read.toLocaleString()} reads
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="compose" className="mt-4">
            <Card className="card-eco max-w-2xl">
              <CardHeader>
                <CardTitle className="font-display">Compose Notification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Type Selection */}
                <div className="space-y-2">
                  <Label>Notification Type</Label>
                  <div className="flex gap-2">
                    {(['info', 'alert', 'announcement'] as const).map((type) => {
                      const TypeIcon = typeConfig[type].icon;
                      return (
                        <button
                          key={type}
                          onClick={() => setNotificationType(type)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all",
                            notificationType === type 
                              ? `${typeConfig[type].bg} border-current ${typeConfig[type].color}` 
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <TypeIcon className="w-4 h-4" />
                          <span className="capitalize">{type}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Audience Selection */}
                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {audiences.map((aud) => (
                      <button
                        key={aud.id}
                        onClick={() => setAudience(aud.id)}
                        className={cn(
                          "flex items-center gap-2 p-3 rounded-lg border transition-all",
                          audience === aud.id 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <aud.icon className="w-4 h-4" />
                        <span>{aud.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter notification title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter notification message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button className="w-full" onClick={handleSend}>
                  <Send className="w-4 h-4 mr-2" />
                  Send Notification
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
