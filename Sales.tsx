import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ShoppingCart, Plus, Truck, FileText, DollarSign, CheckCircle, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useData } from './DataContext';
import { SalesOrderDialog } from './SalesOrderDialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface SalesOrder {
  id: string;
  soNumber: string;
  customer: string;
  items: { name: string; quantity: number; unitPrice: number }[];
  totalAmount: number;
  orderDate: string;
  deliveryDate: string;
  status: 'draft' | 'confirmed' | 'picked' | 'delivered' | 'invoiced';
  deliveryNumber?: string;
  invoiceNumber?: string;
}

export function Sales() {
  const { language, t } = useLanguage();
  const { salesOrders, addSalesOrder, updateSalesOrder, deleteSalesOrder } = useData();
  const [activeTab, setActiveTab] = useState('sales-orders');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [editingSalesOrder, setEditingSalesOrder] = useState<any>(null);

  const handleAddNew = () => {
    setDialogMode('add');
    setEditingSalesOrder(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (order: any) => {
    setDialogMode('edit');
    setEditingSalesOrder(order);
    setIsDialogOpen(true);
  };

  const handleSave = (data: any) => {
    if (dialogMode === 'add') {
      addSalesOrder(data);
    } else if (editingSalesOrder) {
      updateSalesOrder(editingSalesOrder.id, data);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this sales order?')) {
      deleteSalesOrder(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      case 'confirmed': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'picked': return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      case 'delivered': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'invoiced': return 'bg-green-100 text-green-700 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  // Calculate KPIs
  const openOrders = salesOrders.filter(so => so.status !== 'invoiced' && so.status !== 'delivered').length;
  const totalValue = salesOrders.reduce((sum, so) => sum + so.totalAmount, 0);
  const deliveredOrders = salesOrders.filter(so => so.status === 'delivered').length;
  const invoicedOrders = salesOrders.filter(so => so.status === 'invoiced').length;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>{language === 'en' ? 'Sales Management' : 'مدیریت فروش'}</h1>
          <p className="text-gray-500">
            {language === 'en' 
              ? 'Complete sales flow: SO → Delivery → Invoice → Accounting' 
              : 'جریان کامل فروش: سفارش فروش ← تحویل ← فاکتور ← حسابداری'}
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          {language === 'en' ? 'New Sales Order' : 'سفارش فروش جدید'}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Open Orders' : 'سفارشات باز'}
              </p>
              <div className="mt-2">{openOrders}</div>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'en' ? `$${totalValue.toLocaleString()} value` : `مبلغ ${totalValue.toLocaleString()} دلار`}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Pending Deliveries' : 'تحویل‌های در انتظار'}
              </p>
              <div className="mt-2">15</div>
              <p className="text-sm text-yellow-600 mt-1">
                {language === 'en' ? 'To be shipped' : 'آماده ارسال'}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Truck className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Delivered (Month)' : 'تحویل شده (ماه)'}
              </p>
              <div className="mt-2">{deliveredOrders}</div>
              <p className="text-sm text-green-600 mt-1">
                {language === 'en' ? '96% on-time' : '۹۶٪ به موقع'}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Revenue (Month)' : 'درآمد (ماه)'}
              </p>
              <div className="mt-2">$198K</div>
              <p className="text-sm text-green-600 mt-1">
                {language === 'en' ? '+15% vs last month' : '۱۵٪+ نسبت به ماه قبل'}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="sales-orders">
            {language === 'en' ? 'Sales Orders' : 'سفارشات فروش'}
          </TabsTrigger>
          <TabsTrigger value="deliveries">
            {language === 'en' ? 'Deliveries' : 'تحویل‌ها'}
          </TabsTrigger>
          <TabsTrigger value="invoices">
            {language === 'en' ? 'Customer Invoices' : 'فاکتورهای مشتری'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales-orders" className="space-y-4">
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'SO Number' : 'شماره سفارش'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Customer' : 'مشتری'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Items' : 'اقلام'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Amount' : 'مبلغ'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Order Date' : 'تاریخ سفارش'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Delivery Date' : 'تاریخ تحویل'}
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
                  {salesOrders.map((so) => (
                    <tr key={so.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">{so.soNumber}</td>
                      <td className="py-4 px-4">{so.customer}</td>
                      <td className="py-4 px-4">
                        <div className="text-sm">{so.items.length} items</div>
                      </td>
                      <td className="py-4 px-4">${so.totalAmount.toLocaleString()}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(so.orderDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(so.deliveryDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(so.status)}>
                          {so.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(so)}>
                              <Edit className="mr-2 h-4 w-4" />
                              {language === 'en' ? 'Edit' : 'ویرایش'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(so.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              {language === 'en' ? 'Delete' : 'حذف'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Transaction Flow */}
          <Card className="p-6">
            <h3 className="mb-4">
              {language === 'en' ? 'Sales Transaction Flow' : 'جریان معامله فروش'}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-sm">
                        {language === 'en' ? '1. Create SO' : '۱. ایجاد سفارش'}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-0.5 bg-gray-300"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Truck className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="text-sm">
                        {language === 'en' ? '2. Pick & Deliver' : '۲. آماده‌سازی و ارسال'}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-0.5 bg-gray-300"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-yellow-600" />
                      </div>
                      <span className="text-sm">
                        {language === 'en' ? '3. Create Invoice' : '۳. صدور فاکتور'}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-0.5 bg-gray-300"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-sm">
                        {language === 'en' ? '4. Record Revenue' : '۴. ثبت درآمد'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-50 rounded-lg text-sm">
              <p className="text-green-800">
                {language === 'en' 
                  ? '✓ Automatic inventory reduction • ✓ Automatic revenue recognition • ✓ Real-time profitability'
                  : '✓ کاهش خودکار موجودی • ✓ شناسایی خودکار درآمد • ✓ سودآوری در لحظه'}
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="deliveries" className="space-y-4">
          <Card className="p-6">
            <div className="text-center py-12">
              <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {language === 'en' ? 'Deliveries view' : 'نمای تحویل‌ها'}
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card className="p-6">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {language === 'en' ? 'Customer invoices view' : 'نمای فاکتورهای مشتری'}
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sales Order Dialog */}
      <SalesOrderDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode={dialogMode}
        salesOrder={editingSalesOrder}
        onSave={handleSave}
      />
    </div>
  );
}