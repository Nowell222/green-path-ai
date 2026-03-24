import EcoAideLayout from '@/components/layouts/EcoAideLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';

export default function EcoAideRoute() {
  return (
    <EcoAideLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-display font-bold">Pickup Route</h1>
        <Card className="card-eco">
          <CardContent className="p-4">
            <div className="aspect-video bg-muted rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Interactive route map with navigation</p>
                  <p className="text-xs text-muted-foreground">Showing on-demand pickup locations</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button className="w-full"><Navigation className="w-4 h-4 mr-2" />Start Navigation</Button>
      </div>
    </EcoAideLayout>
  );
}
