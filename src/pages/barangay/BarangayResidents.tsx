import { useState } from 'react';
import BarangayLayout from '@/components/layouts/BarangayLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search,
  MapPin,
  Phone,
  Mail,
  FileText
} from 'lucide-react';

const residents = [
  { id: 'USR-001', name: 'Maria Santos', address: 'Purok 5, Block 3', phone: '0917-XXX-1234', email: 'maria@email.com', requests: 5, status: 'active' },
  { id: 'USR-002', name: 'Juan Dela Cruz', address: 'Purok 3, Block 1', phone: '0918-XXX-5678', email: 'juan@email.com', requests: 3, status: 'active' },
  { id: 'USR-003', name: 'Ana Garcia', address: 'Purok 7, Block 2', phone: '0919-XXX-9012', email: 'ana@email.com', requests: 8, status: 'active' },
  { id: 'USR-004', name: 'Pedro Reyes', address: 'Purok 1, Block 4', phone: '0920-XXX-3456', email: 'pedro@email.com', requests: 2, status: 'active' },
  { id: 'USR-005', name: 'Jose Santos', address: 'Purok 2, Block 5', phone: '0921-XXX-7890', email: 'jose@email.com', requests: 1, status: 'inactive' },
];

export default function BarangayResidents() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResidents = residents.filter(resident =>
    resident.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resident.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BarangayLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Residents</h1>
          <p className="text-muted-foreground">View and manage registered residents in your barangay</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="card-eco">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{residents.length}</p>
                <p className="text-sm text-muted-foreground">Total Residents</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[hsl(var(--status-success))]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[hsl(var(--status-success))]" />
              </div>
              <div>
                <p className="text-2xl font-bold">{residents.filter(r => r.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-eco">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <FileText className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{residents.reduce((sum, r) => sum + r.requests, 0)}</p>
                <p className="text-sm text-muted-foreground">Total Requests</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search residents..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Residents Table */}
        <Card className="card-eco">
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="p-4 font-medium">Resident</th>
                  <th className="p-4 font-medium">Contact</th>
                  <th className="p-4 font-medium">Address</th>
                  <th className="p-4 font-medium">Requests</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredResidents.map((resident) => (
                  <tr key={resident.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-medium text-primary">{resident.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{resident.name}</p>
                          <p className="text-sm text-muted-foreground">{resident.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p className="flex items-center gap-1"><Phone className="w-3 h-3" />{resident.phone}</p>
                        <p className="flex items-center gap-1 text-muted-foreground"><Mail className="w-3 h-3" />{resident.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {resident.address}
                      </p>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary">{resident.requests} requests</Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={resident.status === 'active' ? 'default' : 'secondary'}>
                        {resident.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </BarangayLayout>
  );
}
