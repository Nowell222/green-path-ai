import BusinessLayout from '@/components/layouts/BusinessLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

const schedule = [
  { date: 'Mon, Mar 25', time: '8:00 AM - 10:00 AM', type: 'Regular Waste', status: 'scheduled' },
  { date: 'Wed, Mar 27', time: '8:00 AM - 10:00 AM', type: 'Recyclables', status: 'scheduled' },
  { date: 'Fri, Mar 29', time: '8:00 AM - 10:00 AM', type: 'Regular Waste', status: 'scheduled' },
  { date: 'Mon, Mar 31', time: '8:00 AM - 10:00 AM', type: 'Regular Waste', status: 'scheduled' },
];

export default function BusinessSchedule() {
  return (
    <BusinessLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
        <h1 className="text-2xl font-display font-bold">Collection Schedule</h1>
        <div className="space-y-3">
          {schedule.map((s, i) => (
            <Card key={i} className="card-eco">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">{s.date}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{s.time}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-primary">{s.type}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </BusinessLayout>
  );
}
