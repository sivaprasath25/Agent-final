
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Users, List, Check } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState(0);
  const [lists, setLists] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setAgents(5);
      setLists(3);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const stats = [
    {
      title: "Total Agents",
      value: agents,
      description: "Active agents in the system",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      title: "Lists Uploaded",
      value: lists,
      description: "CSV files uploaded and distributed",
      icon: <List className="h-6 w-6 text-emerald-500" />,
      color: "bg-emerald-50",
    },
    {
      title: "Completed Tasks",
      value: 42,
      description: "Tasks completed by agents",
      icon: <Check className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-50",
    },
  ];

  const recentActivities = [
    { message: "Agent John Smith completed 5 tasks", time: "2 hours ago" },
    { message: "List 'May Leads' uploaded and distributed", time: "Yesterday" },
    { message: "New agent Sarah Jones added", time: "2 days ago" },
    { message: "Agent Mike Johnson completed 8 tasks", time: "3 days ago" },
  ];

  if (loading) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-center h-full">
              <p>Loading dashboard data...</p>
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
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <SidebarTrigger />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.color}`}>{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
