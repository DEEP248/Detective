// Framer Motion animation variants for consistent, professional transitions

export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const slideUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const slideIn = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export const modalOverlay = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const modalContent = {
    initial: { opacity: 0, scale: 0.92, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } },
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

export const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const cardHover = {
    rest: { scale: 1, boxShadow: '0 4px 24px rgba(0,0,0,0.4)' },
    hover: { scale: 1.02, boxShadow: '0 8px 40px rgba(0,0,0,0.6)', transition: { duration: 0.2 } },
};

export const pulseGlow = {
    animate: {
        boxShadow: [
            '0 0 0px rgba(201, 168, 76, 0)',
            '0 0 20px rgba(201, 168, 76, 0.3)',
            '0 0 0px rgba(201, 168, 76, 0)',
        ],
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
};

export const typewriter = {
    initial: { width: 0 },
    animate: { width: '100%', transition: { duration: 2, ease: 'linear' } },
};

export const dramaticReveal = {
    initial: { opacity: 0, scale: 0.8, rotateX: 10 },
    animate: {
        opacity: 1, scale: 1, rotateX: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

export const evidenceUnlock = {
    initial: { opacity: 0, scale: 0.5, rotate: -5 },
    animate: {
        opacity: 1, scale: 1, rotate: 0,
        transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
};

export const accusationSuccess = {
    initial: { opacity: 0, scale: 0 },
    animate: {
        opacity: 1, scale: 1,
        transition: {
            duration: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
            scale: { type: 'spring', stiffness: 100, damping: 10, delay: 0.2 },
        },
    },
};
