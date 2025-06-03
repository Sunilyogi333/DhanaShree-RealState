'use client';

import { usePathname } from 'next/navigation';
import type { Metadata } from "next";
import "./globals.css";
import '@/lib/i18';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Toaster } from "sonner"

import { config } from '@fortawesome/fontawesome-svg-core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import I18nProvider from '@/components/I18nProvider';

config.autoAddCss = false;


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/forgotPassword') || pathname.startsWith('/login') || pathname.startsWith('/reset-password');
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body 
      >
        <I18nProvider>
        <Provider store={store}>
        <QueryClientProvider client={queryClient}> 
        <Toaster 
                    position="top-right"
                    expand={true}
  theme="light"
            className="toaster"
         richColors
        />
        {!isAdminRoute && <Navbar />}
        {children}
        {!isAdminRoute && <Footer />}
        </QueryClientProvider>
        </Provider>
        </I18nProvider>
      </body>
    </html>
  );
};
