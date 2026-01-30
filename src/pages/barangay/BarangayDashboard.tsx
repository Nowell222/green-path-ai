import { useState } from 'react';
import BarangayLayout from '@/components/layouts/BarangayLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Users, 
  Send, 
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// Mock data
const stats = {
  pendingRequests: 12,
  totalResidents: 823,
  forwardedToday: 3,
  resolvedThisWeek: 28,
};

const quotaStatus = {
  currentVolume: 75,
  threshold: 80,
  requestsNeeded: 5,
};

const recentRequests = [
  { id: 'REQ-001', resident: 'Maria Santos', type: 'Early Collection', status: 'pending', time: '10 min ago', hasPhoto: true },
  { id: 'REQ-002', resident: 'Juan Dela Cruz', type: 'Early Collection', status: 'validated', time: '25 min ago', hasPhoto: true },
  { id: 'REQ-003', resident: 'Ana Garcia', type: 'Early Collection', status: 'pending', time: '1 hour ago', hasPhoto: true },
  { id: 'REQ-004', resident: 'Pedro Reyes', type: 'Missed Collection', status: 'forwarded', time: '2 hours ago', hasPhoto: false },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-[hsl(var(--status-warning))]', textColor: 'text-[hsl(var(--status-warning))]' },
  validated: { label: 'Validated', color: 'bg-[hsl(var(--status-info))]', textColor: 'text-[hsl(var(--status-info))]' },
  forwarded: { label: 'Forwarded', color: 'bg-[hsl(var(--status-success))]', textColor: 'text-[hsl(var(--status-success))]' },
  rejected: { label: 'Rejected', color: 'bg-[hsl(var(--status-error))]', textColor: 'text-[hsl(var(--status-error))]' },
};

export default function BarangayDashboard() {
  const canRequestEarlyCollection = quotaStatus.currentVolume >= quotaStatus.threshold;

  const handleRequestEarlyCollection = () => {
    if (canRequestEarlyCollection) {
      toast.success('Early collection request sent to MENRO!');
    } else {
      toast.error(`Need ${quotaStatus.threshold - quotaStatus.currentVolume}% more quota to request early collection`);
    }
  };

  return (
    <BarangayLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage garbage collection requests from residents</p>
          </div>
          <Button 
            onClick={handleRequestEarlyCollection}
            disabled={!canRequestEarlyCollection}
          >
            <Send className="w-4 h-4 mr-2" />
            Request Early Collection from MENRO
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="card-eco">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--status-warning))]/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[hsl(var(--status-warning))]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pendingRequests}</p>
                  <p className="text-sm text-muted-foreground">Pending Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.totalResidents}</p>
                  <p className="text-sm text-muted-foreground">Total Residents</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--status-info))]/10 flex items-center justify-center">
                  <Send className="w-5 h-5 text-[hsl(var(--status-info))]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.forwardedToday}</p>
                  <p className="text-sm text-muted-foreground">Forwarded Today</p>
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
                  <p className="text-2xl font-bold">{stats.resolvedThisWeek}</p>
                  <p className="text-sm text-muted-foreground">Resolved This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quota Status */}
          <Card className="card-eco">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                Collection Quota Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <p className="text-4xl font-bold text-primary">{quotaStatus.currentVolume}%</p>
                <p className="text-sm text-muted-foreground">of threshold reached</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Volume</span>
                  <span>Threshold: {quotaStatus.threshold}%</span>
                </div>
                <Progress value={quotaStatus.currentVolume} className="h-3" />
              </div>

              {canRequestEarlyCollection ? (
                <div className="p-3 rounded-lg bg-[hsl(var(--status-success))]/10 text-center">
                  <CheckCircle className="w-6 h-6 text-[hsl(var(--status-success))] mx-auto mb-1" />
                  <p className="text-sm font-medium text-[hsl(var(--status-success))]">
                    Threshold reached! You can request early collection.
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-muted text-center">
                  <AlertTriangle className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                  <p className="text-sm text-muted-foreground">
                    Need {quotaStatus.threshold - quotaStatus.currentVolume}% more to reach threshold
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Requests */}
          <Card className="card-eco lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Recent Requests
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/barangay/requests">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentRequests.map((request) => {
                  const status = statusConfig[request.status as keyof typeof statusConfig];
                  return (
                    <div 
                      key={request.id}
                      className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{request.resident}</p>
                          <Badge variant="outline" className={status.textColor}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1 ${status.color}`} />
                            {status.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {request.type} • {request.time}
                        </p>
                      </div>
                      {request.status === 'pending' && (
                        <Button size="sm">Review</Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BarangayLayout>
  );
}
