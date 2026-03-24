import SuperAdminLayout from '@/components/layouts/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Search, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const allUsers = [
  { id: 'sa-001', name: 'Ricardo Dela Cruz', email: 'superadmin@juanlesstrash.com', role: 'Super Admin', status: 'active' },
  { id: 'adm-001', name: 'Juan Cruz', email: 'admin@juanlesstrash.com', role: 'MENRO Admin', status: 'active' },
  { id: 'haul-001', name: 'Carlos Villanueva', email: 'hauling@juanlesstrash.com', role: 'Hauling Admin', status: 'active' },
  { id: 'drv-001', name: 'Pedro Reyes', email: 'driver@juanlesstrash.com', role: 'Driver', status: 'active' },
  { id: 'eco-001', name: 'Mark Gonzales', email: 'ecoaide@juanlesstrash.com', role: 'Eco-Aide', status: 'active' },
  { id: 'biz-001', name: 'Ana Reyes Trading', email: 'business@juanlesstrash.com', role: 'Business', status: 'active' },
  { id: 'usr-001', name: 'Maria Santos', email: 'citizen@juanlesstrash.com', role: 'Citizen', status: 'active' },
];

export default function SuperAdminUserDirectory() {
  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-display font-bold">User Directory</h1>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search all users..." className="pl-9" />
        </div>
        <Card className="card-eco">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="p-4 text-sm font-medium text-muted-foreground">User</th>
                    <th className="p-4 text-sm font-medium text-muted-foreground">Role</th>
                    <th className="p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="p-4 text-sm font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border last:border-0">
                      <td className="p-4">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </td>
                      <td className="p-4"><Badge variant="outline">{user.role}</Badge></td>
                      <td className="p-4"><Badge variant="default">{user.status}</Badge></td>
                      <td className="p-4 text-right"><Button variant="ghost" size="sm">View Profile</Button></td>
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
