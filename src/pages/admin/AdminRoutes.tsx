import { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Map, 
  Plus, 
  Search,
  Clock,
  Truck,
  MapPin,
  MoreVertical,
  Play,
  Pause,
  Edit
} from 'lucide-react';
import { cn } from '@/lib/utils';

const routes = [
  { id: 'R-03', name: 'Barangay Centro Loop', stops: 24, distance: '8.5 km', duration: '2h 15m', status: 'active', truck: 'TRK-251', coverage: ['Centro', 'Poblacion Norte'] },
  { id: 'R-08', name: 'Barangay Magsaysay Route', stops: 18, distance: '6.2 km', duration: '1h 45m', status: 'active', truck: 'TRK-249', coverage: ['Magsaysay', 'Rizal'] },
  { id: 'R-12', name: 'Barangay San Jose Loop', stops: 16, distance: '5.8 km', duration: '1h 30m', status: 'active', truck: 'TRK-247', coverage: ['San Jose', 'Del Pilar'] },
  { id: 'R-15', name: 'Poblacion Commercial', stops: 12, distance: '4.2 km', duration: '1h', status: 'active', truck: 'TRK-248', coverage: ['Poblacion', 'Market Area'] },
  { id: 'R-18', name: 'Industrial Zone', stops: 8, distance: '10 km', duration: '2h', status: 'inactive', truck: null, coverage: ['Industrial', 'Warehouse District'] },
  { id: 'R-21', name: 'Coastal Route', stops: 20, distance: '12 km', duration: '2h 30m', status: 'scheduled', truck: null, coverage: ['Coastal', 'Fishing Village'] },
];

export default function AdminRoutes() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoutes = routes.filter(route => 
    route.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Route Management</h1>
            <p className="text-muted-foreground">Plan and optimize collection routes</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Route
          </Button>
        </div>

        {/* Map Placeholder */}
        <Card className="card-eco overflow-hidden">
          <div className="h-64 bg-muted flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Map className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Interactive Route Map</p>
              <p className="text-sm">Map integration coming soon</p>
            </div>
          </div>
        </Card>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search routes..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Routes List */}
        <div className="grid gap-4">
          {filteredRoutes.map((route) => (
            <Card key={route.id} className="card-eco">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Map className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold">{route.id}</h3>
                        <Badge variant={
                          route.status === 'active' ? 'default' :
                          route.status === 'scheduled' ? 'secondary' : 'outline'
                        }>
                          {route.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{route.name}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {route.coverage.map((area) => (
                          <Badge key={area} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{route.stops}</p>
                      <p className="text-xs text-muted-foreground">Stops</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Map className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{route.distance}</p>
                      <p className="text-xs text-muted-foreground">Distance</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{route.duration}</p>
                      <p className="text-xs text-muted-foreground">Duration</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{route.truck || 'None'}</p>
                      <p className="text-xs text-muted-foreground">Assigned</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  {route.status === 'active' ? (
                    <Button variant="outline" size="sm">
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-1" />
                      Activate
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
