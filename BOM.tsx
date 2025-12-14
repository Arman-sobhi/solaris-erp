import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BookOpen, Plus, Factory, Calendar, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BOMItem {
  id: string;
  productName: string;
  productCode: string;
  version: string;
  status: 'active' | 'draft' | 'obsolete';
  materials: { name: string; quantity: number; unit: string; cost: number }[];
  totalCost: number;
  yield: number;
  lastUpdated: string;
}

interface ProductionPlan {
  id: string;
  planNumber: string;
  product: string;
  plannedQuantity: number;
  startDate: string;
  endDate: string;
  status: 'planned' | 'in-progress' | 'completed';
  progress: number;
}

const mockBOMs: BOMItem[] = [
  {
    id: '1',
    productName: 'Organic Tomato Sauce',
    productCode: 'PRD-001',
    version: 'v2.1',
    status: 'active',
    materials: [
      { name: 'Organic Tomatoes', quantity: 5, unit: 'kg', cost: 12.50 },
      { name: 'Olive Oil', quantity: 0.5, unit: 'L', cost: 8.00 },
      { name: 'Salt', quantity: 0.05, unit: 'kg', cost: 0.10 },
      { name: 'Glass Jar 500ml', quantity: 10, unit: 'units', cost: 13.50 },
    ],
    totalCost: 34.10,
    yield: 10,
    lastUpdated: '2025-10-15',
  },
  {
    id: '2',
    productName: 'Whole Wheat Bread',
    productCode: 'PRD-002',
    version: 'v1.5',
    status: 'active',
    materials: [
      { name: 'Organic Wheat Flour', quantity: 10, unit: 'kg', cost: 42.50 },
      { name: 'Yeast', quantity: 0.2, unit: 'kg', cost: 3.50 },
      { name: 'Water', quantity: 6, unit: 'L', cost: 0.00 },
      { name: 'Salt', quantity: 0.15, unit: 'kg', cost: 0.30 },
    ],
    totalCost: 46.30,
    yield: 20,
    lastUpdated: '2025-09-20',
  },
];

const mockProductionPlans: ProductionPlan[] = [
  {
    id: '1',
    planNumber: 'PLAN-2024-001',
    product: 'Organic Tomato Sauce',
    plannedQuantity: 5000,
    startDate: '2025-11-05',
    endDate: '2025-11-10',
    status: 'planned',
    progress: 0,
  },
  {
    id: '2',
    planNumber: 'PLAN-2024-002',
    product: 'Whole Wheat Bread',
    plannedQuantity: 3000,
    startDate: '2025-11-03',
    endDate: '2025-11-06',
    status: 'in-progress',
    progress: 45,
  },
];

export function BOM() {
  const { language } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'draft': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'obsolete': return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      case 'planned': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'in-progress': return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      case 'completed': return 'bg-green-100 text-green-700 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>{language === 'en' ? 'BOM & Production Planning' : 'لیست مواد اولیه و برنامه‌ریزی تولید'}</h1>
          <p className="text-gray-500">
            {language === 'en' 
              ? 'Manage bill of materials and production schedules' 
              : 'مدیریت لیست مواد اولیه و برنامه تولید'}
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Create BOM' : 'ایجاد BOM'}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Active BOMs' : 'BOMهای فعال'}
              </p>
              <div className="mt-2">45</div>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'en' ? 'Products' : 'محصولات'}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Production Plans' : 'برنامه‌های تولید'}
              </p>
              <div className="mt-2">12</div>
              <p className="text-sm text-purple-600 mt-1">
                {language === 'en' ? '8 in progress' : '۸ در حال اجرا'}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Material Efficiency' : 'کارایی مواد'}
              </p>
              <div className="mt-2">96.8%</div>
              <p className="text-sm text-green-600 mt-1">
                {language === 'en' ? 'Above target' : 'بالاتر از هدف'}
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
                {language === 'en' ? 'Avg Unit Cost' : 'میانگین هزینه واحد'}
              </p>
              <div className="mt-2">$4.85</div>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'en' ? 'Per unit' : 'به ازای هر واحد'}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Factory className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="bom" className="space-y-6">
        <TabsList>
          <TabsTrigger value="bom">
            {language === 'en' ? 'Bill of Materials' : 'لیست مواد اولیه'}
          </TabsTrigger>
          <TabsTrigger value="planning">
            {language === 'en' ? 'Production Planning' : 'برنامه‌ریزی تولید'}
          </TabsTrigger>
          <TabsTrigger value="costing">
            {language === 'en' ? 'Cost Analysis' : 'تحلیل هزینه'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bom" className="space-y-4">
          {mockBOMs.map((bom) => (
            <Card key={bom.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm">{bom.productName}</h3>
                    <Badge variant="outline">{bom.productCode}</Badge>
                    <Badge className={getStatusColor(bom.status)}>{bom.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? 'Version' : 'نسخه'}: {bom.version} • 
                    {language === 'en' ? ' Yield' : ' بازده'}: {bom.yield} {language === 'en' ? 'units' : 'واحد'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    {language === 'en' ? 'Total Cost' : 'کل هزینه'}
                  </div>
                  <div className="text-green-600">${bom.totalCost.toFixed(2)}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    ${(bom.totalCost / bom.yield).toFixed(2)} {language === 'en' ? 'per unit' : 'هر واحد'}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm mb-3">
                  {language === 'en' ? 'Required Materials' : 'مواد مورد نیاز'}
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-3 text-xs text-gray-600">
                          {language === 'en' ? 'Material' : 'ماده'}
                        </th>
                        <th className="text-left py-2 px-3 text-xs text-gray-600">
                          {language === 'en' ? 'Quantity' : 'مقدار'}
                        </th>
                        <th className="text-left py-2 px-3 text-xs text-gray-600">
                          {language === 'en' ? 'Unit' : 'واحد'}
                        </th>
                        <th className="text-left py-2 px-3 text-xs text-gray-600">
                          {language === 'en' ? 'Cost' : 'هزینه'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bom.materials.map((material, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-2 px-3 text-sm">{material.name}</td>
                          <td className="py-2 px-3 text-sm">{material.quantity}</td>
                          <td className="py-2 px-3 text-sm">{material.unit}</td>
                          <td className="py-2 px-3 text-sm">${material.cost.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" size="sm">
                  {language === 'en' ? 'Edit' : 'ویرایش'}
                </Button>
                <Button variant="outline" size="sm">
                  {language === 'en' ? 'Copy' : 'کپی'}
                </Button>
                <Button variant="outline" size="sm">
                  {language === 'en' ? 'New Version' : 'نسخه جدید'}
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Plan #' : 'شماره برنامه'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Product' : 'محصول'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Quantity' : 'تعداد'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Start Date' : 'تاریخ شروع'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'End Date' : 'تاریخ پایان'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Progress' : 'پیشرفت'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Status' : 'وضعیت'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Actions' : 'عملیات'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockProductionPlans.map((plan) => (
                    <tr key={plan.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">{plan.planNumber}</td>
                      <td className="py-4 px-4">{plan.product}</td>
                      <td className="py-4 px-4">{plan.plannedQuantity}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(plan.startDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(plan.endDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-purple-500"
                              style={{ width: `${plan.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">{plan.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(plan.status)}>
                          {plan.status}
                        </Badge>
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

          {/* Material Requirements Planning */}
          <Card className="p-6">
            <h3 className="mb-4">
              {language === 'en' ? 'Material Requirements (MRP)' : 'نیازهای مواد (MRP)'}
            </h3>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-800">
                {language === 'en'
                  ? 'Based on production plans, the system automatically calculates required raw materials and generates purchase requisitions.'
                  : 'بر اساس برنامه‌های تولید، سیستم به طور خودکار مواد اولیه مورد نیاز را محاسبه و درخواست خرید ایجاد می‌کند.'}
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="costing" className="space-y-4">
          <Card className="p-6">
            <div className="text-center py-12">
              <Factory className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {language === 'en' ? 'Cost analysis and breakdown view' : 'نمای تحلیل هزینه'}
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
