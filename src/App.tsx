import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import Dashboard from './pages/Dashboard';
import ChartOfAccounts from './pages/ChartOfAccounts';
import JournalEntries from './pages/JournalEntries';
import Sales from './pages/Sales';
import Purchases from './pages/Purchases';
import Inventory from './pages/Inventory';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import Customers from './pages/Customers';
import Suppliers from './pages/Suppliers';
import Invoices from './pages/Invoices';
import Projects from './pages/Projects';
import FixedAssets from './pages/FixedAssets';
import Budgets from './pages/Budgets';
import Reconciliation from './pages/Reconciliation';
import Reports from './pages/Reports';
import { useLanguage } from './context/LanguageContext';
import { useAuth } from './context/AuthContext';
import './index.css';

function App() {
  const { dir } = useLanguage();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen bg-void" dir={dir}>
      <Sidebar />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <TopBar />
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounts" element={<ChartOfAccounts />} />
            <Route path="/journal" element={<JournalEntries />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/assets" element={<FixedAssets />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/reconciliation" element={<Reconciliation />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
