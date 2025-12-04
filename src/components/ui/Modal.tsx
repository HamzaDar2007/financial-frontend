import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: string;
}

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }: ModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog
                    static
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    open={isOpen}
                    onClose={onClose}
                    className="relative z-50"
                >
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel
                            as={motion.div}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className={`w-full ${maxWidth} transform overflow-hidden rounded-2xl bg-charcoal border border-white/10 p-6 shadow-xl transition-all`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Dialog.Title className="text-xl font-medium text-white">
                                    {title}
                                </Dialog.Title>
                                <button
                                    onClick={onClose}
                                    className="rounded-full p-1 text-silver hover:bg-white/10 hover:text-white transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mt-2">
                                {children}
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default Modal;
