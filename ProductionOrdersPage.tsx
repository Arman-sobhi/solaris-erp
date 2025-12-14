import { useState } from 'react';
import { Plus, Search, Filter, Download, Calendar, MoreVertical, Eye, Edit, Play, Pause, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { StatusBadge } from '../widgets/StatusBadge';
import { EmptyState } from '../widgets/EmptyState';

// Mock Production Orders Data
const mockProductionOrders = [
  {
    id: 'po-001',
    orderNumber: 'PRD-2024-1245',
    product: 'Premium Wheat Bread',
    quantity: 500,
    quantityProduced: 475,
    status: 'in-progress',
    priority: 'high',
    startDate: '2024-12-13',
    endDate: '2024-12-13',
    machine: 'Industrial Mixer M-500',
    operator: 'Maria Santos',
    progress: 95,
    notes: 'Rush order for Green Valley Distributors',
  },
  {
    id: 'po-002',
    orderNumber: 'PRD-2024-1246',
    product: 'Artisan Sourdough',
    quantity: 300,
    quantityProduced: 300,
    status: 'completed',
    priority: 'medium',
    startDate: '2024-12-12',
    endDate: '2024-12-13',
    machine: 'Steam Deck Oven SD-600',
    operator: 'Pierre Dubois',
    progress: 100,
    notes: '',
  },
  {
    id: 'po-003',
    orderNumber: 'PRD-2024-1247',
    product: 'Chocolate Chip Cookies',
    quantity: 800,
    quantityProduced: 450,
    status: 'in-progress',
    priority: 'medium',
    startDate: '2024-12-13',
    endDate: '2024-12-13',
    machine: 'Cookie Depositor CD-100',
    operator: 'Sarah Johnson',
    progress: 56,
    notes: '',
  },
  {
    id: 'po-004',
    orderNumber: 'PRD-2024-1248',
    product: 'Croissant Premium',
    quantity: 600,
    quantityProduced: 0,
    status: 'planned',
    priority: 'low',
    startDate: '2024-12-14',
    endDate: '2024-12-14',
    machine: 'Laminator L-400',
    operator: 'Claire Martin',
    progress: 0,
    notes: 'Scheduled for tomorrow morning shift',
  },
  {
    id: 'po-005',
    orderNumber: 'PRD-2024-1249',
    product: 'Multigrain Bagels',
    quantity: 400,
    quantityProduced: 0,
    status: 'cancelled',
    priority: 'medium',
    startDate: '2024-12-09',
    endDate: '2024-12-09',
    machine: 'Bagel Former BF-50',
    operator: 'John Chen',
    progress: 0,
    notes: 'Cancelled due to equipment maintenance',
  },
  {
    id: 'po-006',
    orderNumber: 'PRD-2024-1250',
    product: 'Premium Wheat Bread',
    quantity: 750,
    quantityProduced: 0,
    status: 'planned',
    priority: 'high',
    startDate: '2024-12-14',
    endDate: '2024-12-14',
    machine: 'Industrial Mixer M-500',
    operator: 'Maria Santos',
    progress: 0,
    notes: 'Large order for Downtown Cafe Chain',
  },
];

export function ProductionOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredOrders = mockProductionOrders.filter(order => {
    const matchesSearch = order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: mockProductionOrders.length,
    inProgress: mockProductionOrders.filter(o => o.status === 'in-progress').length,
    completed: mockProductionOrders.filter(o => o.status === 'completed').length,
    planned: mockProductionOrders.filter(o => o.status === 'planned').length,
    totalQuantity: mockProductionOrders.reduce((sum, o) => sum + o.quantity, 0),
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Production Orders</h1>
          <p className="text-gray-500">Manage manufacturing orders and track production</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule View
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Production Order
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by product or order number..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl mt-1">{stats.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">In Progress</p>
          <p className="text-2xl mt-1 text-blue-600">{stats.inProgress}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Completed Today</p>
          <p className="text-2xl mt-1 text-green-600">{stats.completed}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Planned</p>
          <p className="text-2xl mt-1 text-gray-600">{stats.planned}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Total Units</p>
          <p className="text-2xl mt-1">{stats.totalQuantity.toLocaleString()}</p>
        </Card>
      </div>

      {/* Table */}
      <Card>
        {filteredOrders.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No production orders found"
            description="Try adjusting your search or filter criteria"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Machine</TableHead>
                <TableHead>Operator</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell className="font-mono text-sm">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.product}</p>
                      {order.notes && (
                        <p className="text-sm text-gray-500">{order.notes.substring(0, 30)}...</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{order.quantityProduced} / {order.quantity}</p>
                      <p className="text-sm text-gray-500">units</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-32">
                      <Progress value={order.progress} className="flex-1" />
                      <span className="text-sm">{order.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        order.priority === 'critical'
                          ? 'bg-red-100 text-red-700'
                          : order.priority === 'high'
                          ? 'bg-orange-100 text-orange-700'
                          : order.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }
                    >
                      {order.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{order.machine}</TableCell>
                  <TableCell>{order.operator}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Order
                        </DropdownMenuItem>
                        {order.status === 'planned' && (
                          <DropdownMenuItem className="text-blue-600">
                            <Play className="w-4 h-4 mr-2" />
                            Start Production
                          </DropdownMenuItem>
                        )}
                        {order.status === 'in-progress' && (
                          <>
                            <DropdownMenuItem className="text-yellow-600">
                              <Pause className="w-4 h-4 mr-2" />
                              Pause
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark Complete
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
