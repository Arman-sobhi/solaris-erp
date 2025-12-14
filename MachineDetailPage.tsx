import { ArrowLeft, Edit, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Progress } from './components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';
import { StatusBadge } from './widgets/StatusBadge';
import { mockMachines, MachineDetail } from './mockMachines';
import { Badge } from './components/ui/badge';

interface MachineDetailPageProps {
  machineId: string;
  onBack: () => void;
}

export function MachineDetailPage({ machineId, onBack }: MachineDetailPageProps) {
  const machine = mockMachines.find(m => m.id === machineId);
  
  if (!machine) {
    return (
      <div className="p-8">
        <p>Machine not found</p>
        <Button onClick={onBack} variant="outline" className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Machines
        </Button>
      </div>
    );
  }

  const getHealthColor = (value: number) => {
    if (value >= 90) return 'text-green-600';
    if (value >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBgColor = (value: number) => {
    if (value >= 90) return 'bg-green-100';
    if (value >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1>{machine.name}</h1>
            <p className="text-gray-500">Code: {machine.code} | Model: {machine.model}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button size="sm">
            Schedule Maintenance
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Status</p>
            <StatusBadge status={machine.status} />
          </div>
          <p className="text-sm text-gray-500">{machine.location}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Health Score</p>
          <div className="flex items-center gap-3">
            <div className={`p-2 ${getHealthBgColor(machine.health.overall)} rounded-lg`}>
              {machine.health.overall >= 70 ? (
                <CheckCircle className={`w-5 h-5 ${getHealthColor(machine.health.overall)}`} />
              ) : (
                <AlertCircle className={`w-5 h-5 ${getHealthColor(machine.health.overall)}`} />
              )}
            </div>
            <span className={`text-2xl ${getHealthColor(machine.health.overall)}`}>
              {machine.health.overall}%
            </span>
          </div>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Uptime</p>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-2xl">{machine.uptime}%</span>
          </div>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Efficiency</p>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-2xl">{machine.efficiency}%</span>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="health">Health Metrics</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance History</TabsTrigger>
          <TabsTrigger value="parts">Parts & Components</TabsTrigger>
          <TabsTrigger value="products">Linked Products</TabsTrigger>
          <TabsTrigger value="operators">Operators</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="mb-4">Machine Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Manufacturer</p>
                  <p>{machine.manufacturer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Serial Number</p>
                  <p className="font-mono text-sm">{machine.serialNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Install Date</p>
                  <p>{machine.installDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p>{machine.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Capacity</p>
                  <p>{machine.capacity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Power Rating</p>
                  <p>{machine.powerRating}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Maintenance Schedule</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Maintenance</p>
                  <p>{machine.lastMaintenance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Next Maintenance</p>
                  <p>{machine.nextMaintenance}</p>
                  <Badge variant="outline" className="mt-2">Scheduled</Badge>
                </div>
                {machine.currentJob && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Current Job</p>
                    <p className="text-sm">{machine.currentJob}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="mb-4">Performance Trend (Last 5 Days)</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Uptime %</TableHead>
                  <TableHead>Efficiency %</TableHead>
                  <TableHead>Output</TableHead>
                  <TableHead>Defects</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {machine.performance.map((perf) => (
                  <TableRow key={perf.date}>
                    <TableCell>{perf.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={perf.uptime} className="w-20" />
                        <span className="text-sm">{perf.uptime}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={perf.efficiency} className="w-20" />
                        <span className="text-sm">{perf.efficiency}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{perf.output}</TableCell>
                    <TableCell>
                      {perf.defects > 15 ? (
                        <span className="text-red-600">{perf.defects}</span>
                      ) : (
                        <span>{perf.defects}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Health Metrics Tab */}
        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <p className="text-sm text-gray-600 mb-3">Overall Health</p>
              <div className="flex items-center gap-4">
                <Progress value={machine.health.overall} className="flex-1" />
                <span className={`text-xl ${getHealthColor(machine.health.overall)}`}>
                  {machine.health.overall}%
                </span>
              </div>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-600 mb-3">Temperature</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{machine.health.temperature}°C</span>
                <Badge variant="outline">Normal</Badge>
              </div>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-600 mb-3">Vibration</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{machine.health.vibration} mm/s</span>
                <Badge variant="outline">Normal</Badge>
              </div>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-600 mb-3">Pressure</p>
              <div className="flex items-center gap-4">
                <Progress value={machine.health.pressure} className="flex-1" />
                <span className="text-xl">{machine.health.pressure}%</span>
              </div>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-gray-600 mb-3">Runtime (hours)</p>
              <span className="text-2xl">{machine.health.runtime}</span>
            </Card>
          </div>
        </TabsContent>

        {/* Maintenance History Tab */}
        <TabsContent value="maintenance" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Maintenance Records</h3>
            <div className="space-y-4">
              {machine.maintenanceHistory.map((record) => (
                <div
                  key={record.id}
                  className="p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4>{record.description}</h4>
                        <StatusBadge status={record.status} />
                      </div>
                      <p className="text-sm text-gray-600">
                        {record.date} • {record.technician}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        record.type === 'breakdown'
                          ? 'bg-red-50 text-red-700'
                          : record.type === 'corrective'
                          ? 'bg-yellow-50 text-yellow-700'
                          : 'bg-green-50 text-green-700'
                      }
                    >
                      {record.type}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Cost: </span>
                      <span>${record.cost.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Downtime: </span>
                      <span>{record.downtime} hours</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Parts Tab */}
        <TabsContent value="parts" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Parts & Components</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Part Name</TableHead>
                  <TableHead>Part Number</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Last Replaced</TableHead>
                  <TableHead>Supplier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {machine.parts.map((part) => (
                  <TableRow key={part.id}>
                    <TableCell>{part.name}</TableCell>
                    <TableCell className="font-mono text-sm">{part.partNumber}</TableCell>
                    <TableCell>{part.quantity}</TableCell>
                    <TableCell>
                      <StatusBadge status={part.condition} />
                    </TableCell>
                    <TableCell>{part.lastReplaced}</TableCell>
                    <TableCell>{part.supplier}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Linked Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Linked Products</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Role in Production</TableHead>
                  <TableHead>Avg Runtime (min)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {machine.linkedProducts.map((product) => (
                  <TableRow key={product.productId}>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.role}</Badge>
                    </TableCell>
                    <TableCell>{product.averageRuntime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Operators Tab */}
        <TabsContent value="operators" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Certified Operators</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Operator</TableHead>
                  <TableHead>Certification</TableHead>
                  <TableHead>Last Trained</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {machine.operators.map((operator) => (
                  <TableRow key={operator.id}>
                    <TableCell>{operator.name}</TableCell>
                    <TableCell>
                      <Badge>{operator.certification}</Badge>
                    </TableCell>
                    <TableCell>{operator.lastTrained}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
