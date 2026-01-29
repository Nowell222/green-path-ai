import { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Fuel,
  Wrench,
  CheckCircle,
  AlertTriangle,
  Search,
  Plus,
  MoreVertical,
  Navigation
} from 'lucide-react';
import { cn } from '@/lib/utils';

const trucks = [
  { id: 'TRK-247', driver: 'Pedro Reyes', route: 'R-12', status: 'active', capacity: 78, fuel: 65, lastMaintenance: '2 days ago', location: 'Brgy. San Jose' },
  { id: 'TRK-248', driver: 'Jose Garcia', route: 'R-15', status: 'active', capacity: 45, fuel: 80, lastMaintenance: '1 week ago', location: 'Brgy. Poblacion' },
  { id: 'TRK-249', driver: 'Maria Cruz', route: 'R-08', status: 'delayed', capacity: 92, fuel: 30, lastMaintenance: '3 days ago', location: 'Brgy. Magsaysay' },
  { id: 'TRK-250', driver: 'Juan Santos', route: null, status: 'maintenance', capacity: 0, fuel: 45, lastMaintenance: 'Today', location: 'Depot' },
  { id: 'TRK-251', driver: 'Ana Reyes', route: 'R-03', status: 'completed', capacity: 100, fuel: 20, lastMaintenance: '5 days ago', location: 'Depot' },
  { id: 'TRK-252', driver: null, route: null, status: 'idle', capacity: 0, fuel: 90, lastMaintenance: '1 day ago', location: 'Depot' },
];

const statusConfig = {
  active: { label: 'Active', color: 'bg-[hsl(var(--status-success))]', textColor: 'text-[hsl(var(--status-success))]' },
  delayed: { label: 'Delayed', color: 'bg-[hsl(var(--status-warning))]', textColor: 'text-[hsl(var(--status-warning))]' },
  maintenance: { label: 'Maintenance', color: 'bg-[hsl(var(--status-error))]', textColor: 'text-[hsl(var(--status-error))]' },
  completed: { label: 'Completed', color: 'bg-[hsl(var(--status-info))]', textColor: 'text-[hsl(var(--status-info))]' },
  idle: { label: 'Idle', color: 'bg-muted-foreground', textColor: 'text-muted-foreground' },
};

export default function AdminFleet() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredTrucks = trucks.filter(truck => {
    const matchesSearch = truck.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      truck.driver?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || truck.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: trucks.length,
    active: trucks.filter(t => t.status === 'active').length,
    delayed: trucks.filter(t => t.status === 'delayed').length,
    maintenance: trucks.filter(t => t.status === 'maintenance').length,
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Fleet Management</h1>
            <p className="text-muted-foreground">Manage and monitor all garbage trucks</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Truck
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="card-eco">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Trucks</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--status-success))]/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[hsl(var(--status-success))]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.active}</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--status-warning))]/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[hsl(var(--status-warning))]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.delayed}</p>
                  <p className="text-sm text-muted-foreground">Delayed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--status-error))]/10 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-[hsl(var(--status-error))]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.maintenance}</p>
                  <p className="text-sm text-muted-foreground">In Maintenance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search trucks or drivers..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="delayed">Delayed</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Trucks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTrucks.map((truck) => (
            <Card key={truck.id} className="card-eco">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Truck className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{truck.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">{truck.driver || 'No driver assigned'}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className={cn("w-2 h-2 rounded-full", statusConfig[truck.status].color)} />
                  <span className={cn("text-sm font-medium", statusConfig[truck.status].textColor)}>
                    {statusConfig[truck.status].label}
                  </span>
                  {truck.route && (
                    <Badge variant="outline" className="ml-auto">{truck.route}</Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="truncate">{truck.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="w-4 h-4 text-muted-foreground" />
                    <span>{truck.fuel}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="font-medium">{truck.capacity}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all",
                        truck.capacity > 90 ? "bg-[hsl(var(--status-error))]" :
                        truck.capacity > 70 ? "bg-[hsl(var(--status-warning))]" :
                        "bg-primary"
                      )}
                      style={{ width: `${truck.capacity}%` }} 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Wrench className="w-3 h-3" />
                    Maintenance: {truck.lastMaintenance}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Navigation className="w-4 h-4 mr-1" />
                    Track
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
