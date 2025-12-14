import { useState } from 'react';
import { Plus, Search, Filter, Download, Calendar, MoreVertical, Eye, Edit, CheckCircle } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card } from './components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import { Badge } from './components/ui/badge';
import { StatusBadge } from './widgets/StatusBadge';
import { EmptyState } from './widgets/EmptyState';
import { mockMaintenanceRecords, maintenanceStats } from './mockMaintenance';

interface MaintenanceListPageProps {
  onViewRecord: (recordId: string) => void;
}

export function MaintenanceListPage({ onViewRecord }: MaintenanceListPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRecords = mockMaintenanceRecords.filter(record => {
    const matchesSearch = record.machineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.recordNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.technician.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || record.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const types = ['all', 'preventive', 'corrective', 'breakdown', 'inspection'];
  const statuses = ['all', 'scheduled', 'in-progress', 'completed', 'cancelled'];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Maintenance</h1>
          <p className="text-gray-500">Manage machine maintenance and service records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule View
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Maintenance
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by machine, record number, or technician..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600">Total Records</p>
          <p className="text-2xl mt-1">{maintenanceStats.totalRecords}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Scheduled</p>
          <p className="text-2xl mt-1 text-blue-600">
            {maintenanceStats.scheduled}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">In Progress</p>
          <p className="text-2xl mt-1 text-yellow-600">
            {maintenanceStats.inProgress}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Total Cost</p>
          <p className="text-2xl mt-1">
            ${maintenanceStats.totalCost.toLocaleString()}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Total Downtime</p>
          <p className="text-2xl mt-1">
            {maintenanceStats.totalDowntime}h
          </p>
        </Card>
      </div>

      {/* Table */}
      <Card>
        {filteredRecords.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No maintenance records found"
            description="Try adjusting your search or filter criteria"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Record #</TableHead>
                <TableHead>Machine</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell className="font-mono text-sm">{record.recordNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{record.machineName}</p>
                      <p className="text-sm text-gray-500">{record.description.substring(0, 40)}...</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        record.type === 'breakdown'
                          ? 'bg-red-50 text-red-700'
                          : record.type === 'corrective'
                          ? 'bg-yellow-50 text-yellow-700'
                          : record.type === 'inspection'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-green-50 text-green-700'
                      }
                    >
                      {record.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        record.priority === 'critical'
                          ? 'bg-red-100 text-red-700'
                          : record.priority === 'high'
                          ? 'bg-orange-100 text-orange-700'
                          : record.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }
                    >
                      {record.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.scheduledDate}</TableCell>
                  <TableCell>{record.technician}</TableCell>
                  <TableCell>
                    {record.totalCost > 0 ? `$${record.totalCost.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={record.status} />
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
                        {record.status === 'in-progress' && (
                          <>
                            <DropdownMenuSeparator />
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
