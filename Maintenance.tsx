import { Card } from './components/ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Settings, Wrench, AlertTriangle, CheckCircle, Calendar, TrendingUp } from 'lucide-react';

interface MaintenanceTask {
  id: string;
  taskNumber: string;
  equipment: string;
  type: 'preventive' | 'corrective' | 'predictive' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue';
  scheduledDate: string;
  completedDate?: string;
  technician: string;
  cost: number;
}

const mockTasks: MaintenanceTask[] = [
  {
    id: '1',
    taskNumber: 'MNT-2024-1001',
    equipment: 'Production Line A - Conveyor Belt',
    type: 'preventive',
    priority: 'medium',
    status: 'scheduled',
    scheduledDate: '2025-11-03',
    technician: 'John Martinez',
    cost: 850,
  },
  {
    id: '2',
    taskNumber: 'MNT-2024-1002',
    equipment: 'Cooling System - Unit 3',
    type: 'emergency',
    priority: 'critical',
    status: 'in-progress',
    scheduledDate: '2025-11-02',
    technician: 'Sarah Chen',
    cost: 2500,
  },
  {
    id: '3',
    taskNumber: 'MNT-2024-1003',
    equipment: 'Packaging Machine B',
    type: 'corrective',
    priority: 'high',
    status: 'completed',
    scheduledDate: '2025-10-30',
    completedDate: '2025-10-31',
    technician: 'Mike Davis',
    cost: 1200,
  },
  {
    id: '4',
    taskNumber: 'MNT-2024-1004',
    equipment: 'Quality Control Scanner',
    type: 'preventive',
    priority: 'low',
    status: 'overdue',
    scheduledDate: '2025-10-28',
    technician: 'Emily Wilson',
    cost: 450,
  },
];

const equipment = [
  { name: 'Production Line A', status: 'operational', uptime: 98.5, lastMaintenance: '2025-10-15' },
  { name: 'Production Line B', status: 'operational', uptime: 96.2, lastMaintenance: '2025-10-20' },
  { name: 'Cooling System', status: 'maintenance', uptime: 85.0, lastMaintenance: '2025-11-02' },
  { name: 'Packaging Machine A', status: 'operational', uptime: 99.1, lastMaintenance: '2025-10-25' },
  { name: 'Packaging Machine B', status: 'operational', uptime: 94.8, lastMaintenance: '2025-10-31' },
  { name: 'Quality Control Scanner', status: 'warning', uptime: 88.5, lastMaintenance: '2025-09-15' },
];

export function Maintenance() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'preventive': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'corrective': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'predictive': return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      case 'emergency': return 'bg-red-100 text-red-700 hover:bg-red-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'high': return 'bg-orange-100 text-orange-700 hover:bg-orange-100';
      case 'medium': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'low': return 'bg-green-100 text-green-700 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'completed': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'overdue': return 'bg-red-100 text-red-700 hover:bg-red-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getEquipmentStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'warning': return 'bg-orange-100 text-orange-700 hover:bg-orange-100';
      case 'down': return 'bg-red-100 text-red-700 hover:bg-red-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Maintenance Management</h1>
          <p className="text-gray-500">Track equipment maintenance and repairs</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Maintenance
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Equipment</p>
              <div className="mt-2">48</div>
              <p className="text-sm text-green-600 mt-1">45 operational</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Settings className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Uptime</p>
              <div className="mt-2">96.3%</div>
              <p className="text-sm text-green-600 mt-1">+1.2% improvement</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Tasks</p>
              <div className="mt-2">15</div>
              <p className="text-sm text-red-600 mt-1">3 overdue</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Wrench className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Maintenance Cost</p>
              <div className="mt-2">$12.5K</div>
              <p className="text-sm text-gray-600 mt-1">This month</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="tasks" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tasks">Maintenance Tasks</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Task #</th>
                    <th className="text-left py-3 px-4 text-gray-600">Equipment</th>
                    <th className="text-left py-3 px-4 text-gray-600">Type</th>
                    <th className="text-left py-3 px-4 text-gray-600">Priority</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600">Technician</th>
                    <th className="text-left py-3 px-4 text-gray-600">Scheduled</th>
                    <th className="text-left py-3 px-4 text-gray-600">Cost</th>
                    <th className="text-left py-3 px-4 text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTasks.map((task) => (
                    <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">{task.taskNumber}</td>
                      <td className="py-4 px-4">{task.equipment}</td>
                      <td className="py-4 px-4">
                        <Badge className={getTypeColor(task.type)}>
                          {task.type}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">{task.technician}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(task.scheduledDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">${task.cost.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {equipment.map((item, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-sm mb-2">{item.name}</h3>
                    <Badge className={getEquipmentStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Settings className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Uptime</span>
                      <span className={item.uptime >= 95 ? 'text-green-600' : item.uptime >= 85 ? 'text-yellow-600' : 'text-red-600'}>
                        {item.uptime}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.uptime >= 95 ? 'bg-green-500' : item.uptime >= 85 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${item.uptime}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                    <span className="text-gray-600">Last Maintenance</span>
                    <span>{new Date(item.lastMaintenance).toLocaleDateString()}</span>
                  </div>
                  <Button variant="outline" className="w-full">Schedule Maintenance</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="p-6">
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Maintenance schedule calendar view</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
