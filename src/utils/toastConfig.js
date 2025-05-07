
const baseToastStyle = {
  position: 'top-right',
  style: {
    padding: '16px',
    borderRadius: '8px',
    maxWidth: '350px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
};

// Success toast configuration
export const successToast = {
  ...baseToastStyle,
  duration: 3000,
  style: {
    ...baseToastStyle.style,
    background: '#10B981', // Green
    color: '#fff',
  },
};

// Error toast configuration
export const errorToast = {
  ...baseToastStyle,
  duration: 4000,
  style: {
    ...baseToastStyle.style,
    background: '#EF4444', // Red
    color: '#fff',
  },
  iconTheme: {
    primary: '#fff',
    secondary: '#EF4444',
  },
};

// Info toast configuration
export const infoToast = {
  ...baseToastStyle,
  duration: 3500,
  style: {
    ...baseToastStyle.style,
    background: '#3B82F6', // Blue
    color: '#fff',
  },
};

// Warning toast configuration
export const warningToast = {
  ...baseToastStyle,
  duration: 4000,
  style: {
    ...baseToastStyle.style,
    background: '#F59E0B', // Amber
    color: '#fff',
  },
};

export default {
  success: successToast,
  error: errorToast,
  info: infoToast,
  warning: warningToast,
}; 