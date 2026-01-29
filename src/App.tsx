import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Citizen Pages
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import WasteScanner from "./pages/citizen/WasteScanner";
import TruckTracking from "./pages/citizen/TruckTracking";
import CollectionSchedule from "./pages/citizen/CollectionSchedule";
import CitizenReports from "./pages/citizen/CitizenReports";
import CitizenChat from "./pages/citizen/CitizenChat";
import CitizenAchievements from "./pages/citizen/CitizenAchievements";
import CitizenLearn from "./pages/citizen/CitizenLearn";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminFleet from "./pages/admin/AdminFleet";
import AdminRoutes from "./pages/admin/AdminRoutes";
import AdminReports from "./pages/admin/AdminReports";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSchedule from "./pages/admin/AdminSchedule";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminSettings from "./pages/admin/AdminSettings";

// Driver Pages
import DriverDashboard from "./pages/driver/DriverDashboard";
import DriverRoute from "./pages/driver/DriverRoute";
import DriverCollections from "./pages/driver/DriverCollections";
import DriverIssues from "./pages/driver/DriverIssues";
import DriverMessages from "./pages/driver/DriverMessages";

const queryClient = new QueryClient();

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }
  
  return <>{children}</>;
}

// Redirect authenticated users
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated && user) {
    return <Navigate to={`/${user.role}`} replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Citizen Routes */}
      <Route path="/citizen" element={<ProtectedRoute allowedRoles={['citizen']}><CitizenDashboard /></ProtectedRoute>} />
      <Route path="/citizen/scanner" element={<ProtectedRoute allowedRoles={['citizen']}><WasteScanner /></ProtectedRoute>} />
      <Route path="/citizen/tracking" element={<ProtectedRoute allowedRoles={['citizen']}><TruckTracking /></ProtectedRoute>} />
      <Route path="/citizen/schedule" element={<ProtectedRoute allowedRoles={['citizen']}><CollectionSchedule /></ProtectedRoute>} />
      <Route path="/citizen/reports" element={<ProtectedRoute allowedRoles={['citizen']}><CitizenReports /></ProtectedRoute>} />
      <Route path="/citizen/chat" element={<ProtectedRoute allowedRoles={['citizen']}><CitizenChat /></ProtectedRoute>} />
      <Route path="/citizen/achievements" element={<ProtectedRoute allowedRoles={['citizen']}><CitizenAchievements /></ProtectedRoute>} />
      <Route path="/citizen/learn" element={<ProtectedRoute allowedRoles={['citizen']}><CitizenLearn /></ProtectedRoute>} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/fleet" element={<ProtectedRoute allowedRoles={['admin']}><AdminFleet /></ProtectedRoute>} />
      <Route path="/admin/routes" element={<ProtectedRoute allowedRoles={['admin']}><AdminRoutes /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminReports /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AdminAnalytics /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/schedule" element={<ProtectedRoute allowedRoles={['admin']}><AdminSchedule /></ProtectedRoute>} />
      <Route path="/admin/notifications" element={<ProtectedRoute allowedRoles={['admin']}><AdminNotifications /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />
      
      {/* Driver Routes */}
      <Route path="/driver" element={<ProtectedRoute allowedRoles={['driver']}><DriverDashboard /></ProtectedRoute>} />
      <Route path="/driver/route" element={<ProtectedRoute allowedRoles={['driver']}><DriverRoute /></ProtectedRoute>} />
      <Route path="/driver/collections" element={<ProtectedRoute allowedRoles={['driver']}><DriverCollections /></ProtectedRoute>} />
      <Route path="/driver/issues" element={<ProtectedRoute allowedRoles={['driver']}><DriverIssues /></ProtectedRoute>} />
      <Route path="/driver/messages" element={<ProtectedRoute allowedRoles={['driver']}><DriverMessages /></ProtectedRoute>} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
