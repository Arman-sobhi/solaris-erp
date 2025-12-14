import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Play, Pause, CheckCircle, AlertCircle, Factory, TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProductionOrder {
  id: string;
  orderNumber: string;
  product: string;
  quantity: number;
  unit: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  startDate: string;
  endDate: string;
  line: string;
  priority: 'low' | 'medium' | 'high';
}

const mockOrders: ProductionOrder[] = [
  {
    id: '1',
    orderNumber: 'PRD-1001',
    product: 'Organic Tomato Sauce',
    quantity: 5000,
    unit: 'units',
    status: 'in-progress',
    progress: 65,
    startDate: '2025-11-01',
    endDate: '2025-11-03',
    line: 'Production Line A',
    priority: 'high',
  },
  {
    id: '2',
    orderNumber: 'PRD-1002',
    product: 'Whole Wheat Bread',
    quantity: 3000,
    unit: 'loaves',
    status: 'in-progress',
    progress: 30,
    startDate: '2025-11-02',
    endDate: '2025-11-04',
    line: 'Production Line B',
    priority: 'medium',
  },
  {
    id: '3',
    orderNumber: 'PRD-1003',
    product: 'Mixed Vegetable Pack',
    quantity: 2500,
    unit: 'packs',
    status: 'scheduled',
    progress: 0,
    startDate: '2025-11-03',
    endDate: '2025-11-05',
    line: 'Production Line C',
    priority: 'medium',
  },
  {
    id: '4',
    orderNumber: 'PRD-1004',
    product: 'Premium Olive Oil',
    quantity: 1200,
    unit: 'bottles',
    status: 'completed',
    progress: 100,
    startDate: '2025-10-30',
    endDate: '2025-11-01',
    line: 'Production Line A',
    priority: 'high',
  },
];

const productionData = [
  { date: 'Mon', output: 4200, target: 5000, efficiency: 84 },
  { date: 'Tue', output: 4800, target: 5000, efficiency: 96 },
  { date: 'Wed', output: 5100, target: 5000, efficiency: 102 },
  { date: 'Thu', output: 4600, target: 5000, efficiency: 92 },
  { date: 'Fri', output: 5300, target: 5000, efficiency: 106 },
  { date: 'Sat', output: 3200, target: 4000, efficiency: 80 },
  { date: 'Sun', output: 2800, target: 3000, efficiency: 93 },
];

export function Production() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'completed': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'on-hold': return 'bg-red-100 text-red-700 hover:bg-red-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'medium': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'low': return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Production Management</h1>
          <p className="text-gray-500">Monitor and manage production operations</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Play className="h-4 w-4 mr-2" />
          New Production Order
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Today's Output</p>
              <div className="mt-2">4,850 units</div>
              <p className="text-sm text-green-600 mt-1">97% of target</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Factory className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Orders</p>
              <div className="mt-2">12</div>
              <p className="text-sm text-gray-600 mt-1">In production</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Play className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Efficiency Rate</p>
              <div className="mt-2">94.5%</div>
              <p className="text-sm text-green-600 mt-1">+2.3% vs last week</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Downtime</p>
              <div className="mt-2">2.3 hrs</div>
              <p className="text-sm text-red-600 mt-1">Today</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <Pause className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="orders">Production Orders</TabsTrigger>
          <TabsTrigger value="lines">Production Lines</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Order #</th>
                    <th className="text-left py-3 px-4 text-gray-600">Product</th>
                    <th className="text-left py-3 px-4 text-gray-600">Quantity</th>
                    <th className="text-left py-3 px-4 text-gray-600">Production Line</th>
                    <th className="text-left py-3 px-4 text-gray-600">Progress</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600">Priority</th>
                    <th className="text-left py-3 px-4 text-gray-600">End Date</th>
                    <th className="text-left py-3 px-4 text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">{order.orderNumber}</td>
                      <td className="py-4 px-4">{order.product}</td>
                      <td className="py-4 px-4">
                        {order.quantity} {order.unit}
                      </td>
                      <td className="py-4 px-4">{order.line}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500"
                              style={{ width: `${order.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{order.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getPriorityColor(order.priority)}>
                          {order.priority}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(order.endDate).toLocaleDateString()}
                      </td>
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

        <TabsContent value="lines" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Production Line A', 'Production Line B', 'Production Line C'].map((line, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-sm mb-1">{line}</h3>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Operational
                    </Badge>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Factory className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Current Output</span>
                    <span>145 units/hr</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Efficiency</span>
                    <span className="text-green-600">96%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Active Orders</span>
                    <span>2</span>
                  </div>
                  <Button variant="outline" className="w-full mt-2">View Details</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="p-6">
            <h3 className="mb-6">Weekly Production Output</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="output" fill="#10b981" name="Actual Output" radius={[8, 8, 0, 0]} />
                <Bar dataKey="target" fill="#e5e7eb" name="Target" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="mb-6">Efficiency Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Efficiency %"
                  dot={{ fill: '#3b82f6', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
