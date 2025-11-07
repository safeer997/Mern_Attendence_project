import { Toaster } from 'sonner';

const CustomToaster = () => {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        duration: 3500,
        style: {
          background: 'rgba(17, 24, 39, 0.85)', // dark translucent
          border: '1px solid rgba(99, 102, 241, 0.25)', // indigo border
          backdropFilter: 'blur(12px)',
          borderRadius: '14px',
          boxShadow: '0 0 25px rgba(99, 102, 241, 0.15)',
          color: '#e5e7eb', // text-gray-200
          fontSize: '0.9rem',
          fontWeight: 500,
        },
        classNames: {
          title: 'text-indigo-300 font-semibold',
          description: 'text-gray-400',
          closeButton: 'hover:text-indigo-400 transition-colors',
        },
        success: {
          iconTheme: {
            primary: '#4ade80', // green-400
            secondary: 'rgba(17, 24, 39, 0.8)',
          },
          style: {
            border: '1px solid rgba(74, 222, 128, 0.25)',
            boxShadow: '0 0 20px rgba(74, 222, 128, 0.15)',
          },
        },
        error: {
          iconTheme: {
            primary: '#f87171', // red-400
            secondary: 'rgba(17, 24, 39, 0.8)',
          },
          style: {
            border: '1px solid rgba(248, 113, 113, 0.25)',
            boxShadow: '0 0 20px rgba(248, 113, 113, 0.15)',
          },
        },
        info: {
          iconTheme: {
            primary: '#38bdf8', // cyan-400
            secondary: 'rgba(17, 24, 39, 0.8)',
          },
          style: {
            border: '1px solid rgba(56, 189, 248, 0.25)',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.15)',
          },
        },
      }}
    />
  );
};

export default CustomToaster;
