import { useState } from 'react';
import { Card } from './components/ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ShoppingBag, Plus, CheckCircle, Clock, FileText, DollarSign, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useData } from './DataContext';
import { PurchaseOrderDialog } from './PurchaseOrderDialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  items: { name: string; quantity: number; unitPrice: number }[];
  totalAmount: number;
  orderDate: string;
  expectedDate: string;
  status: 'draft' | 'approved' | 'ordered' | 'received' | 'invoiced';
  receiptDate?: string;
  invoiceNumber?: string;
}

interface Receipt {
  id: string;
  receiptNumber: string;
  poNumber: string;
  supplier: string;
  receivedDate: string;
  receivedBy: string;
  status: 'pending' | 'verified' | 'stored';
  items: { name: string; ordered: number; received: number; damaged: number }[];
}

const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: '1',
    poNumber: 'PO-2024-6001',
    supplier: 'Farm Fresh Supplies',
    items: [
      { name: 'Organic Wheat Flour', quantity: 2000, unitPrice: 4.25 },
      { name: 'Fresh Eggs', quantity: 500, unitPrice: 3.50 },
    ],
    totalAmount: 10250,
    orderDate: '2025-11-01',
    expectedDate: '2025-11-05',
    status: 'approved',
  },
  {
    id: '2',
    poNumber: 'PO-2024-6002',
    supplier: 'PackPro Industries',
    items: [
      { name: 'Glass Jars 500ml', quantity: 5000, unitPrice: 1.35 },
      { name: 'Labels Premium', quantity: 5000, unitPrice: 0.15 },
    ],
    totalAmount: 7500,
    orderDate: '2025-10-28',
    expectedDate: '2025-11-02',
    status: 'received',
    receiptDate: '2025-11-02',
  },
];

const mockReceipts: Receipt[] = [
  {
    id: '1',
    receiptNumber: 'RCP-2024-1001',
    poNumber: 'PO-2024-6002',
    supplier: 'PackPro Industries',
    receivedDate: '2025-11-02',
    receivedBy: 'John Martinez',
    status: 'verified',
    items: [
      { name: 'Glass Jars 500ml', ordered: 5000, received: 4980, damaged: 20 },
      { name: 'Labels Premium', ordered: 5000, received: 5000, damaged: 0 },
    ],
  },
];

export function Purchasing() {
  const { language, t } = useLanguage();
  const { purchaseOrders, addPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } = useData();
  const [activeTab, setActiveTab] = useState('purchase-orders');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [editingPO, setEditingPO] = useState<any>(null);

  const handleAddNew = () => {
    setDialogMode('add');
    setEditingPO(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (po: any) => {
    setDialogMode('edit');
    setEditingPO(po);
    setIsDialogOpen(true);
  };

  const handleSave = (data: any) => {
    if (dialogMode === 'add') {
      addPurchaseOrder(data);
    } else if (editingPO) {
      updatePurchaseOrder(editingPO.id, data);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this purchase order?')) {
      deletePurchaseOrder(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
      case 'approved': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'ordered': return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      case 'received': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'invoiced': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'verified': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'pending': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'stored': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>{language === 'en' ? 'Purchasing Management' : 'مدیریت خرید'}</h1>
          <p className="text-gray-500">
            {language === 'en' 
              ? 'Complete purchase flow: PO → Receipt → Invoice → Accounting' 
              : 'جریان کامل خرید: سفارش خرید ← دریافت ← فاکتور ← حسابداری'}
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          {language === 'en' ? 'New Purchase Order' : 'سفارش خرید جدید'}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Open POs' : 'سفارشات باز'}
              </p>
              <div className="mt-2">24</div>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'en' ? '$186K value' : '۱۸۶ هزار دلار'}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Pending Receipts' : 'دریافت‌های در انتظار'}
              </p>
              <div className="mt-2">8</div>
              <p className="text-sm text-yellow-600 mt-1">
                {language === 'en' ? 'Need verification' : 'نیاز به تایید'}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Received (Month)' : 'دریافت شده (ماه)'}
              </p>
              <div className="mt-2">45</div>
              <p className="text-sm text-green-600 mt-1">
                {language === 'en' ? '98% accuracy' : '۹۸٪ دقت'}
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
                {language === 'en' ? 'Pending Invoices' : 'فاکتورهای معوق'}
              </p>
              <div className="mt-2">$32K</div>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'en' ? '12 invoices' : '۱۲ فاکتور'}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="purchase-orders">
            {language === 'en' ? 'Purchase Orders' : 'سفارشات خرید'}
          </TabsTrigger>
          <TabsTrigger value="receipts">
            {language === 'en' ? 'Goods Receipt' : 'دریافت کالا'}
          </TabsTrigger>
          <TabsTrigger value="invoices">
            {language === 'en' ? 'Supplier Invoices' : 'فاکتورهای تامین‌کننده'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="purchase-orders" className="space-y-4">
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'PO Number' : 'شماره سفارش'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Supplier' : 'تامین‌کننده'}
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
                      {language === 'en' ? 'Expected Date' : 'تاریخ تحویل'}
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
                  {purchaseOrders.map((po) => (
                    <tr key={po.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">{po.poNumber}</td>
                      <td className="py-4 px-4">{po.supplier}</td>
                      <td className="py-4 px-4">
                        <div className="text-sm">{po.items.length} items</div>
                      </td>
                      <td className="py-4 px-4">${po.totalAmount.toLocaleString()}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(po.orderDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(po.expectedDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(po.status)}>
                          {po.status}
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
                            <DropdownMenuItem onClick={() => handleEdit(po)}>
                              <Edit className="mr-2 h-4 w-4" />
                              {language === 'en' ? 'Edit' : 'ویرایش'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(po.id)}>
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
              {language === 'en' ? 'Purchase Transaction Flow' : 'جریان معامله خرید'}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-sm">
                        {language === 'en' ? '1. Create PO' : '۱. ایجاد سفارش'}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-0.5 bg-gray-300"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="text-sm">
                        {language === 'en' ? '2. Goods Receipt' : '۲. دریافت کالا'}
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
                        {language === 'en' ? '3. Vendor Invoice' : '۳. فاکتور تامین‌کننده'}
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
                        {language === 'en' ? '4. Accounting Entry' : '۴. ثبت حسابداری'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm">
              <p className="text-blue-800">
                {language === 'en' 
                  ? '✓ Automatic inventory updates • ✓ Automatic accounting postings • ✓ Real-time cost tracking'
                  : '✓ بروزرسانی خودکار انبار • ✓ ثبت خودکار حسابداری • ✓ پیگیری هزینه‌ها در لحظه'}
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="receipts" className="space-y-4">
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Receipt #' : 'شماره رسید'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'PO Number' : 'شماره سفارش'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Supplier' : 'تامین‌کننده'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Received Date' : 'تاریخ دریافت'}
                    </th>
                    <th className="text-left py-3 px-4 text-gray-600">
                      {language === 'en' ? 'Received By' : 'دریافت‌کننده'}
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
                  {mockReceipts.map((receipt) => (
                    <tr key={receipt.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">{receipt.receiptNumber}</td>
                      <td className="py-4 px-4">{receipt.poNumber}</td>
                      <td className="py-4 px-4">{receipt.supplier}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(receipt.receivedDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">{receipt.receivedBy}</td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(receipt.status)}>
                          {receipt.status}
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
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card className="p-6">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {language === 'en' ? 'Supplier invoices view' : 'نمای فاکتورهای تامین‌کننده'}
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <PurchaseOrderDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode={dialogMode}
        purchaseOrder={editingPO}
        onSave={handleSave}
      />
    </div>
  );
}