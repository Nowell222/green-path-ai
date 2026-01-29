import { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar as CalendarIcon, 
  Plus,
  Clock,
  Truck,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Edit
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const schedules = [
  { id: 1, route: 'R-03', name: 'Barangay Centro Loop', time: '6:00 AM', days: ['Mon', 'Wed', 'Fri'], truck: 'TRK-251', driver: 'Ana Reyes', type: 'residential' },
  { id: 2, route: 'R-08', name: 'Barangay Magsaysay Route', time: '6:00 AM', days: ['Mon', 'Wed', 'Fri'], truck: 'TRK-249', driver: 'Maria Cruz', type: 'residential' },
  { id: 3, route: 'R-12', name: 'Barangay San Jose Loop', time: '6:00 PM', days: ['Mon', 'Wed', 'Fri'], truck: 'TRK-247', driver: 'Pedro Reyes', type: 'residential' },
  { id: 4, route: 'R-15', name: 'Poblacion Commercial', time: '8:00 PM', days: ['Tue', 'Thu', 'Sat'], truck: 'TRK-248', driver: 'Jose Garcia', type: 'commercial' },
  { id: 5, route: 'R-18', name: 'Industrial Zone', time: '10:00 PM', days: ['Mon', 'Thu'], truck: 'TRK-252', driver: 'Unassigned', type: 'industrial' },
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const typeColors = {
  residential: 'bg-primary/10 text-primary border-primary/20',
  commercial: 'bg-[hsl(var(--status-warning))]/10 text-[hsl(var(--status-warning))] border-[hsl(var(--status-warning))]/20',
  industrial: 'bg-[hsl(var(--status-info))]/10 text-[hsl(var(--status-info))] border-[hsl(var(--status-info))]/20',
};

export default function AdminSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getSchedulesForDay = (dayName: string) => {
    return schedules.filter(s => s.days.includes(dayName));
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleEdit = (id: number) => {
    toast.info(`Edit schedule ${id}`);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Collection Schedule</h1>
            <p className="text-muted-foreground">Manage collection schedules for all routes</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Schedule
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="card-eco col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="font-display">{currentMonth}</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleNextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth().map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }
                  
                  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                  const dayName = daysOfWeek[date.getDay()];
                  const daySchedules = getSchedulesForDay(dayName);
                  const isToday = new Date().toDateString() === date.toDateString();
                  
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(dayName)}
                      className={cn(
                        "aspect-square p-1 rounded-lg border border-transparent hover:border-primary/50 transition-colors relative",
                        isToday && "bg-primary/10 border-primary",
                        selectedDay === dayName && "border-primary bg-primary/5"
                      )}
                    >
                      <span className={cn(
                        "text-sm font-medium",
                        isToday && "text-primary"
                      )}>
                        {day}
                      </span>
                      {daySchedules.length > 0 && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                          {daySchedules.slice(0, 3).map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Schedule List */}
          <Card className="card-eco">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-base">
                {selectedDay ? `${selectedDay} Schedule` : 'All Schedules'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
              {(selectedDay ? getSchedulesForDay(selectedDay) : schedules).map((schedule) => (
                <div 
                  key={schedule.id}
                  className={cn(
                    "p-3 rounded-lg border",
                    typeColors[schedule.type as keyof typeof typeColors]
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{schedule.route}</Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleEdit(schedule.id)}>
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="font-medium text-sm">{schedule.name}</p>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                    <p className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {schedule.time}
                    </p>
                    <p className="flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      {schedule.truck} - {schedule.driver}
                    </p>
                    <p className="flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" />
                      {schedule.days.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Full Schedule Table */}
        <Card className="card-eco">
          <CardHeader>
            <CardTitle className="font-display">Weekly Schedule Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-3 text-left font-medium">Route</th>
                    {daysOfWeek.map(day => (
                      <th key={day} className="p-3 text-center font-medium">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((schedule) => (
                    <tr key={schedule.id} className="border-b border-border last:border-0">
                      <td className="p-3">
                        <div>
                          <p className="font-medium">{schedule.route}</p>
                          <p className="text-xs text-muted-foreground">{schedule.name}</p>
                        </div>
                      </td>
                      {daysOfWeek.map(day => (
                        <td key={day} className="p-3 text-center">
                          {schedule.days.includes(day) ? (
                            <Badge variant="default" className="text-xs">
                              {schedule.time}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
