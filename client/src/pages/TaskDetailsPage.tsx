import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import StatusBadge from "@/components/StatusBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Wrench, Calendar } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { format } from "date-fns";

export default function TaskDetailsPage() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/tasks/:id");

  //todo: remove mock functionality
  type TaskStatus = "pending" | "in_progress" | "completed";
  const task: {
    taskId: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    client: {
      name: string;
      email: string;
      phone: string;
      address: string;
    };
    appliance: {
      name: string;
      maker: string;
      serialNumber: string;
      age: number;
    };
  } = {
    taskId: params?.id || "1",
    description: "Annual maintenance - Commercial Freezer",
    status: "pending",
    createdAt: new Date('2024-01-15'),
    client: {
      name: "Grand Hotel Plaza",
      email: "maintenance@grandhotel.com",
      phone: "+1 555-0123",
      address: "123 Ocean Drive, Miami, FL 33139",
    },
    appliance: {
      name: "Commercial Freezer Unit",
      maker: "ThermoKing",
      serialNumber: "TK-2024-FR-8820",
      age: 3,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header username="John Smith" onLogout={() => setLocation('/')} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <BackButton to="/tasks" label="Back to Tasks" />
        </div>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">{task.description}</h2>
            <p className="text-sm text-muted-foreground">
              Created {format(task.createdAt, "MMMM d, yyyy")}
            </p>
          </div>
          <StatusBadge status={task.status} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="p-6">
            <h3 className="text-sm uppercase tracking-wide font-semibold mb-4 text-muted-foreground">
              Client Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-lg">{task.client.name}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{task.client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{task.client.phone}</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>{task.client.address}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm uppercase tracking-wide font-semibold mb-4 text-muted-foreground">
              Appliance Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-lg">{task.appliance.name}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Wrench className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Maker:</span>
                <span>{task.appliance.maker}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-mono">
                <span className="text-muted-foreground">Serial:</span>
                <span>{task.appliance.serialNumber}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Age:</span>
                <span>{task.appliance.age} years</span>
              </div>
            </div>
          </Card>
        </div>

        {task.status !== "completed" && (
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => setLocation(`/tasks/${task.taskId}/report`)}
            data-testid="button-make-report"
          >
            Make Report
          </Button>
        )}
      </main>
    </div>
  );
}
