import * as React from 'react';

interface IToastContext {
  showToast: boolean;
  selectedEmoji: string;
  toggleToast: (emoji: string) => void;
}

const defaultState = {
  showToast: false,
  selectedEmoji: '',
  toggleToast: () => {},
};

const ToastContext = React.createContext<IToastContext>(defaultState);

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = React.useState(false);
  const [emoji, setEmoji] = React.useState('');

  const toggleToast = React.useCallback((emoji: string) => {
    setToast(true);
    setEmoji(emoji);

    setTimeout(() => {
      setToast(false);
    }, 2000);
  }, []);

  return (
    <ToastContext.Provider
      value={{ selectedEmoji: emoji, showToast: toast, toggleToast }}
    >
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
