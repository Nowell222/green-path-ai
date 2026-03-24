import SuperAdminLayout from '@/components/layouts/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Landmark, Building2, Briefcase, Users, BarChart3, Shield, ArrowRight, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = {
  agencies: { total: 12, active: 10, pending: 2 },
  haulingOrgs: { total: 8, active: 6, pending: 2 },
  businesses: { total: 45, active: 38, pending: 7 },
  citizens: { total: 15200, active: 14800, newThisMonth: 320 },
};

const recentActions = [
  { id: 1, action: 'Approved registration', entity: 'GreenHaul Services Inc.', type: 'Hauling Org', time: '2 hours ago', status: 'approved' },
  { id: 2, action: 'Suspended account', entity: 'WasteAway Corp.', type: 'Business Org', time: '5 hours ago', status: 'suspended' },
  { id: 3, action: 'Created agency account', entity: 'MENRO San Juan', type: 'Government Agency', time: '1 day ago', status: 'created' },
  { id: 4, action: 'Rejected registration', entity: 'QuickTrash LLC', type: 'Hauling Org', time: '1 day ago', status: 'rejected' },
];

const pendingApprovals = [
  { id: 1, name: 'EcoWaste Solutions', type: 'Hauling Organization', submitted: '2 days ago' },
  { id: 2, name: 'Metro Food Corp.', type: 'Business Organization', submitted: '3 days ago' },
  { id: 3, name: 'CleanCity Haulers', type: 'Hauling Organization', submitted: '4 days ago' },
];

export default function SuperAdminDashboard() {
  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">System Overview</h1>
            <p className="text-muted-foreground">All organizations, users, and operations at a glance</p>
          </div>
          <Button><Shield className="w-4 h-4 mr-2" />System Report</Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-eco">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Government Agencies</p>
                  <p className="text-3xl font-bold mt-1">{stats.agencies.total}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stats.agencies.active} active • {stats.agencies.pending} pending</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Landmark className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hauling Organizations</p>
                  <p className="text-3xl font-bold mt-1">{stats.haulingOrgs.total}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stats.haulingOrgs.active} active • {stats.haulingOrgs.pending} pending</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-status-warning/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-status-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Business Orgs</p>
                  <p className="text-3xl font-bold mt-1">{stats.businesses.total}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stats.businesses.active} active • {stats.businesses.pending} pending</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-status-info/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-status-info" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Citizens & Residents</p>
                  <p className="text-3xl font-bold mt-1">{(stats.citizens.total / 1000).toFixed(1)}K</p>
                  <p className="text-xs text-muted-foreground mt-1">+{stats.citizens.newThisMonth} this month</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-status-success/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-status-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="card-eco">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <Clock className="w-5 h-5 text-status-warning" />
                  Pending Approvals
                </CardTitle>
                <span className="text-xs bg-status-warning/10 text-status-warning px-2 py-1 rounded-full font-medium">{pendingApprovals.length} pending</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.type} • Submitted {item.submitted}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="default" className="h-8">Approve</Button>
                    <Button size="sm" variant="outline" className="h-8">Reject</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="card-eco">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Recent Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActions.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.status === 'approved' ? 'bg-status-success/10' : item.status === 'rejected' ? 'bg-destructive/10' : item.status === 'suspended' ? 'bg-status-warning/10' : 'bg-primary/10'
                  }`}>
                    {item.status === 'approved' ? <CheckCircle2 className="w-4 h-4 text-status-success" /> : 
                     item.status === 'rejected' ? <XCircle className="w-4 h-4 text-destructive" /> :
                     <Shield className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.action}: <span className="text-primary">{item.entity}</span></p>
                    <p className="text-xs text-muted-foreground">{item.type} • {item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
