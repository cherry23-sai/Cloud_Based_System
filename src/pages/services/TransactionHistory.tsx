import React, { useState } from 'react';
import { History, Download, Calendar, CreditCard, Search, Filter } from 'lucide-react';

interface Transaction {
  id: number;
  date: string;
  name: string;
  amount: string;
  type: 'Electricity' | 'Water';
  status: 'Completed' | 'Pending' | 'Failed';
}

const TransactionHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('date');

  const transactions: Transaction[] = [
    { id: 1, date: '2024-01-15', name: 'Electricity Bill', amount: '₹1,632', type: 'Electricity', status: 'Completed' },
    { id: 2, date: '2024-01-12', name: 'Water Bill', amount: '₹849', type: 'Water', status: 'Completed' },
    { id: 3, date: '2024-01-08', name: 'Electricity Bill', amount: '₹1,456', type: 'Electricity', status: 'Completed' },
    { id: 4, date: '2023-12-15', name: 'Water Bill', amount: '₹923', type: 'Water', status: 'Completed' },
    { id: 5, date: '2023-12-12', name: 'Electricity Bill', amount: '₹1,789', type: 'Electricity', status: 'Completed' },
    { id: 6, date: '2023-12-05', name: 'Water Bill', amount: '₹756', type: 'Water', status: 'Failed' },
    { id: 7, date: '2023-11-18', name: 'Electricity Bill', amount: '₹1,234', type: 'Electricity', status: 'Completed' },
    { id: 8, date: '2023-11-15', name: 'Water Bill', amount: '₹834', type: 'Water', status: 'Completed' }
  ];

  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesSearch = transaction.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'All' || transaction.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'amount') return parseFloat(b.amount.replace('₹', '').replace(',', '')) - parseFloat(a.amount.replace('₹', '').replace(',', ''));
      return a.name.localeCompare(b.name);
    });

  const handleDownloadInvoice = (transactionId: number) => {
    // Simulate invoice download
    console.log(`Downloading invoice for transaction ${transactionId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Electricity': return 'bg-yellow-100 text-yellow-800';
      case 'Water': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <History className="mr-3 h-8 w-8" />
              Transaction History
            </h1>
            <p className="text-purple-100 mt-2">View and manage your payment history and invoices</p>
          </div>

          <div className="p-8">
            {/* Filters and Search */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="All">All Types</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Water">Water</option>
                  </select>
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="date">Sort by Date</option>
                  <option value="amount">Sort by Amount</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Total Paid</p>
                    <p className="text-2xl font-bold text-green-900">₹9,473</p>
                    <p className="text-green-700 text-sm">This Year</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Transactions</p>
                    <p className="text-2xl font-bold text-blue-900">{transactions.length}</p>
                    <p className="text-blue-700 text-sm">Total Count</p>
                  </div>
                  <History className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">Success Rate</p>
                    <p className="text-2xl font-bold text-purple-900">95%</p>
                    <p className="text-purple-700 text-sm">Payment Success</p>
                  </div>
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Transaction Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        S.No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTransactions.map((transaction, index) => (
                      <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(transaction.date).toLocaleDateString('en-IN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transaction.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(transaction.type)}`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transaction.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.status === 'Completed' ? (
                            <button
                              onClick={() => handleDownloadInvoice(transaction.id)}
                              className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </button>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <History className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;