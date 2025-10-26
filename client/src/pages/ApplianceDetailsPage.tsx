import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Calendar, Hash, Upload, Printer } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { format } from "date-fns";

export default function ApplianceDetailsPage() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/appliances/:id");

  //todo: remove mock functionality
  const appliance = {
    applianceId: params?.id || "1",
    name: "Commercial Freezer Unit",
    maker: "ThermoKing",
    serialNumber: "TK-2024-FR-8820",
    age: 3,
    lastServiceDate: new Date('2024-01-10'),
    nextServiceDate: new Date('2024-07-10'),
    clientId: "1",
    history: [
      {
        reportId: "1",
        date: new Date('2024-01-10'),
        description: "Replaced compressor belt, cleaned condenser coils",
        technicianName: "John Smith",
      },
      {
        reportId: "2",
        date: new Date('2023-07-15'),
        description: "Annual maintenance, refrigerant check",
        technicianName: "Sarah Johnson",
      },
      {
        reportId: "3",
        date: new Date('2023-01-20'),
        description: "Repaired door seal, thermostat calibration",
        technicianName: "Mike Davis",
      },
    ],
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header username="John Smith" onLogout={() => setLocation('/')} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 print:hidden">
          <BackButton to={`/clients/${appliance.clientId}`} label="Back to Client" />
        </div>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">{appliance.name}</h2>
            <p className="text-muted-foreground">{appliance.maker}</p>
          </div>
          <div className="flex gap-2 print:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log('Upload photo')}
              data-testid="button-upload-photo"
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Photo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              data-testid="button-print"
              className="gap-2"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        <Card className="p-6 mb-6">
          <h3 className="text-sm uppercase tracking-wide font-semibold mb-4 text-muted-foreground">
            Appliance Information
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Maker:</span>
              <span data-testid="text-maker">{appliance.maker}</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-mono">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Serial:</span>
              <span data-testid="text-serial">{appliance.serialNumber}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Age:</span>
              <span data-testid="text-age">{appliance.age} years</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Last Service:</span>
              <span data-testid="text-last-service">
                {format(appliance.lastServiceDate, "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:col-span-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Next Service:</span>
              <span data-testid="text-next-service">
                {format(appliance.nextServiceDate, "MMM d, yyyy")}
              </span>
            </div>
          </div>
        </Card>

        <h3 className="text-xl font-semibold mb-4">Service History</h3>
        <div className="space-y-4">
          {appliance.history.map((report) => (
            <Card
              key={report.reportId}
              className="p-5 border-l-4 border-l-primary"
              data-testid={`card-history-${report.reportId}`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {format(report.date, "MMMM d, yyyy")}
                </div>
                <span className="text-sm text-muted-foreground">
                  by {report.technicianName}
                </span>
              </div>
              <p className="text-sm">{report.description}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
