import { useState } from 'react';
import DriverLayout from '@/components/layouts/DriverLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Recycle,
  Leaf,
  Trash2,
  AlertTriangle,
  Camera,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Collection {
  id: string;
  address: string;
  time: string;
  status: 'collected' | 'rejected' | 'pending';
  wasteType: 'recyclable' | 'biodegradable' | 'residual' | 'mixed';
  notes?: string;
  photo?: boolean;
}

const collectionsData: Collection[] = [
  { id: 'C001', address: 'Purok 1, Block A - Unit 12', time: '6:05 PM', status: 'collected', wasteType: 'recyclable' },
  { id: 'C002', address: 'Purok 1, Block A - Unit 15', time: '6:06 PM', status: 'collected', wasteType: 'biodegradable' },
  { id: 'C003', address: 'Purok 1, Block B - Unit 3', time: '6:09 PM', status: 'rejected', wasteType: 'mixed', notes: 'Improper segregation' },
  { id: 'C004', address: 'Purok 1, Block B - Unit 7', time: '6:10 PM', status: 'collected', wasteType: 'residual' },
  { id: 'C005', address: 'Purok 2, Main Road - House 1', time: '6:14 PM', status: 'collected', wasteType: 'recyclable' },
  { id: 'C006', address: 'Purok 2, Main Road - House 5', time: '6:15 PM', status: 'collected', wasteType: 'biodegradable' },
  { id: 'C007', address: 'Sari-Sari Store', time: '6:18 PM', status: 'collected', wasteType: 'mixed', photo: true },
  { id: 'C008', address: 'Purok 2, Corner - Unit 2', time: '6:22 PM', status: 'rejected', wasteType: 'residual', notes: 'Wrong collection day' },
];

const wasteTypeConfig = {
  recyclable: { icon: Recycle, color: 'text-[hsl(var(--waste-recyclable))]', bg: 'bg-[hsl(var(--waste-recyclable))]/10' },
  biodegradable: { icon: Leaf, color: 'text-[hsl(var(--waste-biodegradable))]', bg: 'bg-[hsl(var(--waste-biodegradable))]/10' },
  residual: { icon: Trash2, color: 'text-[hsl(var(--waste-residual))]', bg: 'bg-[hsl(var(--waste-residual))]/10' },
  mixed: { icon: AlertTriangle, color: 'text-[hsl(var(--waste-hazardous))]', bg: 'bg-[hsl(var(--waste-hazardous))]/10' },
};

export default function DriverCollections() {
  const [collections, setCollections] = useState(collectionsData);
  const [activeTab, setActiveTab] = useState('all');

  const stats = {
    total: collections.length,
    collected: collections.filter(c => c.status === 'collected').length,
    rejected: collections.filter(c => c.status === 'rejected').length,
  };

  const filteredCollections = activeTab === 'all' 
    ? collections 
    : collections.filter(c => c.status === activeTab);

  const handleAddCollection = () => {
    toast.info('Quick collection feature - Coming soon!');
  };

  return (
    <DriverLayout>
      <div className="p-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="card-eco">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-[hsl(var(--status-success))]">{stats.collected}</p>
              <p className="text-xs text-muted-foreground">Collected</p>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-[hsl(var(--status-error))]">{stats.rejected}</p>
              <p className="text-xs text-muted-foreground">Rejected</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Add Button */}
        <Button className="w-full" onClick={handleAddCollection}>
          <Plus className="w-4 h-4 mr-2" />
          Log Manual Collection
        </Button>

        {/* Collections List */}
        <Card className="card-eco">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Today's Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="collected">Collected</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-2 mt-0">
                {filteredCollections.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Trash2 className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p>No collections in this category</p>
                  </div>
                ) : (
                  filteredCollections.map((collection) => {
                    const WasteIcon = wasteTypeConfig[collection.wasteType].icon;
                    return (
                      <div 
                        key={collection.id}
                        className={cn(
                          "p-3 rounded-lg border transition-colors",
                          collection.status === 'collected' && "bg-muted/30 border-border",
                          collection.status === 'rejected' && "bg-destructive/5 border-destructive/20"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            wasteTypeConfig[collection.wasteType].bg
                          )}>
                            <WasteIcon className={cn("w-5 h-5", wasteTypeConfig[collection.wasteType].color)} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm truncate">{collection.address}</p>
                              {collection.photo && (
                                <Camera className="w-3 h-3 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {collection.time}
                              </span>
                              <Badge 
                                variant="outline" 
                                className={cn(
                                  "text-[10px] px-1.5",
                                  collection.status === 'collected' && "border-[hsl(var(--status-success))] text-[hsl(var(--status-success))]",
                                  collection.status === 'rejected' && "border-[hsl(var(--status-error))] text-[hsl(var(--status-error))]"
                                )}
                              >
                                {collection.status === 'collected' ? (
                                  <><CheckCircle2 className="w-3 h-3 mr-1" />Collected</>
                                ) : (
                                  <><XCircle className="w-3 h-3 mr-1" />Rejected</>
                                )}
                              </Badge>
                            </div>
                            {collection.notes && (
                              <p className="text-xs text-destructive mt-1">Note: {collection.notes}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DriverLayout>
  );
}
