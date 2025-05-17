
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DistributedList } from "./UploadForm";

interface DistributionTableProps {
  distributedLists: DistributedList[];
}

const DistributionTable: React.FC<DistributionTableProps> = ({ distributedLists }) => {
  if (distributedLists.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Distribution Results</CardTitle>
          <CardDescription>Upload a file to see distribution results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center text-gray-500 border border-dashed rounded-lg">
            <p>No data has been distributed yet</p>
            <p className="text-sm">Use the upload form to distribute contacts to agents</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribution Results</CardTitle>
        <CardDescription>
          Contacts have been distributed among {distributedLists.length} agents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={distributedLists[0].agentId}>
          <TabsList className="mb-4 w-full overflow-x-auto flex flex-wrap">
            {distributedLists.map((list) => (
              <TabsTrigger key={list.agentId} value={list.agentId} className="flex-grow">
                {list.agentName} ({list.items.length})
              </TabsTrigger>
            ))}
          </TabsList>
          {distributedLists.map((list) => (
            <TabsContent key={list.agentId} value={list.agentId}>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {list.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.firstName}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {item.notes}
                        </TableCell>
                      </TableRow>
                    ))}
                    {list.items.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-6">
                          No contacts assigned to this agent
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Total: {list.items.length} contacts
              </p>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DistributionTable;
