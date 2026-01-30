import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard,
  FileText,
  Users,
  Send,
  BarChart3,
  Settings,
  LogOut,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Bell
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface BarangayLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/barangay', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/barangay/requests', label: 'User Requests', icon: FileText },
  { path: '/barangay/residents', label: 'Residents', icon: Users },
  { path: '/barangay/forward', label: 'Forward to MENRO', icon: Send },
  { path: '/barangay/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function BarangayLayout({ children }: BarangayLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <Link to="/barangay" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-sidebar-primary-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-sidebar-foreground">JuanLessTrash</span>
                <p className="text-[10px] text-sidebar-foreground/60">Barangay Portal</p>
              </div>
            </Link>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-sidebar-foreground hover:bg-sidebar-accent h-8 w-8"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  collapsed && 'justify-center px-2',
                  isActive 
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        
        {/* Footer */}
        <div className="p-2 border-t border-sidebar-border">
          <Link
            to="/barangay/settings"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors',
              collapsed && 'justify-center px-2'
            )}
          >
            <Settings className="w-5 h-5" />
            {!collapsed && <span>Settings</span>}
          </Link>
          <button
            onClick={handleLogout}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-destructive/20 hover:text-destructive transition-colors',
              collapsed && 'justify-center px-2'
            )}
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        collapsed ? "ml-16" : "ml-64"
      )}>
        {/* Top Header */}
        <header className="sticky top-0 z-40 h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div>
            <h2 className="font-display font-bold">{user?.barangay}</h2>
            <p className="text-xs text-muted-foreground">Barangay Official Portal</p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-status-error rounded-full" />
            </Button>
            
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-accent">
              <div className="w-8 h-8 rounded-full gradient-eco flex items-center justify-center text-primary-foreground text-sm font-bold">
                {user?.name?.charAt(0)}
              </div>
              <div className="text-sm">
                <p className="font-medium leading-none">{user?.name}</p>
                <p className="text-xs text-muted-foreground">Barangay Official</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
