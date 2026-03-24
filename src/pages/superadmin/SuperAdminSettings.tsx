import SuperAdminLayout from '@/components/layouts/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Save } from 'lucide-react';

export default function SuperAdminSettings() {
  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-display font-bold">System Settings</h1>
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="card-eco">
            <CardHeader><CardTitle className="text-base font-display">Platform Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Platform Name</Label>
                <Input defaultValue="JuanLessTrash" />
              </div>
              <div className="space-y-2">
                <Label>Support Email</Label>
                <Input defaultValue="support@juanlesstrash.com" />
              </div>
              <div className="space-y-2">
                <Label>Max Organizations</Label>
                <Input type="number" defaultValue="100" />
              </div>
              <Button><Save className="w-4 h-4 mr-2" />Save Changes</Button>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardHeader><CardTitle className="text-base font-display">Admin Account</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input defaultValue="Ricardo Dela Cruz" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue="superadmin@juanlesstrash.com" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="Enter new password" />
              </div>
              <Button><Save className="w-4 h-4 mr-2" />Update Profile</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
