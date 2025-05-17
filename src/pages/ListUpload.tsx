
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar";
import UploadForm, { DistributedList } from "@/components/UploadForm";
import DistributionTable from "@/components/DistributionTable";
import { Agent } from "@/components/AgentForm";

const ListUpload = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [distributedLists, setDistributedLists] = useState<DistributedList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    // Load sample agent data
    setTimeout(() => {
      const sampleAgents: Agent[] = [
        {
          id: "agent-1",
          name: "John Smith",
          email: "john.smith@example.com",
          phone: "+1 (555) 123-4567",
          createdAt: "2023-01-15T10:30:00Z",
        },
        {
          id: "agent-2",
          name: "Sarah Johnson",
          email: "sarah.j@example.com",
          phone: "+1 (555) 987-6543",
          createdAt: "2023-02-20T14:45:00Z",
        },
        {
          id: "agent-3",
          name: "Michael Brown",
          email: "m.brown@example.com",
          phone: "+1 (555) 234-5678",
          createdAt: "2023-03-10T09:15:00Z",
        },
        {
          id: "agent-4",
          name: "Emma Wilson",
          email: "e.wilson@example.com",
          phone: "+1 (555) 345-6789",
          createdAt: "2023-04-05T11:20:00Z",
        },
        {
          id: "agent-5",
          name: "David Lee",
          email: "d.lee@example.com",
          phone: "+1 (555) 456-7890",
          createdAt: "2023-04-25T13:10:00Z",
        },
      ];
      setAgents(sampleAgents);
      setLoading(false);
    }, 1000);
  }, [navigate]);

  const handleUploadComplete = (results: DistributedList[]) => {
    setDistributedLists(results);
  };

  if (loading) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-center h-full">
              <p>Loading data...</p>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Upload & Distribute Lists</h1>
            <SidebarTrigger />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <UploadForm 
                agents={agents} 
                onUploadComplete={handleUploadComplete} 
              />
            </div>
            <div>
              <DistributionTable distributedLists={distributedLists} />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ListUpload;
