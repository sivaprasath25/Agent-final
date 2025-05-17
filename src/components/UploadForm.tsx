
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { Agent } from "./AgentForm";
import { cn } from "@/lib/utils";

interface UploadFormProps {
  agents: Agent[];
  onUploadComplete: (distributedData: DistributedList[]) => void;
}

export interface ListItem {
  firstName: string;
  phone: string;
  notes: string;
}

export interface DistributedList {
  agentId: string;
  agentName: string;
  items: ListItem[];
}

const UploadForm: React.FC<UploadFormProps> = ({ agents, onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      validateFile(selectedFile);
    }
  };

  const validateFile = (selectedFile: File) => {
    // Check file type
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
    
    if (!validTypes.includes(selectedFile.type) && !['csv', 'xlsx', 'xls'].includes(fileExtension || '')) {
      toast.error("Please upload a valid CSV or Excel file");
      return;
    }

    setFile(selectedFile);
    toast.success(`File "${selectedFile.name}" selected`);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    if (agents.length === 0) {
      toast.error("No agents available to distribute lists");
      return;
    }

    setIsUploading(true);

    // Simulate CSV parsing and distribution
    setTimeout(() => {
      // Mock data that would come from parsing the CSV
      const mockData: ListItem[] = Array(25).fill(0).map((_, index) => ({
        firstName: `Contact ${index + 1}`,
        phone: `555-${String(index).padStart(3, '0')}`,
        notes: `Note for contact ${index + 1}`,
      }));

      // Distribute data among agents
      const distributedLists = distributeItems(mockData, agents);
      
      onUploadComplete(distributedLists);
      setIsUploading(false);
      setFile(null);
      toast.success("List uploaded and distributed successfully");
    }, 1500);
  };

  const distributeItems = (items: ListItem[], agentList: Agent[]): DistributedList[] => {
    if (agentList.length === 0) return [];

    // Initialize result with empty arrays for each agent
    const distributedLists: DistributedList[] = agentList.map(agent => ({
      agentId: agent.id,
      agentName: agent.name,
      items: [],
    }));

    // Calculate base number of items per agent and remainder
    const itemsPerAgent = Math.floor(items.length / agentList.length);
    const remainder = items.length % agentList.length;

    // Distribute base items to each agent
    let currentItemIndex = 0;
    for (let i = 0; i < agentList.length; i++) {
      const itemsForThisAgent = itemsPerAgent + (i < remainder ? 1 : 0);
      distributedLists[i].items = items.slice(
        currentItemIndex,
        currentItemIndex + itemsForThisAgent
      );
      currentItemIndex += itemsForThisAgent;
    }

    return distributedLists;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Contact List</CardTitle>
        <CardDescription>
          Upload a CSV file with contacts to distribute among agents
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
              isDragging ? "border-brand-500 bg-brand-50" : "border-gray-300 hover:border-brand-400",
              "focus:outline-none focus:ring-2 focus:ring-brand-500"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <div className="flex flex-col items-center justify-center space-y-3">
              <Upload className="h-10 w-10 text-gray-400" />
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {file ? file.name : "Drag & drop your file here"}
                </p>
                <p className="text-xs text-gray-500">
                  Supports CSV, XLS or XLSX files
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  document.getElementById("file-upload")?.click();
                }}
              >
                Browse Files
              </Button>
            </div>
            <input
              id="file-upload"
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {file && (
            <div className="flex items-center justify-between bg-muted p-3 rounded-md">
              <div className="flex items-center">
                <div className="ml-3 truncate">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
              >
                Remove
              </Button>
            </div>
          )}

          <div>
            <Label className="text-sm text-muted-foreground">
              Agents available for distribution: {agents.length}
            </Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700"
            disabled={!file || isUploading || agents.length === 0}
          >
            {isUploading ? "Uploading & Distributing..." : "Upload & Distribute"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default UploadForm;
