import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DollarSign, TrendingUp, TrendingDown, CreditCard, FileText, AlertCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
}

const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-1001',
    customer: 'Green Valley Distributors',
    amount: 12450,
    date: '2025-10-15',
    dueDate: '2025-11-15',
    status: 'paid',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-1002',
    customer: 'Fresh Market Co.',
    amount: 8900,
    date: '2025-10-20',
    dueDate: '2025-11-20',
    status: 'pending',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-1003',
    customer: 'Organic Foods Ltd.',
    amount: 18600,
    date: '2025-09-25',
    dueDate: '2025-10-25',
    status: 'overdue',
  },
];

const revenueData = [
  { month: 'Jan', revenue: 145000, expenses: 98000, profit: 47000 },
  { month: 'Feb', revenue: 162000, expenses: 105000, profit: 57000 },
  { month: 'Mar', revenue: 158000, expenses: 102000, profit: 56000 },
  { month: 'Apr', revenue: 181000, expenses: 115000, profit: 66000 },
  { month: 'May', revenue: 175000, expenses: 110000, profit: 65000 },
  { month: 'Jun', revenue: 198000, expenses: 125000, profit: 73000 },
];

const expenseCategories = [
  { category: 'Raw Materials', amount: 85000 },
  { category: 'Labor', amount: 65000 },
  { category: 'Utilities', amount: 22000 },
  { category: 'Transportation', amount: 18000 },
  { category: 'Marketing', amount: 15000 },
  { category: 'Other', amount: 12000 },
];

export function Finance() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'pending': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'overdue': return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'cancelled': return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Finance & Accounting</h1>
          <p className="text-gray-500">Manage finances and accounting</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue (YTD)</p>
              <div className="mt-2">$1.02M</div>
              <div className="flex items-center gap-1 mt-1 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+18.5% vs last year</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Expenses (YTD)</p>
              <div className="mt-2">$655K</div>
              <div className="flex items-center gap-1 mt-1 text-red-600 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+12.3% vs last year</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Net Profit (YTD)</p>
              <div className="mt-2">$364K</div>
              <div className="flex items-center gap-1 mt-1 text-green-600 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+28.7% vs last year</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Overdue Invoices</p>
              <div className="mt-2 text-red-600">$42.5K</div>
              <p className="text-sm text-gray-600 mt-1">8 invoices</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <h3 className="mb-6">Revenue vs Expenses vs Profit</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} name="Expenses" />
                <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={3} name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="mb-6">Expense Breakdown (Current Month)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={expenseCategories}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="category" stroke="#9ca3af" angle={-45} textAnchor="end" height={100} />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="mb-6">Financial Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Gross Margin</p>
                    <div className="mt-1">35.8%</div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Operating Margin</p>
                    <div className="mt-1">28.2%</div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Cash Flow</p>
                    <div className="mt-1">$156K</div>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500">Accounts Receivable</p>
                    <div className="mt-1">$87K</div>
                  </div>
                  <FileText className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Invoice #</th>
                    <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-600">Invoice Date</th>
                    <th className="text-left py-3 px-4 text-gray-600">Due Date</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">{invoice.invoiceNumber}</td>
                      <td className="py-4 px-4">{invoice.customer}</td>
                      <td className="py-4 px-4">${invoice.amount.toLocaleString()}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(invoice.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
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

        <TabsContent value="expenses" className="space-y-4">
          <Card className="p-6">
            <h3 className="mb-6">Expense Categories</h3>
            <div className="space-y-4">
              {expenseCategories.map((expense, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span>{expense.category}</span>
                      <span>${expense.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500"
                        style={{ width: `${(expense.amount / 217000) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
