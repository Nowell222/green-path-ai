import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import CitizenLayout from '@/components/layouts/CitizenLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Truck, 
  Calendar, 
  Camera, 
  MapPin, 
  Clock, 
  Recycle, 
  Leaf, 
  Trophy,
  ArrowRight,
  Sparkles,
  TrendingUp
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
};

const wasteStats = {
  recyclable: 45,
  biodegradable: 35,
  residual: 20,
  itemsScanned: 47,
  co2Saved: 3.4,
  rank: 47,
  totalUsers: 823,
};

const achievements = [
  { name: 'Recycling Champion', icon: Recycle, unlocked: true },
  { name: 'Perfect Segregation', icon: Sparkles, unlocked: true },
  { name: 'Community Reporter', icon: Trophy, unlocked: true },
];

export default function CitizenDashboard() {
  const { user } = useAuth();

  return (
    <CitizenLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
        {/* Welcome Section */}
        <div className="gradient-eco rounded-2xl p-6 text-primary-foreground">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-primary-foreground/80 text-sm">Good afternoon,</p>
              <h1 className="text-2xl font-display font-bold mt-1">{user?.name?.split(' ')[0]}! 👋</h1>
              <p className="text-primary-foreground/80 text-sm mt-2 max-w-md">
                💡 Tip: Rinse recyclables before placing in the blue bin to avoid contamination!
              </p>
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-xs text-primary-foreground/70">Your Impact</p>
              <p className="text-3xl font-bold">{wasteStats.co2Saved}kg</p>
              <p className="text-xs text-primary-foreground/70">CO₂ saved this month</p>
            </div>
          </div>
        </div>

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

          <Link to="/citizen/schedule">
            <Card className="card-eco group cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-waste-biodegradable/10 flex items-center justify-center group-hover:bg-waste-biodegradable group-hover:text-waste-biodegradable-foreground transition-colors">
                  <Calendar className="w-6 h-6 text-waste-biodegradable group-hover:text-waste-biodegradable-foreground" />
                </div>
                <p className="font-medium text-sm">Schedule</p>
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

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Next Collection Card */}
          <Card className="card-eco">
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

          {/* Truck Status Card */}
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

              <div className="relative">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '75%' }} />
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Start</span>
                  <span>Your Location</span>
                  <span>End</span>
                </div>
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

        {/* Stats Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Waste Breakdown */}
          <Card className="card-eco lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Recycle className="w-5 h-5 text-primary" />
                Your Waste Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-waste-recyclable/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Recyclable</span>
                    <span className="font-bold text-waste-recyclable">{wasteStats.recyclable}%</span>
                  </div>
                  <Progress value={wasteStats.recyclable} className="h-2 bg-waste-recyclable/20" />
                </div>
                
                <div className="p-4 rounded-xl bg-waste-biodegradable/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Biodegradable</span>
                    <span className="font-bold text-waste-biodegradable">{wasteStats.biodegradable}%</span>
                  </div>
                  <Progress value={wasteStats.biodegradable} className="h-2 bg-waste-biodegradable/20" />
                </div>
                
                <div className="p-4 rounded-xl bg-waste-residual/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Residual</span>
                    <span className="font-bold text-waste-residual">{wasteStats.residual}%</span>
                  </div>
                  <Progress value={wasteStats.residual} className="h-2 bg-waste-residual/20" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{wasteStats.itemsScanned}</p>
                    <p className="text-xs text-muted-foreground">Items scanned</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-waste-biodegradable/10 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-waste-biodegradable" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{wasteStats.co2Saved}kg</p>
                    <p className="text-xs text-muted-foreground">CO₂ saved</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community Ranking */}
          <Card className="card-eco">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <Trophy className="w-5 h-5 text-waste-hazardous" />
                Community Ranking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <p className="text-5xl font-bold text-primary">#{wasteStats.rank}</p>
                <p className="text-sm text-muted-foreground">of {wasteStats.totalUsers} citizens</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-truck-active">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Top 6%!</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Recent Achievements</p>
                {achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-accent/50">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <achievement.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{achievement.name}</span>
                    <span className="ml-auto text-xs">⭐</span>
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
