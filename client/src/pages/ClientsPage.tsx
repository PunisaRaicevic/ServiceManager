import { useState } from "react";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import ClientCard from "@/components/ClientCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useLocation } from "wouter";

//todo: remove mock functionality
const mockClients = [
  {
    clientId: "1",
    name: "Grand Hotel Plaza",
    email: "maintenance@grandhotel.com",
    phone: "+1 555-0123",
    applianceCount: 12,
  },
  {
    clientId: "2",
    name: "Riverside Restaurant",
    email: "manager@riverside.com",
    phone: "+1 555-0456",
    applianceCount: 8,
  },
  {
    clientId: "3",
    name: "Marina Bistro",
    email: "contact@marinabistro.com",
    phone: "+1 555-0789",
    applianceCount: 5,
  },
  {
    clientId: "4",
    name: "Coastal Café",
    email: "info@coastalcafe.com",
    phone: "+1 555-0321",
    applianceCount: 4,
  },
];

export default function ClientsPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = mockClients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header username="John Smith" onLogout={() => setLocation('/')} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <BackButton to="/dashboard" label="Back to Dashboard" />
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Clients</h2>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search-clients"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <ClientCard
              key={client.clientId}
              {...client}
              onClick={() => setLocation(`/clients/${client.clientId}`)}
            />
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No clients found matching your search
          </div>
        )}
      </main>
    </div>
  );
}
