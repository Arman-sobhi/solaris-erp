import { Card } from './components/ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FileText, TrendingUp, DollarSign, BookOpen } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface JournalEntry {
  id: string;
  entryNumber: string;
  date: string;
  description: string;
  reference: string;
  type: 'purchase' | 'sales' | 'manual';
  debit: number;
  credit: number;
  status: 'posted' | 'draft';
}

const mockJournalEntries: JournalEntry[] = [
  {
    id: '1',
    entryNumber: 'JE-2024-8001',
    date: '2025-11-02',
    description: 'Purchase - Goods Receipt PO-2024-6002',
    reference: 'PO-2024-6002',
    type: 'purchase',
    debit: 7500,
    credit: 7500,
    status: 'posted',
  },
  {
    id: '2',
    entryNumber: 'JE-2024-8002',
    date: '2025-11-01',
    description: 'Sales - Invoice SO-2024-7001',
    reference: 'SO-2024-7001',
    type: 'sales',
    debit: 5825,
    credit: 5825,
    status: 'posted',
  },
];

const accounts = [
  { code: '1100', name: 'Cash', type: 'Asset', balance: 125000 },
  { code: '1200', name: 'Accounts Receivable', type: 'Asset', balance: 87000 },
  { code: '1300', name: 'Inventory - Raw Materials', type: 'Asset', balance: 185000 },
  { code: '1310', name: 'Inventory - Finished Goods', type: 'Asset', balance: 156000 },
  { code: '2000', name: 'Accounts Payable', type: 'Liability', balance: 65000 },
  { code: '4000', name: 'Sales Revenue', type: 'Revenue', balance: 1020000 },
  { code: '5000', name: 'Cost of Goods Sold', type: 'Expense', balance: 655000 },
];

export function Accounting() {
  const { language } = useLanguage();

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>{language === 'en' ? 'Accounting' : 'حسابداری'}</h1>
          <p className="text-gray-500">
            {language === 'en' 
              ? 'Automated accounting with transaction integration' 
              : 'حسابداری خودکار با یکپارچه‌سازی معاملات'}
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <FileText className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Manual Journal Entry' : 'ثبت دفتری دستی'}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Total Assets' : 'کل دارایی‌ها'}
              </p>
              <div className="mt-2">$553K</div>
              <p className="text-sm text-green-600 mt-1">
                {language === 'en' ? '+12% vs last month' : '۱۲٪+ نسبت به ماه قبل'}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Total Liabilities' : 'کل بدهی‌ها'}
              </p>
              <div className="mt-2">$65K</div>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'en' ? 'Accounts payable' : 'حساب‌های پرداختنی'}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Equity' : 'حقوق صاحبان سهام'}
              </p>
              <div className="mt-2">$488K</div>
              <p className="text-sm text-green-600 mt-1">
                {language === 'en' ? 'Strong position' : 'وضعیت قوی'}
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
                {language === 'en' ? 'Posted Entries' : 'ثبت‌های نهایی'}
              </p>
              <div className="mt-2">287</div>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'en' ? 'This month' : 'این ماه'}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="journal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="journal">
            {language === 'en' ? 'Journal Entries' : 'ثبت‌های دفتری'}
          </TabsTrigger>
          <TabsTrigger value="accounts">
            {language === 'en' ? 'Chart of Accounts' : 'دفتر حساب‌ها'}
          </TabsTrigger>
          <TabsTrigger value="reports">
            {language === 'en' ? 'Financial Reports' : 'گزارش‌های مالی'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="journal" className="space-y-4">
          <Card className="p-6">
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <h4 className="text-sm text-blue-800">
                  {language === 'en' ? 'Automatic Posting System' : 'سیستم ثبت خودکار'}
                </h4>
              </div>
              <p className="text-sm text-blue-700">
                {language === 'en'
                  ? 'All purchase and sales transactions automatically create accounting entries with proper debits and credits.'
                  : 'تمام معاملات خرید و فروش به طور خودکار با بدهکار و بستانکار مناسب ثبت می‌شوند.'}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Entry #' : 'شماره ثبت'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Date' : 'تاریخ'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Description' : 'شرح'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Reference' : 'مرجع'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Type' : 'نوع'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Debit' : 'بدهکار'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Credit' : 'بستانکار'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Status' : 'وضعیت'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockJournalEntries.map((entry) => (
                    <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">{entry.entryNumber}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(entry.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-sm">{entry.description}</td>
                      <td className="py-4 px-4">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {entry.reference}
                        </code>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{entry.type}</Badge>
                      </td>
                      <td className="py-4 px-4">${entry.debit.toLocaleString()}</td>
                      <td className="py-4 px-4">${entry.credit.toLocaleString()}</td>
                      <td className="py-4 px-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          {entry.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Account Code' : 'کد حساب'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Account Name' : 'نام حساب'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Type' : 'نوع'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Balance' : 'مانده'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">{account.code}</td>
                      <td className="py-4 px-4">{account.name}</td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{account.type}</Badge>
                      </td>
                      <td className="py-4 px-4">${account.balance.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="mb-4">
                {language === 'en' ? 'Balance Sheet' : 'ترازنامه'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm">{language === 'en' ? 'Assets' : 'دارایی‌ها'}</span>
                  <span>$553,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm">{language === 'en' ? 'Liabilities' : 'بدهی‌ها'}</span>
                  <span>$65,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                  <span className="text-sm">{language === 'en' ? 'Equity' : 'حقوق صاحبان سهام'}</span>
                  <span className="text-green-600">$488,000</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">
                {language === 'en' ? 'Income Statement (YTD)' : 'صورت سود و زیان'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm">{language === 'en' ? 'Revenue' : 'درآمد'}</span>
                  <span className="text-green-600">$1,020,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-sm">{language === 'en' ? 'COGS' : 'بهای تمام شده'}</span>
                  <span className="text-red-600">($655,000)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded border-t-2 border-green-600">
                  <span className="text-sm">{language === 'en' ? 'Net Profit' : 'سود خالص'}</span>
                  <span className="text-green-600">$365,000</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
