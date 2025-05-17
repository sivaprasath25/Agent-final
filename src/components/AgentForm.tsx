
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface AgentFormProps {
  onAgentAdded: (agent: Agent) => void;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

const AgentForm: React.FC<AgentFormProps> = ({ onAgentAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (!name || !email || !phone || !password) {
      toast.error("All fields are required");
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Phone validation - simple check for now
    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const newAgent: Agent = {
        id: `agent-${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        phone,
        createdAt: new Date().toISOString(),
      };

      onAgentAdded(newAgent);
      toast.success("Agent added successfully");
      
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Agent</CardTitle>
        <CardDescription>Create a new agent account with login credentials</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agent@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-brand-600 hover:bg-brand-700" 
            disabled={isLoading}
          >
            {isLoading ? "Adding Agent..." : "Add Agent"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AgentForm;
