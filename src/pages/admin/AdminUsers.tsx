import { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Search,
  Plus,
  MoreVertical,
  Shield,
  Truck,
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const users = [
  { id: 'USR-001', name: 'Maria Santos', email: 'maria@email.com', phone: '0917-XXX-1234', role: 'citizen', barangay: 'Brgy. San Jose', status: 'active', joined: 'Jan 2024' },
  { id: 'USR-002', name: 'Juan Dela Cruz', email: 'juan@email.com', phone: '0918-XXX-5678', role: 'citizen', barangay: 'Brgy. Magsaysay', status: 'active', joined: 'Feb 2024' },
  { id: 'ADM-001', name: 'Juan Cruz', email: 'admin@juanlesstrash.com', phone: '0918-XXX-5678', role: 'admin', barangay: null, status: 'active', joined: 'Jan 2024' },
  { id: 'DRV-001', name: 'Pedro Reyes', email: 'driver@juanlesstrash.com', phone: '0919-XXX-9012', role: 'driver', barangay: null, status: 'active', joined: 'Jan 2024', truckId: 'TRK-247' },
  { id: 'DRV-002', name: 'Jose Garcia', email: 'jose@juanlesstrash.com', phone: '0920-XXX-3456', role: 'driver', barangay: null, status: 'active', joined: 'Feb 2024', truckId: 'TRK-248' },
  { id: 'USR-003', name: 'Ana Garcia', email: 'ana@email.com', phone: '0921-XXX-7890', role: 'citizen', barangay: 'Brgy. Centro', status: 'inactive', joined: 'Mar 2024' },
];

const roleConfig = {
  citizen: { label: 'Citizen', icon: User, color: 'bg-primary/10 text-primary' },
  admin: { label: 'Admin', icon: Shield, color: 'bg-[hsl(var(--status-warning))]/10 text-[hsl(var(--status-warning))]' },
  driver: { label: 'Driver', icon: Truck, color: 'bg-[hsl(var(--status-info))]/10 text-[hsl(var(--status-info))]' },
};

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || user.role === activeTab;
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: users.length,
    citizens: users.filter(u => u.role === 'citizen').length,
    drivers: users.filter(u => u.role === 'driver').length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  const handleEdit = (id: string) => {
    toast.info(`Edit user ${id}`);
  };

  const handleDelete = (id: string) => {
    toast.error(`Delete user ${id}?`, {
      action: {
        label: 'Confirm',
        onClick: () => toast.success('User deleted')
      }
    });
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage citizens, drivers, and administrators</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="card-eco">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.citizens}</p>
                <p className="text-sm text-muted-foreground">Citizens</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[hsl(var(--status-info))]/10 flex items-center justify-center">
                <Truck className="w-5 h-5 text-[hsl(var(--status-info))]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.drivers}</p>
                <p className="text-sm text-muted-foreground">Drivers</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[hsl(var(--status-warning))]/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[hsl(var(--status-warning))]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.admins}</p>
                <p className="text-sm text-muted-foreground">Admins</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search users..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="citizen">Citizens</TabsTrigger>
              <TabsTrigger value="driver">Drivers</TabsTrigger>
              <TabsTrigger value="admin">Admins</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Users List */}
        <Card className="card-eco">
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const RoleIcon = roleConfig[user.role as keyof typeof roleConfig].icon;
                  return (
                    <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-medium text-primary">{user.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge className={cn("gap-1", roleConfig[user.role as keyof typeof roleConfig].color)}>
                          <RoleIcon className="w-3 h-3" />
                          {roleConfig[user.role as keyof typeof roleConfig].label}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <p className="flex items-center gap-1"><Mail className="w-3 h-3" />{user.email}</p>
                          <p className="flex items-center gap-1 text-muted-foreground"><Phone className="w-3 h-3" />{user.phone}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {user.barangay || (user.role === 'driver' ? user.truckId : 'N/A')}
                        </p>
                      </td>
                      <td className="p-4">
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(user.id)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
