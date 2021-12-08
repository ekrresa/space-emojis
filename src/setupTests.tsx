import React, { PropsWithChildren, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider } from './context/toasts';

function AllProviders({ children }: PropsWithChildren<unknown>) {
  return <ToastProvider>{children}</ToastProvider>;
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  render(ui, { wrapper: AllProviders, ...options });
}

export async function getData() {
  return await import('../public/emoji-list.json').then(data => data.default);
}
export * from '@testing-library/react';
export * from '@testing-library/user-event';
export { customRender, userEvent };
