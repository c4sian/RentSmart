import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app/layout/styles.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from "./lib/api/queryClient.ts";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@emotion/react';
import { theme } from './lib/theme/theme.ts';
import { RouterProvider } from 'react-router';
import { router } from './app/router/Routes.tsx';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ToastContainer } from "react-toastify";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  </StrictMode>,
)
