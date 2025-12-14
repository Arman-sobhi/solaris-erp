// Mock data hooks for ERP system
import { mockProducts } from '../data/mockProducts';
import { mockMachines } from '../data/mockMachines';
import { mockEmployees } from '../data/mockEmployees';
import { mockLeads, pipelineStages } from '../data/mockCRM';
import { mockInvoices, invoiceStats } from '../data/mockInvoices';
import { mockProjects } from '../data/mockProjects';
import { mockMaintenanceRecords, maintenanceStats } from '../data/mockMaintenance';
import { mockQualityControlRecords, qcStats } from '../data/mockQualityControl';

export function useProducts() {
  return {
    products: mockProducts,
    loading: false,
    error: null,
  };
}

export function useMachines() {
  return {
    machines: mockMachines,
    loading: false,
    error: null,
  };
}

export function useEmployees() {
  return {
    employees: mockEmployees,
    loading: false,
    error: null,
  };
}

export function useLeads() {
  return {
    leads: mockLeads,
    pipelineStages,
    loading: false,
    error: null,
  };
}

export function useInvoices() {
  return {
    invoices: mockInvoices,
    stats: invoiceStats,
    loading: false,
    error: null,
  };
}

export function useProjects() {
  return {
    projects: mockProjects,
    loading: false,
    error: null,
  };
}

export function useMaintenance() {
  return {
    records: mockMaintenanceRecords,
    stats: maintenanceStats,
    loading: false,
    error: null,
  };
}

export function useQualityControl() {
  return {
    records: mockQualityControlRecords,
    stats: qcStats,
    loading: false,
    error: null,
  };
}

// Simulated loading states
export function useLoadingState(delay: number = 1000) {
  return {
    loading: false,
    error: null,
  };
}
