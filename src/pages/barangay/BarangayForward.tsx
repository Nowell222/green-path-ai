import { useState } from 'react';
import BarangayLayout from '@/components/layouts/BarangayLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Send, 
  FileText,
  CheckCircle,
  Clock,
  Truck
} from 'lucide-react';
import { toast } from 'sonner';

const validatedRequests = [
  { id: 'REQ-002', resident: 'Juan Dela Cruz', address: 'Purok 3, Block 1', volume: 'Medium', date: '5 hours ago' },
  { id: 'REQ-006', resident: 'Elena Santos', address: 'Purok 4, Block 2', volume: 'High', date: '1 day ago' },
  { id: 'REQ-007', resident: 'Carlos Reyes', address: 'Purok 5, Block 1', volume: 'High', date: '1 day ago' },
];

const forwardHistory = [
  { id: 'FWD-001', date: 'Jan 28, 2026', requests: 5, status: 'approved', driver: 'Pedro Reyes' },
  { id: 'FWD-002', date: 'Jan 25, 2026', requests: 8, status: 'completed', driver: 'Jose Garcia' },
  { id: 'FWD-003', date: 'Jan 22, 2026', requests: 3, status: 'completed', driver: 'Maria Cruz' },
];

export default function BarangayForward() {
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const handleSelectAll = () => {
    if (selectedRequests.length === validatedRequests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(validatedRequests.map(r => r.id));
    }
  };

  const handleToggle = (id: string) => {
    setSelectedRequests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleForward = () => {
    if (selectedRequests.length === 0) {
      toast.error('Please select at least one request to forward');
      return;
    }
    toast.success(`${selectedRequests.length} requests forwarded to MENRO!`, {
      description: 'They will review and assign a driver'
    });
    setSelectedRequests([]);
    setNotes('');
  };

  return (
    <BarangayLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Forward to MENRO</h1>
          <p className="text-muted-foreground">Send validated requests to MENRO for driver assignment</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Validated Requests to Forward */}
          <Card className="card-eco lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Validated Requests ({validatedRequests.length})
                </CardTitle>
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                  {selectedRequests.length === validatedRequests.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {validatedRequests.map((request) => (
                <div 
                  key={request.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                    selectedRequests.includes(request.id) ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <Checkbox 
                    checked={selectedRequests.includes(request.id)}
                    onCheckedChange={() => handleToggle(request.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{request.resident}</p>
                      <Badge variant="secondary">{request.volume}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{request.address}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{request.date}</p>
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
                <p className="text-3xl font-bold text-primary">{selectedRequests.length}</p>
                <p className="text-sm text-muted-foreground">requests selected</p>
              </div>

              <div className="space-y-2">
                <Label>Additional Notes (Optional)</Label>
                <Textarea 
                  placeholder="Add any notes for MENRO..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>

              <Button 
                className="w-full" 
                onClick={handleForward}
                disabled={selectedRequests.length === 0}
              >
                <Send className="w-4 h-4 mr-2" />
                Forward to MENRO
              </Button>
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
                      {item.requests} requests • Driver: {item.driver}
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
