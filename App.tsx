import { useState } from 'react';
import { LanguageProvider } from './LanguageContext';
import { DataProvider } from './DataContext';
import { AppLayout } from './AppLayout';
import { Dashboard } from './Dashboard';
import { PartnerList } from './PartnerList';
import { OrderManagement } from './OrderManagement';
import { Products } from './Products';
import { Analytics } from './Analytics';
import { CRM } from './CRM';
import { Inventory } from './Inventory';
import { Production } from './Production';
import { QualityControl } from './QualityControl';
import { SupplyChain } from './SupplyChain';
import { FSM } from './FSM';
import { HumanResources } from './HumanResources';
import { Finance } from './Finance';
import { Procurement } from './Procurement';
import { Shipping } from './Shipping';
import { Maintenance } from './Maintenance';
import { Purchasing } from './Purchasing';
import { Sales } from './Sales';
import { Accounting } from './Accounting';
import { Machines } from './Machines';
import { BOM } from './BOM';
import { Formulation } from './Formulation';
import { Projects } from './Projects';
// New page imports
import { ProductListPage } from './ProductListPage';
import { ProductDetailPage } from './ProductDetailPage';
import { MachineListPage } from './MachineListPage';
import { MachineDetailPage } from './MachineDetailPage';
import { EmployeeListPage } from './EmployeeListPage';
import { EmployeeDetailPage } from './EmployeeDetailPage';
import { MaintenanceListPage } from './MaintenanceListPage';
import { MaintenanceDetailPage } from './MaintenanceDetailPage';
import { QualityControlListPage } from './QualityControlListPage';
import { QualityControlDetailPage } from './QualityControlDetailPage';
import { BOMEditorPage } from './BOMEditorPage';
import { ProjectDetailPage } from './ProjectDetailPage';
import { InvoiceListPage } from './InvoiceListPage';
import { InvoiceDetailPage } from './InvoiceDetailPage';

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

  const handleViewMaintenance = (recordId: string) => {
    setSubView({ type: 'maintenance-detail', id: recordId });
  };

  const handleViewQC = (recordId: string) => {
    setSubView({ type: 'quality-detail', id: recordId });
  };

  const handleViewProject = (projectId: string) => {
    setSubView({ type: 'project-detail', id: projectId });
  };

  const handleViewInvoice = (invoiceId: string) => {
    setSubView({ type: 'invoice-detail', id: invoiceId });
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
        case 'employee-detail':
          return <EmployeeDetailPage employeeId={subView.id!} onBack={handleBack} />;
        case 'maintenance-detail':
          return <MaintenanceDetailPage recordId={subView.id!} onBack={handleBack} />;
        case 'quality-detail':
          return <QualityControlDetailPage recordId={subView.id!} onBack={handleBack} />;
        case 'project-detail':
          return <ProjectDetailPage projectId={subView.id!} onBack={handleBack} />;
        case 'invoice-detail':
          return <InvoiceDetailPage invoiceId={subView.id!} onBack={handleBack} />;
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
        return <QualityControlListPage onViewRecord={handleViewQC} />;
      case 'supply-chain':
        return <SupplyChain />;
      case 'fsm':
        return <FSM />;
      case 'hr':
        return <EmployeeListPage onViewEmployee={handleViewEmployee} />;
      case 'finance':
        return <Finance onViewInvoice={handleViewInvoice} />;
      case 'procurement':
        return <Procurement />;
      case 'shipping':
        return <Shipping />;
      case 'maintenance':
        return <MaintenanceListPage onViewRecord={handleViewMaintenance} />;
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
        return <Projects onViewProject={handleViewProject} />;
      case 'invoices':
        return <InvoiceListPage onViewInvoice={handleViewInvoice} />;
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