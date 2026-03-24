import BusinessLayout from '@/components/layouts/BusinessLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Camera, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const existingRequests = [
  { id: 1, type: 'Regular Waste', status: 'Pending', submitted: '2 hours ago', fee: '₱1,500' },
  { id: 2, type: 'Recyclables', status: 'Approved', submitted: 'Yesterday', fee: 'Free' },
  { id: 3, type: 'Bulky Waste', status: 'Denied', submitted: '3 days ago', fee: '₱2,000', reason: 'Insufficient description' },
];

export default function BusinessRequests() {
  return (
    <BusinessLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
        <h1 className="text-2xl font-display font-bold">Hauling Requests</h1>
        <Tabs defaultValue="new">
          <TabsList>
            <TabsTrigger value="new">New Request</TabsTrigger>
            <TabsTrigger value="existing">My Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="new" className="mt-4">
            <Card className="card-eco">
              <CardHeader><CardTitle className="text-base font-display">Submit Hauling Request</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Waste Type</Label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                    <option>Regular Waste (₱ service fee)</option>
                    <option>Recyclable Materials (Free)</option>
                    <option>Bulky Waste (₱ surcharge)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe the waste to be collected..." rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Photo Evidence</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload photos</p>
                  </div>
                </div>
                <Button className="w-full">Submit Request</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="existing" className="mt-4 space-y-3">
            {existingRequests.map((req) => (
              <Card key={req.id} className="card-eco">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{req.type}</p>
                      <p className="text-sm text-muted-foreground">{req.submitted}</p>
                      {req.reason && <p className="text-xs text-destructive mt-1">Reason: {req.reason}</p>}
                    </div>
                    <div className="text-right">
                      <Badge variant={req.status === 'Approved' ? 'default' : req.status === 'Denied' ? 'destructive' : 'secondary'}>{req.status}</Badge>
                      <p className="text-sm font-medium mt-1">{req.fee}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </BusinessLayout>
  );
}
