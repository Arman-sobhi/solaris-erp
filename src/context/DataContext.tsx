import { createContext, useContext, useState, ReactNode } from 'react';

// Types for all entities
export interface Partner {
  id: string;
  name: string;
  type: string;
  contact: string;
  email: string;
  location: string;
  status: 'active' | 'inactive' | 'pending';
  totalOrders: number;
  revenue: number;
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  reorderPoint: number;
  status: 'active' | 'discontinued';
  description?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: { product: string; quantity: number; price: number }[];
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unit: string;
  location: string;
  reorderLevel: number;
  lastUpdated: string;
}

export interface PurchaseOrder {
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

export interface SalesOrder {
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

export interface Machine {
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

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  country: string;
  status: 'active' | 'inactive';
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  category: string;
  status: 'active' | 'inactive';
  rating: number;
  totalPurchases: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: 'active' | 'on-leave' | 'inactive';
  joinDate: string;
  salary: number;
}

export interface ProductionOrder {
  id: string;
  orderNumber: string;
  product: string;
  quantity: number;
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  machine: string;
  priority: 'low' | 'medium' | 'high';
  progress: number;
}

export interface QualityControl {
  id: string;
  inspectionId: string;
  productionOrder: string;
  product: string;
  inspector: string;
  inspectionDate: string;
  status: 'passed' | 'failed' | 'pending';
  defectRate: number;
  notes: string;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  location: string;
  type: string;
  capacity: number;
  currentUtilization: number;
  status: 'active' | 'inactive';
  manager: string;
}

export interface AccountingEntry {
  id: string;
  entryNumber: string;
  date: string;
  description: string;
  account: string;
  debit: number;
  credit: number;
  balance: number;
  type: 'income' | 'expense' | 'asset' | 'liability';
  reference: string;
}

export interface Project {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  manager: string;
  progress: number;
}

export interface Formulation {
  id: string;
  name: string;
  code: string;
  product: string;
  version: string;
  status: 'draft' | 'approved' | 'archived';
  ingredients: { name: string; quantity: number; unit: string }[];
  yield: number;
  cost: number;
}

export interface BOM {
  id: string;
  name: string;
  code: string;
  product: string;
  version: string;
  status: 'active' | 'obsolete';
  components: { name: string; quantity: number; unit: string; cost: number }[];
  totalCost: number;
}

interface DataContextType {
  // Partners
  partners: Partner[];
  addPartner: (partner: Omit<Partner, 'id' | 'totalOrders' | 'revenue' | 'rating'>) => void;
  updatePartner: (id: string, partner: Partial<Partner>) => void;
  deletePartner: (id: string) => void;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrder: (id: string, order: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  
  // Inventory
  inventory: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryItem: (id: string, item: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;
  
  // Purchase Orders
  purchaseOrders: PurchaseOrder[];
  addPurchaseOrder: (po: Omit<PurchaseOrder, 'id'>) => void;
  updatePurchaseOrder: (id: string, po: Partial<PurchaseOrder>) => void;
  deletePurchaseOrder: (id: string) => void;
  
  // Sales Orders
  salesOrders: SalesOrder[];
  addSalesOrder: (so: Omit<SalesOrder, 'id'>) => void;
  updateSalesOrder: (id: string, so: Partial<SalesOrder>) => void;
  deleteSalesOrder: (id: string) => void;
  
  // Machines
  machines: Machine[];
  addMachine: (machine: Omit<Machine, 'id'>) => void;
  updateMachine: (id: string, machine: Partial<Machine>) => void;
  deleteMachine: (id: string) => void;
  
  // Customers
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'lastOrder'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  
  // Suppliers
  suppliers: Supplier[];
  addSupplier: (supplier: Omit<Supplier, 'id' | 'totalPurchases'>) => void;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;
  
  // Employees
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  
  // Production Orders
  productionOrders: ProductionOrder[];
  addProductionOrder: (order: Omit<ProductionOrder, 'id'>) => void;
  updateProductionOrder: (id: string, order: Partial<ProductionOrder>) => void;
  deleteProductionOrder: (id: string) => void;
  
  // Quality Control
  qualityControls: QualityControl[];
  addQualityControl: (qc: Omit<QualityControl, 'id'>) => void;
  updateQualityControl: (id: string, qc: Partial<QualityControl>) => void;
  deleteQualityControl: (id: string) => void;
  
  // Warehouses
  warehouses: Warehouse[];
  addWarehouse: (warehouse: Omit<Warehouse, 'id'>) => void;
  updateWarehouse: (id: string, warehouse: Partial<Warehouse>) => void;
  deleteWarehouse: (id: string) => void;
  
  // Accounting Entries
  accountingEntries: AccountingEntry[];
  addAccountingEntry: (entry: Omit<AccountingEntry, 'id'>) => void;
  updateAccountingEntry: (id: string, entry: Partial<AccountingEntry>) => void;
  deleteAccountingEntry: (id: string) => void;
  
  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Formulations
  formulations: Formulation[];
  addFormulation: (formulation: Omit<Formulation, 'id'>) => void;
  updateFormulation: (id: string, formulation: Partial<Formulation>) => void;
  deleteFormulation: (id: string) => void;
  
  // BOMs
  boms: BOM[];
  addBOM: (bom: Omit<BOM, 'id'>) => void;
  updateBOM: (id: string, bom: Partial<BOM>) => void;
  deleteBOM: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

import { initialPartners } from '../data/mockPartners';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Tomato Sauce',
    sku: 'PRD-001',
    category: 'Sauces',
    price: 8.50,
    cost: 3.45,
    stock: 1250,
    reorderPoint: 200,
    status: 'active',
    description: 'Premium organic tomato sauce',
  },
  {
    id: '2',
    name: 'Whole Wheat Bread',
    sku: 'PRD-002',
    category: 'Bakery',
    price: 5.25,
    cost: 2.15,
    stock: 850,
    reorderPoint: 150,
    status: 'active',
    description: 'Fresh whole wheat bread',
  },
];

import { initialInventory } from '../data/mockInventory';
import { mockMachines as initialMachines } from '../data/mockMachines';
import { initialCustomers } from '../data/mockCustomers';
import { initialSuppliers } from '../data/mockSuppliers';

export function DataProvider({ children }: { children: ReactNode }) {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>([]);
  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [productionOrders, setProductionOrders] = useState<ProductionOrder[]>([]);
  const [qualityControls, setQualityControls] = useState<QualityControl[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [accountingEntries, setAccountingEntries] = useState<AccountingEntry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [formulations, setFormulations] = useState<Formulation[]>([]);
  const [boms, setBOMs] = useState<BOM[]>([]);

  // Partner CRUD
  const addPartner = (partner: Omit<Partner, 'id' | 'totalOrders' | 'revenue' | 'rating'>) => {
    const newPartner: Partner = {
      ...partner,
      id: Date.now().toString(),
      totalOrders: 0,
      revenue: 0,
      rating: 0,
    };
    setPartners([...partners, newPartner]);
  };

  const updatePartner = (id: string, updatedData: Partial<Partner>) => {
    setPartners(partners.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deletePartner = (id: string) => {
    setPartners(partners.filter(p => p.id !== id));
  };

  // Product CRUD
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Order CRUD
  const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
    };
    setOrders([...orders, newOrder]);
  };

  const updateOrder = (id: string, updatedData: Partial<Order>) => {
    setOrders(orders.map(o => o.id === id ? { ...o, ...updatedData } : o));
  };

  const deleteOrder = (id: string) => {
    setOrders(orders.filter(o => o.id !== id));
  };

  // Inventory CRUD
  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: Date.now().toString(),
    };
    setInventory([...inventory, newItem]);
  };

  const updateInventoryItem = (id: string, updatedData: Partial<InventoryItem>) => {
    setInventory(inventory.map(i => i.id === id ? { ...i, ...updatedData } : i));
  };

  const deleteInventoryItem = (id: string) => {
    setInventory(inventory.filter(i => i.id !== id));
  };

  // Purchase Order CRUD
  const addPurchaseOrder = (po: Omit<PurchaseOrder, 'id'>) => {
    const newPO: PurchaseOrder = {
      ...po,
      id: Date.now().toString(),
    };
    setPurchaseOrders([...purchaseOrders, newPO]);
  };

  const updatePurchaseOrder = (id: string, updatedData: Partial<PurchaseOrder>) => {
    setPurchaseOrders(purchaseOrders.map(po => po.id === id ? { ...po, ...updatedData } : po));
  };

  const deletePurchaseOrder = (id: string) => {
    setPurchaseOrders(purchaseOrders.filter(po => po.id !== id));
  };

  // Sales Order CRUD
  const addSalesOrder = (so: Omit<SalesOrder, 'id'>) => {
    const newSO: SalesOrder = {
      ...so,
      id: Date.now().toString(),
    };
    setSalesOrders([...salesOrders, newSO]);
  };

  const updateSalesOrder = (id: string, updatedData: Partial<SalesOrder>) => {
    setSalesOrders(salesOrders.map(so => so.id === id ? { ...so, ...updatedData } : so));
  };

  const deleteSalesOrder = (id: string) => {
    setSalesOrders(salesOrders.filter(so => so.id !== id));
  };

  // Machine CRUD
  const addMachine = (machine: Omit<Machine, 'id'>) => {
    const newMachine: Machine = {
      ...machine,
      id: Date.now().toString(),
    };
    setMachines([...machines, newMachine]);
  };

  const updateMachine = (id: string, updatedData: Partial<Machine>) => {
    setMachines(machines.map(m => m.id === id ? { ...m, ...updatedData } : m));
  };

  const deleteMachine = (id: string) => {
    setMachines(machines.filter(m => m.id !== id));
  };

  // Customer CRUD
  const addCustomer = (customer: Omit<Customer, 'id' | 'totalOrders' | 'totalSpent' | 'lastOrder'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: Date.now().toString(),
      totalOrders: 0,
      totalSpent: 0,
      lastOrder: '',
    };
    setCustomers([...customers, newCustomer]);
  };

  const updateCustomer = (id: string, updatedData: Partial<Customer>) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, ...updatedData } : c));
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  // Supplier CRUD
  const addSupplier = (supplier: Omit<Supplier, 'id' | 'totalPurchases'>) => {
    const newSupplier: Supplier = {
      ...supplier,
      id: Date.now().toString(),
      totalPurchases: 0,
    };
    setSuppliers([...suppliers, newSupplier]);
  };

  const updateSupplier = (id: string, updatedData: Partial<Supplier>) => {
    setSuppliers(suppliers.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const deleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
  };

  // Employee CRUD
  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString(),
    };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (id: string, updatedData: Partial<Employee>) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, ...updatedData } : e));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  // Production Order CRUD
  const addProductionOrder = (order: Omit<ProductionOrder, 'id'>) => {
    const newOrder: ProductionOrder = {
      ...order,
      id: Date.now().toString(),
    };
    setProductionOrders([...productionOrders, newOrder]);
  };

  const updateProductionOrder = (id: string, updatedData: Partial<ProductionOrder>) => {
    setProductionOrders(productionOrders.map(po => po.id === id ? { ...po, ...updatedData } : po));
  };

  const deleteProductionOrder = (id: string) => {
    setProductionOrders(productionOrders.filter(po => po.id !== id));
  };

  // Quality Control CRUD
  const addQualityControl = (qc: Omit<QualityControl, 'id'>) => {
    const newQC: QualityControl = {
      ...qc,
      id: Date.now().toString(),
    };
    setQualityControls([...qualityControls, newQC]);
  };

  const updateQualityControl = (id: string, updatedData: Partial<QualityControl>) => {
    setQualityControls(qualityControls.map(qc => qc.id === id ? { ...qc, ...updatedData } : qc));
  };

  const deleteQualityControl = (id: string) => {
    setQualityControls(qualityControls.filter(qc => qc.id !== id));
  };

  // Warehouse CRUD
  const addWarehouse = (warehouse: Omit<Warehouse, 'id'>) => {
    const newWarehouse: Warehouse = {
      ...warehouse,
      id: Date.now().toString(),
    };
    setWarehouses([...warehouses, newWarehouse]);
  };

  const updateWarehouse = (id: string, updatedData: Partial<Warehouse>) => {
    setWarehouses(warehouses.map(w => w.id === id ? { ...w, ...updatedData } : w));
  };

  const deleteWarehouse = (id: string) => {
    setWarehouses(warehouses.filter(w => w.id !== id));
  };

  // Accounting Entry CRUD
  const addAccountingEntry = (entry: Omit<AccountingEntry, 'id'>) => {
    const newEntry: AccountingEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setAccountingEntries([...accountingEntries, newEntry]);
  };

  const updateAccountingEntry = (id: string, updatedData: Partial<AccountingEntry>) => {
    setAccountingEntries(accountingEntries.map(e => e.id === id ? { ...e, ...updatedData } : e));
  };

  const deleteAccountingEntry = (id: string) => {
    setAccountingEntries(accountingEntries.filter(e => e.id !== id));
  };

  // Project CRUD
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: string, updatedData: Partial<Project>) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  // Formulation CRUD
  const addFormulation = (formulation: Omit<Formulation, 'id'>) => {
    const newFormulation: Formulation = {
      ...formulation,
      id: Date.now().toString(),
    };
    setFormulations([...formulations, newFormulation]);
  };

  const updateFormulation = (id: string, updatedData: Partial<Formulation>) => {
    setFormulations(formulations.map(f => f.id === id ? { ...f, ...updatedData } : f));
  };

  const deleteFormulation = (id: string) => {
    setFormulations(formulations.filter(f => f.id !== id));
  };

  // BOM CRUD
  const addBOM = (bom: Omit<BOM, 'id'>) => {
    const newBOM: BOM = {
      ...bom,
      id: Date.now().toString(),
    };
    setBOMs([...boms, newBOM]);
  };

  const updateBOM = (id: string, updatedData: Partial<BOM>) => {
    setBOMs(boms.map(b => b.id === id ? { ...b, ...updatedData } : b));
  };

  const deleteBOM = (id: string) => {
    setBOMs(boms.filter(b => b.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        partners,
        addPartner,
        updatePartner,
        deletePartner,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        addOrder,
        updateOrder,
        deleteOrder,
        inventory,
        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
        purchaseOrders,
        addPurchaseOrder,
        updatePurchaseOrder,
        deletePurchaseOrder,
        salesOrders,
        addSalesOrder,
        updateSalesOrder,
        deleteSalesOrder,
        machines,
        addMachine,
        updateMachine,
        deleteMachine,
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        suppliers,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        productionOrders,
        addProductionOrder,
        updateProductionOrder,
        deleteProductionOrder,
        qualityControls,
        addQualityControl,
        updateQualityControl,
        deleteQualityControl,
        warehouses,
        addWarehouse,
        updateWarehouse,
        deleteWarehouse,
        accountingEntries,
        addAccountingEntry,
        updateAccountingEntry,
        deleteAccountingEntry,
        projects,
        addProject,
        updateProject,
        deleteProject,
        formulations,
        addFormulation,
        updateFormulation,
        deleteFormulation,
        boms,
        addBOM,
        updateBOM,
        deleteBOM,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
