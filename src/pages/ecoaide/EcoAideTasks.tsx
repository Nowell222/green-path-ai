import EcoAideLayout from '@/components/layouts/EcoAideLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, MapPin, Package } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const tasks = [
  { id: 1, from: 'Reyes Food Corp.', type: 'Regular Waste', taskType: 'paid', fee: '₱1,500', location: 'Batangas City', wasteClass: 'Non-recyclable', status: 'in_progress' },
  { id: 2, from: 'SM San Juan', type: 'Recyclables', taskType: 'free', fee: 'Free', location: 'San Juan', wasteClass: 'Recyclable', status: 'pending' },
  { id: 3, from: 'Maria Santos', type: 'Bulky Waste', taskType: 'paid', fee: '₱2,000', location: 'Lipa City', wasteClass: 'Bulky', status: 'pending' },
  { id: 4, from: 'Jose Garcia', type: 'Recyclables', taskType: 'free', fee: 'Free', location: 'Tanauan', wasteClass: 'Recyclable', status: 'completed' },
];

export default function EcoAideTasks() {
  return (
    <EcoAideLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-display font-bold">Assigned Tasks</h1>
        <Tabs defaultValue="active">
          <TabsList className="w-full">
            <TabsTrigger value="active" className="flex-1">Active</TabsTrigger>
            <TabsTrigger value="pending" className="flex-1">Pending</TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">Completed</TabsTrigger>
          </TabsList>
          {['active', 'pending', 'completed'].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-3 mt-4">
              {tasks.filter(t => tab === 'active' ? t.status === 'in_progress' : t.status === tab).map((task) => (
                <Card key={task.id} className="card-eco">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold">{task.from}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{task.location}</p>
                      </div>
                      <Badge variant={task.taskType === 'paid' ? 'default' : 'secondary'}>
                        {task.taskType === 'paid' ? task.fee : 'Free Pickup'}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2 py-1 rounded bg-accent">{task.type}</span>
                      <span className="px-2 py-1 rounded bg-accent">{task.wasteClass}</span>
                    </div>
                    {tab !== 'completed' && (
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">Accept</Button>
                        <Button size="sm" variant="outline" className="flex-1">Decline</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </EcoAideLayout>
  );
}
