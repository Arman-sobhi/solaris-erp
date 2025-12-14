import { Card } from './components/ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Settings, Plus, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface Machine {
  id: string;
  name: string;
  code: string;
  type: string;
  location: string;
  status: 'operational' | 'maintenance' | 'idle' | 'error';
  uptime: number;
  efficiency: number;
  lastMaintenance: string;
  nextMaintenance: string;
  currentJob?: string;
  manufacturer: string;
  installDate: string;
}

const mockMachines: Machine[] = [
  {
    id: '1',
    name: 'Production Line A - Main Conveyor',
    code: 'MCH-001',
    type: 'Conveyor System',
    location: 'Production Hall A',
    status: 'operational',
    uptime: 98.5,
    efficiency: 96.2,
    lastMaintenance: '2025-10-15',
    nextMaintenance: '2025-12-15',
    currentJob: 'PRD-1001 - Organic Tomato Sauce',
    manufacturer: 'TechFlow Industries',
    installDate: '2022-03-10',
  },
  {
    id: '2',
    name: 'Packaging Machine A',
    code: 'MCH-002',
    type: 'Packaging Equipment',
    location: 'Packaging Area',
    status: 'operational',
    uptime: 99.1,
    efficiency: 98.5,
    lastMaintenance: '2025-10-25',
    nextMaintenance: '2026-01-25',
    currentJob: 'PRD-1002 - Whole Wheat Bread',
    manufacturer: 'PackTech Solutions',
    installDate: '2021-06-15',
  },
  {
    id: '3',
    name: 'Industrial Oven Unit 1',
    code: 'MCH-003',
    type: 'Heating Equipment',
    location: 'Production Hall B',
    status: 'maintenance',
    uptime: 85.0,
    efficiency: 88.0,
    lastMaintenance: '2025-11-02',
    nextMaintenance: '2025-11-05',
    manufacturer: 'HeatMaster Co.',
    installDate: '2020-09-20',
  },
  {
    id: '4',
    name: 'Quality Control Scanner',
    code: 'MCH-004',
    type: 'Inspection Equipment',
    location: 'QC Department',
    status: 'error',
    uptime: 78.5,
    efficiency: 82.0,
    lastMaintenance: '2025-09-15',
    nextMaintenance: '2025-11-15',
    manufacturer: 'VisionTech Systems',
    installDate: '2023-02-05',
  },
  {
    id: '5',
    name: 'Cooling System Unit 2',
    code: 'MCH-005',
    type: 'HVAC System',
    location: 'Storage Area',
    status: 'idle',
    uptime: 95.0,
    efficiency: 92.0,
    lastMaintenance: '2025-10-10',
    nextMaintenance: '2026-01-10',
    manufacturer: 'CoolTech Industries',
    installDate: '2022-11-30',
  },
  {
    id: '6',
    name: 'Filling Machine B',
    code: 'MCH-006',
    type: 'Filling Equipment',
    location: 'Production Hall A',
    status: 'operational',
    uptime: 97.2,
    efficiency: 95.8,
    lastMaintenance: '2025-10-20',
    nextMaintenance: '2025-12-20',
    currentJob: 'PRD-1004 - Premium Olive Oil',
    manufacturer: 'FlowMatic Corp',
    installDate: '2021-08-12',
  },
];

export function Machines() {
  const { language } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'idle': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'error': return 'bg-red-100 text-red-700 hover:bg-red-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'maintenance': return <Settings className="h-5 w-5 text-yellow-600" />;
      case 'idle': return <Activity className="h-5 w-5 text-blue-600" />;
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <Settings className="h-5 w-5 text-gray-600" />;
    }
  };

  const operationalMachines = mockMachines.filter(m => m.status === 'operational').length;
  const avgUptime = (mockMachines.reduce((acc, m) => acc + m.uptime, 0) / mockMachines.length).toFixed(1);
  const avgEfficiency = (mockMachines.reduce((acc, m) => acc + m.efficiency, 0) / mockMachines.length).toFixed(1);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>{language === 'en' ? 'Machine Management' : 'مدیریت ماشین‌آلات'}</h1>
          <p className="text-gray-500">
            {language === 'en' 
              ? 'Monitor and manage production equipment' 
              : 'نظارت و مدیریت تجهیزات تولید'}
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Add Machine' : 'افزودن ماشین'}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Total Machines' : 'کل ماشین‌ها'}
              </p>
              <div className="mt-2">{mockMachines.length}</div>
              <p className="text-sm text-green-600 mt-1">
                {operationalMachines} {language === 'en' ? 'operational' : 'عملیاتی'}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Settings className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Avg Uptime' : 'میانگین زمان فعال'}
              </p>
              <div className="mt-2">{avgUptime}%</div>
              <p className="text-sm text-green-600 mt-1">
                {language === 'en' ? 'Excellent' : 'عالی'}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Avg Efficiency' : 'میانگین کارایی'}
              </p>
              <div className="mt-2">{avgEfficiency}%</div>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'en' ? 'Above target' : 'بالاتر از هدف'}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Needs Attention' : 'نیاز به توجه'}
              </p>
              <div className="mt-2 text-red-600">2</div>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'en' ? 'Issues found' : 'مشکل یافت شد'}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Machine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockMachines.map((machine) => (
          <Card key={machine.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  {getStatusIcon(machine.status)}
                </div>
                <div>
                  <h3 className="text-sm mb-1">{machine.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{machine.code}</Badge>
                    <Badge className={getStatusColor(machine.status)}>
                      {machine.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  {language === 'en' ? 'Type' : 'نوع'}:
                </span>
                <span>{machine.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  {language === 'en' ? 'Location' : 'محل'}:
                </span>
                <span>{machine.location}</span>
              </div>
              
              {machine.currentJob && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    {language === 'en' ? 'Current Job' : 'کار فعلی'}:
                  </span>
                  <span className="text-purple-600 text-xs">{machine.currentJob}</span>
                </div>
              )}

              <div className="pt-3 border-t border-gray-100">
                <div className="mb-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600">
                      {language === 'en' ? 'Uptime' : 'زمان فعال'}
                    </span>
                    <span className={machine.uptime >= 95 ? 'text-green-600' : machine.uptime >= 85 ? 'text-yellow-600' : 'text-red-600'}>
                      {machine.uptime}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${machine.uptime >= 95 ? 'bg-green-500' : machine.uptime >= 85 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${machine.uptime}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600">
                      {language === 'en' ? 'Efficiency' : 'کارایی'}
                    </span>
                    <span className={machine.efficiency >= 95 ? 'text-green-600' : machine.efficiency >= 85 ? 'text-yellow-600' : 'text-red-600'}>
                      {machine.efficiency}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${machine.efficiency >= 95 ? 'bg-green-500' : machine.efficiency >= 85 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${machine.efficiency}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    {language === 'en' ? 'Last Maintenance' : 'آخرین نگهداری'}:
                  </span>
                  <span>{new Date(machine.lastMaintenance).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    {language === 'en' ? 'Next Maintenance' : 'نگهداری بعدی'}:
                  </span>
                  <span>{new Date(machine.nextMaintenance).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    {language === 'en' ? 'Manufacturer' : 'سازنده'}:
                  </span>
                  <span>{machine.manufacturer}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
              <Button variant="outline" size="sm" className="flex-1">
                {language === 'en' ? 'View Details' : 'جزئیات'}
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                {language === 'en' ? 'Maintenance' : 'نگهداری'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
