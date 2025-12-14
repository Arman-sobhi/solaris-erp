import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, Plus, AlertTriangle, TrendingDown, Package, Warehouse, Edit, Trash2 } from 'lucide-react';
import { InventoryDialog } from './InventoryDialog';
import { useData, InventoryItem } from '../contexts/DataContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

export function Inventory() {
  const { inventory, addInventoryItem, updateInventoryItem, deleteInventoryItem } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);

  const getItemStatus = (item: InventoryItem): 'in-stock' | 'low-stock' | 'out-of-stock' => {
    if (item.quantity === 0) return 'out-of-stock';
    if (item.quantity <= item.reorderLevel) return 'low-stock';
    return 'in-stock';
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'low-stock') {
      return matchesSearch && getItemStatus(item) === 'low-stock';
    }
    if (activeTab === 'out-of-stock') {
      return matchesSearch && getItemStatus(item) === 'out-of-stock';
    }
    return matchesSearch && item.category === activeTab;
  });

  const lowStockCount = inventory.filter(item => getItemStatus(item) === 'low-stock').length;
  const outOfStockCount = inventory.filter(item => getItemStatus(item) === 'out-of-stock').length;

  const handleAdd = () => {
    setDialogMode('add');
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: InventoryItem) => {
    setDialogMode('edit');
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleSave = (itemData: any) => {
    if (dialogMode === 'add') {
      addInventoryItem(itemData);
    } else if (editingItem) {
      updateInventoryItem(editingItem.id, itemData);
    }
  };

  const handleDelete = (id: string) => {
    deleteInventoryItem(id);
    setDeletingItemId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'low-stock': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'out-of-stock': return 'bg-red-100 text-red-700 hover:bg-red-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Inventory Management</h1>
          <p className="text-gray-500">Track and manage your inventory levels</p>
        </div>
        <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Inventory
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Items</p>
              <div className="mt-2">{inventory.length}</div>
              <p className="text-sm text-gray-600 mt-1">SKUs tracked</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <div className="mt-2 text-yellow-600">{lowStockCount}</div>
              <p className="text-sm text-gray-600 mt-1">Need reordering</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Out of Stock</p>
              <div className="mt-2 text-red-600">{outOfStockCount}</div>
              <p className="text-sm text-gray-600 mt-1">Urgent action</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Warehouses</p>
              <div className="mt-2">{new Set(inventory.map(i => i.location)).size}</div>
              <p className="text-sm text-gray-600 mt-1">Active locations</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Warehouse className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="Raw Materials">Raw Materials</TabsTrigger>
            <TabsTrigger value="Packaging">Packaging</TabsTrigger>
            <TabsTrigger value="Finished Goods">Finished Goods</TabsTrigger>
            <TabsTrigger value="low-stock">
              Low Stock ({lowStockCount})
            </TabsTrigger>
            <TabsTrigger value="out-of-stock">
              Out of Stock ({outOfStockCount})
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 max-w-md ml-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Item</th>
                    <th className="text-left py-3 px-4 text-gray-600">SKU</th>
                    <th className="text-left py-3 px-4 text-gray-600">Category</th>
                    <th className="text-left py-3 px-4 text-gray-600">Location</th>
                    <th className="text-left py-3 px-4 text-gray-600">Quantity</th>
                    <th className="text-left py-3 px-4 text-gray-600">Reorder Level</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => {
                    const status = getItemStatus(item);
                    return (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Package className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div>{item.name}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                Updated: {new Date(item.lastUpdated).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">{item.sku}</code>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline">{item.category}</Badge>
                        </td>
                        <td className="py-4 px-4">{item.location}</td>
                        <td className="py-4 px-4">
                          <div>
                            <div>{item.quantity} {item.unit}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{item.reorderLevel} {item.unit}</td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(status)}>
                            {status.replace('-', ' ')}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeletingItemId(item.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredInventory.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No inventory items found</p>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      <InventoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
        item={editingItem}
        mode={dialogMode}
      />

      <AlertDialog open={deletingItemId !== null} onOpenChange={() => setDeletingItemId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the inventory item
              from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingItemId && handleDelete(deletingItemId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
