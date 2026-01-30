import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import CitizenLayout from '@/components/layouts/CitizenLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  Calendar, 
  Camera, 
  MapPin, 
  Clock, 
  ArrowRight,
  Send,
  Gauge,
  Bot
} from 'lucide-react';

// Mock data
const nextCollection = {
  date: 'Tomorrow, January 30',
  time: '6:00 PM - 8:00 PM',
  hoursLeft: 18,
};

const truckStatus = {
  status: 'En Route',
  truckId: 'TRK-247',
  driver: 'Juan Santos',
  stopsAway: 4,
  eta: '18 minutes',
  loadCapacity: 78,
};

export default function CitizenDashboard() {
  const { user } = useAuth();

  return (
    <CitizenLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
        {/* Next Collection Card - Prioritized at Top */}
        <Card className="card-eco border-primary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Next Collection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">{nextCollection.date}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {nextCollection.time}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">{nextCollection.hoursLeft}h</p>
                <p className="text-xs text-muted-foreground">remaining</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-1 p-3 rounded-lg bg-waste-recyclable/10 text-center">
                <div className="w-3 h-3 bg-waste-recyclable rounded-full mx-auto mb-1" />
                <p className="text-xs font-medium">Recyclable</p>
              </div>
              <div className="flex-1 p-3 rounded-lg bg-waste-biodegradable/10 text-center">
                <div className="w-3 h-3 bg-waste-biodegradable rounded-full mx-auto mb-1" />
                <p className="text-xs font-medium">Biodegradable</p>
              </div>
              <div className="flex-1 p-3 rounded-lg bg-waste-residual/10 text-center">
                <div className="w-3 h-3 bg-waste-residual rounded-full mx-auto mb-1" />
                <p className="text-xs font-medium">Residual</p>
              </div>
            </div>

            <Button variant="outline" className="w-full" asChild>
              <Link to="/citizen/schedule">
                View Full Schedule <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/citizen/scanner">
            <Card className="card-eco group cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Camera className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <p className="font-medium text-sm">Scan Waste</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/citizen/tracking">
            <Card className="card-eco group cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-waste-recyclable/10 flex items-center justify-center group-hover:bg-waste-recyclable group-hover:text-waste-recyclable-foreground transition-colors">
                  <MapPin className="w-6 h-6 text-waste-recyclable group-hover:text-waste-recyclable-foreground" />
                </div>
                <p className="font-medium text-sm">Track Truck</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/citizen/request">
            <Card className="card-eco group cursor-pointer h-full border-primary/30">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--status-warning))]/10 flex items-center justify-center group-hover:bg-[hsl(var(--status-warning))] transition-colors">
                  <Send className="w-6 h-6 text-[hsl(var(--status-warning))] group-hover:text-white" />
                </div>
                <p className="font-medium text-sm">Early Pickup</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/citizen/reports">
            <Card className="card-eco group cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-waste-hazardous/10 flex items-center justify-center group-hover:bg-waste-hazardous group-hover:text-waste-hazardous-foreground transition-colors">
                  <Truck className="w-6 h-6 text-waste-hazardous group-hover:text-waste-hazardous-foreground" />
                </div>
                <p className="font-medium text-sm">Report Issue</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Truck Status Card with Load */}
        <Card className="card-eco">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Truck className="w-5 h-5 text-truck-active animate-truck" />
                Live Truck Tracking
              </CardTitle>
              <span className="px-2 py-1 rounded-full bg-truck-active/10 text-truck-active text-xs font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-truck-active rounded-full animate-pulse" />
                {truckStatus.status}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Truck className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-bold">{truckStatus.truckId}</p>
                <p className="text-sm text-muted-foreground">Driver: {truckStatus.driver}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{truckStatus.eta}</p>
                <p className="text-xs text-muted-foreground">{truckStatus.stopsAway} stops away</p>
              </div>
            </div>

            {/* Truck Load Status */}
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm flex items-center gap-2">
                  <Gauge className="w-4 h-4" />
                  Truck Load Status
                </span>
                <Badge variant={truckStatus.loadCapacity > 90 ? 'destructive' : truckStatus.loadCapacity > 70 ? 'secondary' : 'default'}>
                  {truckStatus.loadCapacity}% Full
                </Badge>
              </div>
              <Progress value={truckStatus.loadCapacity} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {truckStatus.loadCapacity > 90 
                  ? 'Truck is almost full' 
                  : truckStatus.loadCapacity > 70 
                  ? 'Limited capacity remaining' 
                  : 'Plenty of space available'}
              </p>
            </div>

            <Button className="w-full" asChild>
              <Link to="/citizen/tracking">
                <MapPin className="w-4 h-4 mr-2" />
                Track on Map
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Floating WasteBot AI Widget */}
      <Link 
        to="/citizen/chat"
        className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <Bot className="w-7 h-7 text-primary-foreground" />
      </Link>
    </CitizenLayout>
  );
}