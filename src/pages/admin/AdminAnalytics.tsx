import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  Recycle,
  Truck,
  Users,
  Calendar,
  Download
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const weeklyData = [
  { day: 'Mon', collected: 45, recycled: 12 },
  { day: 'Tue', collected: 52, recycled: 15 },
  { day: 'Wed', collected: 48, recycled: 14 },
  { day: 'Thu', collected: 61, recycled: 18 },
  { day: 'Fri', collected: 55, recycled: 16 },
  { day: 'Sat', collected: 38, recycled: 10 },
  { day: 'Sun', collected: 25, recycled: 8 },
];

const monthlyTrend = [
  { month: 'Jan', waste: 1200, recycling: 320 },
  { month: 'Feb', waste: 1150, recycling: 340 },
  { month: 'Mar', waste: 1280, recycling: 380 },
  { month: 'Apr', waste: 1320, recycling: 420 },
  { month: 'May', waste: 1180, recycling: 450 },
  { month: 'Jun', waste: 1250, recycling: 480 },
];

const wasteComposition = [
  { name: 'Biodegradable', value: 45, color: 'hsl(142, 70%, 40%)' },
  { name: 'Recyclable', value: 28, color: 'hsl(210, 90%, 50%)' },
  { name: 'Residual', value: 22, color: 'hsl(220, 10%, 25%)' },
  { name: 'Hazardous', value: 5, color: 'hsl(35, 95%, 55%)' },
];

const barangayPerformance = [
  { name: 'San Jose', compliance: 92, collections: 245 },
  { name: 'Poblacion', compliance: 88, collections: 312 },
  { name: 'Magsaysay', compliance: 85, collections: 198 },
  { name: 'Centro', compliance: 78, collections: 267 },
  { name: 'Rizal', compliance: 75, collections: 156 },
];

export default function AdminAnalytics() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Analytics</h1>
            <p className="text-muted-foreground">Waste management insights and trends</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="card-eco">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Collected</p>
                  <p className="text-2xl font-bold">2,547 tons</p>
                  <p className="text-xs text-[hsl(var(--status-success))] flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% vs last month
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Recycling Rate</p>
                  <p className="text-2xl font-bold">68%</p>
                  <p className="text-xs text-[hsl(var(--status-success))] flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +5% vs last month
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--waste-recyclable))]/10 flex items-center justify-center">
                  <Recycle className="w-5 h-5 text-[hsl(var(--waste-recyclable))]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">15,234</p>
                  <p className="text-xs text-[hsl(var(--status-success))] flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +8% vs last month
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--status-info))]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[hsl(var(--status-info))]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Collection Rate</p>
                  <p className="text-2xl font-bold">92%</p>
                  <p className="text-xs text-[hsl(var(--status-error))] flex items-center gap-1 mt-1">
                    <TrendingDown className="w-3 h-3" />
                    -2% vs last month
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--status-warning))]/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[hsl(var(--status-warning))]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Weekly Collection */}
          <Card className="card-eco">
            <CardHeader>
              <CardTitle className="font-display">Weekly Collection</CardTitle>
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
                  <Bar dataKey="collected" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="recycled" fill="hsl(var(--waste-recyclable))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Waste Composition */}
          <Card className="card-eco">
            <CardHeader>
              <CardTitle className="font-display">Waste Composition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <ResponsiveContainer width="50%" height={200}>
                  <PieChart>
                    <Pie
                      data={wasteComposition}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {wasteComposition.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {wasteComposition.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-bold ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trend */}
        <Card className="card-eco">
          <CardHeader>
            <CardTitle className="font-display">Monthly Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line type="monotone" dataKey="waste" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                <Line type="monotone" dataKey="recycling" stroke="hsl(var(--waste-recyclable))" strokeWidth={2} dot={{ fill: 'hsl(var(--waste-recyclable))' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Barangay Performance */}
        <Card className="card-eco">
          <CardHeader>
            <CardTitle className="font-display">Barangay Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {barangayPerformance.map((brgy) => (
                <div key={brgy.name} className="flex items-center gap-4">
                  <div className="w-32">
                    <p className="font-medium">{brgy.name}</p>
                    <p className="text-xs text-muted-foreground">{brgy.collections} collections</p>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${brgy.compliance}%` }}
                      />
                    </div>
                  </div>
                  <span className="font-bold w-12 text-right">{brgy.compliance}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
