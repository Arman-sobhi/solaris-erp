import { Card } from './components/ui/card';
import { Users, ShoppingCart, TrendingUp, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 58000 },
  { month: 'Jun', revenue: 67000 },
];

const orderData = [
  { month: 'Jan', orders: 124 },
  { month: 'Feb', orders: 142 },
  { month: 'Mar', orders: 135 },
  { month: 'Apr', orders: 168 },
  { month: 'May', orders: 155 },
  { month: 'Jun', orders: 182 },
];

const partnerTypeData = [
  { name: 'Distributors', value: 35, color: '#10b981' },
  { name: 'Retailers', value: 45, color: '#3b82f6' },
  { name: 'Wholesalers', value: 25, color: '#f59e0b' },
  { name: 'Restaurants', value: 15, color: '#8b5cf6' },
];

const recentActivities = [
  { partner: 'Green Valley Distributors', action: 'Placed order #ORD-2845', time: '2 hours ago', type: 'order' },
  { partner: 'Fresh Market Co.', action: 'Updated delivery address', time: '4 hours ago', type: 'update' },
  { partner: 'Organic Foods Ltd.', action: 'New partner registered', time: '1 day ago', type: 'new' },
  { partner: 'City Retailers Group', action: 'Payment received $12,450', time: '1 day ago', type: 'payment' },
  { partner: 'Harvest Wholesalers', action: 'Requested price quote', time: '2 days ago', type: 'quote' },
];

export function Dashboard() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening with your partners.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Partners</p>
              <div className="mt-2">120</div>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                <ArrowUp className="h-4 w-4" />
                <span>12% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Orders</p>
              <div className="mt-2">182</div>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                <ArrowUp className="h-4 w-4" />
                <span>8% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Monthly Revenue</p>
              <div className="mt-2">$67,000</div>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                <ArrowUp className="h-4 w-4" />
                <span>15% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm">Growth Rate</p>
              <div className="mt-2">23.5%</div>
              <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                <ArrowDown className="h-4 w-4" />
                <span>3% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">Order Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Partner Distribution & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="mb-4">Partner Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={partnerTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {partnerTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {partnerTypeData.map((item, index) => (
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

        <Card className="p-6 lg:col-span-2">
          <h3 className="mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'order' ? 'bg-blue-50' :
                  activity.type === 'payment' ? 'bg-green-50' :
                  activity.type === 'new' ? 'bg-purple-50' : 'bg-gray-50'
                }`}>
                  {activity.type === 'order' && <ShoppingCart className="h-5 w-5 text-blue-600" />}
                  {activity.type === 'payment' && <DollarSign className="h-5 w-5 text-green-600" />}
                  {activity.type === 'new' && <Users className="h-5 w-5 text-purple-600" />}
                  {activity.type !== 'order' && activity.type !== 'payment' && activity.type !== 'new' && <TrendingUp className="h-5 w-5 text-gray-600" />}
                </div>
                <div className="flex-1">
                  <div>{activity.partner}</div>
                  <p className="text-sm text-gray-500">{activity.action}</p>
                </div>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
