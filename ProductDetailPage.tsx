import { useState } from 'react';
import { ArrowLeft, Edit, Trash2, Package, Wrench, Users, Warehouse, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { StatusBadge } from '../widgets/StatusBadge';
import { mockProducts, ProductDetail } from '../data/mockProducts';

interface ProductDetailPageProps {
  productId: string;
  onBack: () => void;
}

export function ProductDetailPage({ productId, onBack }: ProductDetailPageProps) {
  const product = mockProducts.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="p-8">
        <p>Product not found</p>
        <Button onClick={onBack} variant="outline" className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1>{product.name}</h1>
            <p className="text-gray-500">SKU: {product.sku}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Stock</p>
              <p className="text-2xl">{product.stock}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Price</p>
              <p className="text-2xl">${product.price.toFixed(2)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Cost</p>
              <p className="text-2xl">${product.cost.toFixed(2)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <StatusBadge status={product.status} />
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recipe">Recipe</TabsTrigger>
          <TabsTrigger value="bom">Bill of Materials</TabsTrigger>
          <TabsTrigger value="machines">Machines</TabsTrigger>
          <TabsTrigger value="operators">Operators</TabsTrigger>
          <TabsTrigger value="stock">Stock Summary</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Product Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p>{product.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Barcode</p>
                <p className="font-mono text-sm">{product.barcode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Unit</p>
                <p className="capitalize">{product.unit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Weight</p>
                <p>{product.weight} kg</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Dimensions (L×W×H)</p>
                <p>{product.dimensions.length}×{product.dimensions.width}×{product.dimensions.height} cm</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Manufacturer</p>
                <p>{product.manufacturer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Brand</p>
                <p>{product.brand}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Reorder Point</p>
                <p>{product.reorderPoint} units</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p>{product.createdAt}</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">Description</p>
              <p className="text-gray-700">{product.description}</p>
            </div>
          </Card>
        </TabsContent>

        {/* Recipe Tab */}
        <TabsContent value="recipe" className="space-y-6">
          {product.recipe ? (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3>{product.recipe.name}</h3>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Recipe
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Prep Time</p>
                  <p>{product.recipe.prepTime} minutes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cook Time</p>
                  <p>{product.recipe.cookTime} minutes</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="mb-3">Ingredients</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ingredient</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {product.recipe.ingredients.map((ingredient, index) => (
                      <TableRow key={index}>
                        <TableCell>{ingredient.name}</TableCell>
                        <TableCell>{ingredient.quantity}</TableCell>
                        <TableCell>{ingredient.unit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div>
                <h4 className="mb-3">Instructions</h4>
                <ol className="space-y-3">
                  {product.recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <Badge variant="outline" className="shrink-0">{index + 1}</Badge>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-gray-500">No recipe available for this product</p>
              <Button className="mt-4">Add Recipe</Button>
            </Card>
          )}
        </TabsContent>

        {/* BOM Tab */}
        <TabsContent value="bom" className="space-y-6">
          {product.bom ? (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3>Bill of Materials</h3>
                  <p className="text-sm text-gray-500">Version: {product.bom.version}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit BOM
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.bom.components.map((component) => (
                    <TableRow key={component.id}>
                      <TableCell>{component.name}</TableCell>
                      <TableCell>{component.quantity}</TableCell>
                      <TableCell>{component.unit}</TableCell>
                      <TableCell>${component.cost.toFixed(2)}</TableCell>
                      <TableCell>{component.supplier}</TableCell>
                      <TableCell className="text-right">
                        ${(component.quantity * component.cost).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-gray-50">
                    <TableCell colSpan={5} className="text-right">
                      <strong>Total Cost:</strong>
                    </TableCell>
                    <TableCell className="text-right">
                      <strong>${product.bom.totalCost.toFixed(2)}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-gray-500">No BOM available for this product</p>
              <Button className="mt-4">Create BOM</Button>
            </Card>
          )}
        </TabsContent>

        {/* Machines Tab */}
        <TabsContent value="machines" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3>Associated Machines</h3>
              <Button variant="outline" size="sm">
                Assign Machine
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Machine</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Avg Runtime (min)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product.machines.map((machine) => (
                  <TableRow key={machine.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-gray-400" />
                        {machine.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{machine.role}</Badge>
                    </TableCell>
                    <TableCell>{machine.runtime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Operators Tab */}
        <TabsContent value="operators" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3>Assigned Operators</h3>
              <Button variant="outline" size="sm">
                Assign Operator
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Operator</TableHead>
                  <TableHead>Skill Level</TableHead>
                  <TableHead>Shift</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product.operators.map((operator) => (
                  <TableRow key={operator.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        {operator.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge>{operator.skill}</Badge>
                    </TableCell>
                    <TableCell>{operator.shift}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Stock Summary Tab */}
        <TabsContent value="stock" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-6">Stock by Warehouse</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Total Quantity</TableHead>
                  <TableHead>Reserved</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product.stockByWarehouse.map((stock) => (
                  <TableRow key={stock.warehouseId}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Warehouse className="w-4 h-4 text-gray-400" />
                        {stock.warehouseName}
                      </div>
                    </TableCell>
                    <TableCell>{stock.quantity}</TableCell>
                    <TableCell>{stock.reserved}</TableCell>
                    <TableCell>
                      <strong>{stock.available}</strong>
                    </TableCell>
                    <TableCell>
                      {stock.available < product.reorderPoint ? (
                        <StatusBadge status="Low Stock" variant="warning" />
                      ) : (
                        <StatusBadge status="In Stock" variant="success" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
