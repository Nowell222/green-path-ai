import EcoAideLayout from '@/components/layouts/EcoAideLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Camera, Upload } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function EcoAideIssues() {
  return (
    <EcoAideLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-display font-bold">Report Issue</h1>
        <Card className="card-eco">
          <CardHeader><CardTitle className="text-base font-display flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-status-warning" />Report On-Route Issue</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Issue Type</Label>
              <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                <option>Road Blocked</option>
                <option>Vehicle Breakdown</option>
                <option>Safety Concern</option>
                <option>Wrong Address</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2"><Label>Description</Label><Textarea placeholder="Describe the issue..." rows={3} /></div>
            <div className="space-y-2">
              <Label>Photo Attachment</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Upload photos</p>
              </div>
            </div>
            <Button className="w-full">Submit Report</Button>
          </CardContent>
        </Card>
      </div>
    </EcoAideLayout>
  );
}
