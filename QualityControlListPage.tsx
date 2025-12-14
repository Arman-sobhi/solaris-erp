import { useState } from 'react';
import { Plus, Search, Filter, Download, MoreVertical, Eye, Edit, CheckCircle, XCircle } from 'lucide-react';
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
import { StatusBadge } from '../widgets/StatusBadge';
import { EmptyState } from '../widgets/EmptyState';
import { mockQualityControlRecords, qcStats } from '../data/mockQualityControl';

interface QualityControlListPageProps {
  onViewRecord: (recordId: string) => void;
}

export function QualityControlListPage({ onViewRecord }: QualityControlListPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');

  const filteredRecords = mockQualityControlRecords.filter(record => {
    const matchesSearch = record.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.inspectionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.batchNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesProduct = productFilter === 'all' || record.productId === productFilter;
    return matchesSearch && matchesStatus && matchesProduct;
  });

  const products = ['all', ...Array.from(new Set(mockQualityControlRecords.map(r => r.productId)))];
  const statuses = ['all', 'passed', 'failed', 'conditional', 'pending'];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Quality Control</h1>
          <p className="text-gray-500">Monitor product quality and inspection records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Inspection
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by product, inspection ID, or batch number..."
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
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600">Total Inspections</p>
          <p className="text-2xl mt-1">{qcStats.totalInspections}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Passed</p>
          <p className="text-2xl mt-1 text-green-600">
            {qcStats.passed}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Failed</p>
          <p className="text-2xl mt-1 text-red-600">
            {qcStats.failed}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Pass Rate</p>
          <div className="flex items-center gap-2 mt-1">
            <Progress value={qcStats.passRate} className="flex-1" />
            <span className="text-lg">{qcStats.passRate.toFixed(1)}%</span>
          </div>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Avg Defect Rate</p>
          <p className="text-2xl mt-1">
            {qcStats.averageDefectRate.toFixed(1)}%
          </p>
        </Card>
      </div>

      {/* Table */}
      <Card>
        {filteredRecords.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No QC records found"
            description="Try adjusting your search or filter criteria"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Inspection ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Batch Number</TableHead>
                <TableHead>Inspection Date</TableHead>
                <TableHead>Inspector</TableHead>
                <TableHead>Defect Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell className="font-mono text-sm">{record.inspectionId}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{record.productName}</p>
                      <p className="text-sm text-gray-500">Order: {record.productionOrderNumber}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{record.batchNumber}</TableCell>
                  <TableCell>{record.inspectionDate}</TableCell>
                  <TableCell>{record.inspector}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={record.defectRate}
                        className="w-20"
                      />
                      <span className="text-sm">
                        {record.defectRate.toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={record.status} />
                      {record.status === 'passed' && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                      {record.status === 'failed' && (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
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
                        <DropdownMenuItem onClick={() => onViewRecord(record.id)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Record
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Export Report
                        </DropdownMenuItem>
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
