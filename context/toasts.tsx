import * as React from 'react';

interface IToastContext {
  showToast: boolean;
  toggleToast: () => void;
}

const defaultState = {
  showToast: false,
  toggleToast: () => {},
};

const ToastContext = React.createContext<IToastContext>(defaultState);

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = React.useState(false);

  const toggleToast = () => {
    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast: toast, toggleToast }}>
      {children}
    </ToastContext.Provider>
  );
}

function useToastContext() {
  const toast = React.useContext(ToastContext);

  if (toast === undefined)
    throw new Error('useToastContext must be inside a Provider with a value');

  return toast;
}

export { ToastProvider, useToastContext };
