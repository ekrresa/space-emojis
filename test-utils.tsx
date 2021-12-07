import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ToastProvider } from './src/context/toasts';

const AllTheProviders: FC = ({ children }) => {
  return <ToastProvider>{children}</ToastProvider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export async function getData() {
  return await import('./public/emoji-list.json').then(data => data.default);
}
export * from '@testing-library/react';
export { customRender };
