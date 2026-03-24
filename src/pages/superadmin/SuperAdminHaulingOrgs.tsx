import SuperAdminLayout from '@/components/layouts/SuperAdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Plus, Search, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';

const haulingOrgs = [
  { id: 1, name: 'GreenHaul Services Inc.', location: 'Batangas City', status: 'active', ecoAides: 12, vehicles: 8 },
  { id: 2, name: 'EcoWaste Solutions', location: 'Lipa City', status: 'pending', ecoAides: 0, vehicles: 0 },
  { id: 3, name: 'CleanCity Haulers', location: 'Tanauan', status: 'pending', ecoAides: 0, vehicles: 0 },
  { id: 4, name: 'WasteAway Corp.', location: 'San Juan', status: 'suspended', ecoAides: 5, vehicles: 3 },
];

export default function SuperAdminHaulingOrgs() {
  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Hauling Organizations</h1>
          <Button><Plus className="w-4 h-4 mr-2" />Add Organization</Button>
        </div>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search organizations..." className="pl-9" />
        </div>
        <div className="grid gap-4">
          {haulingOrgs.map((org) => (
            <Card key={org.id} className="card-eco">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-status-warning/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-status-warning" />
                    </div>
                    <div>
                      <p className="font-bold">{org.name}</p>
                      <p className="text-sm text-muted-foreground">{org.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm hidden md:block">
                      <p>{org.ecoAides} eco-aides • {org.vehicles} vehicles</p>
                    </div>
                    <Badge variant={org.status === 'active' ? 'default' : org.status === 'suspended' ? 'destructive' : 'secondary'}>
                      {org.status}
                    </Badge>
                    <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SuperAdminLayout>
  );
}
