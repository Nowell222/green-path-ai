import BusinessLayout from '@/components/layouts/BusinessLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Truck } from 'lucide-react';

export default function BusinessTracking() {
  return (
    <BusinessLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
        <h1 className="text-2xl font-display font-bold">Track Vehicle</h1>
        <Card className="card-eco">
          <CardContent className="p-4">
            <div className="aspect-video bg-muted rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Real-time GPS tracking map</p>
                  <p className="text-xs text-muted-foreground">Tracking assigned Eco-Aide vehicle</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-eco">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-truck-active/10 flex items-center justify-center"><Truck className="w-7 h-7 text-truck-active" /></div>
              <div>
                <p className="font-bold">ECO-105</p>
                <p className="text-sm text-muted-foreground">Driver: Mark Gonzales</p>
                <p className="text-sm text-muted-foreground">ETA: 15 minutes</p>
              </div>
              <span className="ml-auto px-3 py-1 rounded-full bg-truck-active/10 text-truck-active text-xs font-medium">En Route</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </BusinessLayout>
  );
}
