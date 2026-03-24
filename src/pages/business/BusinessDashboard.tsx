import BusinessLayout from '@/components/layouts/BusinessLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Package, Clock, ArrowRight, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const nextCollection = { date: 'Tomorrow, March 25', time: '8:00 AM - 10:00 AM', type: 'Regular Waste' };

const activeRequests = [
  { id: 1, type: 'Regular Waste', status: 'Approved', driver: 'Mark Gonzales', eta: '2:30 PM', fee: '₱1,500' },
  { id: 2, type: 'Recyclables', status: 'Pending', driver: '-', eta: '-', fee: 'Free' },
];

export default function BusinessDashboard() {
  const { user } = useAuth();
  return (
    <BusinessLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">{user?.organizationName}</h1>
          <p className="text-muted-foreground">Business Dashboard</p>
        </div>

        <Card className="card-eco border-primary/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" />Next Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">{nextCollection.date}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="w-4 h-4" />{nextCollection.time}</p>
                <p className="text-sm text-muted-foreground mt-1">{nextCollection.type}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/business/schedule">View Full Schedule <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Link to="/business/requests">
            <Card className="card-eco group cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Package className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <p className="font-medium text-sm">Request Hauling</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="/business/tracking">
            <Card className="card-eco group cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-truck-active/10 flex items-center justify-center group-hover:bg-truck-active transition-colors">
                  <MapPin className="w-6 h-6 text-truck-active group-hover:text-white" />
                </div>
                <p className="font-medium text-sm">Track Vehicle</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <Card className="card-eco">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display flex items-center gap-2"><Truck className="w-5 h-5 text-primary" />Active Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeRequests.map((req) => (
              <div key={req.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                <div>
                  <p className="font-medium text-sm">{req.type}</p>
                  <p className="text-xs text-muted-foreground">Driver: {req.driver} • ETA: {req.eta}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${req.status === 'Approved' ? 'bg-status-success/10 text-status-success' : 'bg-status-warning/10 text-status-warning'}`}>{req.status}</span>
                  <p className="text-sm font-medium mt-1">{req.fee}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </BusinessLayout>
  );
}
