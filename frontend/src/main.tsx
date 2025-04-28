import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <SidebarProvider>
      {/* <AppSidebar /> */}
      <Provider store={store}>
        {/* <SidebarTrigger /> */}
        <App />
      </Provider>
      <Toaster position='top-center' richColors />
    </SidebarProvider>
  </BrowserRouter>
  // </StrictMode>
);
