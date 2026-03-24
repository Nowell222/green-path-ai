import HaulingAdminLayout from '@/components/layouts/HaulingAdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const vehicles = [
  { id: 'ECO-105', type: 'Mini Truck', status: 'in_use', driver: 'Mark Gonzales', capacity: '2 tons' },
  { id: 'ECO-108', type: 'Pickup', status: 'in_use', driver: 'Ramon Torres', capacity: '1 ton' },
  { id: 'ECO-112', type: 'Mini Truck', status: 'available', driver: '-', capacity: '2 tons' },
  { id: 'ECO-115', type: 'Van', status: 'maintenance', driver: '-', capacity: '1.5 tons' },
];

export default function HaulingFleet() {
  return (
    <HaulingAdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Fleet Management</h1>
          <Button><Plus className="w-4 h-4 mr-2" />Add Vehicle</Button>
        </div>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search vehicles..." className="pl-9" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {vehicles.map((v) => (
            <Card key={v.id} className="card-eco">
              <CardContent className="p-5">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Truck className="w-6 h-6 text-primary" /></div>
                  <div>
                    <p className="font-bold">{v.id}</p>
                    <p className="text-sm text-muted-foreground">{v.type} • {v.capacity}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Driver: {v.driver}</p>
                  <Badge variant={v.status === 'in_use' ? 'default' : v.status === 'available' ? 'secondary' : 'destructive'}>
                    {v.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </HaulingAdminLayout>
  );
}
