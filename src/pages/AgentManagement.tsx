
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar";
import AgentForm, { Agent } from "@/components/AgentForm";
import AgentCard from "@/components/AgentCard";
import { toast } from "sonner";

const AgentManagement = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<Agent[]>([]);
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
      ];
      setAgents(sampleAgents);
      setLoading(false);
    }, 1000);
  }, [navigate]);

  const handleAgentAdded = (agent: Agent) => {
    setAgents((prevAgents) => [...prevAgents, agent]);
  };

  const handleDeleteAgent = (id: string) => {
    setAgents((prevAgents) => prevAgents.filter((agent) => agent.id !== id));
    toast.success("Agent removed successfully");
  };

  if (loading) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-center h-full">
              <p>Loading agents data...</p>
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
            <h1 className="text-3xl font-bold">Agent Management</h1>
            <SidebarTrigger />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <AgentForm onAgentAdded={handleAgentAdded} />
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Current Agents ({agents.length})</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {agents.map((agent) => (
                  <AgentCard 
                    key={agent.id} 
                    agent={agent} 
                    onDelete={handleDeleteAgent} 
                  />
                ))}
                {agents.length === 0 && (
                  <div className="sm:col-span-2 lg:col-span-2 xl:col-span-3 p-8 text-center text-gray-500 border border-dashed rounded-lg">
                    <p>No agents added yet.</p>
                    <p className="text-sm">Add your first agent using the form.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AgentManagement;
