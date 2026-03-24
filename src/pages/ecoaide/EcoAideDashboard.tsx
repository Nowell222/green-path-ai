import EcoAideLayout from '@/components/layouts/EcoAideLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapPin, Clock, CheckCircle2, Navigation, Users, Recycle, AlertTriangle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ecoData = {
  vehicleId: 'ECO-105',
  route: 'HR-01',
  routeName: 'Batangas City On-Demand',
  status: 'IN PROGRESS',
  currentTask: 3,
  totalTasks: 6,
  completedToday: { paid: 2, free: 1 },
  stats: { avgTime: 12, earnings: '₱3,000' },
};

const nextTasks = [
  { id: 3, name: 'Reyes Food Corp.', type: 'Regular Waste', taskType: 'paid', fee: '₱1,500', status: 'current' },
  { id: 4, name: 'Jose Garcia', type: 'Recyclables', taskType: 'free', fee: 'Free', status: 'upcoming' },
  { id: 5, name: 'SM San Juan', type: 'Bulky Waste', taskType: 'paid', fee: '₱2,000', status: 'upcoming' },
];

export default function EcoAideDashboard() {
  const { user } = useAuth();
  const progress = (ecoData.currentTask / ecoData.totalTasks) * 100;

  return (
    <EcoAideLayout>
      <div className="p-4 space-y-4">
        <div className="gradient-eco rounded-xl p-4 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/80 text-sm">Current Route</p>
              <p className="text-xl font-bold">{ecoData.route}: {ecoData.routeName}</p>
              <p className="text-sm text-primary-foreground/70">{user?.organizationName}</p>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-white/20 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              {ecoData.status}
            </span>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Task {ecoData.currentTask} of {ecoData.totalTasks}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Card className="card-eco"><CardContent className="p-3 text-center">
            <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">{ecoData.stats.avgTime} min</p>
            <p className="text-[10px] text-muted-foreground">Avg per task</p>
          </CardContent></Card>
          <Card className="card-eco"><CardContent className="p-3 text-center">
            <CheckCircle2 className="w-5 h-5 text-status-success mx-auto mb-1" />
            <p className="text-lg font-bold">{ecoData.completedToday.paid + ecoData.completedToday.free}</p>
            <p className="text-[10px] text-muted-foreground">Completed</p>
          </CardContent></Card>
          <Card className="card-eco"><CardContent className="p-3 text-center">
            <Recycle className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold">{ecoData.stats.earnings}</p>
            <p className="text-[10px] text-muted-foreground">Earnings</p>
          </CardContent></Card>
        </div>

        <Card className="card-eco">
          <CardHeader className="pb-2"><CardTitle className="text-base font-display flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" />Current Task</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center"><span className="text-xl font-bold text-primary">#{nextTasks[0].id}</span></div>
              <div className="flex-1">
                <p className="font-bold">{nextTasks[0].name}</p>
                <p className="text-sm text-muted-foreground">{nextTasks[0].type} • <span className={nextTasks[0].taskType === 'paid' ? 'text-primary' : 'text-status-success'}>{nextTasks[0].fee}</span></p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1"><Navigation className="w-4 h-4 mr-2" />Navigate</Button>
              <Button variant="outline" className="flex-1"><CheckCircle2 className="w-4 h-4 mr-2" />Mark Done</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="card-eco">
          <CardHeader className="pb-2"><CardTitle className="text-base font-display">Upcoming Tasks</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {nextTasks.slice(1).map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg bg-accent/50">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">{task.id}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{task.name}</p>
                  <p className="text-xs text-muted-foreground">{task.type}</p>
                </div>
                <span className={`text-xs font-medium ${task.taskType === 'paid' ? 'text-primary' : 'text-status-success'}`}>{task.fee}</span>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-2" asChild><Link to="/ecoaide/tasks">View All Tasks</Link></Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-14 flex-col gap-1" asChild>
            <Link to="/ecoaide/issues"><AlertTriangle className="w-5 h-5 text-status-warning" /><span className="text-xs">Report Issue</span></Link>
          </Button>
          <Button variant="outline" className="h-14 flex-col gap-1">
            <Phone className="w-5 h-5 text-primary" /><span className="text-xs">Call Dispatch</span>
          </Button>
        </div>
      </div>
    </EcoAideLayout>
  );
}
