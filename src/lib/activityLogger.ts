export interface Activity {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'payment' | 'feedback' | 'profile' | 'login' | 'registration' | 'limit_setting' | 'meter_reading';
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  billNo: string;
  amount: string;
  paymentType: string;
  serviceType: 'electricity' | 'water';
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  area: string;
}

export const logActivity = (
  userId: string,
  userName: string,
  userEmail: string,
  action: string,
  details: string,
  type: Activity['type']
) => {
  const activities = JSON.parse(localStorage.getItem('userActivities') || '[]');
  const newActivity: Activity = {
    id: Date.now().toString(),
    userId,
    userName,
    userEmail,
    action,
    details,
    timestamp: new Date().toISOString(),
    type
  };
  
  activities.unshift(newActivity); // Add to beginning for latest first
  localStorage.setItem('userActivities', JSON.stringify(activities));
};

export const logTransaction = (
  userId: string,
  userName: string,
  transactionData: Omit<Transaction, 'id' | 'userId' | 'userName' | 'timestamp' | 'status'>
) => {
  const transactions = JSON.parse(localStorage.getItem('userTransactions') || '[]');
  const newTransaction: Transaction = {
    ...transactionData,
    id: `TXN${Date.now()}`,
    userId,
    userName,
    status: 'completed',
    timestamp: new Date().toISOString()
  };
  
  transactions.unshift(newTransaction);
  localStorage.setItem('userTransactions', JSON.stringify(transactions));
  
  // Also log as activity
  logActivity(
    userId,
    userName,
    '',
    'Bill Payment',
    `Paid ${transactionData.serviceType} bill of ${transactionData.amount}`,
    'payment'
  );
};

export const getActivities = (): Activity[] => {
  return JSON.parse(localStorage.getItem('userActivities') || '[]');
};

export const getTransactions = (): Transaction[] => {
  return JSON.parse(localStorage.getItem('userTransactions') || '[]');
};

export const getUserTransactions = (userId: string): Transaction[] => {
  const transactions = getTransactions();
  return transactions.filter(t => t.userId === userId);
};