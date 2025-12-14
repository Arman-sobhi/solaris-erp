import { Card } from './components/ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FolderKanban, Plus, Users, Calendar, TrendingUp } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface Project {
  id: string;
  name: string;
  code: string;
  type: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  team: string[];
  tasks: number;
  completedTasks: number;
  description: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'New Production Line Expansion',
    code: 'PROJ-2024-001',
    type: 'Infrastructure',
    status: 'active',
    priority: 'high',
    progress: 65,
    budget: 500000,
    spent: 325000,
    startDate: '2024-09-01',
    endDate: '2025-02-28',
    team: ['John Smith', 'Sarah Chen', 'Mike Davis', 'Emily Wilson'],
    tasks: 45,
    completedTasks: 29,
    description: 'Expansion of production capacity with new automated line',
  },
  {
    id: '2',
    name: 'Product Line Modernization',
    code: 'PROJ-2024-002',
    type: 'Product Development',
    status: 'active',
    priority: 'medium',
    progress: 40,
    budget: 250000,
    spent: 95000,
    startDate: '2024-10-15',
    endDate: '2025-04-30',
    team: ['Robert Taylor', 'Emma Brown', 'David Lee'],
    tasks: 32,
    completedTasks: 13,
    description: 'Modernization of existing product packaging and formulations',
  },
  {
    id: '3',
    name: 'Quality System ISO Certification',
    code: 'PROJ-2024-003',
    type: 'Compliance',
    status: 'planning',
    priority: 'high',
    progress: 15,
    budget: 75000,
    spent: 12000,
    startDate: '2024-11-01',
    endDate: '2025-06-30',
    team: ['Jane Smith', 'Michael Johnson'],
    tasks: 28,
    completedTasks: 4,
    description: 'Achieve ISO 22000 certification for food safety management',
  },
  {
    id: '4',
    name: 'Warehouse Automation Phase 2',
    code: 'PROJ-2024-004',
    type: 'Technology',
    status: 'on-hold',
    priority: 'medium',
    progress: 30,
    budget: 380000,
    spent: 115000,
    startDate: '2024-08-01',
    endDate: '2025-03-31',
    team: ['Alex Martinez', 'Lisa Anderson'],
    tasks: 38,
    completedTasks: 11,
    description: 'Implementation of automated storage and retrieval system',
  },
  {
    id: '5',
    name: 'Sustainable Packaging Initiative',
    code: 'PROJ-2024-005',
    type: 'Sustainability',
    status: 'completed',
    priority: 'low',
    progress: 100,
    budget: 120000,
    spent: 118000,
    startDate: '2024-03-01',
    endDate: '2024-10-31',
    team: ['Emma Green', 'Tom Wilson', 'Sarah Parker'],
    tasks: 25,
    completedTasks: 25,
    description: 'Transition to eco-friendly packaging materials',
  },
];

export function Projects({ onViewProject }: { onViewProject?: (projectId: string) => void }) {
  const { language } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'active': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'on-hold': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'completed': return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'medium': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'low': return 'bg-green-100 text-green-700 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const activeProjects = mockProjects.filter(p => p.status === 'active').length;
  const totalBudget = mockProjects.reduce((acc, p) => acc + p.budget, 0);
  const totalSpent = mockProjects.reduce((acc, p) => acc + p.spent, 0);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>{language === 'en' ? 'Project Management' : 'مدیریت پروژه‌ها'}</h1>
          <p className="text-gray-500">
            {language === 'en' 
              ? 'Track and manage company projects and initiatives' 
              : 'پیگیری و مدیریت پروژه‌ها و ابتکارات شرکت'}
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          {language === 'en' ? 'New Project' : 'پروژه جدید'}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Total Projects' : 'کل پروژه‌ها'}
              </p>
              <div className="mt-2">{mockProjects.length}</div>
              <p className="text-sm text-green-600 mt-1">
                {activeProjects} {language === 'en' ? 'active' : 'فعال'}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <FolderKanban className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Total Budget' : 'بودجه کل'}
              </p>
              <div className="mt-2">${(totalBudget / 1000).toFixed(0)}K</div>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'en' ? 'Allocated' : 'تخصیص یافته'}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Total Spent' : 'هزینه شده'}
              </p>
              <div className="mt-2">${(totalSpent / 1000).toFixed(0)}K</div>
              <p className="text-sm text-gray-600 mt-1">
                {((totalSpent / totalBudget) * 100).toFixed(1)}% {language === 'en' ? 'used' : 'استفاده شده'}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Completion Rate' : 'نرخ تکمیل'}
              </p>
              <div className="mt-2">68%</div>
              <p className="text-sm text-green-600 mt-1">
                {language === 'en' ? 'On track' : 'در مسیر'}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">
            {language === 'en' ? 'Active Projects' : 'پروژه‌های فعال'}
          </TabsTrigger>
          <TabsTrigger value="all">
            {language === 'en' ? 'All Projects' : 'همه پروژه‌ها'}
          </TabsTrigger>
          <TabsTrigger value="timeline">
            {language === 'en' ? 'Timeline' : 'جدول زمانی'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {mockProjects.filter(p => p.status === 'active').map((project) => (
            <Card key={project.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm">{project.name}</h3>
                    <Badge variant="outline">{project.code}</Badge>
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{project.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{language === 'en' ? 'Type' : 'نوع'}: {project.type}</span>
                    <span>•</span>
                    <span>
                      {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <h4 className="text-xs text-gray-500 mb-2">
                    {language === 'en' ? 'Progress' : 'پیشرفت'}
                  </h4>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-sm">{project.progress}%</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {project.completedTasks}/{project.tasks} {language === 'en' ? 'tasks completed' : 'کار تکمیل شده'}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs text-gray-500 mb-2">
                    {language === 'en' ? 'Budget' : 'بودجه'}
                  </h4>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500"
                        style={{ width: `${(project.spent / project.budget) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm">{((project.spent / project.budget) * 100).toFixed(0)}%</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs text-gray-500 mb-2">
                    {language === 'en' ? 'Team' : 'تیم'}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{project.team.length} {language === 'en' ? 'members' : 'عضو'}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {project.team.slice(0, 4).map((member, index) => (
                      <div key={index} className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs text-blue-600">
                        {member.split(' ').map(n => n[0]).join('')}
                      </div>
                    ))}
                    {project.team.length > 4 && (
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-600">
                        +{project.team.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm" onClick={() => onViewProject?.(project.id)}>
                  {language === 'en' ? 'View Details' : 'جزئیات'}
                </Button>
                <Button variant="outline" size="sm">
                  {language === 'en' ? 'Tasks' : 'وظایف'}
                </Button>
                <Button variant="outline" size="sm">
                  {language === 'en' ? 'Team' : 'تیم'}
                </Button>
                <Button variant="outline" size="sm">
                  {language === 'en' ? 'Reports' : 'گزارش‌ها'}
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Project' : 'پروژه'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Type' : 'نوع'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Status' : 'وضعیت'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Progress' : 'پیشرفت'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Budget' : 'بودجه'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'End Date' : 'تاریخ پایان'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Actions' : 'عملیات'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockProjects.map((project) => (
                    <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>{project.name}</div>
                        <div className="text-xs text-gray-500">{project.code}</div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{project.type}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-sm">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">${project.budget.toLocaleString()}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(project.endDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="sm">
                          {language === 'en' ? 'View' : 'مشاهده'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card className="p-6">
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {language === 'en' ? 'Project timeline and Gantt chart view' : 'جدول زمانی و نمودار گانت پروژه'}
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
