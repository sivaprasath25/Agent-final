
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Agent } from "./AgentForm";
import { Users } from "lucide-react";

interface AgentCardProps {
  agent: Agent;
  onDelete: (id: string) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onDelete }) => {
  const { id, name, email, phone, createdAt } = agent;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center">
            <Users className="h-4 w-4 text-brand-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium">{email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Phone:</span>
            <span className="font-medium">{phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Created:</span>
            <span className="font-medium">{formattedDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="destructive" 
          size="sm" 
          className="w-full"
          onClick={() => onDelete(id)}
        >
          Remove Agent
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
