import React, { useState } from 'react';
import { FileText, Download, Calendar, CreditCard, Search, Eye, Printer } from 'lucide-react';

interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  service: 'Electricity' | 'Water';
  amount: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  meterNo: string;
  units: string;
}

const InvoiceBills: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('All');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const invoices: Invoice[] = [
    {
      id: 'INV-2024-001',
      date: '2024-01-15',
      dueDate: '2024-01-30',
      service: 'Electricity',
      amount: '₹1,632',
      status: 'Paid',
      meterNo: 'ELE123456',
      units: '136 kWh'
    },
    {
      id: 'INV-2024-002',
      date: '2024-01-12',
      dueDate: '2024-01-27',
      service: 'Water',
      amount: '₹849',
      status: 'Paid',
      meterNo: 'WAT789012',
      units: '566 L'
    },
    {
      id: 'INV-2024-003',
      date: '2024-02-10',
      dueDate: '2024-02-25',
      service: 'Electricity',
      amount: '₹1,456',
      status: 'Pending',
      meterNo: 'ELE123456',
      units: '142 kWh'
    },
    {
      id: 'INV-2024-004',
      date: '2024-02-08',
      dueDate: '2024-02-23',
      service: 'Water',
      amount: '₹723',
      status: 'Pending',
      meterNo: 'WAT789012',
      units: '489 L'
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.meterNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = selectedService === 'All' || invoice.service === selectedService;
    return matchesSearch && matchesService;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case 'Electricity': return 'bg-yellow-100 text-yellow-800';
      case 'Water': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log(`Downloading invoice ${invoiceId}`);
  };

  const handlePrintInvoice = (invoiceId: string) => {
    console.log(`Printing invoice ${invoiceId}`);
  };

  const InvoicePreview = ({ invoice }: { invoice: Invoice }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Invoice Details</h2>
            <button
              onClick={() => setSelectedInvoice(null)}
              className="text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="border-b pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">SmartUtility</h3>
                <p className="text-gray-600">Utility Management Services</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{invoice.id}</div>
                <div className="text-sm text-gray-600">Invoice Number</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Bill Details</h4>
              <div className="space-y-1 text-sm">
                <div><span className="text-gray-600">Service:</span> {invoice.service}</div>
                <div><span className="text-gray-600">Meter No:</span> {invoice.meterNo}</div>
                <div><span className="text-gray-600">Usage:</span> {invoice.units}</div>
                <div><span className="text-gray-600">Bill Date:</span> {new Date(invoice.date).toLocaleDateString('en-IN')}</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Payment Details</h4>
              <div className="space-y-1 text-sm">
                <div><span className="text-gray-600">Due Date:</span> {new Date(invoice.dueDate).toLocaleDateString('en-IN')}</div>
                <div><span className="text-gray-600">Status:</span> 
                  <span className={`ml-1 px-2 py-1 rounded-full text-xs ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>
                <div><span className="text-gray-600">Amount:</span> <span className="font-semibold">{invoice.amount}</span></div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Amount:</span>
              <span className="text-2xl font-bold text-blue-600">{invoice.amount}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => handleDownloadInvoice(invoice.id)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </button>
            <button
              onClick={() => handlePrintInvoice(invoice.id)}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-600 to-rose-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <FileText className="mr-3 h-8 w-8" />
              Invoice & Bills
            </h1>
            <p className="text-pink-100 mt-2">Generate, view and download your utility bills and invoices</p>
          </div>

          <div className="p-8">
            {/* Search and Filter */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by invoice number or meter number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="All">All Services</option>
                <option value="Electricity">Electricity</option>
                <option value="Water">Water</option>
              </select>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <div className="text-center">
                  <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-900">{invoices.length}</div>
                  <div className="text-blue-700 text-sm">Total Invoices</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="text-center">
                  <CreditCard className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-900">{invoices.filter(i => i.status === 'Paid').length}</div>
                  <div className="text-green-700 text-sm">Paid Invoices</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <div className="text-center">
                  <Calendar className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-900">{invoices.filter(i => i.status === 'Pending').length}</div>
                  <div className="text-yellow-700 text-sm">Pending Bills</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                <div className="text-center">
                  <Download className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-900">₹4,660</div>
                  <div className="text-purple-700 text-sm">Total Amount</div>
                </div>
              </div>
            </div>

            {/* Invoice Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInvoices.map((invoice) => (
                <div key={invoice.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{invoice.id}</h3>
                        <p className="text-sm text-gray-600">{invoice.service} Bill</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Date:</span>
                        <span>{new Date(invoice.date).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Due Date:</span>
                        <span>{new Date(invoice.dueDate).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Usage:</span>
                        <span>{invoice.units}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="font-semibold">Amount:</span>
                        <span className="text-lg font-bold text-blue-600">{invoice.amount}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewInvoice(invoice)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center text-sm"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleDownloadInvoice(invoice.id)}
                        className="flex-1 bg-pink-600 text-white py-2 px-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center text-sm"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredInvoices.length === 0 && (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No invoices found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedInvoice && <InvoicePreview invoice={selectedInvoice} />}
    </div>
  );
};

export default InvoiceBills;