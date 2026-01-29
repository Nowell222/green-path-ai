import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, getRoleDashboardPath } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, Truck, Shield, Users, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const DEMO_ACCOUNTS = [
  { 
    role: 'Citizen', 
    email: 'citizen@juanlesstrash.com', 
    password: 'citizen123',
    icon: Users,
    description: 'Access waste scanner, truck tracking, schedules'
  },
  { 
    role: 'Admin', 
    email: 'admin@juanlesstrash.com', 
    password: 'admin123',
    icon: Shield,
    description: 'Fleet management, analytics, reports'
  },
  { 
    role: 'Driver', 
    email: 'driver@juanlesstrash.com', 
    password: 'driver123',
    icon: Truck,
    description: 'Route management, collection tracking'
  },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      const userRecord = DEMO_ACCOUNTS.find(acc => acc.email.toLowerCase() === email.toLowerCase());
      toast.success('Welcome back!', {
        description: `Logged in as ${userRecord?.role || 'User'}`
      });
      
      // Navigate based on role
      const role = email.toLowerCase().includes('admin') ? 'admin' : 
                   email.toLowerCase().includes('driver') ? 'driver' : 'citizen';
      navigate(getRoleDashboardPath(role as any));
    } else {
      setError('Invalid email or password');
    }
  };

  const handleDemoLogin = async (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setError('');
    
    const success = await login(email, password);
    if (success) {
      const role = email.toLowerCase().includes('admin') ? 'admin' : 
                   email.toLowerCase().includes('driver') ? 'driver' : 'citizen';
      toast.success('Demo login successful!');
      navigate(getRoleDashboardPath(role as any));
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(150,40%,96%)] via-background to-[hsl(150,30%,92%)]" />
      <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full border-[3px] border-primary/20 opacity-60 hidden lg:block" />
      <div className="absolute top-40 right-40 w-[400px] h-[400px] rounded-full border-2 border-primary/10 opacity-40 hidden lg:block" />
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
      
      {/* Floating Icons - matching reference */}
      <div className="absolute top-32 right-[28%] hidden lg:flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 text-amber-500 shadow-lg animate-float">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
        </svg>
      </div>
      <div className="absolute top-[45%] right-[15%] hidden lg:flex items-center justify-center w-14 h-14 rounded-xl bg-sky-100 text-sky-500 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div className="absolute top-[25%] right-[12%] hidden lg:flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
        <Leaf className="w-8 h-8" />
      </div>

      {/* Left Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="text-left">
              <h2 className="font-display font-bold text-xl text-foreground">JuanLessTrash</h2>
              <p className="text-xs text-muted-foreground">Smart Waste Management</p>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground leading-tight">
            Smart Waste,
            <span className="block text-primary">Cleaner Future</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Empowering our community with intelligent waste management. Scan, sort, and schedule pickups with AI assistance.
          </p>
        </div>

        <div className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Sign In</TabsTrigger>
              <TabsTrigger value="demo" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Demo Accounts</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="border-border/50 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="text-2xl font-display">Welcome back</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 bg-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-11 pr-10 bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-11 font-medium shadow-lg shadow-primary/20"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="demo">
              <Card className="border-border/50 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="text-2xl font-display">Demo Accounts</CardTitle>
                  <CardDescription>
                    Click any account below to sign in instantly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {DEMO_ACCOUNTS.map((account) => (
                    <button
                      key={account.role}
                      onClick={() => handleDemoLogin(account.email, account.password)}
                      disabled={isLoading}
                      className="w-full p-4 rounded-xl border border-border/50 bg-white hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-left group disabled:opacity-50"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <account.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground">{account.role}</p>
                          <p className="text-sm text-muted-foreground truncate">{account.email}</p>
                          <p className="text-xs text-muted-foreground mt-1">{account.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Stats - matching reference */}
        <div className="flex items-center gap-8 mt-8 pt-6 border-t border-border/50">
          <div className="text-center">
            <p className="text-2xl font-display font-bold text-primary">45+</p>
            <p className="text-sm text-muted-foreground">Barangays Served</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-display font-bold text-primary">92%</p>
            <p className="text-sm text-muted-foreground">Collection Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-display font-bold text-primary">15K+</p>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </div>
        </div>
      </div>
    </div>
  );
}
