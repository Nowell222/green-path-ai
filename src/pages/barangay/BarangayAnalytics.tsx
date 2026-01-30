import BarangayLayout from '@/components/layouts/BarangayLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  TrendingUp,
  Users,
  FileText,
  Truck
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const weeklyData = [
  { day: 'Mon', requests: 8, forwarded: 6 },
  { day: 'Tue', requests: 12, forwarded: 10 },
  { day: 'Wed', requests: 5, forwarded: 5 },
  { day: 'Thu', requests: 15, forwarded: 12 },
  { day: 'Fri', requests: 9, forwarded: 8 },
  { day: 'Sat', requests: 3, forwarded: 3 },
  { day: 'Sun', requests: 2, forwarded: 2 },
];

const monthlyTrend = [
  { week: 'Week 1', requests: 42 },
  { week: 'Week 2', requests: 38 },
  { week: 'Week 3', requests: 55 },
  { week: 'Week 4', requests: 48 },
];

export default function BarangayAnalytics() {
  return (
    <BarangayLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track your barangay's waste management performance</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="card-eco">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">183</p>
                  <p className="text-xs text-[hsl(var(--status-success))] flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% vs last month
                  </p>
                </div>
                <FileText className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approval Rate</p>
                  <p className="text-2xl font-bold">94%</p>
                  <p className="text-xs text-[hsl(var(--status-success))] flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +2% vs last month
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Residents</p>
                  <p className="text-2xl font-bold">823</p>
                  <p className="text-xs text-[hsl(var(--status-success))] flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +5% vs last month
                  </p>
                </div>
                <Users className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Collections</p>
                  <p className="text-2xl font-bold">28</p>
                  <p className="text-xs text-muted-foreground">this month</p>
                </div>
                <Truck className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Requests */}
          <Card className="card-eco">
            <CardHeader>
              <CardTitle className="font-display">Weekly Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="requests" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="forwarded" fill="hsl(var(--status-success))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card className="card-eco">
            <CardHeader>
              <CardTitle className="font-display">Monthly Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line type="monotone" dataKey="requests" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </BarangayLayout>
  );
}
