import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Map, 
  CheckSquare, 
  AlertTriangle,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Leaf,
  Truck,
  Phone
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface DriverLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/driver', label: 'Dashboard', icon: Home },
  { path: '/driver/route', label: 'Current Route', icon: Map },
  { path: '/driver/collections', label: 'Collections', icon: CheckSquare },
  { path: '/driver/issues', label: 'Report Issue', icon: AlertTriangle },
  { path: '/driver/messages', label: 'Messages', icon: MessageSquare },
];

export default function DriverLayout({ children }: DriverLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-sidebar border-b border-sidebar-border">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-sidebar-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-sidebar-foreground">JuanLessTrash</span>
                <p className="text-[10px] text-sidebar-foreground/60">Driver App</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sidebar-accent">
              <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center">
                <Truck className="w-4 h-4 text-sidebar-primary-foreground" />
              </div>
              <div className="text-sm text-sidebar-foreground">
                <p className="font-medium leading-none">{user?.truckId}</p>
                <p className="text-xs text-sidebar-foreground/60">{user?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 bg-sidebar border-r border-sidebar-border shadow-xl">
            <div className="p-4 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sidebar-primary flex items-center justify-center">
                  <Truck className="w-6 h-6 text-sidebar-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sidebar-foreground">{user?.name}</p>
                  <p className="text-sm text-sidebar-foreground/60">{user?.truckId} • Driver</p>
                </div>
              </div>
            </div>
            
            <nav className="p-4 space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive 
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 border-t border-sidebar-border">
              <Button 
                variant="outline" 
                className="w-full justify-start border-sidebar-border text-sidebar-foreground"
              >
                <Phone className="w-5 h-5 mr-3" />
                Call Dispatch
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-sidebar border-t border-sidebar-border safe-area-inset-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center gap-1 px-4 py-1 rounded-lg transition-colors',
                  isActive 
                    ? 'text-sidebar-primary' 
                    : 'text-sidebar-foreground/60'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label.split(' ')[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
