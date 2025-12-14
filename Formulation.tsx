import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Beaker, Plus, FlaskConical, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Formula {
  id: string;
  name: string;
  code: string;
  category: string;
  version: string;
  status: 'active' | 'testing' | 'archived';
  ingredients: { name: string; percentage: number; role: string }[];
  totalPercentage: number;
  batchSize: number;
  yield: number;
  qualityScore: number;
  cost: number;
  createdBy: string;
  lastModified: string;
}

const mockFormulas: Formula[] = [
  {
    id: '1',
    name: 'Premium Tomato Sauce Formula',
    code: 'FORM-001',
    category: 'Sauces',
    version: 'v3.2',
    status: 'active',
    ingredients: [
      { name: 'Organic Tomato Puree', percentage: 75, role: 'Base' },
      { name: 'Extra Virgin Olive Oil', percentage: 8, role: 'Fat' },
      { name: 'Onion Powder', percentage: 3, role: 'Flavor' },
      { name: 'Garlic Powder', percentage: 2, role: 'Flavor' },
      { name: 'Sea Salt', percentage: 1.5, role: 'Seasoning' },
      { name: 'Black Pepper', percentage: 0.5, role: 'Spice' },
      { name: 'Basil', percentage: 2, role: 'Herb' },
      { name: 'Sugar', percentage: 1, role: 'Sweetener' },
      { name: 'Citric Acid', percentage: 0.3, role: 'Preservative' },
      { name: 'Water', percentage: 6.7, role: 'Solvent' },
    ],
    totalPercentage: 100,
    batchSize: 100,
    yield: 98,
    qualityScore: 9.2,
    cost: 3.45,
    createdBy: 'Sarah Chen',
    lastModified: '2025-10-15',
  },
  {
    id: '2',
    name: 'Whole Grain Bread Mix',
    code: 'FORM-002',
    category: 'Bakery',
    version: 'v2.0',
    status: 'active',
    ingredients: [
      { name: 'Whole Wheat Flour', percentage: 70, role: 'Base' },
      { name: 'White Flour', percentage: 15, role: 'Structure' },
      { name: 'Water', percentage: 10, role: 'Hydration' },
      { name: 'Yeast', percentage: 2, role: 'Leavening' },
      { name: 'Salt', percentage: 1.5, role: 'Flavor' },
      { name: 'Sugar', percentage: 1, role: 'Food for yeast' },
      { name: 'Vegetable Oil', percentage: 0.5, role: 'Softness' },
    ],
    totalPercentage: 100,
    batchSize: 50,
    yield: 49,
    qualityScore: 8.8,
    cost: 2.15,
    createdBy: 'Mike Johnson',
    lastModified: '2025-09-20',
  },
  {
    id: '3',
    name: 'Experimental Spice Blend X',
    code: 'FORM-003',
    category: 'Seasonings',
    version: 'v1.0-beta',
    status: 'testing',
    ingredients: [
      { name: 'Paprika', percentage: 40, role: 'Base' },
      { name: 'Cumin', percentage: 25, role: 'Flavor' },
      { name: 'Coriander', percentage: 15, role: 'Aroma' },
      { name: 'Black Pepper', percentage: 10, role: 'Heat' },
      { name: 'Garlic Powder', percentage: 5, role: 'Savory' },
      { name: 'Salt', percentage: 5, role: 'Enhancement' },
    ],
    totalPercentage: 100,
    batchSize: 10,
    yield: 9.8,
    qualityScore: 7.5,
    cost: 5.20,
    createdBy: 'Emily Wilson',
    lastModified: '2025-11-01',
  },
];

export function Formulation() {
  const { language } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'testing': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'archived': return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>{language === 'en' ? 'Formulation Management' : 'مدیریت فرمولاسیون'}</h1>
          <p className="text-gray-500">
            {language === 'en' 
              ? 'Manage product recipes and ingredient formulations' 
              : 'مدیریت دستورهای محصول و فرمول‌بندی مواد'}
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Create Formula' : 'ایجاد فرمول'}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Active Formulas' : 'فرمول‌های فعال'}
              </p>
              <div className="mt-2">68</div>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'en' ? 'Across categories' : 'در دسته‌بندی‌ها'}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Beaker className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'In Testing' : 'در حال تست'}
              </p>
              <div className="mt-2">12</div>
              <p className="text-sm text-yellow-600 mt-1">
                {language === 'en' ? 'Under evaluation' : 'در حال ارزیابی'}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <FlaskConical className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Avg Quality Score' : 'میانگین امتیاز کیفیت'}
              </p>
              <div className="mt-2">8.7/10</div>
              <p className="text-sm text-green-600 mt-1">
                {language === 'en' ? 'Excellent' : 'عالی'}
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
                {language === 'en' ? 'Cost Optimization' : 'بهینه‌سازی هزینه'}
              </p>
              <div className="mt-2 text-green-600">-8.5%</div>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'en' ? 'vs last quarter' : 'نسبت به فصل قبل'}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="formulas" className="space-y-6">
        <TabsList>
          <TabsTrigger value="formulas">
            {language === 'en' ? 'Formulas' : 'فرمول‌ها'}
          </TabsTrigger>
          <TabsTrigger value="ingredients">
            {language === 'en' ? 'Ingredient Library' : 'کتابخانه مواد'}
          </TabsTrigger>
          <TabsTrigger value="testing">
            {language === 'en' ? 'Testing & Development' : 'تست و توسعه'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="formulas" className="space-y-4">
          {mockFormulas.map((formula) => (
            <Card key={formula.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm">{formula.name}</h3>
                    <Badge variant="outline">{formula.code}</Badge>
                    <Badge className={getStatusColor(formula.status)}>{formula.status}</Badge>
                    <Badge variant="outline">{formula.version}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{language === 'en' ? 'Category' : 'دسته‌بندی'}: {formula.category}</span>
                    <span>•</span>
                    <span>{language === 'en' ? 'Created by' : 'ایجاد شده توسط'}: {formula.createdBy}</span>
                    <span>•</span>
                    <span>{language === 'en' ? 'Modified' : 'تغییر یافته'}: {new Date(formula.lastModified).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    {language === 'en' ? 'Quality Score' : 'امتیاز کیفیت'}
                  </div>
                  <div className="text-green-600 text-xl">{formula.qualityScore}/10</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
                <div>
                  <h4 className="text-sm mb-3">
                    {language === 'en' ? 'Formula Details' : 'جزئیات فرمول'}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">
                        {language === 'en' ? 'Batch Size' : 'اندازه دسته'}:
                      </span>
                      <span>{formula.batchSize} kg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">
                        {language === 'en' ? 'Yield' : 'بازده'}:
                      </span>
                      <span>{formula.yield}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">
                        {language === 'en' ? 'Cost per kg' : 'هزینه هر کیلو'}:
                      </span>
                      <span className="text-green-600">${formula.cost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <h4 className="text-sm mb-3">
                    {language === 'en' ? 'Ingredient Composition' : 'ترکیب مواد'}
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 text-xs text-gray-600">
                            {language === 'en' ? 'Ingredient' : 'ماده'}
                          </th>
                          <th className="text-left py-2 text-xs text-gray-600">
                            {language === 'en' ? 'Role' : 'نقش'}
                          </th>
                          <th className="text-right py-2 text-xs text-gray-600">
                            {language === 'en' ? 'Percentage' : 'درصد'}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {formula.ingredients.map((ing, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-2 text-sm">{ing.name}</td>
                            <td className="py-2 text-xs">
                              <Badge variant="outline" className="text-xs">{ing.role}</Badge>
                            </td>
                            <td className="py-2 text-sm text-right">{ing.percentage}%</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-gray-300">
                          <td className="py-2 text-sm" colSpan={2}>
                            {language === 'en' ? 'Total' : 'جمع'}
                          </td>
                          <td className="py-2 text-sm text-right">{formula.totalPercentage}%</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <Button variant="outline" size="sm">
                  {language === 'en' ? 'Edit Formula' : 'ویرایش فرمول'}
                </Button>
                <Button variant="outline" size="sm">
                  {language === 'en' ? 'Clone' : 'کپی'}
                </Button>
                <Button variant="outline" size="sm">
                  {language === 'en' ? 'Test Batch' : 'تست دسته'}
                </Button>
                <Button variant="outline" size="sm">
                  {language === 'en' ? 'Cost Analysis' : 'تحلیل هزینه'}
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="ingredients" className="space-y-4">
          <Card className="p-6">
            <div className="text-center py-12">
              <Beaker className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {language === 'en' ? 'Ingredient library and specifications' : 'کتابخانه و مشخصات مواد'}
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card className="p-6">
            <div className="text-center py-12">
              <FlaskConical className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {language === 'en' ? 'Formula testing and development workflow' : 'گردش کار تست و توسعه فرمول'}
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
