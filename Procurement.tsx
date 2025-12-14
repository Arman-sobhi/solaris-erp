import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ShoppingBag, TrendingDown, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  items: string;
  quantity: number;
  amount: number;
  orderDate: string;
  expectedDate: string;
  status: 'draft' | 'pending' | 'approved' | 'received' | 'cancelled';
}

const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: '1',
    poNumber: 'PO-2024-5001',
    supplier: 'Farm Fresh Supplies',
    items: 'Organic Wheat Flour',
    quantity: 2000,
    amount: 8500,
    orderDate: '2025-10-28',
    expectedDate: '2025-11-03',
    status: 'approved',
  },
  {
    id: '2',
    poNumber: 'PO-2024-5002',
    supplier: 'Mediterranean Imports',
    items: 'Premium Olive Oil',
    quantity: 500,
    amount: 12000,
    orderDate: '2025-10-30',
    expectedDate: '2025-11-05',
    status: 'pending',
  },
  {
    id: '3',
    poNumber: 'PO-2024-5003',
    supplier: 'PackPro Industries',
    items: 'Glass Jars 500ml',
    quantity: 5000,
    amount: 6800,
    orderDate: '2025-10-25',
    expectedDate: '2025-11-01',
    status: 'received',
  },
  {
    id: '4',
    poNumber: 'PO-2024-5004',
    supplier: 'Green Valley Farms',
    items: 'Fresh Tomatoes',
    quantity: 1500,
    amount: 3200,
    orderDate: '2025-11-01',
    expectedDate: '2025-11-04',
    status: 'draft',
  },
];

export function Procurement() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      case 'pending': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'approved': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'received': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'cancelled': return 'bg-red-100 text-red-700 hover:bg-red-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Procurement Management</h1>
          <p className="text-gray-500">Manage purchase orders and supplier relationships</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <ShoppingBag className="h-4 w-4 mr-2" />
          New Purchase Order
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Total POs (Month)</p>
              <div className="mt-2">67</div>
              <p className="text-sm text-gray-600 mt-1">$245K value</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Approvals</p>
              <div className="mt-2">12</div>
              <p className="text-sm text-gray-600 mt-1">Awaiting review</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed POs</p>
              <div className="mt-2">52</div>
              <p className="text-sm text-green-600 mt-1">This month</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Cost Savings</p>
              <div className="mt-2 text-green-600">$12.5K</div>
              <p className="text-sm text-gray-600 mt-1">vs last month</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Purchase Orders Table */}
      <Card className="p-6">
        <h3 className="mb-6">Purchase Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600">PO Number</th>
                <th className="text-left py-3 px-4 text-gray-600">Supplier</th>
                <th className="text-left py-3 px-4 text-gray-600">Items</th>
                <th className="text-left py-3 px-4 text-gray-600">Quantity</th>
                <th className="text-left py-3 px-4 text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-gray-600">Order Date</th>
                <th className="text-left py-3 px-4 text-gray-600">Expected Date</th>
                <th className="text-left py-3 px-4 text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockPurchaseOrders.map((po) => (
                <tr key={po.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">{po.poNumber}</td>
                  <td className="py-4 px-4">{po.supplier}</td>
                  <td className="py-4 px-4">{po.items}</td>
                  <td className="py-4 px-4">{po.quantity}</td>
                  <td className="py-4 px-4">${po.amount.toLocaleString()}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {new Date(po.orderDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {new Date(po.expectedDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={getStatusColor(po.status)}>
                      {po.status}
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

      {/* Supplier Requests */}
      <Card className="p-6">
        <h3 className="mb-6">Recent Supplier Quotes</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span>Farm Fresh Supplies</span>
                <Badge variant="outline">Quote Requested</Badge>
              </div>
              <p className="text-sm text-gray-500">Organic vegetables bulk order - 3000kg</p>
            </div>
            <Button variant="outline" size="sm">Review</Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span>PackPro Industries</span>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Quote Received</Badge>
              </div>
              <p className="text-sm text-gray-500">Packaging materials - 10,000 units</p>
            </div>
            <Button variant="outline" size="sm">Review</Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span>Mediterranean Imports</span>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Under Review</Badge>
              </div>
              <p className="text-sm text-gray-500">Specialty spices and herbs - 500kg</p>
            </div>
            <Button variant="outline" size="sm">Review</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
