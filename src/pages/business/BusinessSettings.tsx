import BusinessLayout from '@/components/layouts/BusinessLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';

export default function BusinessSettings() {
  return (
    <BusinessLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
        <h1 className="text-2xl font-display font-bold">Business Settings</h1>
        <Card className="card-eco">
          <CardHeader><CardTitle className="text-base font-display">Business Profile</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Business Name</Label><Input defaultValue="Reyes Food Corp." /></div>
            <div className="space-y-2"><Label>Contact Email</Label><Input defaultValue="business@juanlesstrash.com" /></div>
            <div className="space-y-2"><Label>Contact Phone</Label><Input defaultValue="0923-XXX-5678" /></div>
            <div className="space-y-2"><Label>Address</Label><Input defaultValue="San Juan, Batangas" /></div>
            <Button><Save className="w-4 h-4 mr-2" />Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </BusinessLayout>
  );
}
