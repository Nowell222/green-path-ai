import SuperAdminLayout from '@/components/layouts/SuperAdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Plus, Search, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';

const businesses = [
  { id: 1, name: 'Reyes Food Corp.', type: 'Food & Beverage', status: 'active', requests: 12 },
  { id: 2, name: 'Metro Food Corp.', type: 'Food & Beverage', status: 'pending', requests: 0 },
  { id: 3, name: 'BuildRight Construction', type: 'Construction', status: 'active', requests: 8 },
  { id: 4, name: 'SM San Juan', type: 'Retail', status: 'active', requests: 25 },
];

export default function SuperAdminBusinesses() {
  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">Business Organizations</h1>
          <Button><Plus className="w-4 h-4 mr-2" />Add Business</Button>
        </div>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search businesses..." className="pl-9" />
        </div>
        <div className="grid gap-4">
          {businesses.map((biz) => (
            <Card key={biz.id} className="card-eco">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-status-info/10 flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-status-info" />
                    </div>
                    <div>
                      <p className="font-bold">{biz.name}</p>
                      <p className="text-sm text-muted-foreground">{biz.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm hidden md:block"><p>{biz.requests} requests</p></div>
                    <Badge variant={biz.status === 'active' ? 'default' : 'secondary'}>{biz.status}</Badge>
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
