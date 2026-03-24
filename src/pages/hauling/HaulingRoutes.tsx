import HaulingAdminLayout from '@/components/layouts/HaulingAdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Map, Plus } from 'lucide-react';

const routes = [
  { id: 'HR-01', name: 'Batangas City Loop', type: 'paid', ecoAide: 'Mark Gonzales', stops: 12, status: 'active' },
  { id: 'HR-02', name: 'Lipa Recyclables', type: 'free', ecoAide: 'Ramon Torres', stops: 8, status: 'active' },
  { id: 'HR-03', name: 'San Juan On-Demand', type: 'paid', ecoAide: 'Unassigned', stops: 0, status: 'draft' },
];

export default function HaulingRoutes() {
  return (
    <HaulingAdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Routes</h1>
          <Button><Plus className="w-4 h-4 mr-2" />Create Route</Button>
        </div>
        <div className="grid gap-4">
          {routes.map((r) => (
            <Card key={r.id} className="card-eco">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Map className="w-6 h-6 text-primary" /></div>
                    <div>
                      <p className="font-bold">{r.id}: {r.name}</p>
                      <p className="text-sm text-muted-foreground">{r.ecoAide} • {r.stops} stops</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={r.type === 'paid' ? 'default' : 'secondary'}>{r.type === 'paid' ? 'Paid Route' : 'Free (Recyclables)'}</Badge>
                    <Badge variant={r.status === 'active' ? 'default' : 'outline'}>{r.status}</Badge>
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
