import { useState } from 'react';
import { Search, Filter, Download, Package } from 'lucide-react';
import { PageHeader } from './PageHeader';
import { StatsGrid } from './StatsGrid';
import { Card } from './components/ui/card';
import { Input } from './components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { EmptyState } from './widgets/EmptyState';
import { useProducts } from './useMockData';

interface InventoryListPageProps {
  onViewItem?: (productId: string) => void;
}

export function InventoryListPage({ onViewItem }: InventoryListPageProps) {
  const { products } = useProducts();
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => (
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  ));

  const stats = [
    { label: 'Total Items', value: products.length },
    { label: 'Active SKUs', value: products.filter(p => p.status === 'active').length },
    { label: 'Total Stock Value', value: `$${products.reduce((s, p) => s + (p.stock * p.price), 0).toLocaleString()}` },
    { label: 'Low Stock Items', value: products.filter(p => p.stock < (p.reorderPoint ?? 0)).length },
  ];

  return (
    <div className="p-8 space-y-6">
      <PageHeader
        title="Inventory"
        description="View and manage inventory across locations"
        actions={(
          <div className="flex gap-2">
            <button className="btn-ghost flex items-center gap-2"><Download className="w-4 h-4" /> Export</button>
            <button className="btn-ghost flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</button>
          </div>
        )}
      />

      <StatsGrid stats={stats as any} columns={4} />

      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search inventory by name or SKU..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </Card>

      <Card>
        {filtered.length === 0 ? (
          <EmptyState icon={Search} title="No inventory items found" description="Try adjusting your search or filter criteria" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Reorder</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.description?.substring(0, 60)}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{p.sku}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>{p.stock} {p.unit}</TableCell>
                  <TableCell>{p.reorderPoint ?? '-'}</TableCell>
                  <TableCell className="text-right">
                    <button className="text-sm text-blue-600" onClick={() => onViewItem?.(p.id)}>View</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
