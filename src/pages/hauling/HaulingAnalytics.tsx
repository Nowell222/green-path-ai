import HaulingAdminLayout from '@/components/layouts/HaulingAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function HaulingAnalytics() {
  return (
    <HaulingAdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Analytics</h1>
          <Button variant="outline">Export Report</Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Requests', value: '342', change: '+12%' },
            { label: 'Revenue (Month)', value: '₱128K', change: '+8%' },
            { label: 'Avg Response Time', value: '1.2 hrs', change: '-15%' },
            { label: 'Completion Rate', value: '94%', change: '+2%' },
          ].map((stat) => (
            <Card key={stat.label} className="card-eco">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
                <p className="text-xs text-status-success mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="card-eco">
          <CardHeader><CardTitle className="text-base font-display">Performance Overview</CardTitle></CardHeader>
          <CardContent><div className="h-64 flex items-center justify-center text-muted-foreground">Analytics charts coming soon</div></CardContent>
        </Card>
      </div>
    </HaulingAdminLayout>
  );
}
