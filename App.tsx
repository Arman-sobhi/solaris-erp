import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { DataProvider } from './contexts/DataContext';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './components/Dashboard';
import { PartnerList } from './components/PartnerList';
import { OrderManagement } from './components/OrderManagement';
import { Products } from './components/Products';
import { Analytics } from './components/Analytics';
import { CRM } from './components/CRM';
import { Inventory } from './components/Inventory';
import { Production } from './components/Production';
import { QualityControl } from './components/QualityControl';
import { SupplyChain } from './components/SupplyChain';
import { FSM } from './components/FSM';
import { HumanResources } from './components/HumanResources';
import { Finance } from './components/Finance';
import { Procurement } from './components/Procurement';
import { Shipping } from './components/Shipping';
import { Maintenance } from './components/Maintenance';
import { Purchasing } from './components/Purchasing';
import { Sales } from './components/Sales';
import { Accounting } from './components/Accounting';
import { Machines } from './components/Machines';
import { BOM } from './components/BOM';
import { Formulation } from './components/Formulation';
import { Projects } from './components/Projects';
// New page imports
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { MachineListPage } from './pages/MachineListPage';
import { MachineDetailPage } from './pages/MachineDetailPage';
import { EmployeeListPage } from './pages/EmployeeListPage';
import { MaintenanceListPage } from './pages/MaintenanceListPage';
import { QualityControlListPage } from './pages/QualityControlListPage';
import { BOMEditorPage } from './pages/BOMEditorPage';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [subView, setSubView] = useState<{ type: string; id?: string } | null>(null);

  const handleViewProduct = (productId: string) => {
    setSubView({ type: 'product-detail', id: productId });
  };

  const handleViewMachine = (machineId: string) => {
    setSubView({ type: 'machine-detail', id: machineId });
  };

  const handleViewEmployee = (employeeId: string) => {
    setSubView({ type: 'employee-detail', id: employeeId });
  };

  const handleBack = () => {
    setSubView(null);
  };

  const renderView = () => {
    // Handle subviews first
    if (subView) {
      switch (subView.type) {
        case 'product-detail':
          return <ProductDetailPage productId={subView.id!} onBack={handleBack} />;
        case 'machine-detail':
          return <MachineDetailPage machineId={subView.id!} onBack={handleBack} />;
        case 'bom-editor':
          return <BOMEditorPage />;
        default:
          break;
      }
    }

    // Main views
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'crm':
        return <CRM />;
      case 'partners':
        return <PartnerList />;
      case 'orders':
        return <OrderManagement />;
      case 'inventory':
        return <Inventory />;
      case 'products':
        return <ProductListPage onViewProduct={handleViewProduct} />;
      case 'production':
        return <Production />;
      case 'quality':
        return <QualityControlListPage onViewRecord={(id) => console.log('View QC:', id)} />;
      case 'supply-chain':
        return <SupplyChain />;
      case 'fsm':
        return <FSM />;
      case 'hr':
        return <EmployeeListPage onViewEmployee={handleViewEmployee} />;
      case 'finance':
        return <Finance />;
      case 'procurement':
        return <Procurement />;
      case 'shipping':
        return <Shipping />;
      case 'maintenance':
        return <MaintenanceListPage onViewRecord={(id) => console.log('View maintenance:', id)} />;
      case 'purchasing':
        return <Purchasing />;
      case 'sales':
        return <Sales />;
      case 'accounting':
        return <Accounting />;
      case 'machines':
        return <MachineListPage onViewMachine={handleViewMachine} />;
      case 'bom':
        return <BOM />;
      case 'formulation':
        return <Formulation />;
      case 'projects':
        return <Projects />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <LanguageProvider>
      <DataProvider>
        <AppLayout activeView={activeView} setActiveView={setActiveView}>
          {renderView()}
        </AppLayout>
      </DataProvider>
    </LanguageProvider>
  );
}