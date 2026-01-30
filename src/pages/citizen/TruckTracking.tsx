import { useState } from 'react';
import CitizenLayout from '@/components/layouts/CitizenLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Phone, 
  Bell,
  Navigation,
  CheckCircle2,
  Circle,
  User,
  Gauge
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// San Juan, Batangas coordinates (approximate)
const SAN_JUAN_BATANGAS = {
  center: { lat: 13.8261, lng: 121.3956 },
  name: 'San Juan, Batangas'
};

// Mock data with GPS coordinates
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
  currentLocation: { lat: 13.8245, lng: 121.3920, address: 'Purok 4, Brgy. Poblacion' },
};

const routeStops = [
  { id: 1, name: 'Purok 1, Brgy. Poblacion', status: 'completed', time: '6:02 PM', lat: 13.8200, lng: 121.3900 },
  { id: 2, name: 'Purok 2, Brgy. Poblacion', status: 'completed', time: '6:08 PM', lat: 13.8215, lng: 121.3910 },
  { id: 3, name: 'Purok 3, Brgy. Poblacion', status: 'completed', time: '6:15 PM', lat: 13.8230, lng: 121.3915 },
  { id: 4, name: 'Purok 4, Brgy. Poblacion', status: 'current', time: null, lat: 13.8245, lng: 121.3920 },
  { id: 5, name: 'Purok 5 - YOUR LOCATION', status: 'upcoming', time: null, lat: 13.8260, lng: 121.3940 },
  { id: 6, name: 'Purok 6, Brgy. Poblacion', status: 'upcoming', time: null, lat: 13.8275, lng: 121.3955 },
  { id: 7, name: 'Purok 7, Brgy. Poblacion', status: 'upcoming', time: null, lat: 13.8290, lng: 121.3970 },
];

export default function TruckTracking() {
  const [notifyEnabled, setNotifyEnabled] = useState(false);
  const completedStops = routeStops.filter(s => s.status === 'completed').length;
  const totalStops = routeStops.length;
  const progress = (completedStops / totalStops) * 100;

  // Calculate positions for the visual route
  const userStopIndex = routeStops.findIndex(s => s.name.includes('YOUR'));

  return (
    <CitizenLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Track Truck</h1>
            <p className="text-muted-foreground">Real-time GPS tracking in {SAN_JUAN_BATANGAS.name}</p>
          </div>
          <Button 
            variant={notifyEnabled ? "default" : "outline"} 
            size="sm"
            onClick={() => setNotifyEnabled(!notifyEnabled)}
          >
            <Bell className={cn("w-4 h-4 mr-2", notifyEnabled && "animate-pulse")} />
            {notifyEnabled ? 'Notifications On' : 'Notify Me'}
          </Button>
        </div>

        {/* Enhanced Map Visualization with Route Line */}
        <Card className="card-eco overflow-hidden">
          <div className="aspect-video lg:aspect-[21/9] bg-gradient-to-b from-muted to-muted/50 relative">
            {/* Map Background (simulated) */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMDA4IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
            
            {/* Location label */}
            <div className="absolute top-4 right-4 bg-background/90 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2">
              <MapPin className="w-3 h-3 text-primary" />
              {SAN_JUAN_BATANGAS.name}
            </div>

            {/* Simulated road/path */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="w-full max-w-2xl relative">
                {/* Route line background (grey for incomplete) */}
                <div className="absolute top-1/2 left-0 right-0 h-3 bg-muted-foreground/20 rounded-full transform -translate-y-1/2" />
                
                {/* Route line (green dashed for active route) */}
                <svg className="absolute top-1/2 left-0 right-0 h-6 transform -translate-y-1/2" style={{ overflow: 'visible' }}>
                  <line 
                    x1="0%" 
                    y1="50%" 
                    x2={`${progress}%`} 
                    y2="50%" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="4" 
                    strokeDasharray="8 4"
                    className="animate-pulse"
                  />
                </svg>
                
                {/* Completed route portion (solid) */}
                <div 
                  className="absolute top-1/2 left-0 h-3 bg-primary rounded-full transform -translate-y-1/2 transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
                
                {/* Route dots/stops */}
                {routeStops.map((stop, idx) => {
                  const position = ((idx + 0.5) / totalStops) * 100;
                  return (
                    <div 
                      key={stop.id}
                      className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
                      style={{ left: `${position}%` }}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 border-background shadow-sm",
                        stop.status === 'completed' && "bg-primary",
                        stop.status === 'current' && "bg-[hsl(var(--status-warning))] animate-pulse",
                        stop.status === 'upcoming' && "bg-muted-foreground/30"
                      )} />
                      {stop.name.includes('YOUR') && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                          <Badge variant="default" className="animate-bounce shadow-lg">
                            📍 Your Location
                          </Badge>
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Moving Truck icon with animation */}
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-1000"
                  style={{ left: `${progress}%` }}
                >
                  <div className="relative">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-xl border-4 border-background">
                      <Truck className="w-7 h-7 text-primary-foreground" />
                    </div>
                    {/* Pulse animation around truck */}
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className="text-xs font-bold bg-background px-3 py-1.5 rounded-full shadow-lg border">
                        {truckInfo.id} • {truckInfo.speed}
                      </span>
                    </div>
                  </div>
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

            {/* Live indicator */}
            <div className="absolute top-4 left-4">
              <Badge variant="destructive" className="animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
                LIVE GPS
              </Badge>
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

              {/* Current Location */}
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1">Current Location</p>
                <p className="font-medium text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  {truckInfo.currentLocation.address}
                </p>
              </div>

              {/* Truck Load Status */}
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm flex items-center gap-2">
                    <Gauge className="w-4 h-4" />
                    Truck Load Capacity
                  </span>
                  <Badge variant={truckInfo.capacity > 90 ? 'destructive' : truckInfo.capacity > 70 ? 'secondary' : 'default'}>
                    {truckInfo.capacity}% Full
                  </Badge>
                </div>
                <Progress value={truckInfo.capacity} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {truckInfo.capacity > 90 
                    ? '⚠️ Truck is almost full - may not collect all waste' 
                    : truckInfo.capacity > 70 
                    ? 'Limited capacity remaining' 
                    : '✓ Plenty of space available'}
                </p>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Last update: {truckInfo.lastUpdate} • Speed: {truckInfo.speed}
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
                      <p className={cn(
                        "text-sm font-medium",
                        stop.name.includes('YOUR') && 'text-primary font-bold'
                      )}>
                        {stop.name}
                      </p>
                      {stop.time && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {stop.time}
                        </p>
                      )}
                      {stop.status === 'current' && (
                        <p className="text-xs text-primary font-medium">🚛 Truck is here</p>
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
