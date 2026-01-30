import { useState } from 'react';
import BarangayLayout from '@/components/layouts/BarangayLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  FileText, 
  Users, 
  Send, 
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Image,
  MapPin,
  X
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
  currentRequests: 8,
  threshold: 10,
  estimatedVolume: '~450 kg',
};

interface Request {
  id: string;
  resident: string;
  type: string;
  status: 'pending' | 'validated' | 'forwarded' | 'rejected';
  time: string;
  hasPhoto: boolean;
  address?: string;
  description?: string;
  volume?: string;
  photoUrl?: string;
}

const recentRequests: Request[] = [
  { id: 'REQ-001', resident: 'Maria Santos', type: 'Early Collection', status: 'pending', time: '10 min ago', hasPhoto: true, address: 'Purok 3, Block 1, San Juan, Batangas', description: 'My garbage bins are already full. Requesting early pickup as soon as possible.', volume: 'High (~30kg)', photoUrl: '/placeholder.svg' },
  { id: 'REQ-002', resident: 'Juan Dela Cruz', type: 'Early Collection', status: 'validated', time: '25 min ago', hasPhoto: true, address: 'Purok 4, Block 2, San Juan, Batangas', description: 'Multiple bags of garbage accumulated. Regular schedule is not enough.', volume: 'Medium (~20kg)', photoUrl: '/placeholder.svg' },
  { id: 'REQ-003', resident: 'Ana Garcia', type: 'Early Collection', status: 'pending', time: '1 hour ago', hasPhoto: true, address: 'Purok 5, Block 1, San Juan, Batangas', description: 'Urgent collection needed due to event waste.', volume: 'High (~35kg)', photoUrl: '/placeholder.svg' },
  { id: 'REQ-004', resident: 'Pedro Reyes', type: 'Missed Collection', status: 'forwarded', time: '2 hours ago', hasPhoto: false, address: 'Purok 6, Block 3, San Juan, Batangas', description: 'Truck did not pass by yesterday.', volume: 'Low (~10kg)' },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-[hsl(var(--status-warning))]', textColor: 'text-[hsl(var(--status-warning))]' },
  validated: { label: 'Validated', color: 'bg-[hsl(var(--status-info))]', textColor: 'text-[hsl(var(--status-info))]' },
  forwarded: { label: 'Forwarded', color: 'bg-[hsl(var(--status-success))]', textColor: 'text-[hsl(var(--status-success))]' },
  rejected: { label: 'Rejected', color: 'bg-[hsl(var(--status-error))]', textColor: 'text-[hsl(var(--status-error))]' },
};

export default function BarangayDashboard() {
  const [requests, setRequests] = useState(recentRequests);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  
  const validatedCount = requests.filter(r => r.status === 'validated').length;
  const canForward = validatedCount >= quotaStatus.threshold;
  const quotaPercent = (validatedCount / quotaStatus.threshold) * 100;

  const handlePreview = (request: Request) => {
    setSelectedRequest(request);
    setPreviewOpen(true);
  };

  const handleApprove = () => {
    if (!selectedRequest) return;
    
    setRequests(prev => prev.map(r => 
      r.id === selectedRequest.id ? { ...r, status: 'validated' as const } : r
    ));
    
    toast.success('Request approved!', {
      description: 'Request has been moved to Forward to MENRO queue.'
    });
    setPreviewOpen(false);
    setSelectedRequest(null);
  };

  const handleReject = () => {
    if (!selectedRequest) return;
    
    setRequests(prev => prev.map(r => 
      r.id === selectedRequest.id ? { ...r, status: 'rejected' as const } : r
    ));
    
    toast.error('Request rejected');
    setPreviewOpen(false);
    setSelectedRequest(null);
  };

  return (
    <BarangayLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage garbage collection requests from residents</p>
          </div>
          <Button asChild disabled={!canForward}>
            <Link to="/barangay/forward">
              <Send className="w-4 h-4 mr-2" />
              Forward to MENRO ({validatedCount}/{quotaStatus.threshold})
            </Link>
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
                <p className="text-4xl font-bold text-primary">{validatedCount}/{quotaStatus.threshold}</p>
                <p className="text-sm text-muted-foreground">validated requests</p>
              </div>

              <div className="text-center">
                <p className="text-lg font-medium">{Math.round(quotaPercent)}%</p>
                <p className="text-xs text-muted-foreground mb-2">quota completion</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>Threshold: {quotaStatus.threshold} requests</span>
                </div>
                <Progress value={quotaPercent} className="h-3" />
              </div>

              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-sm text-muted-foreground">Estimated Volume</p>
                <p className="text-lg font-bold">{quotaStatus.estimatedVolume}</p>
              </div>

              {canForward ? (
                <div className="p-3 rounded-lg bg-[hsl(var(--status-success))]/10 text-center">
                  <CheckCircle className="w-6 h-6 text-[hsl(var(--status-success))] mx-auto mb-1" />
                  <p className="text-sm font-medium text-[hsl(var(--status-success))]">
                    Quota reached! Ready to forward.
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-muted text-center">
                  <AlertTriangle className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                  <p className="text-sm text-muted-foreground">
                    Need {quotaStatus.threshold - validatedCount} more validated requests
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
                {requests.map((request) => {
                  const status = statusConfig[request.status];
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
                          {request.hasPhoto && (
                            <Image className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {request.type} • {request.time}
                        </p>
                      </div>
                      {request.status === 'pending' && (
                        <Button size="sm" onClick={() => handlePreview(request)}>
                          Preview
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Request Details - {selectedRequest?.id}
            </DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Resident</p>
                  <p className="font-medium">{selectedRequest.resident}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Request Type</p>
                  <p className="font-medium">{selectedRequest.type}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {selectedRequest.address}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Estimated Volume</p>
                <Badge variant="secondary">{selectedRequest.volume}</Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-sm">{selectedRequest.description}</p>
              </div>

              {selectedRequest.hasPhoto && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Uploaded Photo Evidence</p>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border">
                    <div className="text-center text-muted-foreground">
                      <Image className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">Garbage photo uploaded by resident</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                Submitted: {selectedRequest.time}
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={handleReject}>
              <X className="w-4 h-4 mr-2" />
              Reject
            </Button>
            <Button onClick={handleApprove}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve & Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BarangayLayout>
  );
}
