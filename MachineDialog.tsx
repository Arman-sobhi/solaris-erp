import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Machine } from './DataContext';

interface MachineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (machine: any) => void;
  machine?: Machine | null;
  mode: 'add' | 'edit';
}

export function MachineDialog({ open, onOpenChange, onSave, machine, mode }: MachineDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: '',
    location: '',
    status: 'operational' as 'operational' | 'maintenance' | 'idle' | 'error',
    uptime: 0,
    efficiency: 0,
    lastMaintenance: '',
    nextMaintenance: '',
    currentJob: '',
    manufacturer: '',
    installDate: '',
  });

  useEffect(() => {
    if (machine && mode === 'edit') {
      setFormData({
        name: machine.name,
        code: machine.code,
        type: machine.type,
        location: machine.location,
        status: machine.status,
        uptime: machine.uptime,
        efficiency: machine.efficiency,
        lastMaintenance: machine.lastMaintenance,
        nextMaintenance: machine.nextMaintenance,
        currentJob: machine.currentJob || '',
        manufacturer: machine.manufacturer,
        installDate: machine.installDate,
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        code: '',
        type: '',
        location: '',
        status: 'operational',
        uptime: 0,
        efficiency: 0,
        lastMaintenance: '',
        nextMaintenance: '',
        currentJob: '',
        manufacturer: '',
        installDate: '',
      });
    }
  }, [machine, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Machine' : 'Edit Machine'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' ? 'Add a new machine to the system' : 'Update machine information'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Machine Name</Label>
                <Input
                  id="name"
                  placeholder="Production Line 1"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Machine Code</Label>
                <Input
                  id="code"
                  placeholder="MCH-001"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Packaging">Packaging</SelectItem>
                    <SelectItem value="Mixing">Mixing</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Bottling">Bottling</SelectItem>
                    <SelectItem value="Labeling">Labeling</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Production Floor A"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="idle">Idle</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="uptime">Uptime (%)</Label>
                <Input
                  id="uptime"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="95"
                  value={formData.uptime || ''}
                  onChange={(e) => setFormData({ ...formData, uptime: parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="efficiency">Efficiency (%)</Label>
                <Input
                  id="efficiency"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="92"
                  value={formData.efficiency || ''}
                  onChange={(e) => setFormData({ ...formData, efficiency: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="manufacturer">Manufacturer</Label>
                <Input
                  id="manufacturer"
                  placeholder="ABC Manufacturing"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="installDate">Install Date</Label>
                <Input
                  id="installDate"
                  type="date"
                  value={formData.installDate}
                  onChange={(e) => setFormData({ ...formData, installDate: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastMaintenance">Last Maintenance</Label>
                <Input
                  id="lastMaintenance"
                  type="date"
                  value={formData.lastMaintenance}
                  onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nextMaintenance">Next Maintenance</Label>
                <Input
                  id="nextMaintenance"
                  type="date"
                  value={formData.nextMaintenance}
                  onChange={(e) => setFormData({ ...formData, nextMaintenance: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentJob">Current Job (Optional)</Label>
              <Input
                id="currentJob"
                placeholder="PO-2025-001"
                value={formData.currentJob}
                onChange={(e) => setFormData({ ...formData, currentJob: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {mode === 'add' ? 'Add Machine' : 'Update Machine'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
