import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DollarSign, TrendingUp, Package, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { Progress } from './ui/progress';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const resourceAllocation = [
  { resource: 'Raw Materials', allocated: 85, available: 15, budget: 125000, spent: 106250 },
  { resource: 'Labor', allocated: 92, available: 8, budget: 180000, spent: 165600 },
  { resource: 'Equipment', allocated: 78, available: 22, budget: 95000, spent: 74100 },
  { resource: 'Energy', allocated: 88, available: 12, budget: 45000, spent: 39600 },
];

const financialData = [
  { month: 'Jan', revenue: 450000, costs: 320000, profit: 130000 },
  { month: 'Feb', revenue: 520000, costs: 365000, profit: 155000 },
  { month: 'Mar', revenue: 480000, costs: 340000, profit: 140000 },
  { month: 'Apr', revenue: 610000, costs: 425000, profit: 185000 },
  { month: 'May', revenue: 580000, costs: 405000, profit: 175000 },
  { month: 'Jun', revenue: 670000, costs: 465000, profit: 205000 },
];

const planningData = [
  { week: 'Week 1', planned: 12500, actual: 12200 },
  { week: 'Week 2', planned: 13000, actual: 13400 },
  { week: 'Week 3', planned: 12800, actual: 12600 },
  { week: 'Week 4', planned: 14000, actual: 13800 },
];

const projects = [
  { id: '1', name: 'New Production Line Setup', status: 'in-progress', progress: 65, budget: 250000, spent: 162500, deadline: '2025-12-15' },
  { id: '2', name: 'Quality System Upgrade', status: 'in-progress', progress: 42, budget: 85000, spent: 35700, deadline: '2025-11-30' },
  { id: '3', name: 'Warehouse Expansion', status: 'planning', progress: 15, budget: 420000, spent: 63000, deadline: '2026-03-01' },
  { id: '4', name: 'ERP Integration Phase 2', status: 'completed', progress: 100, budget: 120000, spent: 118500, deadline: '2025-10-31' },
];

export function ERP() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Enterprise Resource Planning</h1>
          <p className="text-gray-500">Manage resources, finances, and business planning</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          Generate Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue (YTD)</p>
              <div className="mt-2">$3.31M</div>
              <p className="text-sm text-green-600 mt-1">+18.5% vs last year</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Operating Margin</p>
              <div className="mt-2">30.6%</div>
              <p className="text-sm text-green-600 mt-1">+2.3% improvement</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Resource Utilization</p>
              <div className="mt-2">85.8%</div>
              <p className="text-sm text-green-600 mt-1">Optimal range</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Projects</p>
              <div className="mt-2">4</div>
              <p className="text-sm text-orange-600 mt-1">2 need attention</p>
            </div>
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Financial Overview */}
      <Card className="p-6">
        <h3 className="mb-6">Financial Performance (6 Months)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
            <Line type="monotone" dataKey="costs" stroke="#ef4444" strokeWidth={2} name="Costs" />
            <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} name="Profit" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Resource Allocation & Planning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-6">Resource Allocation</h3>
          <div className="space-y-6">
            {resourceAllocation.map((resource, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span>{resource.resource}</span>
                  <span className="text-sm text-gray-500">{resource.allocated}% allocated</span>
                </div>
                <Progress value={resource.allocated} className="h-2 mb-2" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Budget: ${resource.budget.toLocaleString()}</span>
                  <span>Spent: ${resource.spent.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-6">Production Planning vs Actual</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={planningData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="planned" fill="#3b82f6" name="Planned" />
              <Bar dataKey="actual" fill="#10b981" name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Projects */}
      <Card className="p-6">
        <h3 className="mb-6">Active Projects</h3>
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-sm mb-1">{project.name}</h4>
                  <p className="text-sm text-gray-500">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                </div>
                <Badge 
                  className={
                    project.status === 'completed' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                    project.status === 'in-progress' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                    'bg-gray-100 text-gray-700 hover:bg-gray-100'
                  }
                >
                  {project.status === 'in-progress' ? (
                    <AlertCircle className="h-3 w-3 mr-1" />
                  ) : project.status === 'completed' ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : null}
                  {project.status.replace('-', ' ')}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
                <div className="flex justify-between text-sm text-gray-500 pt-2">
                  <span>Budget: ${project.budget.toLocaleString()}</span>
                  <span>Spent: ${project.spent.toLocaleString()} ({Math.round((project.spent / project.budget) * 100)}%)</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
