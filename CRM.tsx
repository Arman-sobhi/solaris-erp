import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, Plus, Phone, Mail, TrendingUp, UserPlus, DollarSign, Target } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation';
  value: number;
  source: string;
  assignedTo: string;
  date: string;
}

interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalRevenue: number;
  lastOrder: string;
  status: 'active' | 'inactive';
  segment: 'enterprise' | 'mid-market' | 'small';
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    company: 'Metro Food Markets',
    email: 'john@metrofood.com',
    phone: '+1 (555) 111-2222',
    status: 'qualified',
    value: 45000,
    source: 'Website',
    assignedTo: 'Sarah Johnson',
    date: '2025-11-01',
  },
  {
    id: '2',
    name: 'Emily Chen',
    company: 'Fresh Grocers Inc',
    email: 'emily@freshgrocers.com',
    phone: '+1 (555) 222-3333',
    status: 'proposal',
    value: 67000,
    source: 'Referral',
    assignedTo: 'Mike Davis',
    date: '2025-10-28',
  },
  {
    id: '3',
    name: 'Robert Taylor',
    company: 'Organic Plus',
    email: 'robert@organicplus.com',
    phone: '+1 (555) 333-4444',
    status: 'new',
    value: 23000,
    source: 'Cold Call',
    assignedTo: 'Sarah Johnson',
    date: '2025-11-02',
  },
];

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Green Valley Distributors',
    company: 'Green Valley Distributors',
    email: 'contact@greenvalley.com',
    phone: '+1 (555) 123-4567',
    totalOrders: 245,
    totalRevenue: 125000,
    lastOrder: '2025-11-01',
    status: 'active',
    segment: 'enterprise',
  },
  {
    id: '2',
    name: 'Fresh Market Co.',
    company: 'Fresh Market Co.',
    email: 'info@freshmarket.com',
    phone: '+1 (555) 234-5678',
    totalOrders: 189,
    totalRevenue: 98500,
    lastOrder: '2025-10-30',
    status: 'active',
    segment: 'mid-market',
  },
];

export function CRM() {
  const [searchTerm, setSearchTerm] = useState('');

  const getLeadStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'contacted': return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      case 'qualified': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'proposal': return 'bg-orange-100 text-orange-700 hover:bg-orange-100';
      case 'negotiation': return 'bg-green-100 text-green-700 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Customer Relationship Management</h1>
          <p className="text-gray-500">Manage leads, customers, and sales pipeline</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Lead
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Leads</p>
              <div className="mt-2">87</div>
              <p className="text-sm text-green-600 mt-1">+12 this week</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Customers</p>
              <div className="mt-2">156</div>
              <p className="text-sm text-green-600 mt-1">+8 this month</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Pipeline Value</p>
              <div className="mt-2">$486K</div>
              <p className="text-sm text-green-600 mt-1">+15% vs last month</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <div className="mt-2">34.5%</div>
              <p className="text-sm text-green-600 mt-1">+2.3% improvement</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="leads" className="space-y-6">
        <TabsList>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          <Card className="p-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Lead</th>
                    <th className="text-left py-3 px-4 text-gray-600">Company</th>
                    <th className="text-left py-3 px-4 text-gray-600">Contact</th>
                    <th className="text-left py-3 px-4 text-gray-600">Value</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600">Source</th>
                    <th className="text-left py-3 px-4 text-gray-600">Assigned To</th>
                    <th className="text-left py-3 px-4 text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>{lead.name}</div>
                      </td>
                      <td className="py-4 px-4">{lead.company}</td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-1 text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Phone className="h-3 w-3" />
                            {lead.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">${lead.value.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <Badge className={getLeadStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{lead.source}</Badge>
                      </td>
                      <td className="py-4 px-4">{lead.assignedTo}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(lead.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card className="p-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-gray-600">Contact</th>
                    <th className="text-left py-3 px-4 text-gray-600">Segment</th>
                    <th className="text-left py-3 px-4 text-gray-600">Total Orders</th>
                    <th className="text-left py-3 px-4 text-gray-600">Total Revenue</th>
                    <th className="text-left py-3 px-4 text-gray-600">Last Order</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>{customer.company}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-1 text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{customer.segment}</Badge>
                      </td>
                      <td className="py-4 px-4">{customer.totalOrders}</td>
                      <td className="py-4 px-4">${customer.totalRevenue.toLocaleString()}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(customer.lastOrder).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          {customer.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <Card className="p-6">
            <div className="text-center py-12">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Sales opportunities view coming soon</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
