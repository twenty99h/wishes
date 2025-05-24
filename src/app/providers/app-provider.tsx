import { ThemeProvider } from '@/app/theme-switcher';
import { RouterProvider } from 'react-router';
import { router } from '../router';

export function AppProvider() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
