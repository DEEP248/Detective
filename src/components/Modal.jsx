import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { modalOverlay, modalContent } from '../animations/variants';

export default function Modal({ isOpen, onClose, title, children, size = 'lg' }) {
    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl',
        full: 'max-w-[95vw]',
    };

    const handleEscape = useCallback((e) => {
        if (e.key === 'Escape' && isOpen) {
            onClose();
        }
    }, [isOpen, onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleEscape);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [handleEscape, isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    {...modalOverlay}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Content */}
                    <motion.div
                        className={`relative ${sizeClasses[size]} w-full max-h-[85vh] overflow-hidden
                       bg-noir-900 border border-noir-700/60 rounded-2xl shadow-2xl`}
                        {...modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        {title && (
                            <div className="flex items-center justify-between px-6 py-4 border-b border-noir-700/50">
                                <h2 className="text-lg font-serif font-semibold text-noir-100">{title}</h2>
                                <button
                                    onClick={onClose}
                                    className="w-8 h-8 flex items-center justify-center rounded-lg 
                           text-noir-400 hover:text-noir-100 hover:bg-noir-800 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {/* Close button (when no title) */}
                        {!title && (
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-lg 
                         text-noir-400 hover:text-noir-100 hover:bg-noir-800 transition-colors"
                            >
                                ✕
                            </button>
                        )}

                        {/* Body */}
                        <div className="overflow-y-auto max-h-[calc(85vh-4rem)] p-6">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
