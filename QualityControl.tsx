import { Card } from './components/ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle, XCircle, AlertCircle, ClipboardCheck, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Inspection {
  id: string;
  batch: string;
  product: string;
  date: string;
  inspector: string;
  result: 'passed' | 'failed' | 'pending';
  score: number;
  issues: number;
}

const mockInspections: Inspection[] = [
  {
    id: '1',
    batch: 'BATCH-2024-1001',
    product: 'Organic Tomato Sauce',
    date: '2025-11-02',
    inspector: 'Jane Smith',
    result: 'passed',
    score: 98,
    issues: 0,
  },
  {
    id: '2',
    batch: 'BATCH-2024-1002',
    product: 'Whole Wheat Bread',
    date: '2025-11-02',
    inspector: 'Mike Johnson',
    result: 'passed',
    score: 95,
    issues: 1,
  },
  {
    id: '3',
    batch: 'BATCH-2024-1003',
    product: 'Mixed Vegetable Pack',
    date: '2025-11-01',
    inspector: 'Sarah Wilson',
    result: 'pending',
    score: 0,
    issues: 0,
  },
  {
    id: '4',
    batch: 'BATCH-2024-1004',
    product: 'Premium Olive Oil',
    date: '2025-11-01',
    inspector: 'Jane Smith',
    result: 'failed',
    score: 72,
    issues: 5,
  },
];

const qualityMetrics = [
  { name: 'Passed', value: 156, color: '#10b981' },
  { name: 'Failed', value: 8, color: '#ef4444' },
  { name: 'Pending', value: 12, color: '#f59e0b' },
];

const defectTypes = [
  { type: 'Packaging', count: 15 },
  { type: 'Weight Variance', count: 8 },
  { type: 'Contamination', count: 3 },
  { type: 'Color/Texture', count: 12 },
  { type: 'Labeling', count: 6 },
];

export function QualityControl() {
  const getResultColor = (result: string) => {
    switch (result) {
      case 'passed': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'failed': return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'pending': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Quality Control</h1>
          <p className="text-gray-500">Monitor and manage quality inspections</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <ClipboardCheck className="h-4 w-4 mr-2" />
          New Inspection
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Pass Rate</p>
              <div className="mt-2">95.2%</div>
              <p className="text-sm text-green-600 mt-1">+1.2% vs last month</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Failed Batches</p>
              <div className="mt-2 text-red-600">8</div>
              <p className="text-sm text-gray-600 mt-1">This month</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Inspections</p>
              <div className="mt-2">12</div>
              <p className="text-sm text-gray-600 mt-1">Awaiting review</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Quality Score</p>
              <div className="mt-2">94.7</div>
              <p className="text-sm text-green-600 mt-1">Excellent</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-6">Inspection Results</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={qualityMetrics}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {qualityMetrics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {qualityMetrics.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="text-gray-500">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-6">Defect Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={defectTypes} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis dataKey="type" type="category" stroke="#9ca3af" width={120} />
              <Tooltip />
              <Bar dataKey="count" fill="#ef4444" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Inspections */}
      <Card className="p-6">
        <h3 className="mb-6">Recent Inspections</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600">Batch ID</th>
                <th className="text-left py-3 px-4 text-gray-600">Product</th>
                <th className="text-left py-3 px-4 text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-gray-600">Inspector</th>
                <th className="text-left py-3 px-4 text-gray-600">Quality Score</th>
                <th className="text-left py-3 px-4 text-gray-600">Issues Found</th>
                <th className="text-left py-3 px-4 text-gray-600">Result</th>
                <th className="text-left py-3 px-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockInspections.map((inspection) => (
                <tr key={inspection.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">{inspection.batch}</td>
                  <td className="py-4 px-4">{inspection.product}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {new Date(inspection.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">{inspection.inspector}</td>
                  <td className="py-4 px-4">
                    {inspection.score > 0 ? (
                      <span className={inspection.score >= 90 ? 'text-green-600' : inspection.score >= 70 ? 'text-yellow-600' : 'text-red-600'}>
                        {inspection.score}/100
                      </span>
                    ) : '-'}
                  </td>
                  <td className="py-4 px-4">
                    {inspection.issues > 0 ? (
                      <span className="text-red-600">{inspection.issues}</span>
                    ) : (
                      <span className="text-green-600">0</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={getResultColor(inspection.result)}>
                      {inspection.result}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="ghost" size="sm">View Report</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
