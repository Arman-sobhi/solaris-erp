import { 
  LayoutDashboard, Users, ShoppingCart, Package, BarChart3, Menu, 
  UserCircle, Warehouse, Factory, ClipboardCheck, Truck, Wrench,
  UsersRound, DollarSign, ShoppingBag, Ship, Settings, ChevronDown,
  FileText, BookOpen, Beaker, FolderKanban, Languages
} from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

interface MenuSection {
  title: string;
  titleKey: string;
  items: MenuItem[];
}

interface MenuItem {
  id: string;
  label: string;
  labelKey: string;
  icon: any;
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['overview', 'transaction', 'operations', 'management']);

  const menuSections: MenuSection[] = [
    {
      title: 'Overview',
      titleKey: 'section.overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
        { id: 'analytics', label: 'Analytics', labelKey: 'nav.analytics', icon: BarChart3 },
      ]
    },
    {
      title: 'Transaction Flow',
      titleKey: 'section.transaction',
      items: [
        { id: 'purchasing', label: 'Purchasing', labelKey: 'nav.purchasing', icon: ShoppingBag },
        { id: 'sales', label: 'Sales', labelKey: 'nav.sales', icon: ShoppingCart },
        { id: 'inventory', label: 'Inventory', labelKey: 'nav.inventory', icon: Warehouse },
        { id: 'accounting', label: 'Accounting', labelKey: 'nav.accounting', icon: FileText },
      ]
    },
    {
      title: 'Sales & CRM',
      titleKey: 'section.salesCrm',
      items: [
        { id: 'crm', label: 'CRM', labelKey: 'nav.crm', icon: UserCircle },
        { id: 'partners', label: 'Partners', labelKey: 'nav.partners', icon: Users },
        { id: 'orders', label: 'Orders', labelKey: 'nav.orders', icon: ShoppingCart },
      ]
    },
    {
      title: 'Operations',
      titleKey: 'section.operations',
      items: [
        { id: 'production', label: 'Production', labelKey: 'nav.production', icon: Factory },
        { id: 'bom', label: 'BOM & Planning', labelKey: 'nav.bom', icon: BookOpen },
        { id: 'quality', label: 'Quality Control', labelKey: 'nav.quality', icon: ClipboardCheck },
        { id: 'machines', label: 'Machines', labelKey: 'nav.machines', icon: Settings },
        { id: 'maintenance', label: 'Maintenance', labelKey: 'nav.maintenance', icon: Wrench },
        { id: 'fsm', label: 'Field Service', labelKey: 'nav.fsm', icon: Wrench },
      ]
    },
    {
      title: 'Supply Chain',
      titleKey: 'section.supplyChain',
      items: [
        { id: 'products', label: 'Products', labelKey: 'nav.products', icon: Package },
        { id: 'procurement', label: 'Procurement', labelKey: 'nav.procurement', icon: ShoppingBag },
        { id: 'supply-chain', label: 'Supply Chain', labelKey: 'nav.supplyChain', icon: Truck },
        { id: 'shipping', label: 'Shipping', labelKey: 'nav.shipping', icon: Ship },
      ]
    },
    {
      title: 'Management',
      titleKey: 'section.management',
      items: [
        { id: 'hr', label: 'Human Resources', labelKey: 'nav.hr', icon: UsersRound },
        { id: 'finance', label: 'Finance', labelKey: 'nav.finance', icon: DollarSign },
      ]
    },
    {
      title: 'Other Modules',
      titleKey: 'section.other',
      items: [
        { id: 'formulation', label: 'Formulation', labelKey: 'nav.formulation', icon: Beaker },
        { id: 'projects', label: 'Projects', labelKey: 'nav.projects', icon: FolderKanban },
      ]
    }
  ];

  const toggleSection = (title: string) => {
    if (expandedSections.includes(title)) {
      setExpandedSections(expandedSections.filter(s => s !== title));
    } else {
      setExpandedSections([...expandedSections, title]);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fa' : 'en');
  };

  return (
    <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} flex flex-col`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
          {!isCollapsed && (
            <div>
              <h1 className="text-green-600">FoodPro ERP</h1>
              <p className="text-gray-500 text-sm">
                {language === 'en' ? 'Factory Management' : 'مدیریت کارخانه'}
              </p>
            </div>
          )}
          <div className="flex gap-1 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              title={language === 'en' ? 'Switch to Persian' : 'تغییر به انگلیسی'}
            >
              <Languages className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
          {menuSections.map((section) => (
            <div key={section.title}>
              {!isCollapsed && (
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center justify-between w-full text-xs text-gray-400 mb-2 px-2 hover:text-gray-600"
                >
                  <span>{t(section.titleKey)}</span>
                  <ChevronDown 
                    className={`h-3 w-3 transition-transform ${
                      expandedSections.includes(section.title) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              )}
              {(isCollapsed || expandedSections.includes(section.title)) && (
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                          activeView === item.id
                            ? 'bg-green-50 text-green-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        title={isCollapsed ? t(item.labelKey) : ''}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        {!isCollapsed && <span>{t(item.labelKey)}</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
              {language === 'en' ? 'AD' : 'م'}
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="text-sm truncate">
                  {language === 'en' ? 'Admin User' : 'کاربر مدیر'}
                </div>
                <div className="text-xs text-gray-500 truncate">admin@foodpro.com</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
