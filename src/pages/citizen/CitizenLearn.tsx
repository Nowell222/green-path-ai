import { useState } from 'react';
import CitizenLayout from '@/components/layouts/CitizenLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Play,
  Clock,
  CheckCircle,
  Recycle,
  Leaf,
  Trash2,
  AlertTriangle,
  ArrowRight,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const guides = [
  {
    id: 1,
    title: 'Waste Segregation 101',
    description: 'Learn the basics of proper waste separation',
    category: 'basics',
    duration: '5 min',
    completed: true,
    icon: Recycle,
    color: 'text-[hsl(var(--waste-recyclable))]'
  },
  {
    id: 2,
    title: 'Composting at Home',
    description: 'Turn food scraps into garden gold',
    category: 'advanced',
    duration: '8 min',
    completed: true,
    icon: Leaf,
    color: 'text-[hsl(var(--waste-biodegradable))]'
  },
  {
    id: 3,
    title: 'Hazardous Waste Safety',
    description: 'Handle dangerous items properly',
    category: 'safety',
    duration: '6 min',
    completed: false,
    icon: AlertTriangle,
    color: 'text-[hsl(var(--waste-hazardous))]'
  },
  {
    id: 4,
    title: 'Reducing Plastic Use',
    description: 'Practical tips for a plastic-free life',
    category: 'tips',
    duration: '7 min',
    completed: false,
    icon: Trash2,
    color: 'text-[hsl(var(--waste-residual))]'
  },
];

const wasteCategories = [
  {
    name: 'Recyclable',
    icon: Recycle,
    color: 'bg-[hsl(var(--waste-recyclable))]',
    items: ['Plastic bottles', 'Cardboard', 'Glass jars', 'Aluminum cans', 'Paper'],
    tips: 'Clean and dry before recycling'
  },
  {
    name: 'Biodegradable',
    icon: Leaf,
    color: 'bg-[hsl(var(--waste-biodegradable))]',
    items: ['Food scraps', 'Garden waste', 'Paper napkins', 'Fruit peels', 'Egg shells'],
    tips: 'Great for composting!'
  },
  {
    name: 'Residual',
    icon: Trash2,
    color: 'bg-[hsl(var(--waste-residual))]',
    items: ['Diapers', 'Sanitary products', 'Broken ceramics', 'Rubber', 'Styrofoam'],
    tips: 'Minimize this category'
  },
  {
    name: 'Hazardous',
    icon: AlertTriangle,
    color: 'bg-[hsl(var(--waste-hazardous))]',
    items: ['Batteries', 'Paint', 'Chemicals', 'Light bulbs', 'Medicine'],
    tips: 'Special disposal required'
  },
];

const tips = [
  'Rinse containers before recycling',
  'Remove caps from bottles',
  'Flatten cardboard boxes',
  'Separate food waste from packaging',
  'Check recycling symbols on products',
  'Compost tea bags and coffee grounds',
  'Reuse glass jars for storage',
  'Donate usable items instead of throwing away',
];

export default function CitizenLearn() {
  const [activeTab, setActiveTab] = useState('guides');

  const handleStartGuide = (id: number) => {
    toast.info('Starting guide...', { description: 'Video content coming soon!' });
  };

  return (
    <CitizenLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Learn</h1>
          <p className="text-muted-foreground">Master waste management with our guides</p>
        </div>

        {/* Progress */}
        <Card className="card-eco">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Your Progress</p>
                <p className="text-2xl font-bold">2/4 Guides Completed</p>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center">
                <span className="text-xl font-bold text-primary">50%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="tips">Quick Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="guides" className="space-y-3 mt-4">
            {guides.map((guide) => (
              <Card key={guide.id} className="card-eco">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      guide.completed ? "bg-primary/10" : "bg-muted"
                    )}>
                      <guide.icon className={cn("w-6 h-6", guide.color)} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{guide.title}</p>
                        {guide.completed && (
                          <CheckCircle className="w-4 h-4 text-[hsl(var(--status-success))]" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{guide.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {guide.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {guide.duration}
                        </span>
                      </div>
                    </div>
                    
                    <Button 
                      variant={guide.completed ? "outline" : "default"} 
                      size="sm"
                      onClick={() => handleStartGuide(guide.id)}
                    >
                      {guide.completed ? 'Review' : 'Start'}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="categories" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              {wasteCategories.map((category) => (
                <Card key={category.name} className="card-eco">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white", category.color)}>
                        <category.icon className="w-4 h-4" />
                      </div>
                      <CardTitle className="text-base">{category.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm text-muted-foreground mb-3">
                      {category.items.slice(0, 4).map((item) => (
                        <li key={item} className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-primary font-medium">💡 {category.tips}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="mt-4">
            <Card className="card-eco">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[hsl(var(--waste-hazardous))]" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tips.map((tip, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CitizenLayout>
  );
}
