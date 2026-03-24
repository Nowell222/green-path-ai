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
import CitizenLearn from "./pages/citizen/CitizenLearn";
import EarlyCollectionRequest from "./pages/citizen/EarlyCollectionRequest";

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

// Barangay Pages
import BarangayDashboard from "./pages/barangay/BarangayDashboard";
import BarangayRequests from "./pages/barangay/BarangayRequests";
import BarangayResidents from "./pages/barangay/BarangayResidents";
import BarangayForward from "./pages/barangay/BarangayForward";
import BarangayAnalytics from "./pages/barangay/BarangayAnalytics";
import BarangaySettings from "./pages/barangay/BarangaySettings";

// Super Admin Pages
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import SuperAdminAgencies from "./pages/superadmin/SuperAdminAgencies";
import SuperAdminHaulingOrgs from "./pages/superadmin/SuperAdminHaulingOrgs";
import SuperAdminBusinesses from "./pages/superadmin/SuperAdminBusinesses";
import SuperAdminCitizens from "./pages/superadmin/SuperAdminCitizens";
import SuperAdminUserDirectory from "./pages/superadmin/SuperAdminUserDirectory";
import SuperAdminAnalytics from "./pages/superadmin/SuperAdminAnalytics";
import SuperAdminNotifications from "./pages/superadmin/SuperAdminNotifications";
import SuperAdminAuditLogs from "./pages/superadmin/SuperAdminAuditLogs";
import SuperAdminSettings from "./pages/superadmin/SuperAdminSettings";

// Hauling Admin Pages
import HaulingDashboard from "./pages/hauling/HaulingDashboard";
import HaulingEcoAides from "./pages/hauling/HaulingEcoAides";
import HaulingFleet from "./pages/hauling/HaulingFleet";
import HaulingRoutes from "./pages/hauling/HaulingRoutes";
import HaulingRequests from "./pages/hauling/HaulingRequests";
import HaulingAnalytics from "./pages/hauling/HaulingAnalytics";
import HaulingNotifications from "./pages/hauling/HaulingNotifications";
import HaulingSettings from "./pages/hauling/HaulingSettings";

// Business Pages
import BusinessDashboard from "./pages/business/BusinessDashboard";
import BusinessSchedule from "./pages/business/BusinessSchedule";
import BusinessTracking from "./pages/business/BusinessTracking";
import BusinessRequests from "./pages/business/BusinessRequests";
import BusinessHistory from "./pages/business/BusinessHistory";
import BusinessReports from "./pages/business/BusinessReports";
import BusinessSettings from "./pages/business/BusinessSettings";

// Eco-Aide Pages
import EcoAideDashboard from "./pages/ecoaide/EcoAideDashboard";
import EcoAideRoute from "./pages/ecoaide/EcoAideRoute";
import EcoAideTasks from "./pages/ecoaide/EcoAideTasks";
import EcoAideIssues from "./pages/ecoaide/EcoAideIssues";
import EcoAideMessages from "./pages/ecoaide/EcoAideMessages";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    const rolePaths: Record<string, string> = {
      citizen: '/citizen', admin: '/admin', driver: '/driver', barangay: '/barangay',
      superadmin: '/superadmin', hauling_admin: '/hauling', business: '/business', ecoaide: '/ecoaide',
    };
    return <Navigate to={rolePaths[user.role] || '/login'} replace />;
  }
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  if (isAuthenticated && user) {
    const rolePaths: Record<string, string> = {
      citizen: '/citizen', admin: '/admin', driver: '/driver', barangay: '/barangay',
      superadmin: '/superadmin', hauling_admin: '/hauling', business: '/business', ecoaide: '/ecoaide',
    };
    return <Navigate to={rolePaths[user.role] || '/citizen'} replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Citizen */}
      <Route path="/citizen" element={<ProtectedRoute allowedRoles={['citizen']}><CitizenDashboard /></ProtectedRoute>} />
      <Route path="/citizen/scanner" element={<ProtectedRoute allowedRoles={['citizen']}><WasteScanner /></ProtectedRoute>} />
      <Route path="/citizen/tracking" element={<ProtectedRoute allowedRoles={['citizen']}><TruckTracking /></ProtectedRoute>} />
      <Route path="/citizen/schedule" element={<ProtectedRoute allowedRoles={['citizen']}><CollectionSchedule /></ProtectedRoute>} />
      <Route path="/citizen/reports" element={<ProtectedRoute allowedRoles={['citizen']}><CitizenReports /></ProtectedRoute>} />
      <Route path="/citizen/chat" element={<ProtectedRoute allowedRoles={['citizen']}><CitizenChat /></ProtectedRoute>} />
      <Route path="/citizen/learn" element={<ProtectedRoute allowedRoles={['citizen']}><CitizenLearn /></ProtectedRoute>} />
      <Route path="/citizen/request" element={<ProtectedRoute allowedRoles={['citizen']}><EarlyCollectionRequest /></ProtectedRoute>} />
      
      {/* Admin (MENRO) */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/fleet" element={<ProtectedRoute allowedRoles={['admin']}><AdminFleet /></ProtectedRoute>} />
      <Route path="/admin/routes" element={<ProtectedRoute allowedRoles={['admin']}><AdminRoutes /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminReports /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AdminAnalytics /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/schedule" element={<ProtectedRoute allowedRoles={['admin']}><AdminSchedule /></ProtectedRoute>} />
      <Route path="/admin/notifications" element={<ProtectedRoute allowedRoles={['admin']}><AdminNotifications /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />
      
      {/* Driver */}
      <Route path="/driver" element={<ProtectedRoute allowedRoles={['driver']}><DriverDashboard /></ProtectedRoute>} />
      <Route path="/driver/route" element={<ProtectedRoute allowedRoles={['driver']}><DriverRoute /></ProtectedRoute>} />
      <Route path="/driver/collections" element={<ProtectedRoute allowedRoles={['driver']}><DriverCollections /></ProtectedRoute>} />
      <Route path="/driver/issues" element={<ProtectedRoute allowedRoles={['driver']}><DriverIssues /></ProtectedRoute>} />
      <Route path="/driver/messages" element={<ProtectedRoute allowedRoles={['driver']}><DriverMessages /></ProtectedRoute>} />
      
      {/* Barangay */}
      <Route path="/barangay" element={<ProtectedRoute allowedRoles={['barangay']}><BarangayDashboard /></ProtectedRoute>} />
      <Route path="/barangay/requests" element={<ProtectedRoute allowedRoles={['barangay']}><BarangayRequests /></ProtectedRoute>} />
      <Route path="/barangay/residents" element={<ProtectedRoute allowedRoles={['barangay']}><BarangayResidents /></ProtectedRoute>} />
      <Route path="/barangay/forward" element={<ProtectedRoute allowedRoles={['barangay']}><BarangayForward /></ProtectedRoute>} />
      <Route path="/barangay/analytics" element={<ProtectedRoute allowedRoles={['barangay']}><BarangayAnalytics /></ProtectedRoute>} />
      <Route path="/barangay/settings" element={<ProtectedRoute allowedRoles={['barangay']}><BarangaySettings /></ProtectedRoute>} />
      
      {/* Super Admin */}
      <Route path="/superadmin" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperAdminDashboard /></ProtectedRoute>} />
      <Route path="/superadmin/agencies" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperAdminAgencies /></ProtectedRoute>} />
      <Route path="/superadmin/hauling-orgs" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperAdminHaulingOrgs /></ProtectedRoute>} />
      <Route path="/superadmin/businesses" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperAdminBusinesses /></ProtectedRoute>} />
      <Route path="/superadmin/citizens" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperAdminCitizens /></ProtectedRoute>} />
      <Route path="/superadmin/users" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperAdminUserDirectory /></ProtectedRoute>} />
      <Route path="/superadmin/analytics" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperAdminAnalytics /></ProtectedRoute>} />
      <Route path="/superadmin/notifications" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperAdminNotifications /></ProtectedRoute>} />
      <Route path="/superadmin/audit-logs" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperAdminAuditLogs /></ProtectedRoute>} />
      <Route path="/superadmin/settings" element={<ProtectedRoute allowedRoles={['superadmin']}><SuperAdminSettings /></ProtectedRoute>} />
      
      {/* Hauling Admin */}
      <Route path="/hauling" element={<ProtectedRoute allowedRoles={['hauling_admin']}><HaulingDashboard /></ProtectedRoute>} />
      <Route path="/hauling/ecoaides" element={<ProtectedRoute allowedRoles={['hauling_admin']}><HaulingEcoAides /></ProtectedRoute>} />
      <Route path="/hauling/fleet" element={<ProtectedRoute allowedRoles={['hauling_admin']}><HaulingFleet /></ProtectedRoute>} />
      <Route path="/hauling/routes" element={<ProtectedRoute allowedRoles={['hauling_admin']}><HaulingRoutes /></ProtectedRoute>} />
      <Route path="/hauling/requests" element={<ProtectedRoute allowedRoles={['hauling_admin']}><HaulingRequests /></ProtectedRoute>} />
      <Route path="/hauling/analytics" element={<ProtectedRoute allowedRoles={['hauling_admin']}><HaulingAnalytics /></ProtectedRoute>} />
      <Route path="/hauling/notifications" element={<ProtectedRoute allowedRoles={['hauling_admin']}><HaulingNotifications /></ProtectedRoute>} />
      <Route path="/hauling/settings" element={<ProtectedRoute allowedRoles={['hauling_admin']}><HaulingSettings /></ProtectedRoute>} />
      
      {/* Business */}
      <Route path="/business" element={<ProtectedRoute allowedRoles={['business']}><BusinessDashboard /></ProtectedRoute>} />
      <Route path="/business/schedule" element={<ProtectedRoute allowedRoles={['business']}><BusinessSchedule /></ProtectedRoute>} />
      <Route path="/business/tracking" element={<ProtectedRoute allowedRoles={['business']}><BusinessTracking /></ProtectedRoute>} />
      <Route path="/business/requests" element={<ProtectedRoute allowedRoles={['business']}><BusinessRequests /></ProtectedRoute>} />
      <Route path="/business/history" element={<ProtectedRoute allowedRoles={['business']}><BusinessHistory /></ProtectedRoute>} />
      <Route path="/business/reports" element={<ProtectedRoute allowedRoles={['business']}><BusinessReports /></ProtectedRoute>} />
      <Route path="/business/settings" element={<ProtectedRoute allowedRoles={['business']}><BusinessSettings /></ProtectedRoute>} />
      
      {/* Eco-Aide */}
      <Route path="/ecoaide" element={<ProtectedRoute allowedRoles={['ecoaide']}><EcoAideDashboard /></ProtectedRoute>} />
      <Route path="/ecoaide/route" element={<ProtectedRoute allowedRoles={['ecoaide']}><EcoAideRoute /></ProtectedRoute>} />
      <Route path="/ecoaide/tasks" element={<ProtectedRoute allowedRoles={['ecoaide']}><EcoAideTasks /></ProtectedRoute>} />
      <Route path="/ecoaide/issues" element={<ProtectedRoute allowedRoles={['ecoaide']}><EcoAideIssues /></ProtectedRoute>} />
      <Route path="/ecoaide/messages" element={<ProtectedRoute allowedRoles={['ecoaide']}><EcoAideMessages /></ProtectedRoute>} />
      
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
