import HaulingAdminLayout from '@/components/layouts/HaulingAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Truck, Package, MapPin, TrendingUp, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const stats = {
  ecoAides: { active: 12, available: 8, onTask: 4 },
  vehicles: { total: 8, inUse: 5, maintenance: 1 },
  requests: { pending: 6, today: 18, completed: 12 },
  revenue: { today: 4500, month: 128000 },
};

const pendingRequests = [
  { id: 1, from: 'Reyes Food Corp.', type: 'Regular Waste', fee: '₱1,500', submitted: '30 min ago', wasteType: 'paid' },
  { id: 2, from: 'SM San Juan', type: 'Recyclables', fee: 'Free', submitted: '1 hr ago', wasteType: 'free' },
  { id: 3, from: 'Maria Santos', type: 'Bulky Waste', fee: '₱2,000', submitted: '2 hrs ago', wasteType: 'paid' },
];

export default function HaulingDashboard() {
  const { user } = useAuth();
  return (
    <HaulingAdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Dashboard</h1>
          <p className="text-muted-foreground">{user?.organizationName} — Operations Overview</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-eco">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Eco-Aides</p>
                  <p className="text-3xl font-bold mt-1">{stats.ecoAides.active}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stats.ecoAides.available} available • {stats.ecoAides.onTask} on task</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Users className="w-6 h-6 text-primary" /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Vehicles</p>
                  <p className="text-3xl font-bold mt-1">{stats.vehicles.total}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stats.vehicles.inUse} in use • {stats.vehicles.maintenance} maintenance</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-truck-active/10 flex items-center justify-center"><Truck className="w-6 h-6 text-truck-active" /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Requests</p>
                  <p className="text-3xl font-bold mt-1">{stats.requests.pending}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stats.requests.today} today • {stats.requests.completed} completed</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-status-warning/10 flex items-center justify-center"><Package className="w-6 h-6 text-status-warning" /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue Today</p>
                  <p className="text-3xl font-bold mt-1">₱{stats.revenue.today.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">₱{stats.revenue.month.toLocaleString()} this month</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-status-success/10 flex items-center justify-center"><TrendingUp className="w-6 h-6 text-status-success" /></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="card-eco">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-display flex items-center gap-2"><Package className="w-5 h-5 text-status-warning" />Pending Hauling Requests</CardTitle>
              <Link to="/hauling/requests"><Button variant="ghost" size="sm">View All <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingRequests.map((req) => (
              <div key={req.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                <div>
                  <p className="font-medium text-sm">{req.from}</p>
                  <p className="text-xs text-muted-foreground">{req.type} • {req.submitted}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-medium ${req.wasteType === 'paid' ? 'text-primary' : 'text-status-success'}`}>{req.fee}</span>
                  <Button size="sm">Review</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </HaulingAdminLayout>
  );
}
