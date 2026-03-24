import BusinessLayout from '@/components/layouts/BusinessLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Package } from 'lucide-react';

const history = [
  { id: 1, type: 'Regular Waste', date: 'Mar 20, 2026', status: 'Completed', fee: '₱1,500', driver: 'Mark Gonzales' },
  { id: 2, type: 'Recyclables', date: 'Mar 18, 2026', status: 'Completed', fee: 'Free', driver: 'Ramon Torres' },
  { id: 3, type: 'Bulky Waste', date: 'Mar 15, 2026', status: 'Completed', fee: '₱2,000', driver: 'Mark Gonzales' },
  { id: 4, type: 'Regular Waste', date: 'Mar 13, 2026', status: 'Completed', fee: '₱1,500', driver: 'Luis Bautista' },
];

export default function BusinessHistory() {
  return (
    <BusinessLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
        <h1 className="text-2xl font-display font-bold">Request History</h1>
        <div className="space-y-3">
          {history.map((h) => (
            <Card key={h.id} className="card-eco">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Package className="w-5 h-5 text-primary" /></div>
                    <div>
                      <p className="font-medium">{h.type}</p>
                      <p className="text-sm text-muted-foreground">{h.date} • Driver: {h.driver}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="default">{h.status}</Badge>
                    <p className="text-sm font-medium mt-1">{h.fee}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </BusinessLayout>
  );
}
