import { useAuth } from '@/contexts/AuthContext';
import DriverLayout from '@/components/layouts/DriverLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Navigation,
  Play,
  Users,
  Fuel,
  AlertTriangle,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
const driverData = {
  truckId: 'TRK-247',
  route: 'R-12',
  routeName: 'Barangay San Jose Loop',
  status: 'IN PROGRESS',
  startTime: '6:00 PM',
  estimatedEnd: '7:45 PM',
  currentStop: 12,
  totalStops: 16,
  capacity: 78,
  collectionsToday: {
    residential: 87,
    commercial: 5
  },
  stats: {
    avgTimePerStop: 4.2,
    missedCollections: 3,
    fuelEfficiency: 'Good'
  }
};

const nextStops = [
  { id: 12, name: 'Purok 4, Block 3', type: 'residential', status: 'current' },
  { id: 13, name: 'Purok 5, Main Street', type: 'residential', status: 'upcoming' },
  { id: 14, name: 'Mini Mart (Commercial)', type: 'commercial', status: 'upcoming' },
  { id: 15, name: 'Purok 6, Corner', type: 'residential', status: 'upcoming' },
];

export default function DriverDashboard() {
  const { user } = useAuth();
  const progress = (driverData.currentStop / driverData.totalStops) * 100;

  return (
    <DriverLayout>
      <div className="p-4 space-y-4">
        {/* Status Banner */}
        <div className="gradient-eco rounded-xl p-4 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/80 text-sm">Current Route</p>
              <p className="text-xl font-bold">{driverData.route}: {driverData.routeName}</p>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-white/20 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              {driverData.status}
            </span>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Stop {driverData.currentStop} of {driverData.totalStops}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="card-eco">
            <CardContent className="p-3 text-center">
              <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold">{driverData.startTime}</p>
              <p className="text-[10px] text-muted-foreground">Started</p>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-3 text-center">
              <Users className="w-5 h-5 text-status-success mx-auto mb-1" />
              <p className="text-lg font-bold">{driverData.collectionsToday.residential}</p>
              <p className="text-[10px] text-muted-foreground">Collected</p>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-3 text-center">
              <Truck className="w-5 h-5 text-status-warning mx-auto mb-1" />
              <p className="text-lg font-bold">{driverData.capacity}%</p>
              <p className="text-[10px] text-muted-foreground">Capacity</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Location Card */}
        <Card className="card-eco">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Current Stop
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">#{driverData.currentStop}</span>
              </div>
              <div className="flex-1">
                <p className="font-bold">{nextStops[0].name}</p>
                <p className="text-sm text-muted-foreground capitalize">{nextStops[0].type} collection</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">
                <Navigation className="w-4 h-4 mr-2" />
                Navigate
              </Button>
              <Button variant="outline" className="flex-1">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark Complete
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Stops */}
        <Card className="card-eco">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Upcoming Stops</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {nextStops.slice(1).map((stop, idx) => (
              <div 
                key={stop.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-accent/50"
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                  {stop.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{stop.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{stop.type}</p>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-2" asChild>
              <Link to="/driver/route">View Full Route</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-14 flex-col gap-1" asChild>
            <Link to="/driver/issues">
              <AlertTriangle className="w-5 h-5 text-status-warning" />
              <span className="text-xs">Report Issue</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-14 flex-col gap-1">
            <Phone className="w-5 h-5 text-primary" />
            <span className="text-xs">Call Dispatch</span>
          </Button>
        </div>

        {/* Performance Stats */}
        <Card className="card-eco">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Today's Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold">{driverData.stats.avgTimePerStop} min</p>
                <p className="text-xs text-muted-foreground">Avg per stop</p>
              </div>
              <div>
                <p className="text-lg font-bold">{driverData.stats.missedCollections}</p>
                <p className="text-xs text-muted-foreground">Missed/Rejected</p>
              </div>
              <div>
                <p className="text-lg font-bold text-status-success">{driverData.stats.fuelEfficiency}</p>
                <p className="text-xs text-muted-foreground">Fuel</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DriverLayout>
  );
}
