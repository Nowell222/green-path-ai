import CitizenLayout from '@/components/layouts/CitizenLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Phone, 
  Bell,
  Navigation,
  CheckCircle2,
  Circle,
  User
} from 'lucide-react';

// Mock data
const truckInfo = {
  id: 'TRK-247',
  driver: 'Juan Santos',
  phone: '0917-XXX-XXXX',
  vehicle: 'Isuzu FVR',
  plate: 'ABC-1234',
  status: 'EN ROUTE',
  capacity: 78,
  speed: '15 km/h',
  lastUpdate: '3 sec ago',
  eta: '18 minutes',
  stopsAway: 4,
};

const routeStops = [
  { id: 1, name: 'Purok 1', status: 'completed', time: '6:02 PM' },
  { id: 2, name: 'Purok 2', status: 'completed', time: '6:08 PM' },
  { id: 3, name: 'Purok 3', status: 'completed', time: '6:15 PM' },
  { id: 4, name: 'Purok 4', status: 'current', time: null },
  { id: 5, name: 'Purok 5 - YOUR LOCATION', status: 'upcoming', time: null },
  { id: 6, name: 'Purok 6', status: 'upcoming', time: null },
  { id: 7, name: 'Purok 7', status: 'upcoming', time: null },
];

export default function TruckTracking() {
  const completedStops = routeStops.filter(s => s.status === 'completed').length;
  const totalStops = routeStops.length;
  const progress = (completedStops / totalStops) * 100;

  return (
    <CitizenLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Track Truck</h1>
            <p className="text-muted-foreground">Real-time garbage truck location</p>
          </div>
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Notify Me
          </Button>
        </div>

        {/* Map Placeholder */}
        <Card className="card-eco overflow-hidden">
          <div className="aspect-video lg:aspect-[21/9] bg-muted relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
            
            {/* Fake map visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Route line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary/30 rounded-full" />
                <div className="absolute top-1/2 left-0 h-1 bg-primary rounded-full" style={{ width: `${progress}%` }} />
                
                {/* Truck icon */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse"
                  style={{ left: `${progress}%` }}
                >
                  <Truck className="w-5 h-5 text-primary-foreground" />
                </div>
                
                {/* Your location marker */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-waste-recyclable rounded-full flex items-center justify-center shadow-lg"
                  style={{ left: '71%' }}
                >
                  <MapPin className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            </div>

            {/* Map controls */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button size="sm" variant="secondary">
                <Navigation className="w-4 h-4 mr-1" />
                Center
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Truck Info Card */}
          <Card className="card-eco">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  {truckInfo.id}
                </CardTitle>
                <span className="px-2 py-1 rounded-full bg-truck-active/10 text-truck-active text-xs font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-truck-active rounded-full animate-pulse" />
                  {truckInfo.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{truckInfo.driver}</p>
                  <p className="text-sm text-muted-foreground">{truckInfo.vehicle} • {truckInfo.plate}</p>
                </div>
                <Button size="icon" variant="outline">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-accent/50 text-center">
                  <p className="text-2xl font-bold text-primary">{truckInfo.eta}</p>
                  <p className="text-xs text-muted-foreground">Estimated Arrival</p>
                </div>
                <div className="p-3 rounded-lg bg-accent/50 text-center">
                  <p className="text-2xl font-bold">{truckInfo.stopsAway}</p>
                  <p className="text-xs text-muted-foreground">Stops Away</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Capacity: {truckInfo.capacity}% full</span>
                <span>Speed: {truckInfo.speed}</span>
              </div>

              <div className="relative">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${truckInfo.capacity}%` }} />
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Last update: {truckInfo.lastUpdate}
              </p>
            </CardContent>
          </Card>

          {/* Route Progress Card */}
          <Card className="card-eco">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Route Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {routeStops.map((stop, idx) => (
                  <div key={stop.id} className="flex items-center gap-3 py-2">
                    <div className="flex flex-col items-center">
                      {stop.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-status-success" />
                      ) : stop.status === 'current' ? (
                        <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary/20 animate-pulse" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                      {idx < routeStops.length - 1 && (
                        <div className={`w-0.5 h-6 mt-1 ${stop.status === 'completed' ? 'bg-status-success' : 'bg-muted'}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${stop.name.includes('YOUR') ? 'text-primary' : ''}`}>
                        {stop.name}
                      </p>
                      {stop.time && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {stop.time}
                        </p>
                      )}
                      {stop.status === 'current' && (
                        <p className="text-xs text-primary font-medium">In Progress</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CitizenLayout>
  );
}
