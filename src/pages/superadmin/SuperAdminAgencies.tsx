import SuperAdminLayout from '@/components/layouts/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Landmark, Plus, Search, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';

const agencies = [
  { id: 1, name: 'MENRO San Juan', location: 'San Juan, Batangas', status: 'active', drivers: 15, trucks: 12, admins: 3 },
  { id: 2, name: 'MENRO Rosario', location: 'Rosario, Batangas', status: 'active', drivers: 8, trucks: 6, admins: 2 },
  { id: 3, name: 'MENRO Lipa', location: 'Lipa City, Batangas', status: 'pending', drivers: 0, trucks: 0, admins: 1 },
  { id: 4, name: 'MENRO Tanauan', location: 'Tanauan City, Batangas', status: 'active', drivers: 10, trucks: 8, admins: 2 },
];

export default function SuperAdminAgencies() {
  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Government Agencies</h1>
          <Button><Plus className="w-4 h-4 mr-2" />Add Agency</Button>
        </div>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search agencies..." className="pl-9" />
        </div>
        <div className="grid gap-4">
          {agencies.map((agency) => (
            <Card key={agency.id} className="card-eco">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Landmark className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">{agency.name}</p>
                      <p className="text-sm text-muted-foreground">{agency.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm hidden md:block">
                      <p>{agency.admins} admins • {agency.drivers} drivers • {agency.trucks} trucks</p>
                    </div>
                    <Badge variant={agency.status === 'active' ? 'default' : 'secondary'}>
                      {agency.status}
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
