import { useState } from 'react';
import CitizenLayout from '@/components/layouts/CitizenLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Camera,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const reports = [
  { id: 'RPT-001', title: 'Missed collection on my street', type: 'missed', status: 'resolved', date: '2 days ago', location: 'Purok 5, Block 3', hasPhoto: true },
  { id: 'RPT-002', title: 'Overflowing public bin', type: 'bin', status: 'in_progress', date: '1 week ago', location: 'Near market entrance', hasPhoto: true },
  { id: 'RPT-003', title: 'Illegal dumping near creek', type: 'illegal', status: 'submitted', date: '2 weeks ago', location: 'Creek area, Purok 7', hasPhoto: true },
];

const statusConfig = {
  submitted: { label: 'Submitted', color: 'bg-[hsl(var(--status-info))]', textColor: 'text-[hsl(var(--status-info))]' },
  in_progress: { label: 'In Progress', color: 'bg-[hsl(var(--status-warning))]', textColor: 'text-[hsl(var(--status-warning))]' },
  resolved: { label: 'Resolved', color: 'bg-[hsl(var(--status-success))]', textColor: 'text-[hsl(var(--status-success))]' },
};

const typeConfig = {
  missed: { label: 'Missed Collection', icon: Clock },
  bin: { label: 'Bin Issue', icon: AlertTriangle },
  illegal: { label: 'Illegal Dumping', icon: AlertTriangle },
};

export default function CitizenReports() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredReports = activeTab === 'all' 
    ? reports 
    : reports.filter(r => r.status === activeTab);

  return (
    <CitizenLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold">My Reports</h1>
            <p className="text-muted-foreground">Track your submitted reports and issues</p>
          </div>
          <Button asChild>
            <Link to="/citizen/report-issue">
              <Plus className="w-4 h-4 mr-2" />
              New Report
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="card-eco">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{reports.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[hsl(var(--status-warning))]">
                {reports.filter(r => r.status === 'in_progress').length}
              </p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[hsl(var(--status-success))]">
                {reports.filter(r => r.status === 'resolved').length}
              </p>
              <p className="text-xs text-muted-foreground">Resolved</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Reports List */}
        <div className="space-y-3">
          {filteredReports.length === 0 ? (
            <Card className="card-eco">
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No reports found</p>
              </CardContent>
            </Card>
          ) : (
            filteredReports.map((report) => {
              const TypeIcon = typeConfig[report.type as keyof typeof typeConfig].icon;
              const status = statusConfig[report.status as keyof typeof statusConfig];
              
              return (
                <Card key={report.id} className="card-eco">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <TypeIcon className="w-5 h-5 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium">{report.title}</p>
                          <Badge 
                            variant="outline" 
                            className={cn("text-xs", status.textColor)}
                          >
                            <span className={cn("w-1.5 h-1.5 rounded-full mr-1", status.color)} />
                            {status.label}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
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
                              <Camera className="w-3 h-3" />
                              Photo
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </CitizenLayout>
  );
}
