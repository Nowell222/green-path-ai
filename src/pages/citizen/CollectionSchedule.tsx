import CitizenLayout from '@/components/layouts/CitizenLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Bell, 
  Recycle,
  Leaf,
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Mock data
const currentMonth = 'January 2026';
const scheduleData = {
  nextCollection: {
    date: 'Tomorrow, January 30',
    time: '6:00 PM - 8:00 PM',
    types: ['Recyclables', 'Biodegradable', 'Residuals']
  },
  regularSchedule: {
    days: ['Monday', 'Thursday'],
    time: '6:00 PM - 8:00 PM'
  }
};

const calendarDays = [
  { day: 1, type: null },
  { day: 2, type: null },
  { day: 3, type: null },
  { day: 4, type: null },
  { day: 5, type: null },
  { day: 6, type: 'collection' },
  { day: 7, type: null },
  { day: 8, type: null },
  { day: 9, type: 'collection' },
  { day: 10, type: null },
  { day: 11, type: null },
  { day: 12, type: null },
  { day: 13, type: 'collection' },
  { day: 14, type: null },
  { day: 15, type: null },
  { day: 16, type: 'collection' },
  { day: 17, type: null },
  { day: 18, type: null },
  { day: 19, type: null },
  { day: 20, type: 'collection' },
  { day: 21, type: null },
  { day: 22, type: null },
  { day: 23, type: 'collection' },
  { day: 24, type: null },
  { day: 25, type: null },
  { day: 26, type: null },
  { day: 27, type: 'collection' },
  { day: 28, type: null },
  { day: 29, type: 'today' },
  { day: 30, type: 'collection' },
  { day: 31, type: null },
];

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function CollectionSchedule() {
  const emptyDays = 3; // January 2026 starts on Thursday (index 4 - 1 = 3 empty)

  return (
    <CitizenLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Collection Schedule</h1>
          <p className="text-muted-foreground">View and manage your waste collection schedule</p>
        </div>

        {/* Next Collection Card */}
        <Card className="card-eco gradient-eco text-primary-foreground overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm">Next Collection</p>
                <p className="text-2xl font-bold mt-1">{scheduleData.nextCollection.date}</p>
                <p className="text-primary-foreground/80 flex items-center gap-1 mt-1">
                  <Clock className="w-4 h-4" />
                  {scheduleData.nextCollection.time}
                </p>
              </div>
              <Button variant="secondary" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Set Reminder
              </Button>
            </div>
            
            <div className="flex gap-3 mt-6">
              <div className="flex-1 p-3 rounded-lg bg-white/10 text-center">
                <Recycle className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs">Recyclables</p>
              </div>
              <div className="flex-1 p-3 rounded-lg bg-white/10 text-center">
                <Leaf className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs">Biodegradable</p>
              </div>
              <div className="flex-1 p-3 rounded-lg bg-white/10 text-center">
                <Trash2 className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xs">Residuals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card className="card-eco">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-display flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                {currentMonth}
              </CardTitle>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Week days header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty days at start */}
              {Array.from({ length: emptyDays }).map((_, idx) => (
                <div key={`empty-${idx}`} className="aspect-square" />
              ))}
              
              {/* Calendar days */}
              {calendarDays.map((day) => (
                <button
                  key={day.day}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-colors
                    ${day.type === 'today' ? 'bg-primary text-primary-foreground font-bold' : ''}
                    ${day.type === 'collection' ? 'bg-waste-biodegradable/10 text-waste-biodegradable font-medium hover:bg-waste-biodegradable/20' : ''}
                    ${!day.type ? 'hover:bg-accent' : ''}
                  `}
                >
                  {day.day}
                  {day.type === 'collection' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-waste-biodegradable mt-0.5" />
                  )}
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-waste-biodegradable" />
                <span>Collection Day</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span>Today</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Regular Schedule */}
        <Card className="card-eco">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Regular Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Every {scheduleData.regularSchedule.days.join(' & ')}</p>
                  <p className="text-sm text-muted-foreground">{scheduleData.regularSchedule.time}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-lg bg-waste-recyclable/10">
                <Recycle className="w-5 h-5 text-waste-recyclable mx-auto mb-1" />
                <p className="text-xs font-medium">Blue Bin</p>
                <p className="text-xs text-muted-foreground">Recyclables</p>
              </div>
              <div className="p-3 rounded-lg bg-waste-biodegradable/10">
                <Leaf className="w-5 h-5 text-waste-biodegradable mx-auto mb-1" />
                <p className="text-xs font-medium">Green Bin</p>
                <p className="text-xs text-muted-foreground">Biodegradable</p>
              </div>
              <div className="p-3 rounded-lg bg-waste-residual/10">
                <Trash2 className="w-5 h-5 text-waste-residual mx-auto mb-1" />
                <p className="text-xs font-medium">Black Bin</p>
                <p className="text-xs text-muted-foreground">Residuals</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CitizenLayout>
  );
}
