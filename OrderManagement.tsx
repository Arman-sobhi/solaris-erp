import { useState } from 'react';
import { Card } from './components/ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, Filter, Download, Eye, Package } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Order {
  id: string;
  orderNumber: string;
  partner: string;
  date: string;
  products: string;
  quantity: number;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryDate: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2845',
    partner: 'Green Valley Distributors',
    date: '2025-11-01',
    products: 'Organic Tomatoes, Fresh Lettuce',
    quantity: 500,
    amount: 12450,
    status: 'shipped',
    deliveryDate: '2025-11-05',
  },
  {
    id: '2',
    orderNumber: 'ORD-2844',
    partner: 'Fresh Market Co.',
    date: '2025-11-01',
    products: 'Mixed Vegetables Bundle',
    quantity: 350,
    amount: 8900,
    status: 'processing',
    deliveryDate: '2025-11-04',
  },
  {
    id: '3',
    orderNumber: 'ORD-2843',
    partner: 'Organic Foods Ltd.',
    date: '2025-10-31',
    products: 'Premium Fruits Selection',
    quantity: 750,
    amount: 18600,
    status: 'delivered',
    deliveryDate: '2025-11-02',
  },
  {
    id: '4',
    orderNumber: 'ORD-2842',
    partner: 'City Retailers Group',
    date: '2025-10-31',
    products: 'Dairy Products Package',
    quantity: 200,
    amount: 5400,
    status: 'pending',
    deliveryDate: '2025-11-06',
  },
  {
    id: '5',
    orderNumber: 'ORD-2841',
    partner: 'Harvest Wholesalers',
    date: '2025-10-30',
    products: 'Frozen Foods Assortment',
    quantity: 450,
    amount: 11200,
    status: 'shipped',
    deliveryDate: '2025-11-03',
  },
  {
    id: '6',
    orderNumber: 'ORD-2840',
    partner: 'Premium Foods Inc.',
    date: '2025-10-30',
    products: 'Organic Grains Collection',
    quantity: 600,
    amount: 15800,
    status: 'cancelled',
    deliveryDate: '-',
  },
];

export function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.partner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'shipped':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'pending':
        return 'bg-orange-100 text-orange-700 hover:bg-orange-100';
      case 'cancelled':
        return 'bg-red-100 text-red-700 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Order Management</h1>
          <p className="text-gray-500">Track and manage all partner orders</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Download className="h-4 w-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Total Orders</p>
          <div className="mt-1">182</div>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <div className="mt-1 text-orange-600">24</div>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">In Progress</p>
          <div className="mt-1 text-blue-600">58</div>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Delivered</p>
          <div className="mt-1 text-green-600">96</div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by order number or partner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600">Order #</th>
                <th className="text-left py-3 px-4 text-gray-600">Partner</th>
                <th className="text-left py-3 px-4 text-gray-600">Order Date</th>
                <th className="text-left py-3 px-4 text-gray-600">Products</th>
                <th className="text-left py-3 px-4 text-gray-600">Quantity</th>
                <th className="text-left py-3 px-4 text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-gray-600">Delivery</th>
                <th className="text-left py-3 px-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">{order.orderNumber}</td>
                  <td className="py-4 px-4">{order.partner}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm max-w-xs truncate">{order.products}</div>
                  </td>
                  <td className="py-4 px-4">{order.quantity} units</td>
                  <td className="py-4 px-4">${order.amount.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {order.deliveryDate !== '-' ? new Date(order.deliveryDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </Card>
    </div>
  );
}
