import { ArrowLeft } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { useProjects } from './useMockData';

interface ProjectDetailPageProps {
  projectId: string;
  onBack: () => void;
}

export function ProjectDetailPage({ projectId, onBack }: ProjectDetailPageProps) {
  const { projects } = useProjects();
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="p-8">
        <p>Project not found</p>
        <Button onClick={onBack} variant="outline" className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <div>
            <h1>{project.name}</h1>
            <p className="text-gray-500">{project.code} • {project.manager}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Status</div>
          <div className="mt-1">{project.status}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Progress</div>
          <div className="mt-1">{project.progress}%</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Budget</div>
          <div className="mt-1">${project.budget.toLocaleString()}</div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6">
            <h3 className="mb-3">Description</h3>
            <p className="text-sm text-gray-700">{project.description}</p>
            <h4 className="mt-4 mb-2 text-sm text-gray-600">Team</h4>
            <div className="flex gap-2 flex-wrap">
              {project.team.map((m) => (
                <div key={m.id} className="p-2 bg-gray-50 rounded">{m.name} • {m.role}</div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card className="p-6">
            <h3 className="mb-3">Tasks</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {project.tasks.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.name}</TableCell>
                    <TableCell>{t.assignedTo}</TableCell>
                    <TableCell>{t.status}</TableCell>
                    <TableCell className="text-sm text-gray-600">{t.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <Card className="p-6">
            <h3 className="mb-3">Budget Breakdown</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Allocated</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead>Remaining</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {project.budgetBreakdown.map((b) => (
                  <TableRow key={b.category}>
                    <TableCell>{b.category}</TableCell>
                    <TableCell>${b.allocated.toLocaleString()}</TableCell>
                    <TableCell>${b.spent.toLocaleString()}</TableCell>
                    <TableCell>${b.remaining.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
