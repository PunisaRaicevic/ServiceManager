import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Wrench, Calendar } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { format } from "date-fns";

export default function ClientDetailsPage() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/clients/:id");

  //todo: remove mock functionality
  const client = {
    clientId: params?.id || "1",
    name: "Grand Hotel Plaza",
    email: "maintenance@grandhotel.com",
    phone: "+1 555-0123",
    address: "123 Ocean Drive, Miami, FL 33139",
    pib: "123456789",
    pdv: "987654321",
    account: "ACC-2024-001",
    appliances: [
      {
        applianceId: "1",
        name: "Commercial Freezer Unit",
        maker: "ThermoKing",
        lastServiceDate: new Date('2024-01-10'),
      },
      {
        applianceId: "2",
        name: "Ice Maker - Kitchen",
        maker: "Scotsman",
        lastServiceDate: new Date('2023-12-15'),
      },
      {
        applianceId: "3",
        name: "Walk-in Cooler",
        maker: "KoldKing",
        lastServiceDate: new Date('2023-11-20'),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Header username="John Smith" onLogout={() => setLocation('/')} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <BackButton to="/clients" label="Back to Clients" />
        </div>

        <h2 className="text-3xl font-bold mb-6">{client.name}</h2>

        <Card className="p-6 mb-6">
          <h3 className="text-sm uppercase tracking-wide font-semibold mb-4 text-muted-foreground">
            Contact Information
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Email:</span>
              <span data-testid="text-email">{client.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Phone:</span>
              <span data-testid="text-phone">{client.phone}</span>
            </div>
            <div className="flex items-start gap-2 text-sm sm:col-span-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span className="text-muted-foreground">Address:</span>
              <span data-testid="text-address">{client.address}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="text-sm uppercase tracking-wide font-semibold mb-4 text-muted-foreground">
            Business Information
          </h3>
          <div className="grid gap-3 sm:grid-cols-3 font-mono text-sm">
            <div>
              <span className="text-muted-foreground">PIB:</span>
              <p className="font-medium" data-testid="text-pib">{client.pib}</p>
            </div>
            <div>
              <span className="text-muted-foreground">PDV:</span>
              <p className="font-medium" data-testid="text-pdv">{client.pdv}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Account:</span>
              <p className="font-medium" data-testid="text-account">{client.account}</p>
            </div>
          </div>
        </Card>

        <h3 className="text-xl font-semibold mb-4">Appliances</h3>
        <div className="space-y-4">
          {client.appliances.map((appliance) => (
            <Card
              key={appliance.applianceId}
              className="p-5 hover-elevate active-elevate-2 cursor-pointer overflow-visible"
              onClick={() => setLocation(`/appliances/${appliance.applianceId}`)}
              data-testid={`card-appliance-${appliance.applianceId}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium text-lg mb-1">{appliance.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Wrench className="h-4 w-4" />
                    <span>{appliance.maker}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Last service: {format(appliance.lastServiceDate, "MMM d, yyyy")}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
