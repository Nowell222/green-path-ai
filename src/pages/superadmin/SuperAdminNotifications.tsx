import SuperAdminLayout from '@/components/layouts/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const notifications = [
  { id: 1, title: 'System Maintenance Notice', target: 'All Users', sent: '2 days ago', status: 'sent' },
  { id: 2, title: 'New Feature: On-demand Hauling', target: 'Citizens & Businesses', sent: '1 week ago', status: 'sent' },
  { id: 3, title: 'Fleet Update Required', target: 'Hauling Organizations', sent: '2 weeks ago', status: 'sent' },
];

export default function SuperAdminNotifications() {
  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-display font-bold">Notifications & Announcements</h1>
        <Card className="card-eco">
          <CardHeader><CardTitle className="text-base font-display flex items-center gap-2"><Send className="w-5 h-5 text-primary" />Send Notification</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Notification title..." />
            <Textarea placeholder="Write your notification message..." rows={4} />
            <div className="flex gap-3">
              <Button>Send to All Users</Button>
              <Button variant="outline">Target Specific Role</Button>
            </div>
          </CardContent>
        </Card>
        <Card className="card-eco">
          <CardHeader><CardTitle className="text-base font-display">Sent Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{notif.title}</p>
                    <p className="text-xs text-muted-foreground">To: {notif.target} • {notif.sent}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
}
