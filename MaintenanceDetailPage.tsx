import { ArrowLeft } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { useMaintenance } from './useMockData';
import { StatusBadge } from './widgets/StatusBadge';

interface MaintenanceDetailPageProps {
  recordId: string;
  onBack: () => void;
}

export function MaintenanceDetailPage({ recordId, onBack }: MaintenanceDetailPageProps) {
  const { records } = useMaintenance();
  const record = records.find(r => r.id === recordId);

  if (!record) {
    return (
      <div className="p-8">
        <p>Maintenance record not found</p>
        <Button onClick={onBack} variant="outline" className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <div>
            <h1>{record.recordNumber}</h1>
            <p className="text-gray-500">{record.machineName} • {record.technician}</p>
          </div>
        </div>
        <StatusBadge status={record.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Type</div>
          <div className="mt-1">{record.type}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Priority</div>
          <div className="mt-1">{record.priority}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Scheduled</div>
          <div className="mt-1">{record.scheduledDate}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Downtime</div>
          <div className="mt-1">{record.downtime}h</div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="parts">Parts Used</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6">
            <h3 className="mb-3">Description</h3>
            <p className="text-sm text-gray-700">{record.description}</p>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="p-6">
            <h3 className="mb-3">Work Performed</h3>
            <p className="text-sm text-gray-700">{record.workPerformed ?? 'No details provided'}</p>
          </Card>
        </TabsContent>

        <TabsContent value="parts">
          <Card className="p-6">
            <h3 className="mb-3">Parts Replaced</h3>
            {record.partsReplaced.length === 0 ? (
              <p className="text-sm text-gray-500">No parts recorded</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Part</TableHead>
                    <TableHead>Part #</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {record.partsReplaced.map((p) => (
                    <TableRow key={p.partNumber}>
                      <TableCell>{p.partName}</TableCell>
                      <TableCell className="font-mono text-sm">{p.partNumber}</TableCell>
                      <TableCell>{p.quantity}</TableCell>
                      <TableCell className="text-right">${p.cost.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
