import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Wrench, MapPin, User, Clock, CheckCircle, Calendar } from 'lucide-react';

interface ServiceTicket {
  id: string;
  ticketNumber: string;
  customer: string;
  location: string;
  type: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  technician: string;
  scheduledDate: string;
  description: string;
}

interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'available' | 'on-job' | 'off-duty';
  activeJobs: number;
  completedToday: number;
  location: string;
}

const mockTickets: ServiceTicket[] = [
  {
    id: '1',
    ticketNumber: 'FSM-2001',
    customer: 'Green Valley Distributors',
    location: 'Los Angeles, CA',
    type: 'Equipment Installation',
    priority: 'high',
    status: 'in-progress',
    technician: 'John Martinez',
    scheduledDate: '2025-11-02',
    description: 'Install new refrigeration unit',
  },
  {
    id: '2',
    ticketNumber: 'FSM-2002',
    customer: 'Fresh Market Co.',
    location: 'New York, NY',
    type: 'Preventive Maintenance',
    priority: 'medium',
    status: 'scheduled',
    technician: 'Sarah Chen',
    scheduledDate: '2025-11-03',
    description: 'Quarterly equipment inspection',
  },
  {
    id: '3',
    ticketNumber: 'FSM-2003',
    customer: 'Organic Foods Ltd.',
    location: 'Chicago, IL',
    type: 'Repair Service',
    priority: 'urgent',
    status: 'scheduled',
    technician: 'Mike Davis',
    scheduledDate: '2025-11-02',
    description: 'Emergency cooling system repair',
  },
];

const mockTechnicians: Technician[] = [
  {
    id: '1',
    name: 'John Martinez',
    email: 'john.m@foodpro.com',
    phone: '+1 (555) 111-2222',
    status: 'on-job',
    activeJobs: 1,
    completedToday: 2,
    location: 'Los Angeles, CA',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah.c@foodpro.com',
    phone: '+1 (555) 222-3333',
    status: 'available',
    activeJobs: 0,
    completedToday: 3,
    location: 'New York, NY',
  },
  {
    id: '3',
    name: 'Mike Davis',
    email: 'mike.d@foodpro.com',
    phone: '+1 (555) 333-4444',
    status: 'on-job',
    activeJobs: 1,
    completedToday: 1,
    location: 'Chicago, IL',
  },
];

export function FSM() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'high': return 'bg-orange-100 text-orange-700 hover:bg-orange-100';
      case 'medium': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'low': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'in-progress': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'scheduled': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'cancelled': return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getTechStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'on-job': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'off-duty': return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Field Service Management</h1>
          <p className="text-gray-500">Manage service tickets and field technicians</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Service
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Open Tickets</p>
              <div className="mt-2">34</div>
              <p className="text-sm text-gray-600 mt-1">5 urgent</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Wrench className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Technicians Active</p>
              <div className="mt-2">12/18</div>
              <p className="text-sm text-gray-600 mt-1">On field duty</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <User className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Response Time</p>
              <div className="mt-2">2.3 hrs</div>
              <p className="text-sm text-green-600 mt-1">-15 min improvement</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Completion Rate</p>
              <div className="mt-2">96.5%</div>
              <p className="text-sm text-green-600 mt-1">First-time fix</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tickets">Service Tickets</TabsTrigger>
          <TabsTrigger value="technicians">Technicians</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Ticket #</th>
                    <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-gray-600">Location</th>
                    <th className="text-left py-3 px-4 text-gray-600">Type</th>
                    <th className="text-left py-3 px-4 text-gray-600">Priority</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600">Technician</th>
                    <th className="text-left py-3 px-4 text-gray-600">Scheduled</th>
                    <th className="text-left py-3 px-4 text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">{ticket.ticketNumber}</td>
                      <td className="py-4 px-4">{ticket.customer}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          {ticket.location}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{ticket.type}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm">
                            {ticket.technician.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm">{ticket.technician}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(ticket.scheduledDate).toLocaleDateString()}
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

        <TabsContent value="technicians" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockTechnicians.map((tech) => (
              <Card key={tech.id} className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl">
                    {tech.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm mb-1">{tech.name}</h3>
                    <Badge className={getTechStatusColor(tech.status)}>
                      {tech.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{tech.location}</span>
                  </div>
                  <div className="text-gray-600">{tech.email}</div>
                  <div className="text-gray-600">{tech.phone}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Active Jobs</p>
                    <p className="mt-1">{tech.activeJobs}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Completed Today</p>
                    <p className="mt-1">{tech.completedToday}</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">View Schedule</Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="p-6">
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Calendar schedule view coming soon</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
