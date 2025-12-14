import { Card } from './components/ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Truck, Package, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Shipment {
  id: string;
  trackingNumber: string;
  supplier: string;
  destination: string;
  items: string;
  quantity: number;
  status: 'in-transit' | 'delivered' | 'delayed' | 'pending';
  estimatedArrival: string;
  currentLocation: string;
}

const mockShipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'TRK-45678',
    supplier: 'Farm Fresh Supplies',
    destination: 'Warehouse A',
    items: 'Raw Materials',
    quantity: 2400,
    status: 'in-transit',
    estimatedArrival: '2025-11-03',
    currentLocation: 'Distribution Center - Chicago',
  },
  {
    id: '2',
    trackingNumber: 'TRK-45679',
    supplier: 'PackPro Industries',
    destination: 'Warehouse B',
    items: 'Packaging Materials',
    quantity: 5000,
    status: 'delivered',
    estimatedArrival: '2025-11-02',
    currentLocation: 'Warehouse B',
  },
  {
    id: '3',
    trackingNumber: 'TRK-45680',
    supplier: 'Mediterranean Imports',
    destination: 'Warehouse C',
    items: 'Specialty Ingredients',
    quantity: 850,
    status: 'delayed',
    estimatedArrival: '2025-11-05',
    currentLocation: 'Port of Entry - Customs',
  },
];

const suppliers = [
  { name: 'Farm Fresh Supplies', status: 'active', deliveries: 45, onTime: 96, rating: 4.8 },
  { name: 'PackPro Industries', status: 'active', deliveries: 38, onTime: 92, rating: 4.6 },
  { name: 'Mediterranean Imports', status: 'active', deliveries: 28, onTime: 88, rating: 4.4 },
  { name: 'Green Valley Farms', status: 'active', deliveries: 52, onTime: 98, rating: 4.9 },
];

export function SupplyChain() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-transit': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'delivered': return 'bg-green-100 text-green-700 hover:bg-green-100';
      case 'delayed': return 'bg-red-100 text-red-700 hover:bg-red-100';
      case 'pending': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Supply Chain Management</h1>
          <p className="text-gray-500">Track shipments and manage suppliers</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Truck className="h-4 w-4 mr-2" />
          New Shipment
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Shipments</p>
              <div className="mt-2">28</div>
              <p className="text-sm text-gray-600 mt-1">In transit</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">On-Time Delivery</p>
              <div className="mt-2">94.5%</div>
              <p className="text-sm text-green-600 mt-1">Above target</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Delayed Shipments</p>
              <div className="mt-2 text-red-600">3</div>
              <p className="text-sm text-gray-600 mt-1">Need attention</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Suppliers</p>
              <div className="mt-2">45</div>
              <p className="text-sm text-gray-600 mt-1">Verified partners</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Shipment Tracking */}
      <Card className="p-6">
        <h3 className="mb-6">Active Shipments</h3>
        <div className="space-y-4">
          {mockShipments.map((shipment) => (
            <div key={shipment.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span>{shipment.trackingNumber}</span>
                      <Badge className={getStatusColor(shipment.status)}>
                        {shipment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{shipment.items}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Track</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Supplier</p>
                  <p>{shipment.supplier}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Destination</p>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{shipment.destination}</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Current Location</p>
                  <p>{shipment.currentLocation}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Est. Arrival</p>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{new Date(shipment.estimatedArrival).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Supplier Performance */}
      <Card className="p-6">
        <h3 className="mb-6">Supplier Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600">Supplier</th>
                <th className="text-left py-3 px-4 text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-gray-600">Total Deliveries</th>
                <th className="text-left py-3 px-4 text-gray-600">On-Time %</th>
                <th className="text-left py-3 px-4 text-gray-600">Rating</th>
                <th className="text-left py-3 px-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">{supplier.name}</td>
                  <td className="py-4 px-4">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {supplier.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">{supplier.deliveries}</td>
                  <td className="py-4 px-4">
                    <span className={supplier.onTime >= 95 ? 'text-green-600' : supplier.onTime >= 90 ? 'text-yellow-600' : 'text-red-600'}>
                      {supplier.onTime}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span>{supplier.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="ghost" size="sm">View Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
