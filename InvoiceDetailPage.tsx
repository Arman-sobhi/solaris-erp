import { ArrowLeft, Download, Send, Edit, Printer, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { StatusBadge } from '../widgets/StatusBadge';
import { mockInvoices } from '../data/mockInvoices';
import { Separator } from '../components/ui/separator';

interface InvoiceDetailPageProps {
  invoiceId: string;
  onBack: () => void;
}

export function InvoiceDetailPage({ invoiceId, onBack }: InvoiceDetailPageProps) {
  const invoice = mockInvoices.find(inv => inv.id === invoiceId);
  
  if (!invoice) {
    return (
      <div className="p-8">
        <p>Invoice not found</p>
        <Button onClick={onBack} variant="outline" className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Invoices
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
            <h1>Invoice {invoice.invoiceNumber}</h1>
            <p className="text-gray-500">{invoice.customer}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          {invoice.status === 'draft' && (
            <Button size="sm">
              <Send className="w-4 h-4 mr-2" />
              Send Invoice
            </Button>
          )}
          {invoice.status === 'sent' && (
            <Button size="sm">
              <Check className="w-4 h-4 mr-2" />
              Mark as Paid
            </Button>
          )}
        </div>
      </div>

      {/* Status Flow Visualization */}
      <Card className="p-6">
        <h3 className="mb-4">Invoice Status Flow</h3>
        <div className="flex items-center justify-between">
          {['draft', 'sent', 'paid'].map((status, index) => (
            <div key={status} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    status === invoice.status
                      ? 'bg-blue-600 text-white'
                      : invoice.status === 'paid' && index < 2
                      ? 'bg-green-600 text-white'
                      : invoice.status === 'sent' && index === 0
                      ? 'bg-green-600 text-white'
                      : invoice.status === 'overdue' && index === 1
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {status === invoice.status || 
                   (invoice.status === 'paid' && index < 2) ||
                   (invoice.status === 'sent' && index === 0) ||
                   (invoice.status === 'overdue' && index === 1) ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <p className="text-sm mt-2 capitalize">{status}</p>
              </div>
              {index < 2 && (
                <div
                  className={`h-1 flex-1 ${
                    (invoice.status === 'paid' && index < 2) ||
                    (invoice.status === 'sent' && index === 0)
                      ? 'bg-green-600'
                      : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Invoice Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Invoice Card */}
        <Card className="lg:col-span-2 p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-3xl mb-2">INVOICE</h2>
              <p className="text-gray-600">Fresh Bakery Co.</p>
              <p className="text-sm text-gray-500">123 Bakery Street, San Francisco, CA 94102</p>
              <p className="text-sm text-gray-500">Tax ID: 12-3456789</p>
            </div>
            <div className="text-right">
              <StatusBadge status={invoice.status} />
              <p className="text-sm text-gray-600 mt-2">Invoice #</p>
              <p className="font-mono">{invoice.invoiceNumber}</p>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Bill To */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-sm text-gray-600 mb-2">Bill To:</p>
              <p>{invoice.customer}</p>
              <p className="text-sm text-gray-600">{invoice.customerEmail}</p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Issue Date:</p>
                  <p>{invoice.issueDate}</p>
                </div>
                <div>
                  <p className="text-gray-600">Due Date:</p>
                  <p>{invoice.dueDate}</p>
                </div>
                <div>
                  <p className="text-gray-600">Payment Terms:</p>
                  <p>{invoice.paymentTerms}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${item.total.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Totals */}
          <div className="mt-8 flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span>${invoice.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (10%):</span>
                <span>${invoice.tax.toLocaleString()}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount:</span>
                  <span>-${invoice.discount.toLocaleString()}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="text-xl">${invoice.total.toLocaleString()}</span>
              </div>
              {invoice.amountPaid > 0 && (
                <>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Amount Paid:</span>
                    <span>-${invoice.amountPaid.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span>Amount Due:</span>
                    <span className="text-xl text-orange-600">${invoice.amountDue.toLocaleString()}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Notes:</p>
              <p className="text-sm">{invoice.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p>For questions about this invoice, contact accounting@freshbakery.com</p>
          </div>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <Card className="p-6">
            <h3 className="mb-4">Payment Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Amount</span>
                <span>${invoice.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Amount Paid</span>
                <span className="text-green-600">${invoice.amountPaid.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Amount Due</span>
                <span className={invoice.amountDue > 0 ? 'text-orange-600' : 'text-green-600'}>
                  ${invoice.amountDue.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          {/* Payment History */}
          {invoice.paymentHistory.length > 0 && (
            <Card className="p-6">
              <h3 className="mb-4">Payment History</h3>
              <div className="space-y-3">
                {invoice.paymentHistory.map((payment) => (
                  <div key={payment.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-green-600">${payment.amount.toLocaleString()}</span>
                      <Badge variant="outline" className="text-xs capitalize">
                        {payment.method.replace(/-/g, ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{payment.date}</p>
                    <p className="text-xs text-gray-500 font-mono mt-1">Ref: {payment.reference}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Invoice
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Send className="w-4 h-4 mr-2" />
                Send Reminder
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
