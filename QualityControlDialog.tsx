import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { QualityControl } from './DataContext';

interface QualityControlDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (qc: any) => void;
  qualityControl?: QualityControl | null;
  mode: 'add' | 'edit';
}

export function QualityControlDialog({ open, onOpenChange, onSave, qualityControl, mode }: QualityControlDialogProps) {
  const [formData, setFormData] = useState({
    inspectionId: '',
    productionOrder: '',
    product: '',
    inspector: '',
    inspectionDate: new Date().toISOString().split('T')[0],
    status: 'pending' as 'passed' | 'failed' | 'pending',
    defectRate: 0,
    notes: '',
  });

  useEffect(() => {
    if (qualityControl && mode === 'edit') {
      setFormData({
        inspectionId: qualityControl.inspectionId,
        productionOrder: qualityControl.productionOrder,
        product: qualityControl.product,
        inspector: qualityControl.inspector,
        inspectionDate: qualityControl.inspectionDate,
        status: qualityControl.status,
        defectRate: qualityControl.defectRate,
        notes: qualityControl.notes,
      });
    } else if (mode === 'add') {
      setFormData({
        inspectionId: `QC-${Date.now()}`,
        productionOrder: '',
        product: '',
        inspector: '',
        inspectionDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        defectRate: 0,
        notes: '',
      });
    }
  }, [qualityControl, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Create Quality Inspection' : 'Edit Quality Inspection'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' ? 'Create a new quality control inspection' : 'Update inspection details'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inspectionId">Inspection ID</Label>
                <Input
                  id="inspectionId"
                  value={formData.inspectionId}
                  onChange={(e) => setFormData({ ...formData, inspectionId: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productionOrder">Production Order</Label>
                <Input
                  id="productionOrder"
                  placeholder="PROD-001"
                  value={formData.productionOrder}
                  onChange={(e) => setFormData({ ...formData, productionOrder: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Input
                  id="product"
                  placeholder="Product Name"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inspector">Inspector</Label>
                <Input
                  id="inspector"
                  placeholder="Inspector Name"
                  value={formData.inspector}
                  onChange={(e) => setFormData({ ...formData, inspector: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inspectionDate">Inspection Date</Label>
                <Input
                  id="inspectionDate"
                  type="date"
                  value={formData.inspectionDate}
                  onChange={(e) => setFormData({ ...formData, inspectionDate: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defectRate">Defect Rate (%)</Label>
                <Input
                  id="defectRate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="0.0"
                  value={formData.defectRate || ''}
                  onChange={(e) => setFormData({ ...formData, defectRate: parseFloat(e.target.value) || 0 })}
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="passed">Passed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Inspection notes and observations..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {mode === 'add' ? 'Create Inspection' : 'Update Inspection'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
