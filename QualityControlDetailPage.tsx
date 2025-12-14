import { ArrowLeft } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { useQualityControl } from './useMockData';
import { StatusBadge } from './widgets/StatusBadge';

interface QualityControlDetailPageProps {
  recordId: string;
  onBack: () => void;
}

export function QualityControlDetailPage({ recordId, onBack }: QualityControlDetailPageProps) {
  const { records } = useQualityControl();
  const record = records.find(r => r.id === recordId);

  if (!record) {
    return (
      <div className="p-8">
        <p>Inspection not found</p>
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
            <h1>{record.inspectionId} • {record.productName}</h1>
            <p className="text-gray-500">Batch: {record.batchNumber} • Inspector: {record.inspector}</p>
          </div>
        </div>
        <StatusBadge status={record.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Sample Size</div>
          <div className="mt-1">{record.sampleSize}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Defects Found</div>
          <div className="mt-1">{record.defectsFound}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Defect Rate</div>
          <div className="mt-1">{record.defectRate}%</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Inspection Date</div>
          <div className="mt-1">{record.inspectionDate}</div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="nonconformance">Non-Conformance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6">
            <h3 className="mb-2">Summary</h3>
            <p className="text-sm text-gray-700">{record.notes}</p>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card className="p-6">
            <h3 className="mb-3">Inspection Criteria</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Criteria</TableHead>
                  <TableHead>Standard</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {record.criteria.map((c, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.standard}</TableCell>
                    <TableCell>{c.result}</TableCell>
                    <TableCell>{c.passed ? 'Pass' : 'Fail'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="nonconformance">
          <Card className="p-6">
            <h3 className="mb-3">Defect Details</h3>
            {record.defects.length === 0 ? (
              <p className="text-sm text-gray-500">No defects recorded</p>
            ) : (
              <div className="space-y-3">
                {record.defects.map((d, idx) => (
                  <div key={idx} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{d.type}</div>
                        <div className="text-xs text-gray-500">Severity: {d.severity}</div>
                      </div>
                      <div className="text-sm text-gray-600">Count: {d.count}</div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{d.description}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
