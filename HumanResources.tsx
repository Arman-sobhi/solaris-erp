import { Card } from './components/ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Users, UserPlus, Calendar, TrendingUp, Clock, DollarSign } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'active' | 'on-leave' | 'terminated';
  hireDate: string;
  salary: number;
  manager: string;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@foodpro.com',
    department: 'Production',
    position: 'Production Manager',
    status: 'active',
    hireDate: '2022-03-15',
    salary: 75000,
    manager: 'John Smith',
  },
  {
    id: '2',
    name: 'Mike Davis',
    email: 'mike.d@foodpro.com',
    department: 'Quality Control',
    position: 'QC Inspector',
    status: 'active',
    hireDate: '2023-01-10',
    salary: 55000,
    manager: 'Sarah Johnson',
  },
  {
    id: '3',
    name: 'Emily Chen',
    email: 'emily.c@foodpro.com',
    department: 'Sales',
    position: 'Sales Representative',
    status: 'on-leave',
    hireDate: '2021-09-20',
    salary: 62000,
    manager: 'Robert Taylor',
  },
];

const attendanceData = [
  { employee: 'Sarah Johnson', present: 22, absent: 0, late: 1 },
  { employee: 'Mike Davis', present: 21, absent: 1, late: 2 },
  { employee: 'Emily Chen', present: 15, absent: 5, late: 0 },
  { employee: 'John Martinez', present: 23, absent: 0, late: 0 },
];

const departments = [
  { name: 'Production', employees: 45, budget: 2250000 },
  { name: 'Quality Control', employees: 12, budget: 540000 },
  { name: 'Sales & Marketing', employees: 18, budget: 990000 },
  { name: 'Logistics', employees: 22, budget: 1100000 },
  { name: 'Administration', employees: 8, budget: 480000 },
];

export function HumanResources() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'on-leave': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'terminated': return 'bg-red-100 text-red-700 hover:bg-red-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Human Resources</h1>
          <p className="text-gray-500">Manage employees and workforce</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Employees</p>
              <div className="mt-2">105</div>
              <p className="text-sm text-green-600 mt-1">+8 this quarter</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Attendance Rate</p>
              <div className="mt-2">96.8%</div>
              <p className="text-sm text-green-600 mt-1">Above target</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Working Hours</p>
              <div className="mt-2">42.5 hrs</div>
              <p className="text-sm text-gray-600 mt-1">Per week</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Payroll (Monthly)</p>
              <div className="mt-2">$458K</div>
              <p className="text-sm text-gray-600 mt-1">Total expenses</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="employees" className="space-y-6">
        <TabsList>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-4">
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Employee</th>
                    <th className="text-left py-3 px-4 text-gray-600">Department</th>
                    <th className="text-left py-3 px-4 text-gray-600">Position</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600">Hire Date</th>
                    <th className="text-left py-3 px-4 text-gray-600">Manager</th>
                    <th className="text-left py-3 px-4 text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div>{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{employee.department}</Badge>
                      </td>
                      <td className="py-4 px-4">{employee.position}</td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(employee.status)}>
                          {employee.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(employee.hireDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-sm">{employee.manager}</td>
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

        <TabsContent value="attendance" className="space-y-4">
          <Card className="p-6">
            <h3 className="mb-6">Monthly Attendance Summary</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Employee</th>
                    <th className="text-left py-3 px-4 text-gray-600">Present Days</th>
                    <th className="text-left py-3 px-4 text-gray-600">Absent Days</th>
                    <th className="text-left py-3 px-4 text-gray-600">Late Arrivals</th>
                    <th className="text-left py-3 px-4 text-gray-600">Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((record, index) => {
                    const totalDays = record.present + record.absent;
                    const attendanceRate = ((record.present / totalDays) * 100).toFixed(1);
                    return (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">{record.employee}</td>
                        <td className="py-4 px-4">
                          <span className="text-green-600">{record.present}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={record.absent > 0 ? 'text-red-600' : 'text-gray-600'}>
                            {record.absent}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={record.late > 0 ? 'text-yellow-600' : 'text-gray-600'}>
                            {record.late}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={parseFloat(attendanceRate) >= 95 ? 'text-green-600' : parseFloat(attendanceRate) >= 85 ? 'text-yellow-600' : 'text-red-600'}>
                            {attendanceRate}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-sm mb-1">{dept.name}</h3>
                    <p className="text-sm text-gray-500">{dept.employees} employees</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Annual Budget</span>
                    <span>${(dept.budget / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cost per Employee</span>
                    <span>${Math.round(dept.budget / dept.employees / 1000)}K</span>
                  </div>
                  <Button variant="outline" className="w-full mt-2">View Details</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
