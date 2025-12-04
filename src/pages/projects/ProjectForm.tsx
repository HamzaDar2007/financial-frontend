import { useState, useEffect } from 'react';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { projectsAPI } from '../../services/api';

interface ProjectFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    project?: any; // If provided, we are in edit mode
}

const ProjectForm = ({ isOpen, onClose, onSuccess, project }: ProjectFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        projectCode: '',
        description: '',
        startDate: '',
        endDate: '',
        budgetAmount: '',
        estimatedRevenue: '',
        status: 'NOT_STARTED'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (project) {
            setFormData({
                name: project.name,
                projectCode: project.projectCode || project.code, // Handle both cases
                description: project.description || '',
                startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
                endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
                budgetAmount: project.budgetAmount || project.budget || '',
                estimatedRevenue: project.estimatedRevenue || '',
                status: project.status || 'NOT_STARTED'
            });
        } else {
            // Reset form for new project
            setFormData({
                name: '',
                projectCode: '',
                description: '',
                startDate: '',
                endDate: '',
                budgetAmount: '',
                estimatedRevenue: '',
                status: 'NOT_STARTED'
            });
        }
        setError('');
    }, [project, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                ...formData,
                budgetAmount: parseFloat(formData.budgetAmount) || 0,
                estimatedRevenue: parseFloat(formData.estimatedRevenue) || 0,
            };

            if (project) {
                await projectsAPI.update(project.id, payload);
            } else {
                await projectsAPI.create(payload);
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Failed to save project:', err);
            setError(err.response?.data?.message || 'Failed to save project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={project ? 'Edit Project' : 'New Project'}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 bg-ruby/10 border border-ruby/20 text-ruby rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <Input
                    label="Project Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Website Redesign"
                />

                <Input
                    label="Project Code"
                    name="projectCode"
                    value={formData.projectCode}
                    onChange={handleChange}
                    required
                    placeholder="e.g. PRJ-001"
                />

                <div>
                    <label className="block text-sm font-medium text-silver mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                        placeholder="Project details..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Start Date"
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                    />
                    <Input
                        label="End Date"
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Budget Amount"
                        type="number"
                        name="budgetAmount"
                        value={formData.budgetAmount}
                        onChange={handleChange}
                        placeholder="0.00"
                    />
                    <Input
                        label="Est. Revenue"
                        type="number"
                        name="estimatedRevenue"
                        value={formData.estimatedRevenue}
                        onChange={handleChange}
                        placeholder="0.00"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-silver mb-1">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                    >
                        <option value="NOT_STARTED">Not Started</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="ON_HOLD">On Hold</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={loading}>
                        {project ? 'Update Project' : 'Create Project'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default ProjectForm;
