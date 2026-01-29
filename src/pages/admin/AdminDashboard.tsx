import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Truck, 
  FileText, 
  Users, 
  MapPin,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
const stats = {
  trucks: { active: 12, inactive: 3, total: 15 },
  reports: { pending: 8, today: 23, urgent: 2 },
  users: { active: 2400, new: 47, reports: 23 },
  collection: { rate: 87, waste: 14.2, households: 1847, delay: 12 }
};

const alerts = [
  { id: 1, type: 'error', message: 'Truck #7 - Mechanical issue reported', time: '15 min ago' },
  { id: 2, type: 'warning', message: 'Route 12 - 45 min behind schedule (traffic)', time: '30 min ago' },
  { id: 3, type: 'error', message: '2 Urgent reports: Illegal dumping complaints', time: '1 hr ago' },
];

const activeTrucks = [
  { id: 'TRK-247', driver: 'Juan Santos', route: 'R-12', progress: 75, status: 'active' },
  { id: 'TRK-189', driver: 'Pedro Cruz', route: 'R-07', progress: 45, status: 'delayed' },
  { id: 'TRK-201', driver: 'Maria Garcia', route: 'R-03', progress: 90, status: 'active' },
  { id: 'TRK-156', driver: 'Jose Reyes', route: 'R-15', progress: 30, status: 'active' },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Dashboard</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Today's Operations - January 29, 2026
            </p>
          </div>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-eco">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Trucks</p>
                  <p className="text-3xl font-bold mt-1">{stats.trucks.active}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.trucks.inactive} inactive • {stats.trucks.total} routes
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-truck-active/10 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-truck-active" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-eco">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Reports</p>
                  <p className="text-3xl font-bold mt-1">{stats.reports.pending}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.reports.today} today • <span className="text-destructive">{stats.reports.urgent} urgent</span>
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-status-warning/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-status-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-eco">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-3xl font-bold mt-1">{(stats.users.active / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    +{stats.users.new} new • {stats.users.reports} reports
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-eco">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Collection Rate</p>
                  <p className="text-3xl font-bold mt-1">{stats.collection.rate}%</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.collection.waste} tons • {stats.collection.households} households
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-status-success/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-status-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Live Fleet Map */}
          <Card className="card-eco lg:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Live Fleet Map
                </CardTitle>
                <Link to="/admin/fleet">
                  <Button variant="ghost" size="sm">
                    View Full Map <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-xl relative overflow-hidden">
                {/* Placeholder for map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Interactive map showing all {stats.trucks.active} active trucks</p>
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 p-3 bg-card/90 backdrop-blur rounded-lg text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-truck-active" />
                    <span>On Schedule</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-truck-delayed" />
                    <span>Delayed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-truck-issue" />
                    <span>Issue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-truck-completed" />
                    <span>Completed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="card-eco">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-status-warning" />
                Alerts Requiring Attention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-3 rounded-lg border ${
                    alert.type === 'error' 
                      ? 'bg-destructive/5 border-destructive/20' 
                      : 'bg-status-warning/5 border-status-warning/20'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {alert.type === 'error' ? (
                      <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-status-warning flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link to="/admin/reports">View All Alerts</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Active Trucks Table */}
        <Card className="card-eco">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                Active Trucks
              </CardTitle>
              <Link to="/admin/fleet">
                <Button variant="ghost" size="sm">
                  Manage Fleet <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Truck ID</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Driver</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Route</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Progress</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="pb-3 text-sm font-medium text-muted-foreground"></th>
                  </tr>
                </thead>
                <tbody>
                  {activeTrucks.map((truck) => (
                    <tr key={truck.id} className="border-b border-border last:border-0">
                      <td className="py-3">
                        <p className="font-medium">{truck.id}</p>
                      </td>
                      <td className="py-3">
                        <p className="text-sm">{truck.driver}</p>
                      </td>
                      <td className="py-3">
                        <p className="text-sm">{truck.route}</p>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                truck.status === 'active' ? 'bg-truck-active' : 'bg-truck-delayed'
                              }`}
                              style={{ width: `${truck.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">{truck.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          truck.status === 'active' 
                            ? 'bg-truck-active/10 text-truck-active' 
                            : 'bg-truck-delayed/10 text-truck-delayed'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            truck.status === 'active' ? 'bg-truck-active' : 'bg-truck-delayed'
                          }`} />
                          {truck.status === 'active' ? 'On Schedule' : 'Delayed'}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-eco">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-status-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-status-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.collection.waste} tons</p>
                <p className="text-xs text-muted-foreground">Waste collected today</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-eco">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-status-info/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-status-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.collection.households}</p>
                <p className="text-xs text-muted-foreground">Households served</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-eco">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-status-warning/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-status-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.collection.delay} min</p>
                <p className="text-xs text-muted-foreground">Average delay</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-eco">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">+3%</p>
                <p className="text-xs text-muted-foreground">vs. yesterday</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
