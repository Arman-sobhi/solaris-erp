import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Warehouse } from './DataContext';

interface WarehouseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (warehouse: any) => void;
  warehouse?: Warehouse | null;
  mode: 'add' | 'edit';
}

export function WarehouseDialog({ open, onOpenChange, onSave, warehouse, mode }: WarehouseDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    location: '',
    type: '',
    capacity: 0,
    currentUtilization: 0,
    status: 'active' as 'active' | 'inactive',
    manager: '',
  });

  useEffect(() => {
    if (warehouse && mode === 'edit') {
      setFormData({
        name: warehouse.name,
        code: warehouse.code,
        location: warehouse.location,
        type: warehouse.type,
        capacity: warehouse.capacity,
        currentUtilization: warehouse.currentUtilization,
        status: warehouse.status,
        manager: warehouse.manager,
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        code: `WH-${Date.now()}`,
        location: '',
        type: '',
        capacity: 0,
        currentUtilization: 0,
        status: 'active',
        manager: '',
      });
    }
  }, [warehouse, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Warehouse' : 'Edit Warehouse'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' ? 'Create a new warehouse location' : 'Update warehouse information'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Warehouse Name</Label>
                <Input
                  id="name"
                  placeholder="Main Warehouse"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Warehouse Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="123 Industrial Ave, City, State"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                    <SelectItem value="Finished Goods">Finished Goods</SelectItem>
                    <SelectItem value="Packaging">Packaging</SelectItem>
                    <SelectItem value="Cold Storage">Cold Storage</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manager">Manager</Label>
                <Input
                  id="manager"
                  placeholder="Manager Name"
                  value={formData.manager}
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity (m³)</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="0"
                  placeholder="10000"
                  value={formData.capacity || ''}
                  onChange={(e) => setFormData({ ...formData, capacity: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentUtilization">Current Utilization (m³)</Label>
                <Input
                  id="currentUtilization"
                  type="number"
                  min="0"
                  placeholder="7500"
                  value={formData.currentUtilization || ''}
                  onChange={(e) => setFormData({ ...formData, currentUtilization: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {mode === 'add' ? 'Add Warehouse' : 'Update Warehouse'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
