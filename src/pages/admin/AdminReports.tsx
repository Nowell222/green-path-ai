import { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  MapPin,
  User,
  Image,
  MessageSquare,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const reports = [
  { id: 'RPT-001', type: 'missed', title: 'Missed collection at Purok 5', reporter: 'Maria Santos', location: 'Brgy. San Jose, Purok 5', date: '2 hours ago', status: 'pending', priority: 'high', hasPhoto: true },
  { id: 'RPT-002', type: 'illegal', title: 'Illegal dumping near creek', reporter: 'Juan Dela Cruz', location: 'Brgy. Magsaysay, Creek Area', date: '5 hours ago', status: 'investigating', priority: 'high', hasPhoto: true },
  { id: 'RPT-003', type: 'bin', title: 'Damaged waste bin', reporter: 'Pedro Reyes', location: 'Brgy. Poblacion, Main St', date: '1 day ago', status: 'resolved', priority: 'medium', hasPhoto: false },
  { id: 'RPT-004', type: 'schedule', title: 'Request schedule change', reporter: 'Ana Garcia', location: 'Brgy. Centro', date: '1 day ago', status: 'pending', priority: 'low', hasPhoto: false },
  { id: 'RPT-005', type: 'missed', title: 'Truck skipped our street', reporter: 'Jose Santos', location: 'Brgy. San Jose, Block 3', date: '2 days ago', status: 'resolved', priority: 'medium', hasPhoto: false },
];

const typeConfig = {
  missed: { label: 'Missed Collection', icon: Clock, color: 'text-[hsl(var(--status-warning))]' },
  illegal: { label: 'Illegal Dumping', icon: AlertTriangle, color: 'text-[hsl(var(--status-error))]' },
  bin: { label: 'Damaged Bin', icon: FileText, color: 'text-[hsl(var(--status-info))]' },
  schedule: { label: 'Schedule Request', icon: Clock, color: 'text-muted-foreground' },
};

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-[hsl(var(--status-warning))]' },
  investigating: { label: 'Investigating', color: 'bg-[hsl(var(--status-info))]' },
  resolved: { label: 'Resolved', color: 'bg-[hsl(var(--status-success))]' },
};

const priorityConfig = {
  high: { label: 'High', color: 'text-[hsl(var(--status-error))] border-[hsl(var(--status-error))]' },
  medium: { label: 'Medium', color: 'text-[hsl(var(--status-warning))] border-[hsl(var(--status-warning))]' },
  low: { label: 'Low', color: 'text-muted-foreground border-muted-foreground' },
};

export default function AdminReports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || report.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'pending').length,
    investigating: reports.filter(r => r.status === 'investigating').length,
    resolved: reports.filter(r => r.status === 'resolved').length,
  };

  const handleResolve = (id: string) => {
    toast.success(`Report ${id} marked as resolved`);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">Reports & Issues</h1>
            <p className="text-muted-foreground">Manage citizen reports and driver issues</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="card-eco">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[hsl(var(--status-warning))]/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[hsl(var(--status-warning))]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[hsl(var(--status-info))]/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[hsl(var(--status-info))]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.investigating}</p>
                <p className="text-sm text-muted-foreground">Investigating</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[hsl(var(--status-success))]/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[hsl(var(--status-success))]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.resolved}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search reports..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="investigating">Investigating</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Reports List */}
        <div className="space-y-3">
          {filteredReports.map((report) => {
            const TypeIcon = typeConfig[report.type as keyof typeof typeConfig].icon;
            return (
              <Card key={report.id} className="card-eco">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center bg-muted"
                    )}>
                      <TypeIcon className={cn("w-5 h-5", typeConfig[report.type as keyof typeof typeConfig].color)} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-medium">{report.title}</h3>
                        <Badge variant="outline" className={priorityConfig[report.priority as keyof typeof priorityConfig].color}>
                          {report.priority}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <span className={cn("w-2 h-2 rounded-full", statusConfig[report.status as keyof typeof statusConfig].color)} />
                          <span className="text-xs text-muted-foreground">
                            {statusConfig[report.status as keyof typeof statusConfig].label}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {report.reporter}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {report.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {report.date}
                        </span>
                        {report.hasPhoto && (
                          <span className="flex items-center gap-1">
                            <Image className="w-3 h-3" />
                            Photo
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {report.status !== 'resolved' && (
                        <Button size="sm" onClick={() => handleResolve(report.id)}>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolve
                        </Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
