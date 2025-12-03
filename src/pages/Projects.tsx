import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlusIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { projectsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface Project {
    id: string;
    code: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    budget: number;
    isActive: boolean;
}

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                setError('Please login to access projects.');
                setLoading(false);
                return;
            }
            const response = await projectsAPI.getAll();
            setProjects(response.data);
        } catch (err: any) {
            console.error('Failed to fetch projects:', err);
            if (err.response?.status === 401) {
                setError('Please login to access projects.');
            } else {
                setError('Failed to load projects.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-light text-white mb-2">Projects</h1>
                    <p className="text-silver">Manage projects and track performance</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center gap-2"
                >
                    <PlusIcon className="w-5 h-5" />
                    New Project
                </motion.button>
            </div>

            {error && (
                <div className="bg-ruby/10 border border-ruby/20 text-ruby p-4 rounded-lg">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full p-8 text-center text-silver">Loading projects...</div>
                ) : projects.length > 0 ? (
                    projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="card group cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-lg bg-gold/10 text-gold">
                                    <BriefcaseIcon className="w-6 h-6" />
                                </div>
                                <span className={`px-2 py-1 rounded text-xs ${project.isActive ? 'bg-emerald/20 text-emerald' : 'bg-silver/20 text-silver'}`}>
                                    {project.isActive ? 'Active' : 'Completed'}
                                </span>
                            </div>

                            <h3 className="text-xl text-white font-medium mb-1">{project.name}</h3>
                            <p className="text-silver text-sm mb-4">{project.code}</p>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-silver">Budget</span>
                                    <span className="text-white font-mono">${project.budget.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-silver">Start Date</span>
                                    <span className="text-white">{new Date(project.startDate).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="w-full bg-charcoal rounded-full h-2 mb-4">
                                <div className="bg-gold h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full p-8 text-center text-silver">No projects found.</div>
                )}
            </div>
        </div>
    );
};

export default Projects;
