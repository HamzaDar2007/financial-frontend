import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ChartOfAccounts from './pages/ChartOfAccounts';
import './index.css';

function App() {
  return (
    <Router>
      <div className="aurora-bg min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AppShell />}>
            <Route index element={<Dashboard />} />
            <Route path="accounts" element={<ChartOfAccounts />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
