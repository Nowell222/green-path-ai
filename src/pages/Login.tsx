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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-accent p-4">
      {/* Logo and Title */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-eco mb-4 shadow-lg">
          <Leaf className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground">JuanLessTrash</h1>
        <p className="text-muted-foreground mt-1">Municipal Waste Management System</p>
      </div>

      <div className="w-full max-w-md animate-fade-in" style={{ animationDelay: '100ms' }}>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="demo">Demo Accounts</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-border shadow-xl">
              <CardHeader className="space-y-1">
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
                      className="h-11"
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
                        className="h-11 pr-10"
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
                    className="w-full h-11 font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demo">
            <Card className="border-border shadow-xl">
              <CardHeader className="space-y-1">
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
                    className="w-full p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-accent/50 transition-all duration-200 text-left group disabled:opacity-50"
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

      {/* Footer */}
      <p className="mt-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '200ms' }}>
        Serving MENRO and citizens for a cleaner environment
      </p>
    </div>
  );
}
