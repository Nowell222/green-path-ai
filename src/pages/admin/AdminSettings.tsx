import { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Mail,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoAssign, setAutoAssign] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and system preferences</p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList>
            <TabsTrigger value="account" className="gap-2">
              <User className="w-4 h-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="system" className="gap-2">
              <Settings className="w-4 h-4" />
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <div className="grid gap-6 max-w-2xl">
              <Card className="card-eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Juan" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Cruz" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@juanlesstrash.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="0918-XXX-5678" />
                  </div>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security
                  </CardTitle>
                  <CardDescription>Manage your password and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button variant="outline" onClick={() => toast.success('Password updated')}>
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="card-eco max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive email updates about reports and issues</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive push notifications for urgent alerts</p>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Daily Summary</p>
                    <p className="text-sm text-muted-foreground">Receive a daily summary of activities</p>
                  </div>
                  <Switch />
                </div>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <div className="grid gap-6 max-w-2xl">
              <Card className="card-eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Appearance
                  </CardTitle>
                  <CardDescription>Customize the look and feel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Use dark theme for the admin panel</p>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-eco">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    System Configuration
                  </CardTitle>
                  <CardDescription>Configure system behavior</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-assign Routes</p>
                      <p className="text-sm text-muted-foreground">Automatically assign trucks to optimal routes</p>
                    </div>
                    <Switch checked={autoAssign} onCheckedChange={setAutoAssign} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Real-time Tracking</p>
                      <p className="text-sm text-muted-foreground">Enable GPS tracking for all trucks</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Automatic Reports</p>
                      <p className="text-sm text-muted-foreground">Generate weekly reports automatically</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Configuration
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
