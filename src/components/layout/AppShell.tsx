import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const AppShell = () => {
    return (
        <div className="flex min-h-screen relative noise-texture">
            {/* Glassmorphic Sidebar - Right side for RTL */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <TopBar />

                {/* Page Content */}
                <motion.main
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 p-8 overflow-auto"
                >
                    <Outlet />
                </motion.main>
            </div>
        </div>
    );
};

export default AppShell;
