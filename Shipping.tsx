import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Ship, Package, MapPin, Truck, Clock } from 'lucide-react';

interface Shipment {
  id: string;
  shipmentNumber: string;
  customer: string;
  destination: string;
  items: number;
  weight: number;
  carrier: string;
  trackingNumber: string;
  shipDate: string;
  estimatedDelivery: string;
  status: 'preparing' | 'shipped' | 'in-transit' | 'delivered';
}

const mockShipments: Shipment[] = [
  {
    id: '1',
    shipmentNumber: 'SHP-2024-3001',
    customer: 'Green Valley Distributors',
    destination: 'Los Angeles, CA',
    items: 245,
    weight: 1200,
    carrier: 'FedEx Freight',
    trackingNumber: 'FX-789456123',
    shipDate: '2025-11-01',
    estimatedDelivery: '2025-11-04',
    status: 'in-transit',
  },
  {
    id: '2',
    shipmentNumber: 'SHP-2024-3002',
    customer: 'Fresh Market Co.',
    destination: 'New York, NY',
    items: 189,
    weight: 950,
    carrier: 'UPS Freight',
    trackingNumber: 'UPS-456789012',
    shipDate: '2025-11-02',
    estimatedDelivery: '2025-11-05',
    status: 'preparing',
  },
  {
    id: '3',
    shipmentNumber: 'SHP-2024-3003',
    customer: 'Organic Foods Ltd.',
    destination: 'Chicago, IL',
    items: 312,
    weight: 1580,
    carrier: 'DHL Express',
    trackingNumber: 'DHL-321654987',
    shipDate: '2025-10-30',
    estimatedDelivery: '2025-11-02',
    status: 'delivered',
  },
  {
    id: '4',
    shipmentNumber: 'SHP-2024-3004',
    customer: 'City Retailers Group',
    destination: 'Houston, TX',
    items: 156,
    weight: 780,
    carrier: 'FedEx Ground',
    trackingNumber: 'FX-654987321',
    shipDate: '2025-11-01',
    estimatedDelivery: '2025-11-03',
    status: 'shipped',
  },
];

export function Shipping() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
      case 'shipped': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
      case 'in-transit': return 'bg-purple-100 text-purple-700 hover:bg-purple-100';
      case 'delivered': return 'bg-green-100 text-green-700 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Shipping & Logistics</h1>
          <p className="text-gray-500">Manage outbound shipments and deliveries</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Ship className="h-4 w-4 mr-2" />
          Create Shipment
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Shipments</p>
              <div className="mt-2">45</div>
              <p className="text-sm text-gray-600 mt-1">In progress</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Preparing</p>
              <div className="mt-2">18</div>
              <p className="text-sm text-gray-600 mt-1">To be shipped</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Delivered (Week)</p>
              <div className="mt-2">128</div>
              <p className="text-sm text-green-600 mt-1">98% on-time</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Ship className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Delivery Time</p>
              <div className="mt-2">3.2 days</div>
              <p className="text-sm text-green-600 mt-1">-0.5 day improvement</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Shipments Table */}
      <Card className="p-6">
        <h3 className="mb-6">Recent Shipments</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600">Shipment #</th>
                <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 text-gray-600">Destination</th>
                <th className="text-left py-3 px-4 text-gray-600">Items/Weight</th>
                <th className="text-left py-3 px-4 text-gray-600">Carrier</th>
                <th className="text-left py-3 px-4 text-gray-600">Tracking #</th>
                <th className="text-left py-3 px-4 text-gray-600">Ship Date</th>
                <th className="text-left py-3 px-4 text-gray-600">Est. Delivery</th>
                <th className="text-left py-3 px-4 text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockShipments.map((shipment) => (
                <tr key={shipment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">{shipment.shipmentNumber}</td>
                  <td className="py-4 px-4">{shipment.customer}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      {shipment.destination}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <div>{shipment.items} items</div>
                      <div className="text-gray-500">{shipment.weight} kg</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">{shipment.carrier}</td>
                  <td className="py-4 px-4">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {shipment.trackingNumber}
                    </code>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {new Date(shipment.shipDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={getStatusColor(shipment.status)}>
                      {shipment.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="ghost" size="sm">Track</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Carrier Performance */}
      <Card className="p-6">
        <h3 className="mb-6">Carrier Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['FedEx Freight', 'UPS Freight', 'DHL Express'].map((carrier, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm">{carrier}</h4>
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Shipments</span>
                  <span>{45 + index * 10}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">On-Time Delivery</span>
                  <span className="text-green-600">{98 - index}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg Cost</span>
                  <span>${(150 + index * 20).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
