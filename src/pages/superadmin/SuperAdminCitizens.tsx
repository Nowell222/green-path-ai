import SuperAdminLayout from '@/components/layouts/SuperAdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Search, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';

const citizens = [
  { id: 1, name: 'Maria Santos', email: 'maria@gmail.com', barangay: 'Brgy. San Jose', status: 'active', reports: 5 },
  { id: 2, name: 'Jose Garcia', email: 'jose@gmail.com', barangay: 'Brgy. Poblacion', status: 'active', reports: 2 },
  { id: 3, name: 'Ana Cruz', email: 'ana@gmail.com', barangay: 'Brgy. Caluangan', status: 'suspended', reports: 0 },
  { id: 4, name: 'Pedro Reyes', email: 'pedro@gmail.com', barangay: 'Brgy. Pinagbayanan', status: 'active', reports: 8 },
];

export default function SuperAdminCitizens() {
  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Citizens & Residents</h1>
        </div>
        <div className="flex gap-3 max-w-lg">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search citizens..." className="pl-9" />
          </div>
        </div>
        <div className="grid gap-4">
          {citizens.map((citizen) => (
            <Card key={citizen.id} className="card-eco">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {citizen.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{citizen.name}</p>
                      <p className="text-sm text-muted-foreground">{citizen.email} • {citizen.barangay}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-muted-foreground hidden md:block">{citizen.reports} reports</p>
                    <Badge variant={citizen.status === 'active' ? 'default' : 'destructive'}>{citizen.status}</Badge>
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
