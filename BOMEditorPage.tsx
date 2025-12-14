import { useState } from 'react';
import { ArrowLeft, Plus, Save, Trash2, Search, Package } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';

export function BOMEditorPage() {
  const [bomName, setBomName] = useState('Premium Wheat Bread BOM');
  const [product, setProduct] = useState('prod-001');
  const [version, setVersion] = useState('v2.1');
  const [status, setStatus] = useState('active');

  const [components, setComponents] = useState([
    { id: '1', name: 'Wheat Flour Premium', quantity: 0.5, unit: 'kg', cost: 0.80, supplier: 'Grain Masters Inc.' },
    { id: '2', name: 'Active Dry Yeast', quantity: 10, unit: 'g', cost: 0.15, supplier: 'Baking Essentials Ltd.' },
    { id: '3', name: 'Fine Sea Salt', quantity: 10, unit: 'g', cost: 0.05, supplier: 'Salt Co.' },
    { id: '4', name: 'Organic Sugar', quantity: 20, unit: 'g', cost: 0.10, supplier: 'Sweet Suppliers' },
    { id: '5', name: 'Unsalted Butter', quantity: 30, unit: 'g', cost: 0.40, supplier: 'Dairy Fresh Co.' },
  ]);

  const totalCost = components.reduce((sum, comp) => sum + (comp.quantity * comp.cost), 0);

  const addComponent = () => {
    setComponents([
      ...components,
      { id: Date.now().toString(), name: '', quantity: 0, unit: 'kg', cost: 0, supplier: '' }
    ]);
  };

  const removeComponent = (id: string) => {
    setComponents(components.filter(comp => comp.id !== id));
  };

  const updateComponent = (id: string, field: string, value: any) => {
    setComponents(components.map(comp =>
      comp.id === id ? { ...comp, [field]: value } : comp
    ));
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to BOM List
          </Button>
          <div>
            <h1>BOM Editor</h1>
            <p className="text-gray-500">Create or edit Bill of Materials</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save BOM
          </Button>
        </div>
      </div>

      {/* BOM Info */}
      <Card className="p-6">
        <h3 className="mb-4">BOM Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="bom-name">BOM Name</Label>
            <Input
              id="bom-name"
              value={bomName}
              onChange={(e) => setBomName(e.target.value)}
              placeholder="Enter BOM name"
            />
          </div>
          <div>
            <Label htmlFor="product">Product</Label>
            <Select value={product} onValueChange={setProduct}>
              <SelectTrigger id="product">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prod-001">Premium Wheat Bread</SelectItem>
                <SelectItem value="prod-002">Artisan Sourdough</SelectItem>
                <SelectItem value="prod-003">Chocolate Chip Cookies</SelectItem>
                <SelectItem value="prod-004">Croissant Premium</SelectItem>
                <SelectItem value="prod-005">Multigrain Bagels</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="version">Version</Label>
            <Input
              id="version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="e.g., v1.0"
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="obsolete">Obsolete</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Components */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>Components</h3>
          <Button onClick={addComponent} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Component
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Component Name</TableHead>
                <TableHead className="w-[12%]">Quantity</TableHead>
                <TableHead className="w-[10%]">Unit</TableHead>
                <TableHead className="w-[12%]">Unit Cost</TableHead>
                <TableHead className="w-[20%]">Supplier</TableHead>
                <TableHead className="w-[12%]">Total</TableHead>
                <TableHead className="w-[4%]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {components.map((component) => (
                <TableRow key={component.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <Input
                        value={component.name}
                        onChange={(e) => updateComponent(component.id, 'name', e.target.value)}
                        placeholder="Component name"
                        className="border-0 focus:ring-0 p-0"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={component.quantity}
                      onChange={(e) => updateComponent(component.id, 'quantity', parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      className="border-0 focus:ring-0 p-0"
                      step="0.01"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={component.unit}
                      onValueChange={(value) => updateComponent(component.id, 'unit', value)}
                    >
                      <SelectTrigger className="border-0 focus:ring-0 p-0 h-auto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="g">g</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="ml">ml</SelectItem>
                        <SelectItem value="pcs">pcs</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-1">$</span>
                      <Input
                        type="number"
                        value={component.cost}
                        onChange={(e) => updateComponent(component.id, 'cost', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        className="border-0 focus:ring-0 p-0"
                        step="0.01"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={component.supplier}
                      onChange={(e) => updateComponent(component.id, 'supplier', e.target.value)}
                      placeholder="Supplier name"
                      className="border-0 focus:ring-0 p-0"
                    />
                  </TableCell>
                  <TableCell>
                    <span>${(component.quantity * component.cost).toFixed(2)}</span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeComponent(component.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Total */}
        <div className="flex justify-end mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Total BOM Cost</p>
            <p className="text-2xl">${totalCost.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">{components.length} components</p>
          </div>
        </div>
      </Card>

      {/* Notes */}
      <Card className="p-6">
        <h3 className="mb-4">Notes & Instructions</h3>
        <textarea
          className="w-full min-h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add any notes, special instructions, or remarks about this BOM..."
        />
      </Card>
    </div>
  );
}
