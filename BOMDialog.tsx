import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BOM } from './DataContext';
import { Plus, Trash2 } from 'lucide-react';

interface BOMDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (bom: any) => void;
  bom?: BOM | null;
  mode: 'add' | 'edit';
}

export function BOMDialog({ open, onOpenChange, onSave, bom, mode }: BOMDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    product: '',
    version: '',
    status: 'active' as 'active' | 'obsolete',
    components: [{ name: '', quantity: 0, unit: 'units', cost: 0 }],
    totalCost: 0,
  });

  useEffect(() => {
    if (bom && mode === 'edit') {
      setFormData({
        name: bom.name,
        code: bom.code,
        product: bom.product,
        version: bom.version,
        status: bom.status,
        components: bom.components,
        totalCost: bom.totalCost,
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        code: `BOM-${Date.now()}`,
        product: '',
        version: '1.0',
        status: 'active',
        components: [{ name: '', quantity: 0, unit: 'units', cost: 0 }],
        totalCost: 0,
      });
    }
  }, [bom, mode, open]);

  const addComponent = () => {
    setFormData({
      ...formData,
      components: [...formData.components, { name: '', quantity: 0, unit: 'units', cost: 0 }],
    });
  };

  const removeComponent = (index: number) => {
    const newComponents = formData.components.filter((_, i) => i !== index);
    setFormData({ ...formData, components: newComponents });
    calculateTotal(newComponents);
  };

  const updateComponent = (index: number, field: string, value: any) => {
    const newComponents = [...formData.components];
    newComponents[index] = { ...newComponents[index], [field]: value };
    setFormData({ ...formData, components: newComponents });
    calculateTotal(newComponents);
  };

  const calculateTotal = (components: any[]) => {
    const total = components.reduce((sum, comp) => sum + (comp.quantity * comp.cost), 0);
    setFormData(prev => ({ ...prev, totalCost: total }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Create Bill of Materials' : 'Edit Bill of Materials'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' ? 'Create a new BOM for a product' : 'Update BOM details'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">BOM Name</Label>
                <Input
                  id="name"
                  placeholder="Product Assembly BOM"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">BOM Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Input
                  id="product"
                  placeholder="Final Product Name"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  placeholder="1.0"
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  required
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
                  <SelectItem value="obsolete">Obsolete</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Components</Label>
                <Button type="button" size="sm" variant="outline" onClick={addComponent}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Component
                </Button>
              </div>

              {formData.components.map((component, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-4 space-y-2">
                    <Label className="text-xs">Component</Label>
                    <Input
                      placeholder="Component name"
                      value={component.name}
                      onChange={(e) => updateComponent(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label className="text-xs">Quantity</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0"
                      value={component.quantity || ''}
                      onChange={(e) => updateComponent(index, 'quantity', parseFloat(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label className="text-xs">Unit</Label>
                    <Select value={component.unit} onValueChange={(value) => updateComponent(index, 'unit', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="units">units</SelectItem>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="g">g</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="mL">mL</SelectItem>
                        <SelectItem value="m">m</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-3 space-y-2">
                    <Label className="text-xs">Unit Cost ($)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={component.cost || ''}
                      onChange={(e) => updateComponent(index, 'cost', parseFloat(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div className="col-span-1">
                    {formData.components.length > 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeComponent(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <Label>Total BOM Cost:</Label>
                <div className="text-xl">${formData.totalCost.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {mode === 'add' ? 'Create BOM' : 'Update BOM'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
