import { useState } from 'react';
import DriverLayout from '@/components/layouts/DriverLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  Clock,
  ChevronRight,
  Play,
  Pause,
  SkipForward,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const routeStops = [
  { id: 1, name: 'Purok 1, Block A', type: 'residential', status: 'completed', time: '6:05 PM' },
  { id: 2, name: 'Purok 1, Block B', type: 'residential', status: 'completed', time: '6:09 PM' },
  { id: 3, name: 'Purok 2, Main Road', type: 'residential', status: 'completed', time: '6:14 PM' },
  { id: 4, name: 'Sari-Sari Store (Commercial)', type: 'commercial', status: 'completed', time: '6:18 PM' },
  { id: 5, name: 'Purok 2, Corner', type: 'residential', status: 'completed', time: '6:22 PM' },
  { id: 6, name: 'Purok 3, Block A', type: 'residential', status: 'completed', time: '6:27 PM' },
  { id: 7, name: 'Purok 3, Block B', type: 'residential', status: 'completed', time: '6:31 PM' },
  { id: 8, name: 'Purok 3, Block C', type: 'residential', status: 'completed', time: '6:35 PM' },
  { id: 9, name: 'Restaurant (Commercial)', type: 'commercial', status: 'completed', time: '6:40 PM' },
  { id: 10, name: 'Purok 4, Block 1', type: 'residential', status: 'completed', time: '6:45 PM' },
  { id: 11, name: 'Purok 4, Block 2', type: 'residential', status: 'completed', time: '6:49 PM' },
  { id: 12, name: 'Purok 4, Block 3', type: 'residential', status: 'current', time: null },
  { id: 13, name: 'Purok 5, Main Street', type: 'residential', status: 'upcoming', time: null },
  { id: 14, name: 'Mini Mart (Commercial)', type: 'commercial', status: 'upcoming', time: null },
  { id: 15, name: 'Purok 6, Corner', type: 'residential', status: 'upcoming', time: null },
  { id: 16, name: 'Barangay Hall', type: 'municipal', status: 'upcoming', time: null },
];

export default function DriverRoute() {
  const [stops, setStops] = useState(routeStops);
  const [isPaused, setIsPaused] = useState(false);
  
  const currentStop = stops.find(s => s.status === 'current');
  const completedCount = stops.filter(s => s.status === 'completed').length;
  const progress = (completedCount / stops.length) * 100;

  const handleMarkComplete = (stopId: number) => {
    setStops(prev => {
      const updated = prev.map((stop, idx) => {
        if (stop.id === stopId) {
          return { ...stop, status: 'completed' as const, time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) };
        }
        if (prev[idx - 1]?.id === stopId && stop.status === 'upcoming') {
          return { ...stop, status: 'current' as const };
        }
        return stop;
      });
      return updated;
    });
    toast.success('Stop marked as complete!');
  };

  const handleSkipStop = (stopId: number) => {
    setStops(prev => {
      const updated = prev.map((stop, idx) => {
        if (stop.id === stopId) {
          return { ...stop, status: 'skipped' as const, time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) };
        }
        if (prev[idx - 1]?.id === stopId && stop.status === 'upcoming') {
          return { ...stop, status: 'current' as const };
        }
        return stop;
      });
      return updated;
    });
    toast.warning('Stop skipped - please report reason');
  };

  const handleNavigate = () => {
    toast.success('Opening navigation...');
    // In a real app, this would open Google Maps or similar
  };

  return (
    <DriverLayout>
      <div className="p-4 space-y-4">
        {/* Route Header */}
        <Card className="card-eco">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-display font-bold text-lg">Route R-12</h2>
                <p className="text-sm text-muted-foreground">Barangay San Jose Loop</p>
              </div>
              <Button 
                variant={isPaused ? "default" : "outline"} 
                size="sm"
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? <Play className="w-4 h-4 mr-1" /> : <Pause className="w-4 h-4 mr-1" />}
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{completedCount} of {stops.length} stops</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Stop Action */}
        {currentStop && (
          <Card className="card-eco border-primary">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-primary mb-3">
                <MapPin className="w-5 h-5" />
                <span className="font-medium text-sm">Current Stop</span>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {currentStop.id}
                </div>
                <div className="flex-1">
                  <p className="font-bold">{currentStop.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{currentStop.type}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1" onClick={handleNavigate}>
                  <Navigation className="w-4 h-4 mr-2" />
                  Navigate
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleMarkComplete(currentStop.id)}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Complete
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleSkipStop(currentStop.id)}
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stops List */}
        <Card className="card-eco">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">All Stops</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
            {stops.map((stop) => (
              <div 
                key={stop.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors",
                  stop.status === 'current' && "bg-primary/10 border border-primary",
                  stop.status === 'completed' && "bg-muted/50",
                  stop.status === 'skipped' && "bg-destructive/10",
                  stop.status === 'upcoming' && "bg-accent/30"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  stop.status === 'current' && "bg-primary text-primary-foreground",
                  stop.status === 'completed' && "bg-primary/20 text-primary",
                  stop.status === 'skipped' && "bg-destructive/20 text-destructive",
                  stop.status === 'upcoming' && "bg-muted text-muted-foreground"
                )}>
                  {stop.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : stop.status === 'skipped' ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : (
                    stop.id
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "font-medium text-sm truncate",
                    stop.status === 'completed' && "text-muted-foreground"
                  )}>
                    {stop.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {stop.type}
                    </Badge>
                    {stop.time && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {stop.time}
                      </span>
                    )}
                  </div>
                </div>
                
                {stop.status === 'current' && (
                  <ChevronRight className="w-5 h-5 text-primary" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DriverLayout>
  );
}
