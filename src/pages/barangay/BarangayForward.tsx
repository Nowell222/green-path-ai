import { useState } from 'react';
import BarangayLayout from '@/components/layouts/BarangayLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Send, 
  FileText,
  CheckCircle,
  Clock,
  Truck,
  AlertTriangle,
  Package
} from 'lucide-react';
import { toast } from 'sonner';

const validatedRequests = [
  { id: 'REQ-002', resident: 'Juan Dela Cruz', address: 'Purok 3, Block 1', volume: 'Medium (~20kg)', date: '5 hours ago' },
  { id: 'REQ-006', resident: 'Elena Santos', address: 'Purok 4, Block 2', volume: 'High (~35kg)', date: '1 day ago' },
  { id: 'REQ-007', resident: 'Carlos Reyes', address: 'Purok 5, Block 1', volume: 'High (~40kg)', date: '1 day ago' },
  { id: 'REQ-008', resident: 'Maria Luna', address: 'Purok 2, Block 3', volume: 'Medium (~25kg)', date: '1 day ago' },
  { id: 'REQ-009', resident: 'Jose Ramos', address: 'Purok 6, Block 1', volume: 'Low (~15kg)', date: '2 days ago' },
  { id: 'REQ-010', resident: 'Ana Cruz', address: 'Purok 3, Block 4', volume: 'High (~30kg)', date: '2 days ago' },
  { id: 'REQ-011', resident: 'Pedro Santos', address: 'Purok 1, Block 2', volume: 'Medium (~22kg)', date: '2 days ago' },
  { id: 'REQ-012', resident: 'Rosa Garcia', address: 'Purok 4, Block 1', volume: 'Low (~12kg)', date: '3 days ago' },
];

const forwardHistory = [
  { id: 'FWD-001', date: 'Jan 28, 2026', requests: 10, volume: '~320kg', status: 'approved', driver: 'Pedro Reyes' },
  { id: 'FWD-002', date: 'Jan 25, 2026', requests: 12, volume: '~450kg', status: 'completed', driver: 'Jose Garcia' },
  { id: 'FWD-003', date: 'Jan 22, 2026', requests: 8, volume: '~280kg', status: 'completed', driver: 'Maria Cruz' },
];

const QUOTA_THRESHOLD = 10;

export default function BarangayForward() {
  const [notes, setNotes] = useState('');
  const [isForwarding, setIsForwarding] = useState(false);

  const totalRequests = validatedRequests.length;
  const quotaPercent = (totalRequests / QUOTA_THRESHOLD) * 100;
  const canForward = totalRequests >= QUOTA_THRESHOLD;

  // Calculate estimated total volume
  const estimatedVolume = validatedRequests.reduce((acc, req) => {
    const match = req.volume.match(/~(\d+)kg/);
    return acc + (match ? parseInt(match[1]) : 0);
  }, 0);

  const handleForward = async () => {
    if (!canForward) {
      toast.error(`Quota not reached. Need ${QUOTA_THRESHOLD - totalRequests} more validated requests.`);
      return;
    }
    
    setIsForwarding(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Requests forwarded to MENRO!', {
      description: `${totalRequests} requests (~${estimatedVolume}kg) sent for review and driver assignment.`
    });
    setNotes('');
    setIsForwarding(false);
  };

  return (
    <BarangayLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Forward to MENRO</h1>
          <p className="text-muted-foreground">Send validated requests to MENRO for driver assignment</p>
        </div>

        {/* Quota Status Banner */}
        <Card className={`card-eco ${canForward ? 'border-[hsl(var(--status-success))]' : 'border-[hsl(var(--status-warning))]'}`}>
          <CardContent className="p-6">
            <div className="grid lg:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Validated Requests</p>
                <p className="text-4xl font-bold text-primary">{totalRequests}</p>
                <p className="text-xs text-muted-foreground">of {QUOTA_THRESHOLD} quota</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Quota Completion</p>
                <p className="text-4xl font-bold">{Math.round(quotaPercent)}%</p>
                <Progress value={Math.min(quotaPercent, 100)} className="h-2 mt-2" />
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Est. Total Volume</p>
                <p className="text-4xl font-bold">~{estimatedVolume}kg</p>
                <p className="text-xs text-muted-foreground">accumulated garbage</p>
              </div>
              
              <div className="flex items-center justify-center">
                {canForward ? (
                  <div className="text-center p-4 rounded-lg bg-[hsl(var(--status-success))]/10">
                    <CheckCircle className="w-8 h-8 text-[hsl(var(--status-success))] mx-auto mb-2" />
                    <p className="font-medium text-[hsl(var(--status-success))]">Quota Reached!</p>
                    <p className="text-xs text-muted-foreground">Ready to forward</p>
                  </div>
                ) : (
                  <div className="text-center p-4 rounded-lg bg-[hsl(var(--status-warning))]/10">
                    <AlertTriangle className="w-8 h-8 text-[hsl(var(--status-warning))] mx-auto mb-2" />
                    <p className="font-medium text-[hsl(var(--status-warning))]">Quota Not Met</p>
                    <p className="text-xs text-muted-foreground">Need {QUOTA_THRESHOLD - totalRequests} more</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Validated Requests List */}
          <Card className="card-eco lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Validated Requests ({validatedRequests.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
              {validatedRequests.map((request) => (
                <div 
                  key={request.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-primary/20 bg-primary/5"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{request.resident}</p>
                      <Badge variant="secondary">{request.volume}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{request.address}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>{request.id}</p>
                    <p>{request.date}</p>
                  </div>
                </div>
              ))}

              {validatedRequests.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>No validated requests to forward</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Forward Form */}
          <Card className="card-eco">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Send className="w-5 h-5 text-primary" />
                Forward Request
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-muted text-center">
                <p className="text-3xl font-bold text-primary">{totalRequests}</p>
                <p className="text-sm text-muted-foreground">total requests</p>
              </div>

              <div className="p-4 rounded-lg bg-muted text-center">
                <p className="text-2xl font-bold">~{estimatedVolume}kg</p>
                <p className="text-sm text-muted-foreground">estimated volume</p>
              </div>

              <div className="space-y-2">
                <Label>Additional Notes for MENRO (Optional)</Label>
                <Textarea 
                  placeholder="Add any special instructions or notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <Button 
                className="w-full" 
                onClick={handleForward}
                disabled={!canForward || isForwarding}
              >
                {isForwarding ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {canForward ? 'Forward to MENRO' : `Need ${QUOTA_THRESHOLD - totalRequests} more requests`}
                  </>
                )}
              </Button>

              {!canForward && (
                <p className="text-xs text-center text-muted-foreground">
                  Forward button will be enabled once quota is reached
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Forward History */}
        <Card className="card-eco">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Forward History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {forwardHistory.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{item.id}</p>
                      <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.requests} requests • {item.volume} • Driver: {item.driver}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </BarangayLayout>
  );
}
