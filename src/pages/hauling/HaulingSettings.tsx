import HaulingAdminLayout from '@/components/layouts/HaulingAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';

export default function HaulingSettings() {
  return (
    <HaulingAdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-display font-bold">Settings</h1>
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="card-eco">
            <CardHeader><CardTitle className="text-base font-display">Organization Profile</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Organization Name</Label><Input defaultValue="GreenHaul Services Inc." /></div>
              <div className="space-y-2"><Label>Contact Email</Label><Input defaultValue="info@greenhaul.com" /></div>
              <div className="space-y-2"><Label>Contact Phone</Label><Input defaultValue="0922-XXX-1234" /></div>
              <Button><Save className="w-4 h-4 mr-2" />Save</Button>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardHeader><CardTitle className="text-base font-display">Service Pricing</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2"><Label>Base Hauling Fee (₱)</Label><Input type="number" defaultValue="1500" /></div>
              <div className="space-y-2"><Label>Per KM Rate (₱)</Label><Input type="number" defaultValue="50" /></div>
              <div className="space-y-2"><Label>Bulky Waste Surcharge (₱)</Label><Input type="number" defaultValue="500" /></div>
              <Button><Save className="w-4 h-4 mr-2" />Save Pricing</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </HaulingAdminLayout>
  );
}
