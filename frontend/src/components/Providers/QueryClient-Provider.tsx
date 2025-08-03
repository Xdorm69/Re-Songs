"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

const QueryClientProviderApp = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <main>{children}</main>
      <Toaster richColors />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryClientProviderApp;
