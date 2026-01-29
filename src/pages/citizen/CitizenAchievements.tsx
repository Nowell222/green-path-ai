import CitizenLayout from '@/components/layouts/CitizenLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Medal,
  Star,
  Flame,
  Target,
  Leaf,
  Recycle,
  Award,
  Lock,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const achievements = [
  { id: 1, name: 'First Scan', description: 'Scan your first waste item', icon: Target, points: 10, unlocked: true, progress: 100 },
  { id: 2, name: 'Eco Warrior', description: 'Scan 50 items correctly', icon: Leaf, points: 50, unlocked: true, progress: 100 },
  { id: 3, name: 'Recycling Pro', description: 'Identify 25 recyclable items', icon: Recycle, points: 30, unlocked: true, progress: 100 },
  { id: 4, name: 'Week Streak', description: 'Use the app 7 days in a row', icon: Flame, points: 25, unlocked: false, progress: 71 },
  { id: 5, name: 'Report Hero', description: 'Submit 5 valid reports', icon: Award, points: 40, unlocked: false, progress: 60 },
  { id: 6, name: 'Perfect Score', description: 'Get 100% accuracy on 10 scans', icon: Star, points: 100, unlocked: false, progress: 40 },
];

const leaderboard = [
  { rank: 1, name: 'Maria S.', points: 1250, barangay: 'San Jose' },
  { rank: 2, name: 'Juan D.', points: 1180, barangay: 'Poblacion' },
  { rank: 3, name: 'Ana G.', points: 1050, barangay: 'Centro' },
  { rank: 4, name: 'Pedro R.', points: 980, barangay: 'Magsaysay' },
  { rank: 5, name: 'You', points: 845, barangay: 'San Jose', isUser: true },
];

export default function CitizenAchievements() {
  const userPoints = 845;
  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;

  return (
    <CitizenLayout>
      <div className="p-4 lg:p-6 pb-24 lg:pb-6 space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Achievements</h1>
          <p className="text-muted-foreground">Track your progress and earn rewards</p>
        </div>

        {/* Points Card */}
        <Card className="card-eco gradient-eco text-primary-foreground overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm">Your Points</p>
                <p className="text-4xl font-display font-bold">{userPoints}</p>
                <p className="text-sm text-primary-foreground/80 mt-1">
                  Rank #5 in your barangay
                </p>
              </div>
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                <Trophy className="w-10 h-10" />
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Level Progress</span>
                <span>845 / 1000 XP</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: '84.5%' }} />
              </div>
              <p className="text-xs text-primary-foreground/60 mt-1">155 XP to Level 5</p>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="card-eco">
            <CardContent className="p-4 text-center">
              <Medal className="w-6 h-6 text-[hsl(var(--waste-hazardous))] mx-auto mb-2" />
              <p className="text-xl font-bold">{unlockedAchievements}/{totalAchievements}</p>
              <p className="text-xs text-muted-foreground">Achievements</p>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4 text-center">
              <Flame className="w-6 h-6 text-[hsl(var(--status-error))] mx-auto mb-2" />
              <p className="text-xl font-bold">5</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4 text-center">
              <Recycle className="w-6 h-6 text-[hsl(var(--waste-recyclable))] mx-auto mb-2" />
              <p className="text-xl font-bold">127</p>
              <p className="text-xs text-muted-foreground">Items Scanned</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements List */}
        <Card className="card-eco">
          <CardHeader className="pb-2">
            <CardTitle className="font-display flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[hsl(var(--waste-hazardous))]" />
              Badges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={cn(
                  "p-3 rounded-lg border transition-colors",
                  achievement.unlocked 
                    ? "bg-primary/5 border-primary/20" 
                    : "bg-muted/50 border-border"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    achievement.unlocked ? "bg-primary/10" : "bg-muted"
                  )}>
                    {achievement.unlocked ? (
                      <achievement.icon className="w-6 h-6 text-primary" />
                    ) : (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={cn(
                        "font-medium",
                        !achievement.unlocked && "text-muted-foreground"
                      )}>
                        {achievement.name}
                      </p>
                      {achievement.unlocked && (
                        <CheckCircle className="w-4 h-4 text-[hsl(var(--status-success))]" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    
                    {!achievement.unlocked && (
                      <div className="mt-2">
                        <Progress value={achievement.progress} className="h-1.5" />
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {achievement.progress}% complete
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <p className={cn(
                      "font-bold",
                      achievement.unlocked ? "text-primary" : "text-muted-foreground"
                    )}>
                      +{achievement.points}
                    </p>
                    <p className="text-xs text-muted-foreground">pts</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="card-eco">
          <CardHeader className="pb-2">
            <CardTitle className="font-display flex items-center gap-2">
              <Star className="w-5 h-5 text-[hsl(var(--waste-hazardous))]" />
              Barangay Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {leaderboard.map((user) => (
              <div 
                key={user.rank}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg",
                  user.isUser ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                  user.rank === 1 && "bg-[hsl(var(--waste-hazardous))] text-black",
                  user.rank === 2 && "bg-muted-foreground/30",
                  user.rank === 3 && "bg-[hsl(35,70%,50%)] text-white",
                  user.rank > 3 && "bg-muted"
                )}>
                  {user.rank}
                </div>
                <div className="flex-1">
                  <p className={cn("font-medium", user.isUser && "text-primary")}>
                    {user.name} {user.isUser && '(You)'}
                  </p>
                  <p className="text-xs text-muted-foreground">Brgy. {user.barangay}</p>
                </div>
                <p className="font-bold">{user.points.toLocaleString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </CitizenLayout>
  );
}
