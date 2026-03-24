import BusinessLayout from '@/components/layouts/BusinessLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Camera, Upload } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const pastReports = [
  { id: 1, subject: 'Missed pickup on March 15', status: 'Resolved', date: 'Mar 15, 2026' },
  { id: 2, subject: 'Incorrect waste segregation', status: 'Under Review', date: 'Mar 10, 2026' },
];

export default function BusinessReports() {
  return (
    <BusinessLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
        <h1 className="text-2xl font-display font-bold">Reports & Complaints</h1>
        <Card className="card-eco">
          <CardHeader><CardTitle className="text-base font-display">Submit Report</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Description</Label><Textarea placeholder="Describe the issue..." rows={3} /></div>
            <div className="space-y-2">
              <Label>Photo Evidence</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Upload photos</p>
              </div>
            </div>
            <Button className="w-full">Submit Report</Button>
          </CardContent>
        </Card>
        <Card className="card-eco">
          <CardHeader><CardTitle className="text-base font-display">Past Reports</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {pastReports.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                <div>
                  <p className="text-sm font-medium">{r.subject}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${r.status === 'Resolved' ? 'bg-status-success/10 text-status-success' : 'bg-status-warning/10 text-status-warning'}`}>{r.status}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </BusinessLayout>
  );
}
