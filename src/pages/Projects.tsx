import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PlusIcon, BriefcaseIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { projectsAPI } from '../services/api';
import ProjectForm from './projects/ProjectForm';

interface Project {
    id: string;
    projectCode: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    budgetAmount: string;
    estimatedRevenue: string;
    status: string;
    isActive: boolean;
}

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await projectsAPI.getAll();
            setProjects(response.data);
        } catch (err) {
            console.error('Failed to fetch projects:', err);
            setError('Failed to load projects.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedProject(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleSuccess = () => {
        fetchProjects();
        setIsModalOpen(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED': return 'bg-emerald/20 text-emerald';
            case 'IN_PROGRESS': return 'bg-blue-500/20 text-blue-400';
            case 'ON_HOLD': return 'bg-amber-500/20 text-amber-400';
            case 'CANCELLED': return 'bg-ruby/20 text-ruby';
            default: return 'bg-silver/20 text-silver';
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
                    onClick={handleCreate}
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
                            className="card group relative"
                        >
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleEdit(project); }}
                                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white"
                                >
                                    <PencilSquareIcon className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-lg bg-gold/10 text-gold">
                                    <BriefcaseIcon className="w-6 h-6" />
                                </div>
                                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(project.status)}`}>
                                    {project.status.replace('_', ' ')}
                                </span>
                            </div>

                            <h3 className="text-xl text-white font-medium mb-1">{project.name}</h3>
                            <p className="text-silver text-sm mb-4">{project.projectCode}</p>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-silver">Budget</span>
                                    <span className="text-white font-mono">${parseFloat(project.budgetAmount).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-silver">Start Date</span>
                                    <span className="text-white">{project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}</span>
                                </div>
                            </div>

                            {/* Progress bar placeholder - can be connected to actual data later */}
                            <div className="w-full bg-charcoal rounded-full h-2 mb-4">
                                <div className="bg-gold h-2 rounded-full" style={{ width: '0%' }}></div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full p-8 text-center text-silver">No projects found. Click "New Project" to create one.</div>
                )}
            </div>

            <ProjectForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
                project={selectedProject}
            />
        </div>
    );
};

export default Projects;
