import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type UserRole = 'citizen' | 'admin' | 'driver' | 'barangay' | 'superadmin' | 'hauling_admin' | 'business' | 'ecoaide';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  barangay?: string;
  phone?: string;
  truckId?: string;
  organizationName?: string;
  vehicleId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample accounts for demonstration
const SAMPLE_USERS: Record<string, { password: string; user: User }> = {
  'citizen@juanlesstrash.com': {
    password: 'citizen123',
    user: {
      id: 'usr-001',
      email: 'citizen@juanlesstrash.com',
      name: 'Maria Santos',
      role: 'citizen',
      barangay: 'Brgy. San Jose',
      phone: '0917-XXX-1234',
    },
  },
  'admin@juanlesstrash.com': {
    password: 'admin123',
    user: {
      id: 'adm-001',
      email: 'admin@juanlesstrash.com',
      name: 'Juan Cruz',
      role: 'admin',
      phone: '0918-XXX-5678',
    },
  },
  'driver@juanlesstrash.com': {
    password: 'driver123',
    user: {
      id: 'drv-001',
      email: 'driver@juanlesstrash.com',
      name: 'Pedro Reyes',
      role: 'driver',
      phone: '0919-XXX-9012',
      truckId: 'TRK-247',
    },
  },
  'barangay@juanlesstrash.com': {
    password: 'barangay123',
    user: {
      id: 'brgy-001',
      email: 'barangay@juanlesstrash.com',
      name: 'Kapitan Jose Mendoza',
      role: 'barangay',
      barangay: 'Brgy. San Jose',
      phone: '0920-XXX-3456',
    },
  },
  'superadmin@juanlesstrash.com': {
    password: 'superadmin123',
    user: {
      id: 'sa-001',
      email: 'superadmin@juanlesstrash.com',
      name: 'Ricardo Dela Cruz',
      role: 'superadmin',
      phone: '0921-XXX-7890',
    },
  },
  'hauling@juanlesstrash.com': {
    password: 'hauling123',
    user: {
      id: 'haul-001',
      email: 'hauling@juanlesstrash.com',
      name: 'Carlos Villanueva',
      role: 'hauling_admin',
      phone: '0922-XXX-1234',
      organizationName: 'GreenHaul Services Inc.',
    },
  },
  'business@juanlesstrash.com': {
    password: 'business123',
    user: {
      id: 'biz-001',
      email: 'business@juanlesstrash.com',
      name: 'Ana Reyes Trading',
      role: 'business',
      phone: '0923-XXX-5678',
      organizationName: 'Reyes Food Corp.',
    },
  },
  'ecoaide@juanlesstrash.com': {
    password: 'ecoaide123',
    user: {
      id: 'eco-001',
      email: 'ecoaide@juanlesstrash.com',
      name: 'Mark Gonzales',
      role: 'ecoaide',
      phone: '0924-XXX-9012',
      vehicleId: 'ECO-105',
      organizationName: 'GreenHaul Services Inc.',
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('juanlesstrash_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userRecord = SAMPLE_USERS[email.toLowerCase()];
    
    if (userRecord && userRecord.password === password) {
      setUser(userRecord.user);
      localStorage.setItem('juanlesstrash_user', JSON.stringify(userRecord.user));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('juanlesstrash_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function getRoleDisplayName(role: UserRole): string {
  const names: Record<UserRole, string> = {
    citizen: 'Citizen',
    admin: 'MENRO Admin',
    driver: 'Truck Driver',
    barangay: 'Barangay Official',
    superadmin: 'Super Admin',
    hauling_admin: 'Hauling Org Admin',
    business: 'Business Organization',
    ecoaide: 'Eco-Aide',
  };
  return names[role];
}

export function getRoleDashboardPath(role: UserRole): string {
  const paths: Record<UserRole, string> = {
    citizen: '/citizen',
    admin: '/admin',
    driver: '/driver',
    barangay: '/barangay',
    superadmin: '/superadmin',
    hauling_admin: '/hauling',
    business: '/business',
    ecoaide: '/ecoaide',
  };
  return paths[role];
}
