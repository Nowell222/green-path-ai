import SuperAdminLayout from '@/components/layouts/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollText } from 'lucide-react';
import { Input } from '@/components/ui/input';

const auditLogs = [
  { id: 1, user: 'Ricardo Dela Cruz', action: 'Approved Hauling Org registration', target: 'GreenHaul Services Inc.', timestamp: 'Mar 24, 2026 10:30 AM', type: 'approval' },
  { id: 2, user: 'Ricardo Dela Cruz', action: 'Suspended Business account', target: 'WasteAway Corp.', timestamp: 'Mar 23, 2026 3:15 PM', type: 'suspension' },
  { id: 3, user: 'System', action: 'New citizen registration', target: 'Maria Santos', timestamp: 'Mar 23, 2026 1:00 PM', type: 'registration' },
  { id: 4, user: 'Ricardo Dela Cruz', action: 'Updated system settings', target: 'Global Config', timestamp: 'Mar 22, 2026 9:45 AM', type: 'config' },
  { id: 5, user: 'System', action: 'Auto-deactivated inactive account', target: 'Jose Garcia', timestamp: 'Mar 21, 2026 12:00 AM', type: 'deactivation' },
];

export default function SuperAdminAuditLogs() {
  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-display font-bold">Audit Logs</h1>
        <div className="relative max-w-md">
          <Input placeholder="Search logs..." className="pl-9" />
        </div>
        <Card className="card-eco">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="p-4 text-sm font-medium text-muted-foreground">Timestamp</th>
                    <th className="p-4 text-sm font-medium text-muted-foreground">User</th>
                    <th className="p-4 text-sm font-medium text-muted-foreground">Action</th>
                    <th className="p-4 text-sm font-medium text-muted-foreground">Target</th>
                    <th className="p-4 text-sm font-medium text-muted-foreground">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="border-b border-border last:border-0">
                      <td className="p-4 text-sm text-muted-foreground">{log.timestamp}</td>
                      <td className="p-4 text-sm font-medium">{log.user}</td>
                      <td className="p-4 text-sm">{log.action}</td>
                      <td className="p-4 text-sm text-primary">{log.target}</td>
                      <td className="p-4"><Badge variant="outline">{log.type}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
}
