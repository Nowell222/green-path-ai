import SuperAdminLayout from '@/components/layouts/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SuperAdminAnalytics() {
  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">System Analytics</h1>
          <Button variant="outline">Export Data</Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: '15,847', icon: Users, change: '+5.2%' },
            { label: 'Active Vehicles', value: '48', icon: Truck, change: '+3' },
            { label: 'Collection Rate', value: '92%', icon: TrendingUp, change: '+2.1%' },
            { label: 'Requests Processed', value: '1,247', icon: BarChart3, change: '+18%' },
          ].map((stat) => (
            <Card key={stat.label} className="card-eco">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-status-success mt-1">{stat.change} this month</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="card-eco">
          <CardHeader><CardTitle className="text-base font-display">Platform-wide Performance</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <p>Analytics charts and data visualization coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
}
