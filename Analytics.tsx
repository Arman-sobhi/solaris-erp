import { Card } from './ui/card';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', revenue: 45000, orders: 124, partners: 98 },
  { month: 'Feb', revenue: 52000, orders: 142, partners: 102 },
  { month: 'Mar', revenue: 48000, orders: 135, partners: 105 },
  { month: 'Apr', revenue: 61000, orders: 168, partners: 110 },
  { month: 'May', revenue: 58000, orders: 155, partners: 115 },
  { month: 'Jun', revenue: 67000, orders: 182, partners: 120 },
];

const categoryPerformance = [
  { category: 'Vegetables', sales: 185000, orders: 456 },
  { category: 'Fruits', sales: 142000, orders: 382 },
  { category: 'Dairy', sales: 98000, orders: 268 },
  { category: 'Bakery', sales: 76000, orders: 195 },
  { category: 'Frozen', sales: 112000, orders: 301 },
];

const topPartners = [
  { name: 'Green Valley', revenue: 125000, growth: 15.3 },
  { name: 'Organic Foods Ltd.', revenue: 156000, growth: 22.1 },
  { name: 'Premium Foods', revenue: 215000, growth: -5.2 },
  { name: 'Fresh Market Co.', revenue: 98500, growth: 8.7 },
  { name: 'Harvest Wholesalers', revenue: 102000, growth: 12.4 },
];

export function Analytics() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1>Analytics & Reports</h1>
        <p className="text-gray-500">Comprehensive insights into your partner relationships</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue (YTD)</p>
              <div className="mt-2">$331,000</div>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>18.5% vs last year</span>
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
              <p className="text-sm text-gray-500">Total Orders (YTD)</p>
              <div className="mt-2">906</div>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>12.3% vs last year</span>
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
              <p className="text-sm text-gray-500">Active Partners</p>
              <div className="mt-2">120</div>
              <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>22.4% vs last year</span>
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
              <p className="text-sm text-gray-500">Avg. Order Value</p>
              <div className="mt-2">$365</div>
              <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                <TrendingDown className="h-4 w-4" />
                <span>3.2% vs last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue & Orders Trend */}
      <Card className="p-6">
        <h3 className="mb-6">Revenue & Orders Trend (6 Months)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#10b981" 
              fill="#10b981" 
              fillOpacity={0.2}
              name="Revenue ($)"
            />
            <Area 
              type="monotone" 
              dataKey="orders" 
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.2}
              name="Orders"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Category Performance & Top Partners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-6">Category Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis dataKey="category" type="category" stroke="#9ca3af" width={100} />
              <Tooltip />
              <Bar dataKey="sales" fill="#10b981" radius={[0, 8, 8, 0]} name="Sales ($)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="mb-6">Top Partners by Revenue</h3>
          <div className="space-y-4">
            {topPartners.map((partner, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-sm">{partner.name}</div>
                    <p className="text-xs text-gray-500">${partner.revenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-sm ${partner.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {partner.growth >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>{Math.abs(partner.growth)}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Partner Growth Trend */}
      <Card className="p-6">
        <h3 className="mb-6">Partner Growth Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="partners" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              name="Active Partners"
              dot={{ fill: '#8b5cf6', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
