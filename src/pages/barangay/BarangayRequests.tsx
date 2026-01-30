import { useState } from 'react';
import BarangayLayout from '@/components/layouts/BarangayLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { 
  FileText, 
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  Camera,
  MapPin,
  User,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const requests = [
  { id: 'REQ-001', resident: 'Maria Santos', address: 'Purok 5, Block 3', type: 'Early Collection', status: 'pending', date: '2 hours ago', photo: '/placeholder.svg', volume: 'High', notes: 'Garbage bin is almost full' },
  { id: 'REQ-002', resident: 'Juan Dela Cruz', address: 'Purok 3, Block 1', type: 'Early Collection', status: 'validated', date: '5 hours ago', photo: '/placeholder.svg', volume: 'Medium', notes: 'Multiple bags ready for pickup' },
  { id: 'REQ-003', resident: 'Ana Garcia', address: 'Purok 7, Block 2', type: 'Early Collection', status: 'pending', date: '1 day ago', photo: '/placeholder.svg', volume: 'High', notes: 'Event waste from fiesta' },
  { id: 'REQ-004', resident: 'Pedro Reyes', address: 'Purok 1, Block 4', type: 'Missed Collection', status: 'forwarded', date: '1 day ago', photo: null, volume: 'Low', notes: 'Truck did not pass yesterday' },
  { id: 'REQ-005', resident: 'Jose Santos', address: 'Purok 2, Block 5', type: 'Early Collection', status: 'rejected', date: '2 days ago', photo: '/placeholder.svg', volume: 'Low', notes: 'Insufficient volume' },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-[hsl(var(--status-warning))]', textColor: 'text-[hsl(var(--status-warning))]' },
  validated: { label: 'Validated', color: 'bg-[hsl(var(--status-info))]', textColor: 'text-[hsl(var(--status-info))]' },
  forwarded: { label: 'Forwarded', color: 'bg-[hsl(var(--status-success))]', textColor: 'text-[hsl(var(--status-success))]' },
  rejected: { label: 'Rejected', color: 'bg-[hsl(var(--status-error))]', textColor: 'text-[hsl(var(--status-error))]' },
};

export default function BarangayRequests() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<typeof requests[0] | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.resident.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || request.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleValidate = (id: string) => {
    toast.success(`Request ${id} validated successfully`);
    setShowDialog(false);
  };

  const handleReject = (id: string) => {
    toast.error(`Request ${id} rejected`);
    setShowDialog(false);
  };

  const handleForward = (id: string) => {
    toast.success(`Request ${id} forwarded to MENRO`);
    setShowDialog(false);
  };

  return (
    <BarangayLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">User Requests</h1>
          <p className="text-muted-foreground">Review and manage garbage collection requests from residents</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="card-eco">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{requests.length}</p>
              <p className="text-sm text-muted-foreground">Total Requests</p>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[hsl(var(--status-warning))]">
                {requests.filter(r => r.status === 'pending').length}
              </p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[hsl(var(--status-info))]">
                {requests.filter(r => r.status === 'validated').length}
              </p>
              <p className="text-sm text-muted-foreground">Validated</p>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[hsl(var(--status-success))]">
                {requests.filter(r => r.status === 'forwarded').length}
              </p>
              <p className="text-sm text-muted-foreground">Forwarded</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by resident or address..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="validated">Validated</TabsTrigger>
              <TabsTrigger value="forwarded">Forwarded</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Requests List */}
        <div className="space-y-3">
          {filteredRequests.map((request) => {
            const status = statusConfig[request.status as keyof typeof statusConfig];
            return (
              <Card key={request.id} className="card-eco">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {request.photo ? (
                      <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden">
                        <img src={request.photo} alt="Proof" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                        <Camera className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-medium">{request.resident}</p>
                        <Badge variant="outline" className={status.textColor}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1 ${status.color}`} />
                          {status.label}
                        </Badge>
                        <Badge variant="secondary">{request.type}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {request.address}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {request.date}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{request.notes}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowDialog(true);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {request.status === 'pending' && (
                        <>
                          <Button 
                            size="sm"
                            onClick={() => handleValidate(request.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Validate
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleReject(request.id)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {request.status === 'validated' && (
                        <Button 
                          size="sm"
                          onClick={() => handleForward(request.id)}
                        >
                          <Send className="w-4 h-4 mr-1" />
                          Forward to MENRO
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Request Detail Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Request Details</DialogTitle>
              <DialogDescription>
                Review the garbage collection request
              </DialogDescription>
            </DialogHeader>
            
            {selectedRequest && (
              <div className="space-y-4">
                {selectedRequest.photo && (
                  <div className="aspect-video rounded-lg bg-muted overflow-hidden">
                    <img src={selectedRequest.photo} alt="Proof" className="w-full h-full object-cover" />
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Resident</p>
                    <p className="font-medium">{selectedRequest.resident}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{selectedRequest.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Request Type</p>
                    <p className="font-medium">{selectedRequest.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Volume</p>
                    <p className="font-medium">{selectedRequest.volume}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Notes</p>
                  <p>{selectedRequest.notes}</p>
                </div>
              </div>
            )}

            <DialogFooter>
              {selectedRequest?.status === 'pending' && (
                <>
                  <Button variant="destructive" onClick={() => handleReject(selectedRequest.id)}>
                    Reject
                  </Button>
                  <Button onClick={() => handleValidate(selectedRequest.id)}>
                    Validate
                  </Button>
                </>
              )}
              {selectedRequest?.status === 'validated' && (
                <Button onClick={() => handleForward(selectedRequest.id)}>
                  <Send className="w-4 h-4 mr-2" />
                  Forward to MENRO
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </BarangayLayout>
  );
}
