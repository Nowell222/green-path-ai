import HaulingAdminLayout from '@/components/layouts/HaulingAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function HaulingNotifications() {
  return (
    <HaulingAdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-display font-bold">Notifications</h1>
        <Card className="card-eco">
          <CardHeader><CardTitle className="text-base font-display flex items-center gap-2"><Send className="w-5 h-5 text-primary" />Send to Eco-Aides</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Notification title..." />
            <Textarea placeholder="Message..." rows={3} />
            <Button>Send Notification</Button>
          </CardContent>
        </Card>
        <Card className="card-eco">
          <CardHeader><CardTitle className="text-base font-display">Recent</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: 'New route assigned: HR-03', time: '2 hours ago' },
              { title: 'Vehicle ECO-115 maintenance complete', time: '1 day ago' },
            ].map((n, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </HaulingAdminLayout>
  );
}
