import HaulingAdminLayout from '@/components/layouts/HaulingAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Camera } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const requests = [
  { id: 1, from: 'Reyes Food Corp.', type: 'Regular Waste', fee: '₱1,500', submitted: '30 min ago', status: 'pending', photos: 2 },
  { id: 2, from: 'SM San Juan', type: 'Recyclables', fee: 'Free', submitted: '1 hr ago', status: 'pending', photos: 3 },
  { id: 3, from: 'Maria Santos', type: 'Bulky Waste', fee: '₱2,000', submitted: '2 hrs ago', status: 'pending', photos: 1 },
  { id: 4, from: 'BuildRight Construction', type: 'Construction Waste', fee: '₱3,000', submitted: 'Yesterday', status: 'approved', photos: 4 },
  { id: 5, from: 'Jose Garcia', type: 'Recyclables', fee: 'Free', submitted: '2 days ago', status: 'completed', photos: 2 },
];

export default function HaulingRequests() {
  return (
    <HaulingAdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-display font-bold">Hauling Requests</h1>
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending ({requests.filter(r => r.status === 'pending').length})</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          {['pending', 'approved', 'completed'].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-3 mt-4">
              {requests.filter(r => r.status === tab).map((req) => (
                <Card key={req.id} className="card-eco">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-status-warning/10 flex items-center justify-center"><Package className="w-6 h-6 text-status-warning" /></div>
                        <div>
                          <p className="font-bold">{req.from}</p>
                          <p className="text-sm text-muted-foreground">{req.type} • {req.submitted}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1"><Camera className="w-3 h-3" />{req.photos} photos</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`font-medium ${req.fee === 'Free' ? 'text-status-success' : 'text-primary'}`}>{req.fee}</span>
                        {tab === 'pending' && (
                          <div className="flex gap-2">
                            <Button size="sm">Approve & Assign</Button>
                            <Button size="sm" variant="outline">Deny</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </HaulingAdminLayout>
  );
}
