import HaulingAdminLayout from '@/components/layouts/HaulingAdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Search, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ecoAides = [
  { id: 1, name: 'Mark Gonzales', vehicleId: 'ECO-105', status: 'active', tasksToday: 4, route: 'R-01' },
  { id: 2, name: 'Ramon Torres', vehicleId: 'ECO-108', status: 'active', tasksToday: 3, route: 'R-03' },
  { id: 3, name: 'Luis Bautista', vehicleId: 'ECO-112', status: 'on_break', tasksToday: 2, route: '-' },
  { id: 4, name: 'James Santos', vehicleId: 'ECO-115', status: 'pending_approval', tasksToday: 0, route: '-' },
];

export default function HaulingEcoAides() {
  return (
    <HaulingAdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Eco-Aides</h1>
          <Button><Plus className="w-4 h-4 mr-2" />Add Eco-Aide</Button>
        </div>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search eco-aides..." className="pl-9" />
        </div>
        <div className="grid gap-4">
          {ecoAides.map((aide) => (
            <Card key={aide.id} className="card-eco">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{aide.name.charAt(0)}</div>
                    <div>
                      <p className="font-bold">{aide.name}</p>
                      <p className="text-sm text-muted-foreground">{aide.vehicleId} • Route: {aide.route}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-muted-foreground hidden md:block">{aide.tasksToday} tasks today</p>
                    <Badge variant={aide.status === 'active' ? 'default' : aide.status === 'pending_approval' ? 'secondary' : 'outline'}>
                      {aide.status.replace('_', ' ')}
                    </Badge>
                    <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </HaulingAdminLayout>
  );
}
