import React, { useState } from 'react';
import { UniversalModuleTemplate } from '../components/layout/UniversalModuleTemplate';
import { ModuleConfig, ModuleFilter, ModuleColumn } from '../types/module';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Plus, Trash2, Settings, Type, List, Calendar, Table, CreditCard, Layout, AlignLeft, Hash, Download, Code, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../components/ui/utils';
import { Badge } from '../components/ui/badge';

// Import configs for the builder to "read"
import productionConfig from '../configs/production.json';
import purchasingConfig from '../configs/purchasing.json';
import maintenanceConfig from '../configs/maintenance.json';
import inventoryConfig from '../configs/inventory.json';
import crmConfig from '../configs/crm.json';
import qualityConfig from '../configs/quality.json';
import supplyChainConfig from '../configs/supply-chain.json';
import fsmConfig from '../configs/fsm.json';
import hrConfig from '../configs/hr.json';
import financeConfig from '../configs/finance.json';
import procurementConfig from '../configs/procurement.json';
import shippingConfig from '../configs/shipping.json';
import salesConfig from '../configs/sales.json';
import accountingConfig from '../configs/accounting.json';
import machinesConfig from '../configs/machines.json';
import bomConfig from '../configs/bom.json';
import formulationConfig from '../configs/formulation.json';
import projectsConfig from '../configs/projects.json';
import invoicesConfig from '../configs/invoices.json';
import analyticsConfig from '../configs/analytics.json';
import partnersConfig from '../configs/partners.json';
import ordersConfig from '../configs/orders.json';
import productsConfig from '../configs/products.json';

const DEFAULT_TEMPLATE: ModuleConfig = {
  id: 'new-module',
  title: 'ماژول جدید',
  subtitle: 'شرح ماژول سفارشی',
  iconName: 'Layout',
  primaryAction: { label: 'رکورد جدید', iconName: 'Plus' },
  filters: [],
  columns: [
    { key: 'id', label: 'شناسه', type: 'text' },
    { key: 'createdAt', label: 'تاریخ ایجاد', type: 'date' }
  ],
  formFields: []
};

export function ModuleBuilder() {
  const [activeTab, setActiveTab] = useState<'design' | 'json'>('design');
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [config, setConfig] = useState<ModuleConfig>(DEFAULT_TEMPLATE);
  const [editingItem, setEditingItem] = useState<{ type: 'filter' | 'column' | 'field', id: string } | null>(null);

  const availableModules = [
    { id: 'dashboard', name: 'پیشخوان' },
    { id: 'production', name: 'تولید' },
    { id: 'purchasing', name: 'خرید' },
    { id: 'maintenance', name: 'تعمیرات' },
    { id: 'inventory', name: 'انبار' },
    { id: 'crm', name: 'مشتریان' },
    { id: 'quality', name: 'کنترل کیفیت' },
    { id: 'supply-chain', name: 'زنجیره تامین' },
    { id: 'fsm', name: 'خدمات میدانی' },
    { id: 'hr', name: 'منابع انسانی' },
    { id: 'finance', name: 'امور مالی' },
    { id: 'procurement', name: 'تدارکات' },
    { id: 'shipping', name: 'ارسال' },
    { id: 'sales', name: 'فروش' },
    { id: 'accounting', name: 'حسابداری' },
    { id: 'machines', name: 'ماشین‌آلات' },
    { id: 'bom', name: 'ساختار محصول' },
    { id: 'formulation', name: 'فرمولاسیون' },
    { id: 'projects', name: 'پروژه‌ها' },
    { id: 'invoices', name: 'فاکتورها' },
    { id: 'analytics', name: 'تحلیل داده' },
    { id: 'partners', name: 'همکاران تجاری' },
    { id: 'orders', name: 'مدیریت سفارشات' },
    { id: 'products', name: 'محصولات' },
  ];

  const handleSelectModule = (moduleId: string) => {
    setSelectedModule(moduleId);
    
    const configRegistry: Record<string, any> = {
      production: productionConfig,
      purchasing: purchasingConfig,
      maintenance: maintenanceConfig,
      inventory: inventoryConfig,
      crm: crmConfig,
      quality: qualityConfig,
      'supply-chain': supplyChainConfig,
      fsm: fsmConfig,
      hr: hrConfig,
      finance: financeConfig,
      procurement: procurementConfig,
      shipping: shippingConfig,
      sales: salesConfig,
      accounting: accountingConfig,
      machines: machinesConfig,
      bom: bomConfig,
      formulation: formulationConfig,
      projects: projectsConfig,
      invoices: invoicesConfig,
      analytics: analyticsConfig,
      partners: partnersConfig,
      orders: ordersConfig,
      products: productsConfig,
    };

    const selectedConfig = configRegistry[moduleId];
    
    if (selectedConfig) {
      const configToLoad = moduleId === 'crm' ? selectedConfig.views.leads : selectedConfig;
      setConfig({
        ...DEFAULT_TEMPLATE,
        ...configToLoad,
        id: moduleId,
        filters: configToLoad.filters || [],
        columns: configToLoad.columns?.length ? configToLoad.columns : DEFAULT_TEMPLATE.columns,
        formFields: configToLoad.formFields || []
      });
    } else {
      setConfig({ ...DEFAULT_TEMPLATE, id: moduleId });
    }
    setEditingItem(null);
  };

  const handleSave = () => {
    const payload = {
      moduleId: selectedModule || config.id,
      config: config
    };
    console.log('[NEW_CONFIG_READY]', JSON.stringify(payload, null, 2));
    alert(`پیکربندی جدید آماده است. لاگ [NEW_CONFIG_READY] در کنسول ایجاد شد.`);
  };

  const [mockData] = useState([
    { id: '1', name: 'نمونه ۱', status: 'فعال', amount: 500000, date: '2025-01-01' },
    { id: '2', name: 'نمونه ۲', status: 'غیرفعال', amount: 250000, date: '2025-01-02' },
  ]);

  const addFilter = (type: ModuleFilter['type']) => {
    const newFilter: ModuleFilter = {
      id: `filter-${Date.now()}`,
      type,
      label: type === 'text' ? 'جستجو' : type === 'select' ? 'وضعیت' : 'تاریخ',
      placeholder: 'وارد کنید...',
      options: type === 'select' ? [{ label: 'گزینه ۱', value: '1' }] : undefined
    };
    setConfig(prev => ({
      ...prev,
      filters: [...(prev.filters || []), newFilter]
    }));
  };

  const addColumn = (type: ModuleColumn['type']) => {
    const newColumn: ModuleColumn = {
      key: `col-${Date.now()}`,
      label: 'ستون جدید',
      type
    };
    setConfig(prev => ({
      ...prev,
      columns: [...(prev.columns || []), newColumn]
    }));
  };

  const addFormField = (type: string) => {
    const newField = {
      id: `field-${Date.now()}`,
      label: type === 'text' ? 'فیلد متنی' : type === 'number' ? 'فیلد عددی' : 'فیلد جدید',
      type,
      colSpan: type === 'textarea' ? 2 : 1
    };
    setConfig(prev => ({
      ...prev,
      formFields: [...(prev.formFields || []), newField]
    }));
  };

  const removeFilter = (id: string) => {
    setConfig({ ...config, filters: config.filters.filter(f => f.id !== id) });
    if (editingItem?.id === id) setEditingItem(null);
  };

  const removeColumn = (key: string) => {
    setConfig({ ...config, columns: config.columns.filter(c => c.key !== key) });
    if (editingItem?.id === key) setEditingItem(null);
  };

  const removeFormField = (id: string) => {
    setConfig({ ...config, formFields: config.formFields.filter(f => f.id !== id) });
    if (editingItem?.id === id) setEditingItem(null);
  };

  const moveItem = (type: 'filter' | 'column' | 'field', index: number, direction: 'up' | 'down') => {
    const key = type === 'filter' ? 'filters' : type === 'column' ? 'columns' : 'formFields';
    const items = [...config[key]] as any[];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < items.length) {
      [items[index], items[newIndex]] = [items[newIndex], items[index]];
      setConfig({ ...config, [key]: items });
    }
  };

  const updateItem = (type: 'filter' | 'column' | 'field', id: string, updates: any) => {
    const key = type === 'filter' ? 'filters' : type === 'column' ? 'columns' : 'formFields';
    const idKey = type === 'column' ? 'key' : 'id';
    
    setConfig({
      ...config,
      [key]: (config[key] as any[]).map(item => 
        item[idKey] === id ? { ...item, ...updates } : item
      )
    });
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${config.id}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="flex h-screen bg-damask text-rosary overflow-hidden" dir="rtl">
      {/* Sidebar: Toolbox */}
      <div className="w-96 border-l border-white/10 p-6 space-y-8 overflow-y-auto bg-black/40 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Settings className="text-gold h-6 w-6 animate-spin-slow" />
            <h1 className="text-xl font-black text-gold tracking-tight">ابزار ساخت ماژول</h1>
          </div>
          <div className="flex bg-white/5 p-1 rounded-lg">
             <Button 
               variant="ghost" 
               size="sm" 
               onClick={() => setActiveTab('design')}
               className={activeTab === 'design' ? "bg-gold text-damask hover:bg-gold" : "text-rosary/40"}
              >طراحی</Button>
             <Button 
               variant="ghost" 
               size="sm" 
               onClick={() => setActiveTab('json')}
               className={activeTab === 'json' ? "bg-gold text-damask hover:bg-gold" : "text-rosary/40"}
              >JSON</Button>
          </div>
        </div>

        <section className="space-y-4 mb-8">
           <Label className="text-[10px] text-rosary/40 mb-1 block uppercase tracking-widest">ویرایش ماژول موجود</Label>
           <Select onValueChange={handleSelectModule} value={selectedModule}>
             <SelectTrigger className="bg-white/5 border-white/10 text-rosary h-11 rounded-xl">
               <SelectValue placeholder="یک ماژول را انتخاب کنید..." />
             </SelectTrigger>
             <SelectContent className="bg-damask border-white/10 text-rosary">
               {availableModules.map(m => (
                 <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
               ))}
             </SelectContent>
           </Select>
        </section>

        {activeTab === 'design' ? (
          <>
            <section className="space-y-4">
              <h2 className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">۱. اطلاعات پایه</h2>
              <div className="space-y-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                <div>
                  <Label className="text-[10px] text-rosary/40 mb-1 block">عنوان ماژول</Label>
                  <Input 
                    value={config.title} 
                    onChange={(e) => setConfig({...config, title: e.target.value})}
                    className="bg-white/5 border-white/10 h-10 rounded-xl focus:border-gold/50"
                  />
                </div>
                <div>
                  <Label className="text-[10px] text-rosary/40 mb-1 block">توضیحات</Label>
                  <Input 
                    value={config.subtitle} 
                    onChange={(e) => setConfig({...config, subtitle: e.target.value})}
                    className="bg-white/5 border-white/10 h-10 rounded-xl focus:border-gold/50"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">۲. فیلترها</h2>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={() => addFilter('text')} className="flex-col gap-1 h-20 border-white/5 hover:border-gold/30 rounded-2xl bg-white/5">
                  <Type className="h-5 w-5 text-gold/60" />
                  <span className="text-[10px]">متن</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => addFilter('select')} className="flex-col gap-1 h-20 border-white/5 hover:border-gold/30 rounded-2xl bg-white/5">
                  <List className="h-5 w-5 text-gold/60" />
                  <span className="text-[10px]">انتخاب</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => addFilter('date')} className="flex-col gap-1 h-20 border-white/5 hover:border-gold/30 rounded-2xl bg-white/5">
                  <Calendar className="h-5 w-5 text-gold/60" />
                  <span className="text-[10px]">تاریخ</span>
                </Button>
              </div>
              
              <div className="space-y-4">
                {config.filters.map((f, i) => (
                  <div key={f.id} className={cn(
                    "relative group p-4 bg-white/5 rounded-2xl border transition-all cursor-pointer",
                    editingItem?.id === f.id ? "border-gold/50 bg-gold/5" : "border-white/5 hover:border-white/10"
                  )} onClick={() => setEditingItem({ type: 'filter', id: f.id })}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[9px] border-white/10 text-rosary/40">{f.type}</Badge>
                        <span className="text-xs font-bold">{f.label}</span>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); moveItem('filter', i, 'up'); }} className="h-6 w-6 rounded-md hover:bg-white/10" disabled={i === 0}>
                           <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); moveItem('filter', i, 'down'); }} className="h-6 w-6 rounded-md hover:bg-white/10" disabled={i === config.filters.length - 1}>
                           <ChevronDown className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); removeFilter(f.id); }} className="h-6 w-6 rounded-md hover:bg-blood/10 text-blood">
                           <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    {editingItem?.id === f.id && (
                      <div className="space-y-3 pt-3 border-t border-white/5" onClick={e => e.stopPropagation()}>
                         <Input 
                           value={f.label} 
                           onChange={(e) => updateItem('filter', f.id, { label: e.target.value })}
                           placeholder="نام فیلتر"
                           className="h-8 text-xs bg-black/20 border-white/10"
                         />
                         <Input 
                           value={f.placeholder} 
                           onChange={(e) => updateItem('filter', f.id, { placeholder: e.target.value })}
                           placeholder="متن نگهدارنده"
                           className="h-8 text-xs bg-black/20 border-white/10 mt-2"
                         />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">۳. ستون‌های جدول</h2>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={() => addColumn('text')} className="flex-col gap-1 h-20 border-white/5 bg-white/5 hover:border-gold/30 rounded-2xl">
                  <Type className="h-5 w-5 text-gold/60" />
                  <span className="text-[10px]">متن</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => addColumn('badge')} className="flex-col gap-1 h-20 border-white/5 bg-white/5 hover:border-gold/30 rounded-2xl">
                  <CreditCard className="h-5 w-5 text-gold/60" />
                  <span className="text-[10px]">نشان</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => addColumn('currency')} className="flex-col gap-1 h-20 border-white/5 bg-white/5 hover:border-gold/30 rounded-2xl">
                  <Table className="h-5 w-5 text-gold/60" />
                  <span className="text-[10px]">مبلغ</span>
                </Button>
              </div>

              <div className="space-y-4">
                {config.columns.map((c, i) => (
                  <div key={c.key} className={cn(
                    "relative group p-4 bg-white/5 rounded-2xl border transition-all cursor-pointer",
                    editingItem?.id === c.key ? "border-gold/50 bg-gold/5" : "border-white/5 hover:border-white/10"
                  )} onClick={() => setEditingItem({ type: 'column', id: c.key })}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[9px] border-white/10 text-rosary/40">{c.type}</Badge>
                        <span className="text-xs font-bold">{c.label}</span>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); moveItem('column', i, 'up'); }} className="h-6 w-6 rounded-md hover:bg-white/10" disabled={i === 0}>
                           <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); moveItem('column', i, 'down'); }} className="h-6 w-6 rounded-md hover:bg-white/10" disabled={i === config.columns.length - 1}>
                           <ChevronDown className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); removeColumn(c.key); }} className="h-6 w-6 rounded-md hover:bg-blood/10 text-blood">
                           <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    {editingItem?.id === c.key && (
                      <div className="space-y-3 pt-3 border-t border-white/5" onClick={e => e.stopPropagation()}>
                         <Input 
                           value={c.label} 
                           onChange={(e) => updateItem('column', c.key, { label: e.target.value })}
                           placeholder="عنوان ستون"
                           className="h-8 text-xs bg-black/20 border-white/10"
                         />
                         <Select value={c.type} onValueChange={(val) => updateItem('column', c.key, { type: val })}>
                            <SelectTrigger className="h-8 text-xs bg-black/20 border-white/10">
                               <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-damask border-white/10">
                               <SelectItem value="text">متن</SelectItem>
                               <SelectItem value="badge">نشان</SelectItem>
                               <SelectItem value="currency">مبلغ</SelectItem>
                               <SelectItem value="date">تاریخ</SelectItem>
                               <SelectItem value="progress">پیشرفت</SelectItem>
                            </SelectContent>
                         </Select>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">۴. فیلد‌های فرم (Entry Form)</h2>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => addFormField('text')} className="gap-2 border-white/5 bg-white/5 hover:border-gold/30 rounded-xl h-12">
                  <Type className="h-4 w-4" />
                  متن
                </Button>
                <Button variant="outline" size="sm" onClick={() => addFormField('number')} className="gap-2 border-white/5 bg-white/5 hover:border-gold/30 rounded-xl h-12">
                  <Hash className="h-4 w-4" />
                  عدد
                </Button>
                <Button variant="outline" size="sm" onClick={() => addFormField('select')} className="gap-2 border-white/5 bg-white/5 hover:border-gold/30 rounded-xl h-12">
                  <List className="h-4 w-4" />
                  انتخاب
                </Button>
                <Button variant="outline" size="sm" onClick={() => addFormField('textarea')} className="gap-2 border-white/5 bg-white/5 hover:border-gold/30 rounded-xl h-12">
                  <AlignLeft className="h-4 w-4" />
                  توضیحات
                </Button>
              </div>

              <div className="space-y-4">
                {config.formFields.map((f, i) => (
                  <div key={f.id} className={cn(
                    "relative group p-4 bg-white/5 rounded-2xl border transition-all cursor-pointer",
                    editingItem?.id === f.id ? "border-gold/50 bg-gold/5" : "border-white/5 hover:border-white/10"
                  )} onClick={() => setEditingItem({ type: 'field', id: f.id })}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[9px] border-white/10 text-rosary/40">{f.type}</Badge>
                        <span className="text-xs font-bold">{f.label}</span>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); moveItem('field', i, 'up'); }} className="h-6 w-6 rounded-md hover:bg-white/10" disabled={i === 0}>
                           <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); moveItem('field', i, 'down'); }} className="h-6 w-6 rounded-md hover:bg-white/10" disabled={i === config.formFields.length - 1}>
                           <ChevronDown className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); removeFormField(f.id); }} className="h-6 w-6 rounded-md hover:bg-blood/10 text-blood">
                           <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    {editingItem?.id === f.id && (
                      <div className="space-y-3 pt-3 border-t border-white/5" onClick={e => e.stopPropagation()}>
                         <Input 
                           value={f.label} 
                           onChange={(e) => updateItem('field', f.id, { label: e.target.value })}
                           placeholder="نام فیلد"
                           className="h-8 text-xs bg-black/20 border-white/10"
                         />
                         <Select value={f.type} onValueChange={(val) => updateItem('field', f.id, { type: val })}>
                            <SelectTrigger className="h-8 text-xs bg-black/20 border-white/10">
                               <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-damask border-white/10">
                               <SelectItem value="text">متن</SelectItem>
                               <SelectItem value="number">عدد</SelectItem>
                               <SelectItem value="select">انتخاب</SelectItem>
                               <SelectItem value="textarea">توضیحات</SelectItem>
                               <SelectItem value="date">تاریخ</SelectItem>
                            </SelectContent>
                         </Select>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="flex-1 bg-black/40 rounded-2xl p-6 border border-white/10 font-mono text-[10px] overflow-auto text-gold/80 leading-relaxed min-h-[500px] flex flex-col justify-between">
            <pre>{JSON.stringify(config, null, 2)}</pre>
            <div className="mt-8 flex justify-end">
               <Button 
                onClick={handleDownload}
                className="bg-gold text-damask hover:bg-gold/80 font-black px-8 h-12 rounded-xl"
               >
                 <Download className="ml-2 h-4 w-4" />
                 دانلود پیکربندی JSON
               </Button>
            </div>
          </div>
        )}

        <section className="pt-8 sticky bottom-0 bg-black/40 backdrop-blur-md pb-6">
           <Button 
             onClick={handleSave}
             className="w-full bg-gold text-damask hover:bg-gold/80 font-black h-12 rounded-xl shadow-glow-gold/20"
           >
             ذخیره تغییرات در فایل JSON
           </Button>
        </section>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 overflow-auto bg-[#0a0a0a] p-12">
        <div className="max-w-6xl mx-auto border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] relative bg-damask min-h-[800px]">
          <div className="absolute top-8 right-8 z-50 flex items-center gap-3">
             <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
             <div className="bg-white/10 backdrop-blur-md text-white/60 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">
               Live Layout Preview
             </div>
          </div>
          <UniversalModuleTemplate 
            config={config} 
            data={mockData}
            className="p-8" 
          />
        </div>
      </div>
    </div>
  );
}
