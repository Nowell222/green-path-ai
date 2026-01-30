import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type UserRole = 'citizen' | 'admin' | 'driver' | 'barangay';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  barangay?: string;
  phone?: string;
  truckId?: string; // For drivers
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
      avatar: undefined,
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
      avatar: undefined,
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
      avatar: undefined,
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
      avatar: undefined,
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
    
    // Simulate network delay
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
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        login, 
        logout, 
        isLoading 
      }}
    >
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

// Helper to get role display name
export function getRoleDisplayName(role: UserRole): string {
  const names: Record<UserRole, string> = {
    citizen: 'Citizen',
    admin: 'MENRO Admin',
    driver: 'Truck Driver',
    barangay: 'Barangay Official',
  };
  return names[role];
}

// Helper to get role dashboard path
export function getRoleDashboardPath(role: UserRole): string {
  const paths: Record<UserRole, string> = {
    citizen: '/citizen',
    admin: '/admin',
    driver: '/driver',
    barangay: '/barangay',
  };
  return paths[role];
}
